import ValidateCoupon from "../../../../src/application/use-case/validate-coupon/ValidateCoupon";
import CouponRepositoryMemory from "../../../../src/infra/repository/memory/CouponRepositoryMemory"

test("Should to validate a discount coupon", async function () {
    const couponRepository = new CouponRepositoryMemory();
    const validate = new ValidateCoupon(couponRepository);
    const isValid = await validate.execute("COUPON20");
    expect(isValid).toBeTruthy();
})

test("Should to validate coupon not exists", async function () {
    const couponRepository = new CouponRepositoryMemory();
    const validate = new ValidateCoupon(couponRepository);
    const isValid = await validate.execute("COUPONNOTEXISTS");
    expect(isValid).toBeFalsy();
})

test("Should to validate coupon expired", async function () {
    const couponRepository = new CouponRepositoryMemory();
    const validate = new ValidateCoupon(couponRepository);
    const isValid = await validate.execute("COUPONEXPIRED");
    expect(isValid).toBeFalsy();
})