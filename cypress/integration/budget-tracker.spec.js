// THIS TEST RUNNER IS MOCHA/CHAI, NOT JEST, lalal

describe('Visiting homepage', () => {
  it('HOMEPAGE: Should show us the homepage at "/" and click on dashboard', () => {
    // we can just put in a regular backslash like this because we set up base url in the cypress.json that got generated when we ran cypress
    // cy.visit is already considered an assertion in and of itself
    cy.visit('/');

    cy.get('a').contains('Dashboard').click()
    
    // "should" and "and" are implicit assertions in Cypress
    cy.url().should('include', '/dashboard');
  });
  
  it('ON FORM SUBMISSION: Should add values into inputs and submit form while displaying new expenses on the page', () => {
      cy.get('.dashboard input:first-child')
        .type('apples')
        .should('have.value', 'apples');
      
      cy.get('.dashboard input:nth-child(2)')
      .clear()
      .type('10')
      .should('have.value', '10');
    
      cy.get('form').submit();
  });

  it('AFTER FORM SUBMISSION: Should confirm we have a list', () => {
    // we grab a DOM collection of items with the same class name, pass that DOM collection into a callback and write our assertion statements inside the callback
    cy.get('.expense-item').should((expenseItems) => {
      // expect statements are explicit assertions. Expect comes from Mocha/Chai, NOT jest
      expect(expenseItems).to.have.length(1);
      expect(expenseItems.eq(0)).to.contain('apples : $10');
    })
  })

  it('UPDATING EXPENSE ITEM: Should open the modal and update the clicked item with new submission', () => {

    cy.get('.expense-item button').contains('Update').click();

    cy.get('.modal.display-block input:first-child')
      .should('have.value', 'apples')
      .clear()
      .type('updated apples');
    
    cy.get('.modal.display-block input:nth-child(2)')
    .should('have.value', '10')
    .clear()
    .type('20');

    cy.get('.modal.display-block form').submit();
  })

  it('DELETING EXPENSE ITEM: Should delete the item', () => {
    cy.get('.expense-item button').contains('Delete').click();
    
    cy.get('.dashboard ul')
      .should('not.have.descendants', 'li');

  });
});
