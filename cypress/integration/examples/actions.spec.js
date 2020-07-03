/// <reference types="cypress" />

context('editor - tools', () => {
  beforeEach(() => {
    cy.visit('http://192.168.1.12:3000');
    cy.viewport(1000, 600);
  });

  it('add new tool', () => {
    cy.get('a[href*="editor"]').click();

    // get tools length
    const getElementsLength = (callBack) =>
      cy
        .get('[data-test-id="tool-editable"]')
        .its('length')
        .then(callBack);

    getElementsLength((elementsLengthBeforeDrag) => {
      cy.get('[data-test-id="video-player"]').then(
        ([videoElement]) => {
          const coords = videoElement.getBoundingClientRect();

          // move new tool on video area
          cy.get('[data-test-id="button_new-label-tool"]')
            .trigger('mousedown', { which: 1 })
            .trigger('mousemove', {
              clientX: coords.x + 300,
              clientY: coords.y - 50,
            })
            .trigger('mouseup', { force: true });

          // check if new element was added
          getElementsLength((elementsLengthAfterDrag) => {
            expect(elementsLengthAfterDrag).eq(
              elementsLengthBeforeDrag + 1,
            );
          });
        },
      );
    });
  });
});
