const util = require('util');
module.exports = function (eleventConfig) {
    eleventConfig.addPassthroughCopy('css');
    eleventConfig.addPassthroughCopy('img');
    eleventConfig.addPassthroughCopy('js');
    eleventConfig.addPassthroughCopy('vendor');
    eleventConfig.addFilter('dump', obj => {
        return util.inspect(obj);
    })
}