export class OrderCode {
    value: string;

    constructor(readonly date: Date = new Date(), readonly sequence: number) {
        this.value = generateCode(date, sequence);
    }

}

function generateCode(date: Date, sequence: number): string {
    const year = date.getFullYear();
    const sequenceFormated = (new String(sequence)).padStart(8, "0");
    return `${year}${sequenceFormated}`;
}