import { rover } from "./rover";
import { Mars } from "./types/mars";
import { Rover } from "./types/rover";

export const mars = ({ rows, cols }: Mars) => {
    return { rows, cols };
};

export const handleEdges = (
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
