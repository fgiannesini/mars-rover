enum Direction {
    North,
    East,
    South,
    West,
}

enum Command {
    MoveForward = 'M',
    TurnLeft = 'L',
    TurnRight = 'R',
}

interface Position {
    x: number;
    y: number;
}

type MoveFunction = (position: Position) => Position;

const moveMap: { [key in Direction]: MoveFunction } = {
    [Direction.North]: ({ x, y }) => ({ x, y: y + 1 }),
    [Direction.East]: ({ x, y }) => ({ x: x + 1, y }),
    [Direction.South]: ({ x, y }) => ({ x, y: y - 1 }),
    [Direction.West]: ({ x, y }) => ({ x: x - 1, y }),
};

class MarsRover {
    private position: Position;
    private direction: Direction;

    constructor(initialX: number, initialY: number, initialDirection: Direction) {
        this.position = { x: initialX, y: initialY };
        this.direction = initialDirection;
    }

    executeCommands(commands: string): void {
        commands.split('').forEach((command) => {
            if (command === Command.MoveForward) {
                this.moveForward();
            } else if (command === Command.TurnLeft) {
                this.turnLeft();
            } else if (command === Command.TurnRight) {
                this.turnRight();
            }
        });
    }

    private moveForward(): void {
        this.position = moveMap[this.direction](this.position);
    }

    private turnLeft(): void {
        this.direction = (this.direction + 3) % 4;
    }

    private turnRight(): void {
        this.direction = (this.direction + 1) % 4;
    }

    getCurrentPosition(): Position {
        return this.position;
    }

    getCurrentDirection(): Direction {
        return this.direction;
    }
}

export { MarsRover, Direction, Command };
