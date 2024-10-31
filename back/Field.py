from abc import ABC, abstractmethod
from enum import Enum
from typing import Final, Optional


HexCoord = tuple[int, int, int]


class Color(Enum):
    red = 'red'
    green = 'green'
    blue = 'blue'
    yellow = 'yellow'
    orange = 'orange'
    violet = 'violet'


class Cell(ABC):
    def __init__(self, x: int, y: int, satur: int, residue_mode: bool = False) -> None:
        self.x: Final[int] = x
        self.y: Final[int] = y
        self.__residue_mode: bool = residue_mode  # должна ли при разложении одна точка оставаться здесь
        self.__saturation: Final[int] = satur + (0 if not residue_mode else 1)  # сколько точек нужно для разложения
        self.__points: int = 0  # сколько точек лежит
        self.__color: Optional[Color] = None

    def add_point(self) -> bool:
        """Вернёт True, если после добавления произойдёт разложение"""
        self.__points += 1
        if self.__points >= self.__saturation:
            if not self.__residue_mode:
                self.__points = 0
                self.__color = None
            else:
                self.__points = 1
            return True
        return False

    def get_points(self) -> int:
        return self.__points

    def set_color(self, color: Color) -> None:
        self.__color = color

    def get_color(self) -> Color:
        return self.__color

    @abstractmethod
    def get_adjacent_coord(self) -> list[tuple[int, int]]:
        pass


class Hexcell(Cell):
    def __init__(self, x: int, y: int, satur: int = 6, residue_mode: bool = False) -> None:
        super().__init__(x, y, satur, residue_mode)
        self.z: Final[int] = - (x + y)  # это кубическая система координат, сумма всех трёх всегда равна 0

    def get_adjacent_coord(self) -> list[HexCoord]:
        result: list[HexCoord] = []
        for dx, dy, dz in ((-1, 0, 1), (0, -1, 1), (1, -1, 0), (1, 0, -1), (0, 1, -1), (-1, 1, 0)):
            result.append((self.x + dx, self.y + dy, self.z + dz))
        return result

    def __repr__(self):
        return f'({self.y}, {self.z}, {self.x})'


class Field:
    def create_cells(self, size: int) -> None:
        cell_line_max: int = (size + 1) // 2
        flag: bool = True
        offset: int = 0
        for x in range(0, -size, -1):
            for y in range(0 + offset, size, 1):
                self.cells.append(Hexcell(x, y))
                if y + 1 - offset == cell_line_max:
                    break

            if cell_line_max < size and flag:
                cell_line_max += 1
            else:
                cell_line_max -= 1
                offset += 1
                flag = False

    def __init__(self) -> None:
        self.cells: list[Hexcell] = []
        self.create_cells(7)


f = Field()
print('                        ' + str(f.cells[:4]))
print('                  ' + str(f.cells[4:9]))
print('            ' + str(f.cells[9:15]))
print('      ' + str(f.cells[15:22]))
print('            ' + str(f.cells[22:28]))
print('                  ' + str(f.cells[28:33]))
print('                        ' + str(f.cells[33:]))
