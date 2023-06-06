import { Command } from "./enums/command";
import { Direction } from "./enums/direction";

export type Rover = { x: number; y: number; direction: Direction };
//type Position = { x: number; y: number };

const { North, West, South, East } = Direction;
const { Left, Right, Forward, Backward } = Command;

export const rover = (x: number, y: number, direction: Direction): Rover => {
    return { x, y, direction };
};

export const execute = (rover: Rover, commands: Command[]): Rover => {
    let currentPosition = rover;

    const toto = commands.map((command: Command) => {
        switch (command) {
            case Forward:
                currentPosition = moveForward(currentPosition);
                break;
            case Backward:
                currentPosition = moveBackward(currentPosition);
                break;
            case Left:
                currentPosition.direction = rotateLeft(
                    currentPosition.direction,
                );
                break;
            case Right:
                currentPosition.direction = rotateRight(
                    currentPosition.direction,
                );
                break;
        }
    });

    console.log("TOTO", toto);

    return currentPosition;
    // const newRoverPosition = commands.reduce((currentPosition, command) => {
    //     switch (command) {
    //         case Forward:
    //             currentPosition = moveForward(currentPosition);
    //         case Backward:
    //             currentPosition = moveBackward(currentPosition);
    //         case Left:
    //             currentPosition.direction = rotateLeft(currentPosition);
    //         case Right:
    //             currentPosition.direction = rotateRight(currentPosition);
    //     }
    // }, rover);

    // console.log("nNEW", newRoverPosition);
    // const position: Position = {
    //     x: 1,
    //     y: 1,
    // };

    // return { position, direction: North };

    // //return newRoverPosition;
};

const moveForward = (currentPosition: Rover): Rover => {
    switch (currentPosition.direction) {
        case North:
            currentPosition.y += 1;
            break;
        case South:
            currentPosition.y -= 1;
            break;
        case West:
            currentPosition.x -= 1;
            break;
        case East:
            currentPosition.x += 1;
            break;
    }

    return currentPosition;
};

const moveBackward = (currentPosition: Rover) => {
    switch (currentPosition.direction) {
        case North:
            currentPosition.y -= 1;
            break;
        case South:
            currentPosition.y += 1;
            break;
        case West:
            currentPosition.x += 1;
            break;
        case East:
            currentPosition.x -= 1;
            break;
    }

    return currentPosition;
};

const rotateLeft = (roverDirection: Direction) => {
    const index = directions.findIndex(
        (direction) => direction === roverDirection,
    );

    if (index === directions.length - 1) {
        return directions[0];
    }

    return directions[index + 1];
};

const rotateRight = (roverDirection: Direction) => {
    const index = directions.findIndex(
        (direction) => direction === roverDirection,
    );

    if (index < 1) {
        return directions[3];
    }

    return directions[index - 1];
};

const directions: Direction[] = [North, West, South, East];
