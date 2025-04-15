resource "google_project_service" "compute" {
  service                    = "compute.googleapis.com"
  disable_dependent_services = true
}

resource "google_project_service" "container" {
  service                    = "container.googleapis.com"
  depends_on                 = [google_project_service.compute]
  disable_dependent_services = true
}

resource "google_project_service" "sqladmin" {
  service                    = "sqladmin.googleapis.com"
  depends_on                 = [google_project_service.compute]
  disable_dependent_services = true
}

resource "google_project_service" "connectivity" {
  service                    = "networkmanagement.googleapis.com"
  depends_on                 = [google_project_service.compute]
  disable_dependent_services = true
}
