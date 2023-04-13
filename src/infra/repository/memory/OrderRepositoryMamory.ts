import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export class OrdemRepositoryMemory implements OrderRepository {
    order: Order[];
    constructor() {
        this.order =[];
    }

    save(order: Order): void {
        this.order.push(order);
    }

}