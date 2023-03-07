import Coupon from "../src/Coupon";
import Item from "../src/Item";
import Order from "../src/Order"

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
    order.addCoupon(coupon)

    expect(order.getTotal()).toBe(13696);
});