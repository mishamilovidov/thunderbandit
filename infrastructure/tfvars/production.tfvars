projects = {
  "tbprd-app" : {
    id     = "tbprd-app"
    name   = "tbprd-app"
    number = "965822347350"
  }
  "tbprd-logging" : {
    id     = "tbprd-logging"
    name   = "tbprd-logging"
    number = "338363861047"
  }
  "tbprd-monitoring" : {
    id     = "tbprd-monitoring"
    name   = "tbprd-monitoring"
    number = "643533260711"
  }
  "tbprd-networking" : {
    id     = "tbprd-networking"
    name   = "tbprd-networking"
    number = "1044670334258"
  }
  "tbprd-secrets" : {
    id     = "tbprd-secrets"
    name   = "tbprd-secrets"
    number = "966153006457"
  }
  "tbprd-terraform" : {
    id     = "tbprd-terraform"
    name   = "tbprd-terraform"
    number = "192153868877"
  }
  "tbprd-tools" : {
    id     = "tbprd-tools"
    name   = "tbprd-tools"
    number = "368662475500"
  }
  "tbprd-website" : {
    id     = "tbprd-website"
    name   = "tbprd-website"
    number = "1066997178440"
  }
}

project_default = "tbprd-terraform"

credentials = "credentials.json"

environment = "prd"

regions = {
  "or1" : {
    region       = "us-west1",
    name         = "US West"
    provider     = "gcp"
    locality     = "Oregon"
    sublocality  = "The Dalles"
    country      = "United States"
    countryGroup = "Americas"
  },
  "ia1" : {
    region       = "us-central1",
    name         = "US Central"
    provider     = "gcp"
    locality     = "Iowa"
    sublocality  = "Council Bluffs"
    country      = "United States"
    countryGroup = "Americas"
  },
  "sc1" : {
    region       = "us-east1",
    name         = "US East"
    provider     = "gcp"
    locality     = "South Carolina"
    sublocality  = "Moncks Corner"
    country      = "United States"
    countryGroup = "Americas"
  }
}

region_default = "or1"

artifact_registry_repositories = {
  "thunderbandit" : {
    id          = "thunderbandit"
    location    = "us"
    description = ""
    format      = "DOCKER"
    project     = "tbprd-tools"
  }
}

dns_managed_zones = {
  "com-thunderbandit" : {
    domain  = "thunderbandit.com"
    name    = "com-thunderbandit"
    project = "tbprd-networking"
  }
}

dns_record_sets = {
  "com-thunderbandit" : {
    value = ""
    zone  = "com-thunderbandit"
    type  = "NS"
    ttl   = 3600
    rrdatas = [
      "ns-cloud-b1.googledomains.com.",
      "ns-cloud-b2.googledomains.com.",
      "ns-cloud-b3.googledomains.com.",
      "ns-cloud-b4.googledomains.com."
    ]
  }
  "com-thunderbandit" : {
    value = ""
    zone  = "com-thunderbandit"
    type  = "A"
    ttl   = 0
    rrdatas = [
      "151.101.1.195",
      "151.101.65.195"
    ]
  }
  "com-thunderbandit-www" : {
    value = "www"
    zone  = "com-thunderbandit"
    type  = "A"
    ttl   = 0
    rrdatas = [
      "151.101.1.195",
      "151.101.65.195"
    ]
  }
}
