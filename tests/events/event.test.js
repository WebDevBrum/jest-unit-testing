const { InvalidEventNameError } = require("../../js/error-handling/exceptions");
const { Event, getTagLine, createEvent } = require("../../js/events/event");

test("Return sold out tagline when no tickets are left", () => {
  const event = new Event(1, "Summer BBQ", 40.0, 100, 0);
  const tagline = getTagLine(event, 10, true);

  expect(tagline).toBe("Event Sold Out!");
});

describe("createEvent", () => {
  test("Throws error when name is not a string", () => {
    // expect(() => createEvent(1, 2, 3, 4, 5)).toThrow();
    // expect(() => createEvent(1, 2, 3, 4, 5)).toThrow(/Event name/);
    // expect(() => createEvent(1, 2, 3, 4, 5)).toThrow(InvalidEventNameError);
    expect(() => createEvent(1, 2, 3, 4, 5)).toThrow(
      new InvalidEventNameError("Event name cannot exceed 200 characters")
    );
  });

  test("Throws error whwn name exceeds limit", () => {
    const name = "longEventName".repeat(20).substring(0, 201);

    expect(() => createEvent(name, 2, 3, 4, 5)).toThrow(
      new InvalidEventNameError("Event name cannot exceed 200 characters")
    );
  });
});
