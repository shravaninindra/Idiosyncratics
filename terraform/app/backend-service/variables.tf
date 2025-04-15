variable "backend_service_image" {
  description = "The docker image for backend service application that should be deployed in kubernetes pod"
}

variable "db_details" {
  description = "The cloud sql sa credentials"
}

variable "chatgpt_api_key" {
  description = "API key for chatgpt"
}