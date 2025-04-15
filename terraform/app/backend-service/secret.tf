resource "kubernetes_secret" "backend_service_secret" {
  metadata {
    name = local.backend_service_secret
  }

  data = {
    SA_CREDS        = base64decode(var.db_details.service_account_key)
    DB_NAME         = var.db_details.db_name
    CONNECTION_NAME = var.db_details.connection_name
    DB_USER_NAME    = var.db_details.db_user_name
    DB_PASSWORD     = var.db_details.db_password
    CHATGPT_API_KEY = var.chatgpt_api_key
  }
}