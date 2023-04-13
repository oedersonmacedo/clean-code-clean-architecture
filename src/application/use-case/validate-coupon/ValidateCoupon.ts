import CouponRepository from "../../../domain/repository/CouponRepository";

export default class ValidateCoupon {
    constructor(readonly couponRepository: CouponRepository) {
    }

    execute(codeCoupon: string): boolean {
        const coupon = this.couponRepository.getByCode(codeCoupon);
        if (!coupon) return false;
        return !coupon.isExpired();
    }
}