import Board from "../src/domain/entities/Board";

test("Deve criar um quadro", function() {
    const board = new Board("A");
    expect(board.name).toBe("A");
});

test("Deve incluir as colunas no quadro", function() {
    const board = new Board("A");
    board.addColumn("Todo", true);
    board.addColumn("Doing", true);
    board.addColumn("Done", false);
    expect(board.columns).toHaveLength(3);
});

test("Deve inserir cartões nas colunas do quadro", function() {
    const board = new Board("A");
    board.addColumn("Todo", true);
    board.addColumn("Doing", true);
    board.addColumn("Done", false);
    board.addCard("Todo", "Task 1", 3);
    board.addCard("Todo", "Task 2", 2);
    board.addCard("Todo", "Task 3", 1);
    expect(board.getColumn("Todo").getCards()).toHaveLength(3);
});

test("Deve calcular a estimativa de uma coluna", function() {
    const board = new Board("A");
    board.addColumn("Todo", true);
    board.addColumn("Doing", true);
    board.addColumn("Done", false);
    board.addCard("Todo", "Task 1", 3);
    board.addCard("Todo", "Task 2", 2);
    board.addCard("Todo", "Task 3", 1);
    expect(board.getColumn("Todo").getEstimative()).toBe(6);
});

test("Deve trocar cartão de coluna", function() {
    const board = new Board("A");
    board.addColumn("Todo", true);
    board.addColumn("Doing", true);
    board.addColumn("Done", false);
    board.addCard("Todo", "Task 1", 3);
    board.addCard("Todo", "Task 2", 2);
    board.addCard("Todo", "Task 3", 1);
    board.changeColumn("Task 1", "Todo", "Doing");
    expect(board.getColumn("Todo").getEstimative()).toBe(3);
    expect(board.getColumn("Doing").getEstimative()).toBe(3);
}); 

test("Deve controlar o tempo que um cartão fica em uma coluna", function() {
    const board = new Board("A");
    board.addColumn("Todo", true);
    board.addColumn("Doing", true);
    board.addColumn("Done", false);
    board.addCard("Todo", "Task 1", 3, new Date("2022-06-01T10:00:00"));
    board.changeColumn("Task 1", "Todo", "Doing", new Date("2022-06-06T10:00:00"));
    const card = board.getColumn("Doing").getCard("Task 1");
    expect(card.transitions[0].date).toEqual(new Date("2022-06-01T10:00:00"));
    expect(card.transitions[1].date).toEqual(new Date("2022-06-06T10:00:00"));
});