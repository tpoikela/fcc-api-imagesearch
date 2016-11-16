
const Search = require('bing.search');

/** A wrapper around bing search module. */
var BingSearch = function(key) {

    var key = key;
    var search = new Search(key);

    this.search = function(query, func) {
        var expr = query.keyword;
        var offset = query.offset;
        search.images(expr,
            {top: 10, skip: offset},
            (err, results) => {
                if (err) func(err);
                else {
                    func(null, results);
                }
            }
        );
    };

};

module.exports = BingSearch;
