from flask import Blueprint, render_template

services = Blueprint("services", __name__)

@services.route("/data_analytics")
def data_analytics():
    return render_template("data_analytics.html", title="Data Analytics")

@services.route("/front_end")
def front_end():
    return render_template("front_end.html", title="User Interface Development")

@services.route("/back_end")
def back_end():
    return render_template("back_end.html", title="Back-end Engineering")