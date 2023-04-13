export default class Dimension {
    private DIVISORuFORuMETER = 100;

    constructor(readonly width: number, readonly height: number, readonly length: number) {
    }

    getVolume() {
        return (this.width / this.DIVISORuFORuMETER) * 
                (this.height / this.DIVISORuFORuMETER) * 
                (this.length / this.DIVISORuFORuMETER);
    }
}