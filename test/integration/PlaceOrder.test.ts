import { CouponRepositoryMemory } from "../../src/infra/repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMamory";
import { OrdemRepositoryMemory } from "../../src/infra/repository/memory/OrderRepositoryMamory";
import PlaceOrder from "../../src/application/use-case/PlaceOrder";
import PlaceOrderInput from "../../src/application/use-case/PlaceOrderInput";

test("Should to create a order", function () {
    const itemRepository = new ItemRepositoryMemory();
    const orderRepository = new OrdemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
    const orderItems = [ { idItem: 1, quantity: 1}, { idItem: 2, quantity: 1}, { idItem: 3, quantity: 3} ];
    const input = new PlaceOrderInput("935.411.347-80", orderItems);
    const output = placeOrder.execute(input);
    expect(output.total).toBe(6090);
})

test("Should to create a order wiht coupon", function () {
    const itemRepository = new ItemRepositoryMemory();
    const orderRepository = new OrdemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
    const orderItems = [ { idItem: 1, quantity: 1}, { idItem: 2, quantity: 1}, { idItem: 3, quantity: 3} ];
    const input = new PlaceOrderInput("935.411.347-80", orderItems, "COUPON20");
    const output = placeOrder.execute(input);
    expect(output.total).toBe(4872);
})