const axios = require('axios').default;

module.exports = (req, res) => {
  var { Readability } = require('@mozilla/readability');
  var JSDOM = require('jsdom').JSDOM;
  return(axios
    .get(req.query.urlpath)
    .then(r => r.data)
    .then(d => {
        var doc = new JSDOM(d)
        let reader = new Readability(doc.window.document);
        let article = reader.parse();
      return(article.textContent)
    })
  .then(r => res.send(r)))
}

