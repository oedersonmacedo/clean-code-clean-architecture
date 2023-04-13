import Dimension from "./Dimension";

export default class Item {

    constructor(readonly idItem: number, readonly description: string, readonly category: string, readonly price: number, readonly dimension?: Dimension, readonly weight?: number) {
    }

    getVolume() {
        if (!this.dimension) return 0;
        return this.dimension.getVolume();
    }

    getDensity() {
        if(!this.weight || !this.dimension) return 0;
        return this.weight / this.dimension.getVolume();
    }
}