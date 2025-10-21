from datetime import datetime
from flask import Blueprint, render_template, flash, redirect, request, url_for, current_app
from flask_mail import Mail, Message
from config import get_settings

zs_mail = Blueprint("zs_mail", __name__)

settings = get_settings()

@zs_mail.record
def record(state):
    app = state.app
    mail = Mail()
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_DEBUG'] = True
    app.config['MAIL_DEFAULT_SENDER'] = ("Zachary from ZSDynamics.com", "ZS@ZSDynamics.com")
    app.config['MAIL_MAX_EMAILS'] = 5
    app.config['MAIL_USERNAME'] = settings.MAIL_USERNAME
    app.config['MAIL_PASSWORD'] = settings.MAIL_PASSWORD
    app.config['SECRET_KEY'] = settings.SECRET_KEY
    app.config['MAIL_ASCII_ATTACHMENTS'] = True

    app.config['HOST'] = 'https://www.zsdynamics.com'
    mail.init_app(app)
    with app.app_context():
        current_app.mail = mail


def redirect_url(default='main.home'):
    return request.args.get('next') or \
           request.referrer or \
           url_for(default)


def to_me(person, subj, messg=None):
    date = datetime.today()
    msg = Message(
        subject = subj,
        recipients=[settings.MAIL_USERNAME],
        html = render_template("mail/to_me.html", title="To Me", person=person, message=messg, subject=subj, to_me = True, date=date)
    )
    current_app.mail.send(msg)


@zs_mail.route('/send_mail', methods=["GET", "POST"])
def send_mail():
    if request.method == 'POST':
        honeypot_email = request.form.get("honeypot_email")
        honeypot_name = request.form.get("honeypot_name")
        name = request.form.get("name")
        email = request.form.get("email")
        input_message = request.form.get("message")

        # Check for honeypot fields first to trap bots
        if honeypot_email or honeypot_name:
            flash('Mail not accepted.', 'danger')
            return redirect(redirect_url())
        
        if email == "ericjonesmyemail@gmail.com":
            flash('Mail not accepted Eric Jones.', 'danger')
            return redirect(redirect_url())
        

        # Validate that name, email, and message are not empty
        if not name or not email or not input_message:
            flash('Please fill in all the fields.', 'danger')
            return redirect(redirect_url())

        # Remaining part of your code for sending email
        person = {'name': name, 'email': email}
        date = datetime.today()

        msg = Message(
                subject='Thanks for reaching out!',
                recipients=[email],
                bcc=[settings.MAIL_USERNAME],
                html=render_template("mail/thanks_for_reaching_out.html", reaching_out=True, date=date, person=person)
            )
        current_app.mail.send(msg)
        flash(f"Thanks for reaching out! A reply will be sent to your email soon", 'success')
        subject_to_me = "New Message from " + name
        to_me(person, subject_to_me, input_message)
        return redirect(redirect_url())
    
    # If it's not a POST request, just redirect to the default URL
    return redirect(redirect_url())
