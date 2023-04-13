import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {
    orders: Order[];
    constructor() {
        this.orders =[];
    }

    async count(): Promise<number> {
        return this.orders.length;
    }

    async save(order: Order): Promise<void> {
        this.orders.push(order);
    }
}