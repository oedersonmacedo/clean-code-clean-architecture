import GetOrderOutput from "../../application/use-case/get-order/GetOrderOutput";
import GetOrders from "../../application/use-case/get-orders/GetOrders";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";

export default class OrdersController {

	constructor (readonly repositoryFactory: RepositoryFactory) {
	}

	async getOrders () : Promise<GetOrderOutput[]> {
		const getOrders = new GetOrders(this.repositoryFactory);
		const output = await getOrders.execute();
		return output;
	}
}