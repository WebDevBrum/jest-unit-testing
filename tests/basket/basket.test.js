const basket = require("../../js/basket/basket");
const { Event } = require("../../js/events/event");
const { BasketItem } = require("../../js/basket/basketitem");
const { User } = require("../../js/users/users.js");

let events = [];
let items = [];

describe("calculateTotal", () => {
  beforeEach(() => {
    events = [
      new Event(1, "A Night At The Proms", 2500.0, 2500, 2500),
      new Event(2, "Taylor Swift", 50.0, 5500, 2500),
      new Event(3, "Rage Against The Machine", 35.0, 2500, 2500),
    ];

    items = [
      new BasketItem(events[0], 1),
      new BasketItem(events[1], 4),
      new BasketItem(events[2], 2),
    ];
  });
  test("Test calculates total basket price when no discount applied", () => {
    const total = basket.calculateTotal(items);

    expect(total).toBeCloseTo(2770.0, 2);
  });

  test("Test calculates total basket price with discount", () => {
    const total = basket.calculateTotal(items, 800);

    expect(total).toBeCloseTo(1970.0, 2);
  });
});

describe("showAdverts", () => {
  test("Does not show adverts for premium users", () => {
    let user = new User(1, "Test User");
    user.isPremium = true;

    expect(basket.showAdverts(user)).toBe(false);
  });

  test("Show adverts for non-premium users", () => {
    let user = new User(1, "Test User");

    expect(basket.showAdverts(user)).toBe(true);
  });
});

describe("serializeBasketItemstoJson", () => {
  test("Basket items are serialized correctly", () => {
    const events = [
      new Event(1, "A night at the proms", 2500.0, 2500, 2500),
      new Event(3, "Raging machine", 35.0, 2500, 2500),
    ];

    const items = [new BasketItem(events[0], 1), new BasketItem(events[1], 2)];

    itemsSerializedToJson = [
      {
        event: {
          id: 1,
          name: "A night at the proms",
          ticketPrice: 2500.0,
          totalTickets: 2500,
          ticketsRemaining: 2500,
        },
        ticketCount: 1,
      },
      {
        event: {
          id: 3,
          name: "Raging machine",
          ticketPrice: 35.0,
          totalTickets: 2500,
          ticketsRemaining: 2500,
        },
        ticketCount: 2,
      },
    ];

    const serialzedItems = basket.serializeBasketItemsToJson(items);

    expect(serialzedItems).toEqual(itemsSerializedToJson);
  });
});

describe("search basket", () => {
  test("Only returns events that match the search query", () => {
    const events = [
      new Event(1, "The movie premier", 2500.0, 2500, 2500),
      new Event(2, "Rock n roll night", 50.0, 5500, 2500),
      new Event(3, "The raging machine", 35.0, 2500, 2500),
    ];

    const items = [
      new BasketItem(events[0], 1),
      new BasketItem(events[1], 4),
      new BasketItem(events[2], 2),
    ];

    const foundItems = basket.searchBasket(items, "The");

    expect(foundItems).toContain(items[0]);
    expect(foundItems).toContain(items[2]);

    expect(foundItems).not.toContain(items[1]);
  });
});

describe("getBasketItem", () => {
  let events = [];
  let items = [];

  beforeEach(() => {
    events = [
      new Event(1, "A night at the proms", 2500.0, 2500, 2500),
      new Event(3, "Raging machine", 35.0, 2500, 2500),
    ];

    items = [new BasketItem(events[0], 1), new BasketItem(events[1], 2)];
  });

  test("Returns truthy if event exists in the basket", () => {
    const basketItem = basket.getBasketItem(items, events[0]);

    expect(basketItem).toBeTruthy();
    expect(basketItem).not.toBeNull(); // alternative if specific
  });

  test("Returns falsy if event does not exist in the basket", () => {
    const basketItem = basket.getBasketItem(
      items,
      new Event("Monster party", 23, 25, 25)
    );
    expect(basketItem).toBeFalsy();
    expect(basketItem).toBeNull(); // alternative if specific
  });
});
