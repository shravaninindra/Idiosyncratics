import sqlalchemy
from google.cloud.sql.connector import Connector
import os

# Initialize Global connector object
connector = Connector()

# Retrieve config values
DRIVER = 'pg8000'
USER = os.getenv('DB_USER_NAME')
DB = os.getenv('DB_NAME')
PASSWORD = os.getenv('DB_PASSWORD')
CONNECTION_NAME = os.getenv('CONNECTION_NAME')

# function to return the database connection object
def getconn():
    conn = connector.connect(
        CONNECTION_NAME,
        DRIVER,
        user=USER,
        password=PASSWORD,
        db=DB
    )
    return conn

# Connection pool with 'creator' argument to our connection object function
pool = sqlalchemy.create_engine(
    "postgresql+pg8000://",
    creator=getconn,
)