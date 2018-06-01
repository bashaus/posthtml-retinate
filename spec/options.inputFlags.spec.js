const process = require('./processor.js');
const expect = require('expect');

describe('retinate#inputFlags', () => {
  it('handles custom flags', () => {
    expect(process('<img src="image-2x.png">', { inputFlags: { 2: '-2x' } }))
      .toEqual('<img src="image.png" srcset="image@2x.png 2x">');
  });
});
