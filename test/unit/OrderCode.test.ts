import { OrderCode } from "../../src/domain/entity/OrderCode";

test("Should to create the code of the order", function () {
	const date = new Date("2023-04-01T10:00:00");
	const sequence = 1;
	const orderCode = new OrderCode(date, sequence);
	const code = orderCode.value;
	expect(code).toBe("202300000001");
});

test("Should to create the code of the order without date", function () {
	const sequence = 1;
	const orderCode = new OrderCode(undefined, sequence);
	const code = orderCode.value;
    const date = new Date();
    const year = date.getFullYear();
	expect(code).toBe(`${year}00000001`);
});