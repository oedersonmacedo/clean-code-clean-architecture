import Dimension from "../src/Dimension";

test("Should to create the dimensions  of an item", function () {
	const dimension = new Dimension(2800, 1500, 10);
	const volume = dimension.getVolume();
	expect(volume).toBe(42);
});

test("Should to create the dimensions with the values zero", function () {
	const dimension = new Dimension(0, 0, 0);
	const volume = dimension.getVolume();
	expect(volume).toBe(0);
});

test("Should to create the dimensions with the values hundred", function () {
	const dimension = new Dimension(100, 100, 100);
	const volume = dimension.getVolume();
	expect(volume).toBe(1);
});