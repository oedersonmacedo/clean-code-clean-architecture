import Dimension from "../../src/domain/entity/Dimension";
import Item from "../../src/domain/entity/Item";

test("Should to create an item with dimension and to calculate the volume", function () {
	const item = new Item(1, "example 1", "category 1", 1000, new Dimension(100, 30, 10));
	const volume = item.getVolume();
	expect(volume).toBe(0.03);
});

test("Should to create an item with dimension and to calculate the density", function () {
	const item = new Item(1, "example 1", "category 1", 1000, new Dimension(100, 30, 10), 3);
	const density = item.getDensity();
	expect(density).toBe(100);
});