import CouponRepository from "../../domain/repository/CouponRepository";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import Order from "../../domain/entity/Order";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";

export default class PlaceOrder {
    constructor(readonly itemRepository: ItemRepository, readonly orderRepository: OrderRepository, readonly couponRepository: CouponRepository) {
    }

    execute(input: PlaceOrderInput): PlaceOrderOutput {
        const sequence = this.orderRepository.count() + 1;
        const order = new Order(input.cpf, input.issueDate, sequence);
        for (const orderItem of input.orderItems){
            const item = this.itemRepository.getById(orderItem.idItem);
            if(!item) throw new Error('Item not found');
            order.addItem(item, orderItem.quantity);
        }
        if (input.coupon) {
            const coupon = this.couponRepository.getByCode(input.coupon);
            if (coupon) {
                order.addCoupon(coupon);   
            }
        }
        this.orderRepository.save(order);
        const output = new PlaceOrderOutput(order.code.value, order.getTotal());
        return output;
    }
}