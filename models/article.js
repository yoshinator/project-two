var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// article is the datatype the object that follows it is the configuration schema
//object id and populate or embed author object
var articleSchema = Schema({
    author:         Object,
    title:          String,
    content:        String,
    lastEdit:       String,
    lastEditAuthor: Object
});

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;
