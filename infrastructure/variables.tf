variable "projects" {
  type = map(object({
    id     = string
    name   = string
    number = number
  }))
  description = "gcp projects"
}

variable "project_default" {
  type        = string
  description = "default project"
}

variable "credentials" {
  type        = string
  description = "path to a service account key file in JSON format"
  sensitive   = true
}

variable "environment" {
  type        = string
  description = "deployment environment"
}

variable "regions" {
  type = map(object({
    region       = string,
    name         = string,
    provider     = string,
    locality     = string,
    sublocality  = string,
    country      = string,
    countryGroup = string
  }))
  description = "available regions"
}

variable "region_default" {
  type        = string
  description = "default region"
}

variable "artifact_registry_repositories" {
  type = map(object({
    id          = string,
    location    = string,
    description = string,
    format      = string,
    project     = string
  }))
  description = "artifact repositories"
}

variable "dns_managed_zones" {
  type = map(any)
}

variable "dns_record_sets" {
  type = map(any)
}

# variable "storage_buckets" {
#   type = map(any)
# }
