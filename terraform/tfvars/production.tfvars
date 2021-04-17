project = "tdbprd"

environment = "production"

dns_managed_zones = {
  "com-thunderbandit" : {
    domain = "thunderbandit.com"
    name   = "com-thunderbandit"
  }
}

dns_record_sets = {
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
