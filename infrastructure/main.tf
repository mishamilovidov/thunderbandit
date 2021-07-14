terraform {
  backend "gcs" {}

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.64.0"
    }
  }

  required_version = ">=0.14"
}

#
# providers ###################################################################
#

provider "google" {
  project     = var.project
  credentials = file(var.credentials)
}

provider "google-beta" {
  project     = var.project
  credentials = file(var.credentials)
}

#
# resources ###################################################################
#

resource "google_dns_managed_zone" "default" {
  for_each = var.dns_managed_zones
  name     = each.value.name
  dns_name = "${each.value.domain}."
}

resource "google_dns_record_set" "default" {
  for_each     = var.dns_record_sets
  name         = each.value.value == "" ? "${google_dns_managed_zone.default[each.value.zone].dns_name}" : "${each.value.value}.${google_dns_managed_zone.default[each.value.zone].dns_name}"
  type         = each.value.type
  ttl          = each.value.ttl
  rrdatas      = each.value.rrdatas
  managed_zone = google_dns_managed_zone.default[each.value.zone].name
}
