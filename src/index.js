const path = require('path');
const extend = require('extend');

const DEFAULT_OPTIONS = {
  inputFlags: { 1: '@1x', 2: '@2x', 4: '@4x' },
  inputPlace: 'endsWith',
  outputFlags: { 1: '', 2: '@2x', 4: '@4x' },
  outputPlace: 'append',
  scaleUp: false
};

module.exports = function(options) {
  options = extend({}, DEFAULT_OPTIONS, options);

  return function(tree) {
    tree.match({ 'tag': 'img' }, node => {
      node.attrs = node.attrs || {};

      if (!node.attrs.src) return node;

      // Identify file name information
      const dirpath = path.dirname(node.attrs.src);
      const dirname = dirpath == '.' ? '' : dirpath + '/';

      const extname = path.extname(node.attrs.src);
      const filename = path.basename(node.attrs.src, extname);

      // Find scale
      const inputScale = Object.keys(options.inputFlags)
        .find(scale => filename[options.inputPlace](options.inputFlags[scale]));
      if (!inputScale) return node;

      // Find filestem
      let filestem = "";

      switch (options.inputPlace) {
        case "startsWith":
          filestem = filename
            .substring(options.inputFlags[inputScale].length);
          break;
        case "endsWith":
          filestem = filename
            .substring(0, filename.length - options.inputFlags[inputScale].length);
          break;
      }

      // Identify relevant output formats
      const outputScales = Object.keys(options.outputFlags)
        .filter(scale => options.scaleUp ? true : scale <= inputScale);

      const srcset = outputScales
        .filter(scale => scale != 1)
        .map(scale => generateOutputSrcset(dirname, filestem, scale, extname))
        .join(', ');

      if (srcset) {
        node.attrs.srcset = srcset;
        node.attrs.src = generateOutputSrc(dirname, filestem, 1, extname)
      }

      return node;
    });
  };

  function generateOutputSrcset(dirname, filestem, scale, extname) {
    return generateOutputSrc(dirname, filestem, scale, extname) + " " + scale + "x";
  }

  function generateOutputSrc(dirname, filestem, scale, extname) {
    if (options.outputPlace == 'append') {
      return dirname + filestem + options.outputFlags[scale] + extname;
    }

    return dirname + options.outputFlags[scale] + filestem + extname;
  }
};
