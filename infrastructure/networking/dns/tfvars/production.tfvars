project = {
  id     = "tbprd-networking"
  name   = "tbprd-networking"
  number = "1044670334258"
}

credentials = "credentials.json"

environment = "prd"

dns_managed_zones = {
  "com-thunderbandit" : {
    domain = "thunderbandit.com"
    name   = "com-thunderbandit"
  }
}

dns_record_sets = {
  "com-thunderbandit" : {
    value = ""
    zone  = "com-thunderbandit"
    type  = "NS"
    ttl   = 3600
    rrdatas = [
      "ns-cloud-e1.googledomains.com.",
      "ns-cloud-e2.googledomains.com.",
      "ns-cloud-e3.googledomains.com.",
      "ns-cloud-e4.googledomains.com."
    ]
  }
  "com-thunderbandit": {
    value   = ""
    zone    = "com-thunderbandit"
    type    = "A"
    ttl     = 0
    rrdatas = [
      "151.101.1.195",
      "151.101.65.195"
    ]
  }
}
