const purchaseHistory = jest.createMockFromModule("../purchaseHistory");

function __getPurchaseHistory() {
  const response = {
    readyState: 4,
    onreadystatechange: null,
    response: {
      events: [
        {
          name: "Punk Goes Pop - 90s",
          tickets: 2,
          price: 40.0,
        },
        {
          name: "Adventures Live!",
          tickets: 5,
          price: 120.0,
        },
        {
          name: "Folk dance party!",
          tickets: 3,
          price: 75.0,
        },
      ],
    },
  };
  return response;
}

purchaseHistory.getPurchaseHistory = __getPurchaseHistory;

module.exports = purchaseHistory;
