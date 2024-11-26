import json
import random
from enum import Enum

LIST_OF_INFORMATION = {}

class FormOfField(Enum):
    triangle = 'triangle'
    square = 'square'
    hexagon = 'hexagon'


class Settings:
    def __init__(self, number_of_players: int, form_of_field: FormOfField) -> None:
        self.number_of_players: int = number_of_players
        self.form_of_field: FormOfField = form_of_field

    def __dict__(self):
        return {"number_of_players": self.number_of_players, "form_of_field": self.form_of_field.value}

    def get_number_of_players(self) -> int:
        return self.number_of_players

    def get_form_of_field(self) -> FormOfField:
        return self.form_of_field


def write_information(room_code: int, settings: Settings) -> None:
    LIST_OF_INFORMATION[room_code] = json.dumps(settings.__dict__())


def generate_room_code() -> int:
    room_code: int = random.randint(100000, 999999)
    if LIST_OF_INFORMATION.get(room_code, 0) == 0:
        return room_code
    generate_room_code()
