from enum import Enum


class FormOfField(Enum):
    triangle = 'triangle'
    square = 'square'
    hexagon = 'hexagon'


class Information:
    def __init__(self, room_code: int, number_of_players: int, form_of_field: FormOfField) -> None:
        self.room_code: int = room_code
        self.number_of_players: int = number_of_players
        self.form_of_field: FormOfField = form_of_field

    def get_room_code(self):
        return self.room_code

    def get_number_of_players(self):
        return self.number_of_players

    def get_form_of_field(self):
        return self.form_of_field


