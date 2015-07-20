'use strict';
// runs handlebar compile function
var Handlebars = require('hbsfy/runtime');


var tweetTmpl = require('../templates/tweet.handlebars') // hbs function
var threadTmpl = require('../templates/thread.handlebars')
var composeTmpl = require('../templates/compose.handlebars')

//new tweet
function renderTweet(user, message, tweetid) {
  var userTmpl = (tweetTmpl)
  
  var theData = {
    user: user,
    messageText: message,
    tweetid: tweetid
  }
 return userTmpl(theData)
}


function renderThread(user, message, tweetid){ 
  var theData = {
    tweet: renderTweet(user, message, tweetid),
    compose: composeTmpl
  }
  var thrdTmpl = threadTmpl
  return thrdTmpl(theData)
}


module.exports = {
	tweetTmpl: tweetTmpl,
	threadTmpl: threadTmpl,
	renderTweet: renderTweet,
	renderThread: renderThread
}

