import PlaceOrder from "../../../../src/application/use-case/place-order/PlaceOrder";
import RepositoryFactory from "../../../../src/domain/factory/RepositoryFactory";
import MemoryRepositoryFactory from "../../../../src/infra/factory/MemoryRepositoryFactory";

let repositoryFactory: RepositoryFactory

beforeEach(function () {
    repositoryFactory = new MemoryRepositoryFactory();
});
test("Should to create a order", async function () {
    const placeOrder = new PlaceOrder(repositoryFactory);
    const input = {
        cpf: "935.411.347-80",
        orderItems: [ 
            { idItem: 1, quantity: 1},
            { idItem: 2, quantity: 1},
            { idItem: 3, quantity: 3}
        ],
        issueDate: new Date("2023-04-13T10:00:00")
    };
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(6350);
})

test("Should to create a order with coupon", async function () {
    const placeOrder = new PlaceOrder(repositoryFactory);
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
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(5132);
})

test("Should to create a order calculating a code", async function () {
    const placeOrder = new PlaceOrder(repositoryFactory);
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
    const output = await placeOrder.execute(input);
    expect(output.code).toBe("202300000001");
})

test("Should to create a order calculating two code", async function () {
    const placeOrder = new PlaceOrder(repositoryFactory);
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
    await placeOrder.execute(input);
    const output = await placeOrder.execute(input);
    expect(output.code).toBe("202300000002");
})