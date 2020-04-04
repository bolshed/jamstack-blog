const util = require('util');
const algoliasearch = require('algoliasearch');
const searchClient = algoliasearch('JL7BROHM5Z', 'd36c790225de9ec79cefd7c0e728619e');
const algoliaIndex = searchClient.initIndex('blog');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('js');
  eleventyConfig.addPassthroughCopy('vendor');
  eleventyConfig.addPassthroughCopy('admin');

  eleventyConfig.addFilter('dump', obj => util.inspect(obj));

  eleventyConfig.addFilter('formatDate', value => {
    const ISOcode = 'en-GB';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const d = new Date(value);
    return `${d.toLocaleDateString(ISOcode, options)}`;
  })

  eleventyConfig.addFilter('sanitize', value => value.split(' ').join('-').toLowerCase())
  

  eleventyConfig.addCollection('algolia', collection => {
    const index = collection.getAll().filter(item => {
      let extension = item.inputPath.split('.').pop();
      return extension === 'md';
    }).map(item => {
      return {
        objectID: item.data.page.url,
        title: item.data.title,
        author: item.data.author,
        description: item.data.description,
        url: item.data.page.url,
        content: JSON.stringify(item.template.frontMatter.content)
      }
    });
    return algoliaIndex.saveObjects(index);
  })
};