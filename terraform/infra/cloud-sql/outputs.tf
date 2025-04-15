output "instance_name" {
  value = google_sql_database_instance.main.name
}

output "connection_name" {
  value = google_sql_database_instance.main.connection_name
}

output "service_account_key" {
  value     = google_service_account_key.sql_key.private_key
  sensitive = true
}

output "db_user_name" {
  value = google_sql_user.users.name
}

output "db_password" {
  value     = google_sql_user.users.password
  sensitive = true
}

output "db_name" {
  value = google_sql_database.database.name
}