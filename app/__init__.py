from flask import Flask
from app.context_processors import portfolio_context_processor
from config import get_settings

settings = get_settings()

def create_app(config_class=settings):
    app = Flask(__name__)
    app.config.from_object(config_class)

    app.context_processor(lambda: portfolio_context_processor(config_class))

    from app.errors.handlers import errors
    from app.main.routes import main
    from app.projects.routes import projects
    from app.services.routes import services

    app.register_blueprint(errors)
    app.register_blueprint(main)
    app.register_blueprint(projects)
    app.register_blueprint(services)


    return app