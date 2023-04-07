import Coupon from "../src/Coupon";

test('Should to generate Coupon', function () {
    const expireIn = new Date();
    const coupon = new Coupon('CODE', 20);
    expect(coupon.isExpired()).toBeFalsy();
});

test('Should to generate Coupon, and calculate discount', function () {
    const expireIn = new Date();
    const coupon = new Coupon('CODE', 20, expireIn);
    const discount = coupon.calculateDiscount(1000);
    expect(coupon.isExpired()).toBeFalsy();
});

test('Should Coupon is expired with date yesteday, without today in isExpired', function () {
    const yesteday = new Date();
    yesteday.setDate(yesteday.getDate() - 1);
    const coupon = new Coupon('CODE', 20, yesteday);
    expect(coupon.isExpired()).toBeTruthy();
});


test('Should Coupon is expired, with today in isExpired', function () {
    const today = new Date();
    const coupon = new Coupon('CODE', 20, today);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(coupon.isExpired(tomorrow)).toBeTruthy();
});
