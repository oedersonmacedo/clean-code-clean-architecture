import SimulateFreight from "../../../../src/application/use-case/simulate-freight/SimulateFreight";
import ItemRepositoryMemory from "../../../../src/infra/repository/memory/ItemRepositoryMemory";

test("Should to simulate freight of an order", async function() {
    const itemRepository = new ItemRepositoryMemory();
    const simulateFreight = new SimulateFreight(itemRepository);
    const input = {
        orderItems: [ 
            { idItem: 1, quantity: 1},
            { idItem: 2, quantity: 1},
            { idItem: 3, quantity: 3}
        ]
    }
    const output = await simulateFreight.execute(input);
    expect(output.total).toBe(260);
})