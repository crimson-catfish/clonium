from flask import Flask, render_template, redirect, url_for, request, jsonify

server = Flask(__name__)

@server.route('/', methods=['GET'])
def start():
    return render_template('start.html')


@server.route('/create-room/<int:room_code>', methods=['POST'])
def play_room(room_code):
    '''data = request.args.get('data')  # Получаем данные из URL'''
    return render_template('room.html')


@server.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json  # Получаем json данные из запроса
    print(f"Полученные данные: {data}")  # Выводим полученные данные на консоль
    response = {"message": "Данные успешно получены!", "received": data}
    return jsonify(response)


@server.route('/create-room')
def create_room():
    return render_template('create-room.html')


@server.route('/room')
def room():
    return render_template('room.html')

if __name__ == '__main__':
    server.run()