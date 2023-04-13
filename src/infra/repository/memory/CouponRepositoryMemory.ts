import CouponRepository from "../../../domain/repository/CouponRepository";
import Coupon from "../../../domain/entity/Coupon";

export class CouponRepositoryMemory implements CouponRepository {
    coupons: Coupon[];

    constructor() {
        this.coupons = [
            new Coupon("COUPON20", 20)
        ]
    }
    getByCode(code: string): Coupon | undefined {
        return this.coupons.find(coupon => coupon.code === code);
    }

}