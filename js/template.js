'use strict';
// runs handlebar compile function
var Handlebars = require('hbsfy/runtime');


var tweetTmpl = require('../templates/tweet.handlebars') // hbs function
console.log(tweetTmpl)
var threadTmpl = require('../templates/thread.handlebars')
var composeTmpl = require('../templates/compose.handlebars')


	//add other two templates here
module.exports = {
	tweetTmpl: tweetTmpl,
	threadTmpl: threadTmpl,
	composeTmpl: composeTmpl
}

// module.exports = tweetTmpl
