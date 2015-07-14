'use strict';
$(function () {
 
 // load orginal tweets (needs formatting with template and include replies) 
  // $.get('http://localhost:3000/tweets')
  // .done(function (data) {
  //   $('.tweets').append(data)
  // })
$.getJSON('http://localhost:3000/tweets')  // .getJSON is equivalent to .get but only works woth JSON
  .done(function (data) {     
    data.forEach(function (tweet) {   // iterates through data (data is returned as an array of objects, so can use forEach)
      var message = $('<div>').text(tweet.message)
      $('#tweets').append(message) // use jQuery to append to html
    })
  })

// Create Twitter handle
var currentUser = {
  handle: "@rwtaylor",
  img:  "images/ryanBW.jpg",
  id: 42
};

// require handlebars template file
var template = require('./template.js');
// console.log(template.tweetTmpl);   


//new tweet
function renderTweet(user, message) {
  var userTmpl = (template.tweetTmpl)
  
  var theData = {
    xyz: user,
    messageText: message
  }
  // console.log(messageText)
 console.log(userTmpl(theData))
 return (userTmpl(theData))
};

//replies
function renderCompose(){
  var newTmpl = (template.composeTmpl)
  console.log(newTmpl())
  return newTmpl()
}


function renderThread(user, message){ 
  // var tweet = renderTweet(user, message) 
  // var compose = renderCompose()
// return ('<div class = thread >') + tweet + compose + ('</div>')

  var theData = {
    tweet: renderTweet(user, message),
    compose: renderCompose()
  }

  
  var thrdTmpl = (template.threadTmpl)

  console.log(thrdTmpl(theData))
  return thrdTmpl(theData)
}


  // new tweet button click
$('header .compose button').on('click', function() {
    event.preventDefault()
    var msg = $(this).closest('.compose').find('textarea').val()
   $('#tweets').append(renderThread(currentUser, msg))  
    // $('#tweets').append(renderTweet(currentUser, msg))  

   console.log(renderTweet(currentUser, msg))

      $.post('http://localhost:3000/tweets', {
         userid: currentUser.id,
         message: msg
      })

  //close textarea and reset placeholder text
  $('main header form').removeClass('expand')
  $('.compose > textarea').val('')
})

//reply Reply button click
$('body').on('click', '.replies .compose button', function() {
  event.preventDefault()
  var message = $(this).closest('.compose').find('textarea').val()
  $(this).parents('.replies').append(renderTweet(currentUser, message))

    //close textarea and reset placeholder text
  $(this).parents('.compose').removeClass('expand')
  $('.compose > textarea').val('')
        
})


//expand "compose new tweet" textarea
$('body').on('click', '.compose > textarea', function() {
  $(this).parent().addClass('expand')
});

//expand thread
$('body').on('click', '.tweet', function() {
   $(this).parent().toggleClass('expand')
});


// for testing
// $.get('http://localhost:3000/tweets/2/replies')
// 	.done(function (data) {
// 	console.log(data)
// })

// $.post('http://localhost:3000/users', {
// 	id: 8,
// 	handle: '@ryanwade',
// })


});
