import PlaceOrder from "../../src/application/use-case/place-order/PlaceOrder";
import CouponRepository from "../../src/domain/repository/CouponRepository";
import ItemRepository from "../../src/domain/repository/ItemRepository";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMamory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMamory";

let itemRepository: ItemRepository;
let orderRepository: OrderRepository;
let couponRepository: CouponRepository;

beforeEach(function () {
	itemRepository = new ItemRepositoryMemory();
	orderRepository = new OrderRepositoryMemory();
	couponRepository = new CouponRepositoryMemory();
});
test("Should to create a order", function () {
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
    const input = {
        cpf: "935.411.347-80",
        orderItems: [ 
            { idItem: 1, quantity: 1},
            { idItem: 2, quantity: 1},
            { idItem: 3, quantity: 3}
        ],
        issueDate: new Date("2023-04-13T10:00:00")
    };
    const output = placeOrder.execute(input);
    expect(output.total).toBe(6350);
})

test("Should to create a order with coupon", function () {
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
    const input = {
        cpf: "935.411.347-80",
        orderItems: [ 
            { idItem: 1, quantity: 1},
            { idItem: 2, quantity: 1},
            { idItem: 3, quantity: 3}
        ],
        coupon: "COUPON20",
        issueDate: new Date("2023-04-13T10:00:00")
    };
    const output = placeOrder.execute(input);
    expect(output.total).toBe(5132);
})

test("Should to create a order calculating a code", function () {
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
    const input = {
        cpf: "935.411.347-80",
        orderItems: [ 
            { idItem: 1, quantity: 1},
            { idItem: 2, quantity: 1},
            { idItem: 3, quantity: 3}
        ],
        coupon: "COUPON20",
        issueDate: new Date("2023-04-13T10:00:00")
    };
    const output = placeOrder.execute(input);
    expect(output.code).toBe("202300000001");
})

test("Should to create a order calculating two code", function () {
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
    const input = {
        cpf: "935.411.347-80",
        orderItems: [ 
            { idItem: 1, quantity: 1},
            { idItem: 2, quantity: 1},
            { idItem: 3, quantity: 3}
        ],
        coupon: "COUPON20",
        issueDate: new Date("2023-04-13T10:00:00")
    };
    placeOrder.execute(input);
    const output = placeOrder.execute(input);
    expect(output.code).toBe("202300000002");
})