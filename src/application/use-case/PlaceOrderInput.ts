export default class PlaceOrderInput {
    constructor(readonly cpf: string, readonly orderItem: {idItem: number, quantity: number}[], readonly coupon?: string) {
    }
}