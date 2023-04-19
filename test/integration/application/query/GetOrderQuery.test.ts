import GetOrderQuery from "../../../../src/application/query/GetOrderQuery";
import PlaceOrder from "../../../../src/application/use-case/place-order/PlaceOrder";
import RepositoryFactory from "../../../../src/domain/factory/RepositoryFactory";
import OrderRepository from "../../../../src/domain/repository/OrderRepository";
import Connection from "../../../../src/infra/database/Connection";
import PostgreSQLConnectionAdapter from "../../../../src/infra/database/PostgreSQLConnectionAdapter";
import DatabaseRepositoryFactory from "../../../../src/infra/factory/DatabaseRepositoryFactory";

let connection: Connection;
let repositoryFactory: RepositoryFactory;
let orderRepository: OrderRepository;

beforeEach(async function () {
	connection = new PostgreSQLConnectionAdapter();
	repositoryFactory = new DatabaseRepositoryFactory(connection);
	orderRepository = repositoryFactory.createOrderRepository();
	await orderRepository.clean();
});

test("Should to get the code of order", async function () {
	const placeOrder = new PlaceOrder(repositoryFactory);
	const input = {
		cpf: "935.411.347-80",
		orderItems: [
			{ idItem: 1, quantity: 1},
			{ idItem: 2, quantity: 1},
			{ idItem: 3, quantity: 3}
		],
		coupon: "VALE20",
		issueDate: new Date("2021-03-01T10:00:00")
	};
	await placeOrder.execute(input);
	const getOrder = new GetOrderQuery(connection);
	const output = await getOrder.execute("202100000001");
	expect(output.total).toBe(5152);
});

afterEach(async function () {
	await orderRepository.clean();
	await connection.close();
});
