import { Command } from "./enums/command";
import { handleEdges } from "./mars";
import { getRoverbyCommands } from "./rover";
import { Mars } from "./types/mars";
import { Rover } from "./types/rover";

export const execute = (
    mars: Mars,
    initRover: Rover,
    commands: Command[],
): Rover => {
    const newRover = getRoverbyCommands(initRover, commands);

    return handleEdges(newRover, mars);
};
