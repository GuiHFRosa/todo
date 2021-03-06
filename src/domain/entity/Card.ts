import Transition from "./Transition";

export default class Card {

    transitions: Transition[];

    constructor(readonly title:string, readonly estimative:number) {
        this.transitions = [];
    }

    public addTransaction(columnName: string, date: Date) {
        this.transitions.push(new Transition(columnName, date));
    }
}