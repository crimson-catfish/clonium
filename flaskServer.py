from flask import Flask, render_template, redirect, url_for

server = Flask(__name__)

@server.route('/')
def start():
    return render_template('start.html')


@server.route('/request_create_room', methods=['GET'])
def handle__request_create_room():
    return redirect(url_for('create_room'))


@server.route('/request_start', methods=['GET'])
def handle__request_start():
    return redirect(url_for('start'))


@server.route('/create-room')
def create_room():
    return render_template('create-room.html')


@server.route('/request_room', methods=['GET'])
def handle_request_room():
    return redirect(url_for('room'))


@server.route('/room')
def room():
    return render_template('room.html')

if __name__ == '__main__':
    server.run()