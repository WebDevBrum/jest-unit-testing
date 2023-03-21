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
});
