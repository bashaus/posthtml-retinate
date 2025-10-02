const posthtml = require("posthtml");
const retinate = require("..");

module.exports = function (inputHTML, options = {}) {
  return posthtml().use(retinate(options)).process(inputHTML, { sync: true })
    .html;
};
