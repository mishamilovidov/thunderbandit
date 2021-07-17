variable "project" {
  type = object({
    id     = string
    name   = string
    number = number
  })
  description = "gcp project name; resource-specific project takes precedence"
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

variable "region_default" {
  type        = string
  description = "default region"
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

variable "repositories" {
  type = map(object({
    id          = string,
    location    = string,
    description = string,
    format      = string
  }))
  description = "artifact repositories"
}
