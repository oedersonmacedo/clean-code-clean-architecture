import Cpf from "../src/Cpf";

test("should to validate the valid CPF", function () {
    const cpf = new Cpf("111.444.777-35");
    expect(cpf.getValue()).toBe("111.444.777-35");
});

test("should to validate the valid CPF", function () {
    const cpf = new Cpf("173.054.259-07");
    expect(cpf.getValue()).toBe("173.054.259-07");
});

test("should to validate the invalid CPF with 10 digits", function () {
    expect(() => new Cpf('000.000.000-0')).toThrow(new Error("invalid CPF"));
});

test("should to validate the CPF is empty", function () {
    expect(() => new Cpf('')).toThrow(new Error("invalid CPF"));
});
const invalidCpfWithSameDigits = [
    '000.000.000-00',
    '111.111.111-11'
];

describe.each(invalidCpfWithSameDigits)("should to test a CPF with the digits equals",function (cpf) {
    test(`${cpf}`, function () {
        expect(() => new Cpf(cpf) ).toThrow(new Error("invalid CPF"));
    })
});

test("should to validate the CPF the digits diffs", function () {
    expect(() => new Cpf('123.456.789-11')).toThrow(new Error("invalid CPF"));
});