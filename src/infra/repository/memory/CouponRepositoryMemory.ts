import CouponRepository from "../../../domain/repository/CouponRepository";
import Coupon from "../../../domain/entity/Coupon";

export default class CouponRepositoryMemory implements CouponRepository {
    coupons: Coupon[];

    constructor() {
        this.coupons = [
            new Coupon("COUPON20", 20),
            new Coupon("COUPONEXPIRED", 20, new Date("2020-01-01T10:00:00"))
        ]
    }
    getByCode(code: string): Coupon | undefined {
        return this.coupons.find(coupon => coupon.code === code);
    }

}