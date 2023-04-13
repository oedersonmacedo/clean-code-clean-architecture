import ValidateCoupon from "../../src/application/use-case/validate-coupon/ValidateCoupon";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory"

test("Should to validate a discount coupon", function () {
    const couponRepository = new CouponRepositoryMemory();
    const validate = new ValidateCoupon(couponRepository);
    const isValid = validate.execute("COUPON20");
    expect(isValid).toBeTruthy();
})

test("Should to validate coupon not exists", function () {
    const couponRepository = new CouponRepositoryMemory();
    const validate = new ValidateCoupon(couponRepository);
    const isValid = validate.execute("COUPONNOTEXISTS");
    expect(isValid).toBeFalsy();
})

test("Should to validate coupon expired", function () {
    const couponRepository = new CouponRepositoryMemory();
    const validate = new ValidateCoupon(couponRepository);
    const isValid = validate.execute("COUPONEXPIRED");
    expect(isValid).toBeFalsy();
})