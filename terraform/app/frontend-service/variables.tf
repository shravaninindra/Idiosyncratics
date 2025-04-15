variable "frontend_service_image" {
  description = "The docker image for frontend service application that should be deployed in kubernetes pod"
}


variable "backend_service_endpoint" {
  description = "The endpoint of the backend service. All api calls from the frontend service will be made to this url"
}