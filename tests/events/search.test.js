const { Event } = require("../../js/events/event");
const { getEvents } = require("../../js/events/search");

describe("getEvents", () => {
  test("Returns events with ticket prices less than 30", () => {
    const searchPredicateMock = jest.fn((e) => e.ticketPrice < 30);

    const expectedEvent1 = new Event(1, "Pop goes punk", 20, 1000, 100);
    const expectedEvent2 = new Event(4, "Party", 10, 1000, 100);
    const expectedEvent3 = new Event(7, "Moshing", 29.99, 1000, 100);

    const events = [
      expectedEvent1,
      new Event(2, "music", 70, 1000, 1000),
      new Event(1, "glasto", 250, 1000, 1000),
      expectedEvent2,
      new Event(1, "radio", 50, 1000, 1000),
      new Event(1, "jump", 30.01, 1000, 1000),
      expectedEvent3,
    ];

    const filterResults = getEvents(events, searchPredicateMock);

    expect(filterResults).toEqual([
      expectedEvent1,
      expectedEvent2,
      expectedEvent3,
    ]);

    expect(searchPredicateMock).toHaveBeenCalled();

    expect(searchPredicateMock.mock.calls.length).toBe(7);

    expect(searchPredicateMock.mock.calls[0][0]).toBe(events[0]);
    expect(searchPredicateMock.mock.calls[1][0]).toBe(events[1]);
    expect(searchPredicateMock.mock.calls[2][0]).toBe(events[2]);
    expect(searchPredicateMock.mock.calls[3][0]).toBe(events[3]);
    expect(searchPredicateMock.mock.calls[4][0]).toBe(events[4]);
    expect(searchPredicateMock.mock.calls[5][0]).toBe(events[5]);
    expect(searchPredicateMock.mock.calls[6][0]).toBe(events[6]);
  });
});
