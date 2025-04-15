output "gke_cluster_outputs" {
  value = module.gke_cluster
}

output "db_details" {
  value = {
    service_account_key = module.cloud_sql.service_account_key
    db_name             = module.cloud_sql.db_name
    connection_name     = module.cloud_sql.connection_name
    db_user_name        = module.cloud_sql.db_user_name
    db_password         = module.cloud_sql.db_password
  }
  description = "All required details for the database connection"
  sensitive   = true
}