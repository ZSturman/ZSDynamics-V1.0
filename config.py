from typing import Optional
from functools import lru_cache
#from pydantic import BaseSettings
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "ZSDynamics"
    SECRET_KEY: str = "static-site-no-secrets-needed"
    MAIL_USERNAME: str = ""
    MAIL_PASSWORD: str = ""

    class Config:
        env_file = "app/.env"

@lru_cache()
def get_settings(): 
    return Settings()

class Configure(object):
    DEBUG = False
    TESTING = False

    DEV_TEST = False
    DEV_STATUS = False

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    #HOST = 'https://www.zsdynamics.com'

    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_DEBUG = True
    MAIL_DEFAULT_SENDER = ("Zachary from ZSDynamics.com", "ZS@ZSDynamics.com")
    MAIL_MAX_EMAILS = 10

    APP_CONTEXT_PROCESSORS = ['app.context_processors.portfolio_context_processor']

    STATIC_BASE=""


class DevelopmentConfig(Configure):
    DEBUG = True
    DEV_STATUS = False
    PERMANENT_SESSION_LIFETIME = 60
    
class ProductionConfig(Configure):
    STATIC_BASE=""

class StaticBuildConfig(Configure):
    """Config for building static sites - uses relative paths"""
    STATIC_BASE=""  # Use relative paths for GitHub Pages
    
class TestingConfig(Configure):
    DEV_TEST = True
    PERMANENT_SESSION_LIFETIME = 20
    TESTING = True
    DEBUG = True
