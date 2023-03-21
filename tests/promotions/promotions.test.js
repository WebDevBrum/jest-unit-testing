const { generateReferralCode } = require("../../js/promotions/promotions");

describe("generate referral code", () => {
  test("Referral code contains userid", () => {
    const userId = "1234";
    const referralCode = generateReferralCode(userId);

    expect(referralCode).toContain(userId);
    expect(referralCode).toMatch(userId);
  });

  test("Referral code has the correct format", () => {
    const userId = "1234";
    const referralCode = generateReferralCode(userId);

    expect(referralCode).toMatch(/#FRIEND-#\d+-#1234/);
  });

  test("Returns correct referral code", () => {
    //Mocks the global math.random function
    const randomMock = jest.spyOn(global.Math, "random").mockReturnValue(76567);

    const referralCode = generateReferralCode(235);

    expect(referralCode).toBe(`#FRIEND-#567-#235`);

    expect(randomMock).toHaveBeenCalled(); // can also add a count for the number of calls ?
  });
});
