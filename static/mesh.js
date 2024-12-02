const width = 716.44;
const height = 650;
const sizeOfMesh = height / 11;
const cellLeft = (Math.sqrt(3) * sizeOfMesh) / 2 - (Math.sqrt(2) * sizeOfCell) / 2;
const cellTop = (2 * sizeOfMesh) / 2 - (Math.sqrt(2) * sizeOfCell) / 2;

class Mesh {
    x;
    y;
    z;
    mesh;
    isContainCell = false;
    cell = null;
    color;

    constructor (x, y, mesh) {
        this.x = x;
        this.y = y;
        this.mesh = mesh;
        this.z = - (x + y);
    }

    getAdjacentCoord() {
        const result = [];
        const directions = [[-1, 0, 1], [0, -1, 1], [1, -1, 0], [1, 0, -1], [0, 1, -1], [-1, 1, 0]];
        for (const [dx, dy, dz] of directions) {
            result.push([this.x + dx, this.y + dy, this.z + dz]);
        }
        return result;
    }

    getCoord(x, y, z) {
        let top = (-x) * 1.5 * sizeOfMesh;
        let left = 1.5 * Math.sqrt(3) * sizeOfMesh - z * Math.sqrt(3) * sizeOfMesh / 2 + y * 0.5 * Math.sqrt(3) * sizeOfMesh;
        return [left, top];
    }

    drawCell(color, countOfPoints) {
        this.isContainCell = true;
        this.color = color;
        let coord = this.getCoord(this.x, this.y, this.z);
        let x = coord[0] + cellLeft;
        let y = coord[1] + cellTop;
        this.cell = createFullCell(x, y, color, countOfPoints);
        add(this.cell);
        return this.cell;
    }

    addPoint() {
        addPoint(this.cell);
    }

    deleteCell() {
        let answerCell = this.cell;
        del(this.cell);
        this.cell = null;
        this.color = '';
        this.isContainCell = false;
        return answerCell;
    }
}

class Field {
    meshes = [];
    coordsToMeshes = {};
    indexesToCells = [];
    cells = [];

    constructor () {
        let counter = 0;
        let hexagons = Field.#createField();
        for (let x = 0; x > -4; x--) {
            for (let y = 0; y < Math.abs(x) + 4; y++) {
                const mesh = new Mesh(x, y, hexagons[counter]);
                this.meshes.push(mesh);
                this.coordsToMeshes[[x, y]] = counter++;
            }
        }

        for (let x = -4; x > -7; x--) {
            for (let y = Math.abs(x) - 3; y < 7; y++) {
                const mesh = new Mesh(x, y);
                this.meshes.push(mesh);
                this.coordsToMeshes[[x, y]] = counter++;
            }
        }
    }

    static #createField() {
        let hexagons = [];
        for (let y = 0; y < 9 * sizeOfMesh + 0.1; y += 1.5 * sizeOfMesh) {
            let offset = Math.abs(y / (1.5 * sizeOfMesh) - 3) * (Math.sqrt(3) / 2) * sizeOfMesh;
            for (let x = offset; x < width - offset - 0.1; x += Math.sqrt(3) * sizeOfMesh) {
                let hexagon = createHexagon(x, y, sizeOfMesh);
                hexagons.push(hexagon);
                add(hexagon);
            }
        }
        return hexagons;
    }

    drawCell(x, y, color, countOfPoints) {
        let cell = this.meshes[this.coordsToMeshes[[x, y]]].drawCell(color, countOfPoints);
        this.cells.push(cell);
        this.indexesToCells.push([x, y]);
    }

    deleteCell(x, y){
        let cell = this.meshes[this.coordsToMeshes[[x, y]]].deleteCell();
        this.cells.splice(this.cells.indexOf(cell), 1);
        for (let i = 0; i < this.indexesToCells.length; i++) {
            if (this.indexesToCells[i].toString() === [x, y].toString()) {
                this.indexesToCells.splice(i, 1);
                break;
            }
        }
    }

    addPoint(x, y) {
        this.meshes[this.coordsToMeshes[[x, y]]].addPoint();
    }



    move(x1, y1, x2, y2) {

    }
}