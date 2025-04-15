variable "project" {
  type        = string
  description = "The google cloud project name"
}

variable "region" {
  type        = string
  description = "The region for deployment"
}

variable "zone" {
  type        = string
  description = "The availability zone for the deployment"
}

variable "GOOGLE_CREDENTIALS" {}

variable "frontend_service_image" {
  description = "The docker image for frontend service application that should be deployed in kubernetes pod"
}

variable "backend_service_image" {
  description = "The docker image for backend service application that should be deployed in kubernetes pod"
}

variable "chatgpt_api_key" {
  description = "The api key for backend service to connect to chatgpt"
}