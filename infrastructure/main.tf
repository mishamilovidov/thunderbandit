terraform {
  backend "gcs" {}

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.64.0"
    }
  }

  required_version = ">=0.15"
}

#
# providers ###################################################################
#

provider "google" {
  project     = var.projects[var.project_default].id
  credentials = file(var.credentials)
  region      = var.regions[var.region_default].region
  zone        = "${var.regions[var.region_default].region}-a"
}

provider "google-beta" {
  project     = var.projects[var.project_default].id
  credentials = file(var.credentials)
  region      = var.regions[var.region_default].region
  zone        = "${var.regions[var.region_default].region}-a"
}

#
# resources ###################################################################
#

resource "google_artifact_registry_repository" "default" {
  provider      = google-beta
  for_each      = var.artifact_registry_repositories
  project       = each.value.project
  repository_id = each.value.id
  description   = each.value.description
  location      = each.value.location
  format        = each.value.format
}

resource "google_dns_managed_zone" "default" {
  for_each = var.dns_managed_zones
  project  = each.value.project
  name     = each.value.name
  dns_name = "${each.value.domain}."
}

resource "google_dns_record_set" "default" {
  for_each     = var.dns_record_sets
  project      = google_dns_managed_zone.default[each.value.zone].project
  name         = each.value.value == "" ? "${google_dns_managed_zone.default[each.value.zone].dns_name}" : "${each.value.value}.${google_dns_managed_zone.default[each.value.zone].dns_name}"
  type         = each.value.type
  ttl          = each.value.ttl
  rrdatas      = each.value.rrdatas
  managed_zone = google_dns_managed_zone.default[each.value.zone].name
}
