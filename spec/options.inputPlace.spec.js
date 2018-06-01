const process = require('./processor.js');
const expect = require('expect');

describe('retinate#inputPlace', () => {
  it('handles startsWith', () => {
    expect(process('<img src="@2ximage.png">', { inputPlace: 'startsWith' }))
      .toEqual('<img src="image.png" srcset="image@2x.png 2x">');
  });

  it('handles endsWith', () => {
    expect(process('<img src="image@2x.png">', { inputPlace: 'endsWith' }))
      .toEqual('<img src="image.png" srcset="image@2x.png 2x">');
  });
});
