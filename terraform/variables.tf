variable "project" {
  type        = string
  description = "gcp project name; resource-specific project takes precedence"
}

variable "credentials" {
  type        = string
  description = "path to a service account key file in JSON format"
  sensitive   = true
}

variable "environment" {
  type = string
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
}

variable "dns_managed_zones" {
  type = map(any)
}

variable "dns_record_sets" {
  type = map(any)
}

