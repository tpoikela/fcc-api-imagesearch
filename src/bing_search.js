
const Search = require('bing.search');

var BingSearch = function(key) {
    
    var key = key;
    var search = new Search(key);
    
    this.search = function(expr, offset) {
        search.images(expr,
            {top: 10, skip: offset},
            function(err, results) {
                if (err) throw err;
                return results;
            }
        );
    };
    
};

module.exports = BingSearch;
