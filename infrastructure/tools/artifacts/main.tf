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
  project     = var.project.id
  credentials = file(var.credentials)
  region      = var.regions[var.region_default].region
  zone        = "${var.regions[var.region_default].region}-a"
}

provider "google-beta" {
  project     = var.project.id
  credentials = file(var.credentials)
  region      = var.regions[var.region_default].region
  zone        = "${var.regions[var.region_default].region}-a"
}

#
# resources ###################################################################
#

resource "google_artifact_registry_repository" "default" {
  provider      = google-beta
  for_each      = var.repositories
  repository_id = each.value.id
  description   = each.value.description
  location      = each.value.location
  format        = each.value.format
}
