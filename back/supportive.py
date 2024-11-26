from enum import Enum


class FormOfField(Enum):
    triangle = 'triangle'
    square = 'square'
    hexagon = 'hexagon'


class Settings:
    def __init__(self, number_of_players: int, form_of_field: FormOfField) -> None:
        self.number_of_players: int = number_of_players
        self.form_of_field: FormOfField = form_of_field

    def get_number_of_players(self) -> int:
        return self.number_of_players

    def get_form_of_field(self) -> FormOfField:
        return self.form_of_field


