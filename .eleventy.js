const util = require('util');
module.exports = function (eleventConfig) {
    eleventConfig.addPassthroughCopy('css');
    eleventConfig.addPassthroughCopy('img');
    eleventConfig.addPassthroughCopy('js');
    eleventConfig.addPassthroughCopy('vendor');
    eleventConfig.addPassthroughCopy('admin');
    eleventConfig.addFilter('dump', obj => {
        return util.inspect(obj);
    });
    eleventConfig.addFilter('formatDate', date => {
        const ISOcode = 'en-GB';
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const d = new Date(date);
        return `${d.toLocaleDateString(ISOcode, options)}`;
    })
    eleventConfig.addFilter('sanitize', value => value.split(' ').join('-').toLowerCase())
}