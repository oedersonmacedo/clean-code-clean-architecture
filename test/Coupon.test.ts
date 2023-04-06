import Coupon from "../src/Coupon";

test('Should not to generate Coupon with date yesteday', function () {
    expect(() => {
        const yesteday = new Date();
        yesteday.setDate(yesteday.getDate() - 1);
        new Coupon('CODE', 20, yesteday);
    }).toThrow(new Error('Discount coupon has already expired'));
});

test('Should to generate Coupon', function () {
    const expireIn = new Date();
    const coupon = new Coupon('CODE', 20, expireIn);
    expect(coupon.code).toBe('CODE');
    expect(coupon.percentage).toBe(20);
    expect(coupon.expireIn).toBe(expireIn);
});