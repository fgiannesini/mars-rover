import { Command } from "./enums/command";
import { Direction } from "./enums/direction";

export type Rover = { x: number; y: number; direction: Direction };
export type Mars = { rows: number; cols: number };

const { North, West, South, East } = Direction;
const { Left, Right, Forward, Backward } = Command;

export const rover = (x: number, y: number, direction: Direction): Rover => {
    return { x, y, direction };
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

const moveForward = (currentRover: Rover): Rover => {
    let posX = currentRover.x;
    let posY = currentRover.y;

    switch (currentRover.direction) {
        case North:
            posY = currentRover.y + 1;
            break;
        case South:
            posY = currentRover.y - 1;
            break;
        case West:
            posX = currentRover.x - 1;
            break;
        case East:
            posX = currentRover.x + 1;
            break;
    }

    return rover(posX, posY, currentRover.direction);
};

const moveBackward = (currentRover: Rover) => {
    let posX = currentRover.x;
    let posY = currentRover.y;

    switch (currentRover.direction) {
        case North:
            posY = currentRover.y -= 1;
            break;
        case South:
            posY = currentRover.y += 1;
            break;
        case West:
            posX = currentRover.x += 1;
            break;
        case East:
            posX = currentRover.x -= 1;
            break;
    }

    return rover(posX, posY, currentRover.direction);
};

const rotateLeft = (roverDirection: Direction) => {
    return RotateLeft[roverDirection];
};

const rotateRight = (roverDirection: Direction): Direction => {
    return RotateRight[roverDirection];
};

const adjustRoverPosition = (rover: Rover, mars: Mars): Rover => {
    let position = rover;

    if (position.x >= mars.rows) {
        position.x = 0;
    }
    if (position.x < 0) {
        position.x = mars.rows - 1;
    }
    if (position.y >= mars.cols) {
        position.y = 0;
    }
    if (position.y < 0) {
        position.y = mars.cols - 1;
    }

    return position;
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
