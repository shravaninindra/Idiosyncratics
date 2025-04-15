resource "google_sql_database_instance" "main" {
  name                = "main-instance-pg"
  database_version    = "POSTGRES_14"
  region              = var.region
  deletion_protection = false

  settings {
    # Second-generation instance tiers are based on the machine
    # type. See argument reference below.
    tier = "db-f1-micro"
  }
}

resource "google_sql_database" "database" {
  name     = "temp"
  instance = google_sql_database_instance.main.name
}


resource "google_service_account" "sql_service_account" {
  account_id   = "cloud-sql-sa"
  display_name = "CLoud sql service account"
}

resource "google_project_iam_binding" "iam_binding" {
  project = var.project
  role    = "roles/cloudsql.client"

  members = [
    "serviceAccount:${google_service_account.sql_service_account.email}"
  ]
}

resource "random_password" "db_pass" {
  length = 16
}

resource "google_service_account_key" "sql_key" {
  service_account_id = google_service_account.sql_service_account.name
}

resource "google_sql_user" "users" {
  name     = "cloud_user"
  instance = google_sql_database_instance.main.name
  password = random_password.db_pass.result
}