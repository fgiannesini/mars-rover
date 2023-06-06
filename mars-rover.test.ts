import { Direction } from "./enums/direction";
import { Command } from "./enums/command";
import { rover, execute, Rover } from "./mars-rover";

const { North, West, South, East } = Direction;
const { Left, Right, Forward, Backward } = Command;

describe("Rover", () => {
    it("should return a initial state for a rover", () => {
        // Given
        const initialState = rover(1, 1, North);

        // When
        // Then
        expect(initialState).toEqual({
            x: 1,
            y: 1,
            direction: North,
        });
    });
});

describe("Commands", () => {
    it("should rotate left", () => {
        // Given
        const initialState = rover(2, 2, East);
        const commands: Command[] = [Left];

        // When
        const newRoverState = execute(initialState, commands);

        // Then
        expect(newRoverState).toEqual({
            x: 2,
            y: 2,
            direction: North,
        });
    });

    it("should rotate right", () => {
        // Given
        const initialState = rover(1, 1, North);
        const commands: Command[] = [Right];

        // When
        const newRoverState = execute(initialState, commands);

        // Then
        expect(newRoverState).toEqual({
            x: 1,
            y: 1,
            direction: East,
        });
    });

    it("should move forward", () => {
        // Given
        const initialState = rover(2, 2, East);
        const commands: Command[] = [Forward];

        // When
        const newRoverState = execute(initialState, commands);

        // Then
        expect(newRoverState).toEqual({
            x: 3,
            y: 2,
            direction: East,
        });
    });

    it("should move backward", () => {
        // Given
        const initialState = rover(2, 2, East);
        const commands: Command[] = [Backward];

        // When
        const newRoverState = execute(initialState, commands);

        // Then
        expect(newRoverState).toEqual({
            x: 1,
            y: 2,
            direction: East,
        });
    });

    it("should take an array of commands", () => {
        // Given
        const initialState = rover(2, 2, East);
        const commands: Command[] = [Forward, Forward, Left, Backward];

        // When
        const newRoverState = execute(initialState, commands);

        // Then
        expect(newRoverState).toEqual({
            x: 4,
            y: 1,
            direction: North,
        });
    });
});

describe("Move Rover", () => {
    it.each([
        [
            { x: 1, y: 1, direction: North },
            { x: 1, y: 2, direction: North },
        ],
        [
            { x: 1, y: 1, direction: South },
            { x: 1, y: 0, direction: South },
        ],
        [
            { x: 1, y: 1, direction: West },
            { x: 0, y: 1, direction: West },
        ],
        [
            { x: 1, y: 1, direction: East },
            { x: 2, y: 1, direction: East },
        ],
    ])(
        "Should return a rover with new state when rover go forward",
        (initialState: Rover, expectedState: Rover) => {
            // Given
            const commands: Command[] = [Forward];

            //When
            const newRoverState = execute(initialState, commands);
            //Then
            expect(newRoverState).toEqual(expectedState);
        },
    );

    it.each([
        [
            { x: 2, y: 2, direction: North },
            { x: 2, y: 1, direction: North },
        ],
        [
            { x: 2, y: 2, direction: South },
            { x: 2, y: 3, direction: South },
        ],
        [
            { x: 2, y: 2, direction: West },
            { x: 3, y: 2, direction: West },
        ],
        [
            { x: 2, y: 2, direction: East },
            { x: 1, y: 2, direction: East },
        ],
    ])(
        "Should return a rover with new state when rover go backward",
        (initialState: Rover, expectedState: Rover) => {
            // Given
            const commands: Command[] = [Backward];

            //When
            const newRoverState = execute(initialState, commands);
            //Then
            expect(newRoverState).toEqual(expectedState);
        },
    );

    it.each([
        [
            { x: 2, y: 2, direction: North },
            { x: 2, y: 2, direction: West },
        ],
        [
            { x: 2, y: 2, direction: South },
            { x: 2, y: 2, direction: East },
        ],
        [
            { x: 2, y: 2, direction: West },
            { x: 2, y: 2, direction: South },
        ],
        [
            { x: 2, y: 2, direction: East },
            { x: 2, y: 2, direction: North },
        ],
    ])(
        "Should return a rover with new state when rover rotate left",
        (initialState: Rover, expectedState: Rover) => {
            // Given
            const commands: Command[] = [Left];

            //When
            const newRoverState = execute(initialState, commands);
            //Then
            expect(newRoverState).toEqual(expectedState);
        },
    );

    it.each([
        [
            { x: 2, y: 2, direction: North },
            { x: 2, y: 2, direction: East },
        ],
        [
            { x: 2, y: 2, direction: South },
            { x: 2, y: 2, direction: West },
        ],
        [
            { x: 2, y: 2, direction: West },
            { x: 2, y: 2, direction: North },
        ],
        [
            { x: 2, y: 2, direction: East },
            { x: 2, y: 2, direction: South },
        ],
    ])(
        "Should return a rover with new state when rover rotate right",
        (initialState: Rover, expectedState: Rover) => {
            // Given
            const commands: Command[] = [Right];

            //When
            const newRoverState = execute(initialState, commands);
            //Then
            expect(newRoverState).toEqual(expectedState);
        },
    );
});
