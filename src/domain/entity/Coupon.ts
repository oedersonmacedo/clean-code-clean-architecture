export default class Coupon {

    constructor(readonly code: string, readonly percentage: number, readonly expireIn?: Date) {
    }

    isExpired (today: Date = new Date()) {
        if (!this.expireIn) return false;
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
        return this.expireIn < today;
    }

    calculateDiscount(amount: number) {
        return (amount * this.percentage) / 100;
    }
}