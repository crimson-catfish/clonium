from flask import Flask, render_template, request, jsonify
from npm.conf import settings

from back.supportive import generate_room_code, write_information, Settings, LIST_OF_INFORMATION

server = Flask(__name__)

@server.route('/', methods=['GET'])
def start():
    return render_template('start.html')


@server.route('/create-room/<int:room_code>', methods=['GET'])
def play_room(room_code):
    '''data = request.args.get('data')  # Получаем данные из URL'''
    return render_template('room.html')


@server.route('/request_room_code', methods=['POST'])
def handle_request_room_code():
    data = request.json
    print(f"Полученные данные: {data}")
    room_code = generate_room_code()
    write_information(room_code, data)
    response = {'room_code': room_code}
    print(LIST_OF_INFORMATION)
    return jsonify(response)


@server.route('/create-room')
def create_room():
    return render_template('create-room.html')


@server.route('/room')
def room():
    return render_template('room.html')

if __name__ == '__main__':
    server.run()