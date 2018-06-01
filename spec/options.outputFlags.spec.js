const process = require('./processor.js');
const expect = require('expect');

describe('retinate#outputFlags', () => {
  it('handles custom flags', () => {
    expect(process('<img src="image@4x.png">', { outputFlags: { 1: '-1x', 2: '-2x' } }))
      .toEqual('<img src="image-1x.png" srcset="image-2x.png 2x">');
  });
});
