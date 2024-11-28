class Mesh {
    x;
    y;
    z;
    isContainCell = false;
    cell = null;

    constructor (x, y) {
        this.x = x;
        this.y = y;
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
        let coord = this.getCoord(this.x, this.y, this.z);
        console.log("x до: " + coord[0]);
        console.log("y до: " + coord[1]);
        let x = coord[0] + cellLeft;
        let y = coord[1] + cellTop;
        console.log("x после: " + x);
        console.log("y после: " + y);
        switch (color) {
            case 'red':
                this.cell = createRedCell(x, y);
                break;
            case 'blue':
                this.cell = createBlueCell(x, y);
                break;
            case 'green':
                this.cell = createGreenCell(x, y);
                break;
            default:
                console.log("Неизвестный цвет");
                break;
        }
        addOnePoint(this.cell);
        add(this.cell);
    }

    deleteCell() {
        del(this.cell);
        isContainCell = false;
    }
}

class Field {
    meshes = [];
    coordsToMeshes = {};

    constructor () {
        let counter = 0;
        for (let x = 0; x > -4; x--) {
            for (let y = 0; y < Math.abs(x) + 4; y++) {
                const mesh = new Mesh(x, y);
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

    drawCell(x, y, color, countOfPoints) {
        this.meshes[this.coordsToMeshes[[x, y]]].drawCell(color, countOfPoints);
    }

    move(x1, y1, x2, y2) {

    }
}