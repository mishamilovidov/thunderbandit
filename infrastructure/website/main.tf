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
