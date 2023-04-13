import CouponRepository from "../../../domain/repository/CouponRepository";

export default class ValidateCoupon {
    constructor(readonly couponRepository: CouponRepository) {
    }

    async execute(codeCoupon: string): Promise<boolean> {
        const coupon = await this.couponRepository.getByCode(codeCoupon);
        if (!coupon) return false;
        return !coupon.isExpired();
    }
}