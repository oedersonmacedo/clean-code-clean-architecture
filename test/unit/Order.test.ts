import Coupon from "../../src/domain/entity/Coupon";
import Dimension from "../../src/domain/entity/Dimension";
import Item from "../../src/domain/entity/Item";
import Order from "../../src/domain/entity/Order";

test('Should not to generate Order with invalid Cpf', function () {
    expect(() => new Order('123.456.789-99')).toThrow(new Error('invalid CPF'));
});

test('Should to create an order with three items', function () {
    const order = new Order('111.444.777-35');
    order.addItem(new Item(1, 'example 1', 'category 1', 1000), 2);
    order.addItem(new Item(2, 'example 2', 'category 1', 5000), 3);
    order.addItem(new Item(3, 'example 3', 'category 2', 30), 4);
    expect(order.orderItems.length).toBe(3);
    expect(order.getTotal()).toBe(17120);
});

test('Should to create an order with discount coupon', function () {
    const order = new Order('111.444.777-35');
    order.addItem(new Item(1, 'example 1', 'category 1', 1000), 2);
    order.addItem(new Item(2, 'example 2', 'category 1', 5000), 3);
    order.addItem(new Item(3, 'example 3', 'category 2', 30), 4);
    const coupon = new Coupon('COUPON20', 20,  new Date());
    order.addCoupon(coupon);

    expect(order.getTotal()).toBe(13696);
});

test('Should to create an order with discount coupon expired', function () {
    const order = new Order('111.444.777-35');
    order.addItem(new Item(1, 'example 1', 'category 1', 1000), 2);
    order.addItem(new Item(2, 'example 2', 'category 1', 5000), 3);
    order.addItem(new Item(3, 'example 3', 'category 2', 30), 4);
    const coupon = new Coupon('COUPON20', 20,  new Date('2020-01-01T00:00:00'));
    order.addCoupon(coupon);

    expect(order.getTotal()).toBe(17120);
});

test('Should to create an order with three items and freight', function () {
    const order = new Order("935.411.347-80");
	order.addItem(new Item(1, "example 1", "category", 1000, new Dimension(100, 30, 10), 3), 1);
	order.addItem(new Item(2, "example 2", "category", 5000, new Dimension(100, 50, 50), 20), 1);
	order.addItem(new Item(3, "example 3", "category", 30, new Dimension(10, 10, 10), 1), 3);
	const total = order.getTotal();
	expect(total).toBe(6350);
});

test('Should to create an order with minimum value of freight', function () {
    const order = new Order("935.411.347-80");
	order.addItem(new Item(1, "example 3", "category", 30, new Dimension(10, 10, 0.9), 1), 1);
	const total = order.getTotal();
	expect(total).toBe(40);
});

test('Should to create an order calculating the code', function () {
    const order = new Order('111.444.777-35',new Date("2023-04-01T10:00:00"), 1);
    order.addItem(new Item(1, 'example 1', 'category 1', 1000), 2);
    order.addItem(new Item(2, 'example 2', 'category 1', 5000), 3);
    order.addItem(new Item(3, 'example 3', 'category 2', 30), 4);

    expect(order.code.value).toBe("202300000001");
});