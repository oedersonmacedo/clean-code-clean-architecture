import Order from "../entity/Order";

export default interface OrderRepository {
    count(): Promise<number>;
    save(order: Order): Promise<void>;
    getByCode(code: string): Promise<Order>;
    count(): Promise<number>;
	getAll(): Promise<Order[]>;
    clean(): Promise<void>;
}