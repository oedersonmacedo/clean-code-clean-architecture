import CouponRepository from "../../../domain/repository/CouponRepository";
import ItemRepository from "../../../domain/repository/ItemRepository";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Order from "../../../domain/entity/Order";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";

export default class PlaceOrder {
    itemRepository: ItemRepository;
    orderRepository: OrderRepository;
    couponRepository: CouponRepository;

    constructor(repositoryFactory: RepositoryFactory) {
        this.itemRepository = repositoryFactory.createItemRepository();
        this.orderRepository = repositoryFactory.createOrderRepository();
        this.couponRepository = repositoryFactory.createCouponRepository();
    }

    async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        const sequence = await this.orderRepository.count() + 1;
        const order = new Order(input.cpf, input.issueDate, sequence);
        for (const orderItem of input.orderItems){
            const item = await this.itemRepository.getById(orderItem.idItem);
            if(!item) throw new Error('Item not found');
            order.addItem(item, orderItem.quantity);
        }
        if (input.coupon) {
            const coupon = await this.couponRepository.getByCode(input.coupon);
            if (coupon) {
                order.addCoupon(coupon);   
            }
        }
        await this.orderRepository.save(order);
        const output = new PlaceOrderOutput(order.code.value, order.getTotal());
        return output;
    }
}