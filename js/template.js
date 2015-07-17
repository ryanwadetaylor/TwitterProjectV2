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
    xyz: user,
    messageText: message,
    tweetid: tweetid
  }
 return (userTmpl(theData))
};


//replies
function renderCompose(){
  var newTmpl = (composeTmpl)
  // console.log(newTmpl())
  return newTmpl()
};


function renderThread(user, message, tweetid){ 
  var theData = {
    tweet: renderTweet(user, message, tweetid),
    compose: renderCompose()
  }
  var thrdTmpl = (threadTmpl)
  // console.log(thrdTmpl(theData))
  return thrdTmpl(theData)
};


module.exports = {
	tweetTmpl: tweetTmpl,
	threadTmpl: threadTmpl,
	composeTmpl: composeTmpl,
	renderTweet: renderTweet,
	renderCompose: renderCompose,
	renderThread: renderThread
}

