import { MarsRover, Direction } from './MarsRover';

describe('MarsRover', () => {
    it('should execute commands and update position correctly', () => {
        const rover = new MarsRover(0, 0, Direction.North);
        rover.executeCommands('MMRMMRLLM');

        const currentPosition = rover.getCurrentPosition();
        expect(currentPosition).toEqual({ x: 2, y: 3 });
    });

    it('should execute commands and update direction correctly', () => {
        const rover = new MarsRover(0, 0, Direction.North);
        rover.executeCommands('MMRMMRLM');

        const currentDirection = rover.getCurrentDirection();
        expect(currentDirection).toEqual(Direction.East);
    });
});