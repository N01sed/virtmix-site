#!/usr/bin/env bash
# Assembles the signed APT repository served by this site, into the publish dir.
#
# WHY IT IS BUILT HERE AND NOT COMMITTED: the package weighs several megabytes and
# a new one would land at every release, forever. It is downloaded from the
# application's latest release at build time instead, so nothing binary ever
# enters this repository's git history.
#
# The consequence: the APT repository only moves when the site is rebuilt. That is
# what the `schedule` trigger in deploy.yml is for, and the "Run workflow" button
# for when waiting a day is too long.
#
# Only the latest version is served. Pinning an older one (`apt install
# virtmix=1.2.2`) is therefore not possible; older releases stay downloadable by
# hand from the application repository.
#
# Usage:  apt-repo.sh <publish root>      (e.g. dist)
set -euo pipefail

root="${1:?publish root expected}"
source_repo="${VIRTMIX_REPO:-N01sed/virtmix}"
suite=stable
component=main
arch=amd64

# An unsigned repository is not an acceptable fallback: apt refuses it, and working
# around that needs `[trusted=yes]` on the user's side — which means turning off the
# one check that protects the chain. With no key, no repository is published, and
# the site still builds.
if [ -z "${APT_GPG_PRIVATE_KEY:-}" ]; then
  echo ">> APT_GPG_PRIVATE_KEY is unset: skipping the APT repository"
  exit 0
fi

work="$(mktemp -d)"
export GNUPGHOME="$work/gnupg"
mkdir -p "$GNUPGHOME"
chmod 700 "$GNUPGHOME"
trap 'rm -rf "$work"' EXIT

# ------------------------------------------------------------------ the package
headers=(-H "Accept: application/vnd.github+json")
[ -n "${GITHUB_TOKEN:-}" ] && headers+=(-H "Authorization: Bearer $GITHUB_TOKEN")

curl -fsSL "${headers[@]}" \
  "https://api.github.com/repos/$source_repo/releases/latest" > "$work/release.json"

url="$(jq -r --arg a "_${arch}.deb" \
  'first(.assets[] | select(.name | endswith($a)) | .browser_download_url) // empty' \
  "$work/release.json")"

if [ -z "$url" ]; then
  echo ">> no $arch package in the latest $source_repo release: skipping"
  exit 0
fi

version="$(jq -r '.tag_name' "$work/release.json")"
name="$(basename "$url")"
echo ">> $source_repo $version: $name"

apt="$root/apt"
mkdir -p "$apt/pool/$component/v/virtmix" "$apt/dists/$suite/$component/binary-$arch"
curl -fsSL -o "$apt/pool/$component/v/virtmix/$name" "$url"

# ------------------------------------------------------------------ the indexes
# From the repository root: the `Filename:` field of Packages is relative to it,
# and that is the path apt follows to fetch the package.
cd "$apt"

packages="dists/$suite/$component/binary-$arch/Packages"
apt-ftparchive --arch "$arch" packages pool > "$packages"
gzip -9kf "$packages"

# Release lists the checksums of everything under dists/<suite>, so writing it
# straight there would ask it to describe itself.
apt-ftparchive \
  -o "APT::FTPArchive::Release::Origin=VirtMix" \
  -o "APT::FTPArchive::Release::Label=VirtMix" \
  -o "APT::FTPArchive::Release::Suite=$suite" \
  -o "APT::FTPArchive::Release::Codename=$suite" \
  -o "APT::FTPArchive::Release::Components=$component" \
  -o "APT::FTPArchive::Release::Architectures=$arch" \
  -o "APT::FTPArchive::Release::Description=VirtMix — virtual mixing desk for PipeWire" \
  release "dists/$suite" > "$work/Release"
mv "$work/Release" "dists/$suite/Release"

# ------------------------------------------------------------------- signature
printf '%s\n' "$APT_GPG_PRIVATE_KEY" | gpg --batch --quiet --import
key="$(gpg --list-secret-keys --with-colons | awk -F: '/^sec:/ {print $5; exit}')"
[ -n "$key" ] || { echo "the imported key carries no secret part" >&2; exit 1; }

# Both forms: InRelease (inline signature) for apt >= 1.1, Release.gpg (detached)
# for whatever is still around.
gpg --batch --yes --default-key "$key" --clearsign \
  -o "dists/$suite/InRelease" "dists/$suite/Release"
gpg --batch --yes --default-key "$key" --armor --detach-sign \
  -o "dists/$suite/Release.gpg" "dists/$suite/Release"

# The public key at the site root — the address the install instructions give. It
# is derived from the private key rather than committed separately: two copies
# would eventually drift apart with nothing to signal it.
gpg --batch --armor --export "$key" > "../virtmix.asc"

echo ">> APT repository ready ($(du -sh . | cut -f1)), signed by $key"
