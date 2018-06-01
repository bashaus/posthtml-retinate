const process = require('./processor.js');
const expect = require('expect');

describe('retinate', () => {
  it('#defaults', () => {
    expect(process('<img src="image@4x.png">'))
      .toEqual('<img src="image.png" srcset="image@2x.png 2x, image@4x.png 4x">')
  });

  it('handles no src', () => {
    expect(process('<img alt="image">'))
      .toEqual('<img alt="image">')
  });

  it('handles no attributes', () => {
    expect(process('<img>'))
      .toEqual('<img>')
  });

  it('handles no scale', () => {
    expect(process('<img src="image.png">'))
      .toEqual('<img src="image.png">')
  });

  it('handles relative paths', () => {
    expect(process('<img src="../image@2x.png">'))
      .toEqual('<img src="../image.png" srcset="../image@2x.png 2x">')
  });

  it('handles absolute paths', () => {
    expect(process('<img src="/images/image@2x.png">'))
      .toEqual('<img src="/images/image.png" srcset="/images/image@2x.png 2x">')
  });
});
