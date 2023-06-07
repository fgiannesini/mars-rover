import { Direction } from "./enums/direction";
import { Command } from "./enums/command";
import { rover, mars, execute, Rover } from "./mars-rover";

const { North, West, South, East } = Direction;
const { Left, Right, Forward, Backward } = Command;

describe("Rover", () => {
    it("should return a initial state for a rover", () => {
        // Given
        const initialState = rover(1, 1, North);

        // When
        // Then
        expect(initialState).toEqual({
            position: { x: 1, y: 1 },
            direction: North,
        });
    });
});

describe("Commands", () => {
    it("should rotate left", () => {
        // Given
        const initMars = mars({ rows: 5, cols: 5 });
        const initialState = rover(2, 2, East);
        const commands: Command[] = [Left];

        // When
        const newRoverState = execute(initMars, initialState, commands);

        // Then
        expect(newRoverState).toEqual({
            position: { x: 2, y: 2 },
            direction: North,
        });
    });

    it("should rotate right", () => {
        // Given
        const initMars = mars({ rows: 5, cols: 5 });
        const initialState = rover(1, 1, North);
        const commands: Command[] = [Right];

        // When
        const newRoverState = execute(initMars, initialState, commands);

        // Then
        expect(newRoverState).toEqual({
            position: { x: 1, y: 1 },
            direction: East,
        });
    });

    it("should move forward", () => {
        // Given
        const initMars = mars({ rows: 5, cols: 5 });
        const initialState = rover(2, 2, East);
        const commands: Command[] = [Forward];

        // When
        const newRoverState = execute(initMars, initialState, commands);

        // Then
        expect(newRoverState).toEqual({
            position: { x: 3, y: 2 },
            direction: East,
        });
    });

    it("should move backward", () => {
        // Given
        const initMars = mars({ rows: 5, cols: 5 });
        const initialState = rover(2, 2, East);
        const commands: Command[] = [Backward];

        // When
        const newRoverState = execute(initMars, initialState, commands);

        // Then
        expect(newRoverState).toEqual({
            position: { x: 1, y: 2 },
            direction: East,
        });
    });

    it("should take an array of commands", () => {
        // Given
        const initMars = mars({ rows: 5, cols: 5 });
        const initialState = rover(2, 2, East);
        const commands: Command[] = [Forward, Forward, Left, Backward];

        // When
        const newRoverState = execute(initMars, initialState, commands);

        // Then
        expect(newRoverState).toEqual({
            position: { x: 4, y: 1 },
            direction: North,
        });
    });
});

describe("Mars", () => {
    it("should return a initial state for Mars", () => {
        // Given
        const initMars = mars({ rows: 4, cols: 4 });

        // When
        // Then
        expect(initMars).toEqual({ rows: 4, cols: 4 });
    });
    it("should wrap around the edge for columns", () => {
        // Given
        const initMars = mars({ rows: 5, cols: 5 });
        const initialRover = rover(2, 2, East);
        const commands: Command[] = [Forward, Forward, Forward];

        // When
        const newRoverState = execute(initMars, initialRover, commands);

        // Then
        expect(newRoverState).toEqual({
            position: { x: 0, y: 2 },
            direction: East,
        });
    });
    it("should wrap around the edge when going columns 2", () => {
        // Given
        const initMars = mars({ rows: 5, cols: 5 });
        const initialRover = rover(0, 1, East);
        const commands: Command[] = [Backward];

        // When
        const newRoverState = execute(initMars, initialRover, commands);

        // Then
        expect(newRoverState).toEqual({
            position: { x: 4, y: 1 },
            direction: East,
        });
    });
    it("should wrap around the edge when going rows", () => {
        // Given
        const initMars = mars({ rows: 6, cols: 6 });
        const initialRover = rover(1, 5, North);
        const commands: Command[] = [Forward];

        // When
        const newRoverState = execute(initMars, initialRover, commands);

        // Then
        expect(newRoverState).toEqual({
            position: { x: 1, y: 0 },
            direction: North,
        });
    });
    it("should wrap around the edge when going rows 2", () => {
        // Given
        const initMars = mars({ rows: 6, cols: 6 });
        const initialRover = rover(2, 0, North);
        const commands: Command[] = [Backward];

        // When
        const newRoverState = execute(initMars, initialRover, commands);

        // Then
        expect(newRoverState).toEqual({
            position: { x: 2, y: 5 },
            direction: North,
        });
    });
    it("should have obstacle", () => {
        // Given
        const initMars = mars({ rows: 6, cols: 6 });
        const initialRover = rover(2, 0, North);
        const commands: Command[] = [Backward];

        // When
        const newRoverState = execute(initMars, initialRover, commands);

        // Then
        expect(newRoverState).toEqual({
            position: { x: 2, y: 5 },
            direction: North,
        });
    });
});

