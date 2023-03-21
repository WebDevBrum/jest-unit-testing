const exchange = require("../../js/promotions/exchange/exchange");
const exchangeRateProvider = require("../../js/promotions/exchange/exchangeRateProvider");

describe("getExchangeRate", () => {
  test("Returns correct exchange rate for us dollars", (done) => {
    jest
      .spyOn(exchangeRateProvider, "callExchangeRateProvider")
      .mockResolvedValue(1.21);

    function callback(data) {
      try {
        expect(data.originalCurrency).toBe("GBP");
        expect(data.newCurrency).toBe("USD");
        expect(data.exchangeRate).toBeCloseTo(1.21);
        done();
      } catch (e) {
        done(e);
      }
    }

    exchange.getExchangeRate("USD", callback);
  });
});
