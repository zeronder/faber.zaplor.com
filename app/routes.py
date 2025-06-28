from flask import Blueprint, render_template, jsonify, request, redirect, url_for

main = Blueprint('main', __name__)
import mysql.connector 

# Define a placeholder for data, this should be replaced with actual data retrieval logic
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Rohit#710",
    database="ticketdb"
)
cursor = db.cursor(dictionary=True)


@main.route('/')
def index():
    return render_template('index.html')

@main.route('/pending_today')
def pending_today():
    return render_template('pending_today.html')

@main.route('/pending_tomorrow')
def pending_tomorrow():
    return render_template('pending_tomorrow.html')

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

@main.route('/api/pending_today')
def api_pending_today():
    # This is a placeholder for the actual data retrieval logic
    cursor.execute("SELECT * FROM pending_today")
    data = cursor.fetchall()
    return jsonify(data)

@main.route('/add_ticket', methods=['GET', 'POST'])
def add_ticket():
    if request.method == 'POST':
        name = request.form['name']
        number = request.form['number']
        address = request.form['address']
        appliance = request.form['appliance']
        time = request.form['time']
        notes = request.form['notes']

        cursor.execute("""
            INSERT INTO pending_today (name, number, address, appliance, time, notes)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (name, number, address, appliance, time, notes))

        return redirect(url_for('main.pending_today'))  # update this if your function name is different

    return render_template('add_ticket.html')
