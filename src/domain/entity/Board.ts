import Card from "./Card";
import Column from "./Columns";

export default class Board {

    columns: Column[];

    constructor(public idBoard: number, readonly name: string) {
        this.columns = [];    
    }

    public addColumn(columnName:string, columnHasEstimative: boolean) {
        this.columns.push(new Column(columnName, columnHasEstimative));
    }

    public getColumn (name:string):Column {
        const column = this.columns.find(column => column.name === name);
        if (!column) throw new Error("Columns does not exist");
        return column;
    }

    public addCard(columnName:string, cardTitle:string, estimative:number, date: Date = new Date()) {
        const column = this.getColumn(columnName);
        column.addCard(new Card(cardTitle, estimative), date);
    }

    public changeColumn(cardTitle:string, columnNameFrom:string, columnNameTo:string, date: Date = new Date()) {
        const card = this.getColumn(columnNameFrom).getCard(cardTitle);
        this.getColumn(columnNameTo).addCard(card, date);
        this.getColumn(columnNameFrom).removeCard(card);
    }
}