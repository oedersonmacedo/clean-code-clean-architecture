import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";

export default class ItemRepositoryMemory implements ItemRepository {
    items: Item[];

    constructor() {
        this.items = [
            new Item(1, "example 1", "category", 1000),
            new Item(2, "example 2", "category", 5000),
            new Item(3, "example 3", "category", 30)
        ]
    }

    getById(idItem: number): Item | undefined {
        return this.items.find(item => item.idItem === idItem);
    }
}