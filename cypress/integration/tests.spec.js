describe("First test", () => {
    it("should create and read message", () => {
      cy.visit("http://localhost:4200/");
      cy.get('textarea').type("Hello");
      cy.get("#send-btn").click();
      cy.get("#copy-btn").click();
      cy.get("#message-link").invoke('val')
      .then(link => {
        cy.visit(link);
        cy.get("#confirm-btn").click();
        cy.get("#message").contains("Hello")

        cy.visit(link);
        cy.get("#confirm-btn").click();
        cy.get("#message").contains("Not found!")
      });
      
    });
  });