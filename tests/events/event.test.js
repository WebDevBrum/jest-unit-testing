const { Event, getTagLine } = require("../../js/events/event");

test("Return sold out tagline when no tickets are left", () => {
  const event = new Event(1, "Summer BBQ", 40.0, 100, 0);
  const tagline = getTagLine(event, 10, true);

  expect(tagline).toBe("Event Sold Out!");
});
