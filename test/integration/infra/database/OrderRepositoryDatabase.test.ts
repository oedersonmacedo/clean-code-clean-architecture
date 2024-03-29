import Coupon from "../../../../src/domain/entity/Coupon";
import Dimension from "../../../../src/domain/entity/Dimension";
import Item from "../../../../src/domain/entity/Item";
import Order from "../../../../src/domain/entity/Order";
import Connection from "../../../../src/infra/database/Connection";
import PostgreSQLConnectionAdapter from "../../../../src/infra/database/PostgreSQLConnectionAdapter";
import OrderRepositoryDatabase from "../../../../src/infra/repository/database/OrderRepositoryDatabase";

let connection: Connection;

beforeEach(function () {
	connection = new PostgreSQLConnectionAdapter();
});

test.skip("Should to save a order",async function () {
    const orderRepository = new OrderRepositoryDatabase(connection);
	await orderRepository.clean();
	const order = new Order("935.411.347-80", new Date("2021-03-01T10:00:00"), 1);
	order.addItem(new Item(1, "Guitarra", "Instrumentos Musicais", 1000, new Dimension(100, 30, 10), 3), 1);
	order.addItem(new Item(2, "Amplificador", "Instrumentos Musicais", 5000, new Dimension(100, 50, 50), 20), 1);
	order.addItem(new Item(3, "Cabo", "Instrumentos Musicais", 30, new Dimension(10, 10, 10), 1), 3);
	const coupon = new Coupon("VALE20", 20);
	order.addCoupon(coupon);
	await orderRepository.save(order);
	const count = await orderRepository.count();
	expect(count).toBe(1);
	const savedOrder = await orderRepository.getByCode("202100000001");
	expect(savedOrder.code.value).toBe("202100000001");
	expect(savedOrder.getTotal()).toBe(5152);
	expect(savedOrder.freight.getTotal()).toBe(280);
});

test.skip("Should to list orders", async function () {
	const orderRepository = new OrderRepositoryDatabase(connection);
	await orderRepository.clean();
	const order = new Order("935.411.347-80", new Date("2021-03-01T10:00:00"), 1);
	order.addItem(new Item(1, "Guitarra", "Instrumentos Musicais", 1000, new Dimension(100, 30, 10), 3), 1);
	order.addItem(new Item(2, "Amplificador", "Instrumentos Musicais", 5000, new Dimension(100, 50, 50), 20), 1);
	order.addItem(new Item(3, "Cabo", "Instrumentos Musicais", 30, new Dimension(10, 10, 10), 1), 3);
	const coupon = new Coupon("VALE20", 20);
	order.addCoupon(coupon);
	await orderRepository.save(order);
	await orderRepository.save(order);
	await orderRepository.save(order);
	const count = await orderRepository.count();
	expect(count).toBe(3);
	const savedOrders = await orderRepository.getAll();
	expect(savedOrders).toHaveLength(3);
	const [,, savedOrder3] = savedOrders;
	expect(savedOrder3.getTotal()).toBe(5152);
});

afterEach(async function () {
	await connection.close();
});