describe("Obstacle detection", () => {
    it("Should ", () => {});
});

describe("Move Rover", () => {
    it.each([
        [
            { position: { x: 1, y: 1 }, direction: North },
            { position: { x: 1, y: 2 }, direction: North },
        ],
        [
            { position: { x: 1, y: 1 }, direction: South },
            { position: { x: 1, y: 0 }, direction: South },
        ],
        [
            { position: { x: 1, y: 1 }, direction: West },
            { position: { x: 0, y: 1 }, direction: West },
        ],
        [
            { position: { x: 1, y: 1 }, direction: East },
            { position: { x: 2, y: 1 }, direction: East },
        ],
    ])(
        "Should return a rover with new state when rover go forward",
        (initialState: Rover, expectedState: Rover) => {
            // Given
            const initMars = mars({ rows: 5, cols: 5 });
            const commands: Command[] = [Forward];

            //When
            const newRoverState = execute(initMars, initialState, commands);
            //Then
            expect(newRoverState).toEqual(expectedState);
        },
    );

    it.each([
        [
            { position: { x: 2, y: 2 }, direction: North },
            { position: { x: 2, y: 1 }, direction: North },
        ],
        [
            { position: { x: 2, y: 2 }, direction: South },
            { position: { x: 2, y: 3 }, direction: South },
        ],
        [
            { position: { x: 2, y: 2 }, direction: West },
            { position: { x: 3, y: 2 }, direction: West },
        ],
        [
            { position: { x: 2, y: 2 }, direction: East },
            { position: { x: 1, y: 2 }, direction: East },
        ],
    ])(
        "Should return a rover with new state when rover go backward",
        (initialState: Rover, expectedState: Rover) => {
            // Given
            const initMars = mars({ rows: 5, cols: 5 });
            const commands: Command[] = [Backward];

            //When
            const newRoverState = execute(initMars, initialState, commands);
            //Then
            expect(newRoverState).toEqual(expectedState);
        },
    );

    it.each([
        [
            { position: { x: 2, y: 2 }, direction: North },
            { position: { x: 2, y: 2 }, direction: West },
        ],
        [
            { position: { x: 2, y: 2 }, direction: South },
            { position: { x: 2, y: 2 }, direction: East },
        ],
        [
            { position: { x: 2, y: 2 }, direction: West },
            { position: { x: 2, y: 2 }, direction: South },
        ],
        [
            { position: { x: 2, y: 2 }, direction: East },
            { position: { x: 2, y: 2 }, direction: North },
        ],
    ])(
        "Should return a rover with new state when rover rotate left",
        (initialState: Rover, expectedState: Rover) => {
            // Given
            const initMars = mars({ rows: 5, cols: 5 });
            const commands: Command[] = [Left];

            //When
            const newRoverState = execute(initMars, initialState, commands);
            //Then
            expect(newRoverState).toEqual(expectedState);
        },
    );

    it.each([
        [
            { position: { x: 2, y: 2 }, direction: North },
            { position: { x: 2, y: 2 }, direction: East },
        ],
        [
            { position: { x: 2, y: 2 }, direction: South },
            { position: { x: 2, y: 2 }, direction: West },
        ],
        [
            { position: { x: 2, y: 2 }, direction: West },
            { position: { x: 2, y: 2 }, direction: North },
        ],
        [
            { position: { x: 2, y: 2 }, direction: East },
            { position: { x: 2, y: 2 }, direction: South },
        ],
    ])(
        "Should return a rover with new state when rover rotate right",
        (initialState: Rover, expectedState: Rover) => {
            // Given
            const initMars = mars({ rows: 5, cols: 5 });
            const commands: Command[] = [Right];

            //When
            const newRoverState = execute(initMars, initialState, commands);
            //Then
            expect(newRoverState).toEqual(expectedState);
        },
    );
});
