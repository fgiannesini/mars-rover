import { Command } from "./enums/command";
import { Direction } from "./enums/direction";
import { RotateLeft } from "./records/rotateLeft";
import { RotateRight } from "./records/rotateRight";
import { Rover } from "./types/rover";

const { North, West, South, East } = Direction;
const { Left, Right, Forward, Backward } = Command;

export const rover = (x: number, y: number, direction: Direction): Rover => {
    return { position: { x, y }, direction };
};

export const getRoverbyCommands = (
    rover: Rover,
    commands: Command[],
): Rover => {
    return commands.reduce((rover, command) => {
        switch (command) {
            case Forward:
                return moveForward(rover);
            case Backward:
                return moveBackward(rover);
            case Left:
                return rotateLeft(rover);
            case Right:
                return rotateRight(rover);
        }
    }, rover);
};

export const moveForward = ({ position, direction }: Rover): Rover => {
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

export const moveBackward = ({ position, direction }: Rover) => {
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

export const rotateLeft = ({ position, direction }: Rover): Rover => {
    return rover(position.x, position.y, RotateLeft[direction]);
};

export const rotateRight = ({ position, direction }: Rover): Rover => {
    return rover(position.x, position.y, RotateRight[direction]);
};
