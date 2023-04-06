export default class Coupon {
    constructor(readonly code: string, readonly percentage: number, readonly expireIn: Date) {
        validateExpireIn(expireIn);
    }
}

function validateExpireIn(expireIn: Date) {
    expireIn = new Date(expireIn.getFullYear(), expireIn.getMonth(), expireIn.getDate(), 0, 0, 0, 0);
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
    if(expireIn < today) throw new Error('Discount coupon has already expired');
}