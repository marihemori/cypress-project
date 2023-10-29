describe("Transaction", () => {
  // hooks -> executar antes ou depois / de cada ou de todos os testes
  // before
  // after
  // beforeEach
  // afterEach

  beforeEach(() => {
    cy.visit("https://dev-finance-marianamorais.vercel.app/");
  });

  it("Register an entry", () => {
    createTransaction("Work 1", 250);
    // createTransaction("Work 2", 150);

    cy.get("tbody tr td.description").should("have.text", "Work 1");
  });

  it("Register one output", () => {
    createTransaction("Ice cream", -20);
    cy.get("tbody tr td.description").should("have.text", "Ice cream");
  });

  it("Delete transaction", () => {
    createTransaction("Work 1", 100);
    createTransaction("Work 2", 250);

    // cy.contains(".description", "Work 1").parent().find("img").click();
    cy.contains(".description", "Work 1").siblings().children("img").click();

    cy.get("tbody tr").should("have.length", 1);
  });
});

function createTransaction(description, value) {
  cy.contains("New Transaction").click();
  cy.get("#description").type(description);
  cy.get("#amount").type(value);
  cy.get("#date").type("2023-10-27"); //yyy-mm-dd

  cy.contains("button", "Save").click();
}
