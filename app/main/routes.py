from flask import Blueprint, render_template, url_for, send_from_directory, current_app
import os

main = Blueprint("main", __name__)

@main.route("/")
@main.route("/home")
def home():
    return render_template("home.html", title="Zachary Sturman")

@main.route("/about")
def about():
    return render_template("about.html", title="About")

@main.route("/contact")
def contact():
    return render_template("contact.html", title="Contact")

@main.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(current_app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')





""" 
@main.route("/tester_page")
def testing_page():
    return render_template("testing_page.html") """

