from flask import Blueprint, render_template

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/pending_today')
def pending_today():
    return render_template('pending_today.html')

@main.route('/pending_tomorrow')
def pending_tomorrow():
    return render_template('pending_tommarow.html')

@main.route('/pending_future')
def pending_future():
    return render_template('pending_future.html')

@main.route('/completed_open')
def completed_open():
    return render_template('completed_open.html')

@main.route('/completed_close')
def completed_close():
    return render_template('completed_close.html')


@main.route('/reminder')
def reminder():
    return render_template('reminder.html')