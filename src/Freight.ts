import Item from "./Item";

export default class Freight {

    private total: number;

    constructor() {
        this.total = 0;
    }

    addItem(item: Item, quantity: number) {
        this.total += (item.getVolume() * 1000 * (item.getDensity() / 100)) * quantity;
    }
    getTotal() {
        if (this.total > 0 && this.total < 10) return 10;
        return this.total;
    }
}