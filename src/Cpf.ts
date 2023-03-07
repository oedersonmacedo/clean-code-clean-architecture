export default class Cpf {
    private FACTOR_DIGIT_ONE = 10;
    private FACTOR_DIGIT_TWO = 11;
    private LENGTH_CPF = 11;    

    private value:string;

    constructor(value: string) {
        if (!this.validate(value)) throw new Error("invalid CPF");
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    private validate(cpf: string) {
        if (this.isEmpty(cpf)) return false
        cpf = this.cleanCpf(cpf);
        if (!this.isValidCpfLength(cpf)) return false;
        if (this.hasAllDigitsEquals(cpf)) return false;
        const digitTeen = this.calculateCheckDigit(cpf, this.FACTOR_DIGIT_ONE);
        const digitEleven = this.calculateCheckDigit(cpf, this.FACTOR_DIGIT_TWO);
        const digitsGenerate = `${digitTeen}${digitEleven}`;
        return digitsGenerate === this.extractChekDigit(cpf);
    }

    private isEmpty(cpf: string) {
        return (cpf==='' || cpf===undefined || cpf===null)
    }

    private cleanCpf(cpf: string){
        return cpf.replace(/[.-]+/g,'')
    }

    private isValidCpfLength(cpf: string) {
        return cpf.length === this.LENGTH_CPF;
    }

    private hasAllDigitsEquals(cpf: string) {
        const firstDigit = cpf.substring(0, 1);
        return  [...cpf].every(digit => digit === firstDigit);
    }

    private calculateCheckDigit(cpf: string, digit: number) {
        let total = 0
        const cpfWithDigits = cpf.substring(0, digit - 1);
        for (const charactere of cpfWithDigits) {
            total = total + (parseInt(charactere) * digit--);
        }
        const  rest = total % this.LENGTH_CPF;
        const ret = (rest < 2) ? 0 : this.LENGTH_CPF - rest;
        return ret;
    }

    private extractChekDigit(cpf: string) {
        return cpf.slice(-2);
    }
}