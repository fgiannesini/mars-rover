import { Command } from "./enums/command";
import { Direction } from "./enums/direction";

type Position = { x: number; y: number };
export type Rover = { position: Position; direction: Direction };
export type Mars = { rows: number; cols: number };

const { North, West, South, East } = Direction;
const { Left, Right, Forward, Backward } = Command;

export const rover = (x: number, y: number, direction: Direction): Rover => {
    return { position: { x, y }, direction };
};

export const mars = ({ rows, cols }: Mars) => {
    return { rows, cols };
};

export const execute = (
    mars: Mars,
    rover: Rover,
    commands: Command[],
): Rover => {
    for (let i = 0; i < commands.length; i++) {
        switch (commands[i]) {
            case Forward:
                rover = moveForward(rover);
                break;
            case Backward:
                rover = moveBackward(rover);
                break;
            case Left:
                rover.direction = rotateLeft(rover.direction);
                break;
            case Right:
                rover.direction = rotateRight(rover.direction);
                break;
        }
    }

    return adjustRoverPosition(rover, mars);
};

const moveForward = ({ position, direction }: Rover): Rover => {
    let posX = position.x;
    let posY = position.y;

    switch (direction) {
        case North:
            posY = position.y + 1;
            break;
        case South:
            posY = position.y - 1;
            break;
        case West:
            posX = position.x - 1;
            break;
        case East:
            posX = position.x + 1;
            break;
    }

    return rover(posX, posY, direction);
};

const moveBackward = ({ position, direction }: Rover) => {
    let posX = position.x;
    let posY = position.y;

    switch (direction) {
        case North:
            posY = position.y -= 1;
            break;
        case South:
            posY = position.y += 1;
            break;
        case West:
            posX = position.x += 1;
            break;
        case East:
            posX = position.x -= 1;
            break;
    }

    return rover(posX, posY, direction);
};

const rotateLeft = (roverDirection: Direction) => {
    return RotateLeft[roverDirection];
};

const rotateRight = (roverDirection: Direction): Direction => {
    return RotateRight[roverDirection];
};

const adjustRoverPosition = (
    { position, direction }: Rover,
    mars: Mars,
): Rover => {
    let adjustPosition = position;

    if (adjustPosition.x >= mars.rows) {
        adjustPosition.x = 0;
    }
    if (adjustPosition.x < 0) {
        adjustPosition.x = mars.rows - 1;
    }
    if (adjustPosition.y >= mars.cols) {
        adjustPosition.y = 0;
    }
    if (adjustPosition.y < 0) {
        adjustPosition.y = mars.cols - 1;
    }

    return rover(adjustPosition.x, adjustPosition.y, direction);
};

const RotateLeft: Record<string, Direction> = {
    N: West,
    W: South,
    S: East,
    E: North,
};

const RotateRight: Record<string, Direction> = {
    N: East,
    E: South,
    S: West,
    W: North,
};
