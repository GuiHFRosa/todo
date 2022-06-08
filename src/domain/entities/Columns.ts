import Card from "./Card";

export default class Column {

    cards: Card[];

    constructor(readonly name: string, readonly hasEstimative: boolean) {
        this.cards = [];
    }

    addCard(card: Card, date: Date) {
        card.addTransaction(this.name, date);
        this.cards.push(card);
    }

    removeCard(card: Card) {
        this.cards.splice(this.cards.indexOf(card), 1);
    }

    getCard(cardTile: string) {
        const card = this.cards.find(card => card.title === cardTile);
        if (!card) throw new Error("Cartão não encontrado!");
        return card;
    }

    getCards() {
        return this.cards;
    }

    getEstimative() {
        return this.cards.reduce((total: number, card: Card) => {
            total += card.estimative;
            return total;
        }, 0)
    }
}