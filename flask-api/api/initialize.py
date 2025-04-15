from .database import pool
import sqlalchemy #1.4.0
from sqlalchemy import text

def initialize_database():
  # Connect to connection pool
  with pool.connect() as db_conn:
      # Create userdata table to store VA details
      db_conn.execute(
          "CREATE TABLE IF NOT EXISTS userdata"
          "( email TEXT, "
          "username TEXT,"
          "password TEXT,"
          "PRIMARY KEY(email));"
      )
      
      #insert data into our USERDATA table
      insert_stmt = sqlalchemy.text(
        "INSERT INTO userdata (email, username, password) VALUES (:email, :username, :password)",
      )

      db_conn.execute(insert_stmt, username="admin", password="admin", email="admin@gmail.com")

def query_table():
  with pool.connect() as db_conn:      
    # Query userdata table
    results = db_conn.execute("SELECT * FROM userdata").fetchall()
    for row in results:
        print(row)