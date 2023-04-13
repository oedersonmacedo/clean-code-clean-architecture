import Order from "../entity/Order";

export default interface OrderRepository {
    count(): number;
    save(order: Order): void;
}