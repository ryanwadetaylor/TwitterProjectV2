'use strict';
$(function () {

// require handlebars and fns template file
var template = require('./template.js');

 // Create Twitter handle
var currentUser = {
  handle: "@rwtaylor",
  img:  "ryanBW.jpg",
  id: 42
};

 
function getTweets() {
  return $.getJSON('http://localhost:3000/tweets') 
}
var tweetsFn = getTweets()


// load orginal tweets on page load
tweetsFn.done(function (data) {     
    data.forEach(function (tweet) {
      $.get('http://localhost:3000/users/' + tweet.userId)
        .done(function (userinfo) {
        var user = userinfo
        // console.log(tweet.id)
        $('#tweets').append(template.renderThread(user, tweet.message, tweet.id))
        })
    })
})
  .fail(function (xhr, error) {
      console.log(xhr.status)
  });   


  // new tweet button click
$('header .compose button').on('click', function() {
  event.preventDefault()
  var msg = $(this).closest('.compose').find('textarea').val()

  $.post('http://localhost:3000/tweets', {
     userId: currentUser.id,
     message: msg
  }).done(function (newPost) {
    $('#tweets').append(template.renderThread(currentUser, newPost.message, newPost.id))
    // console.log(newPost)
  })
  //refresh page so new tweet is appended with id (not necessary)
  // document.location.reload() 

  //close textarea and reset placeholder text
  $('main header form').removeClass('expand')
  $('.compose > textarea').val('')
});


// New reply 
$('body').on('click', '.replies .compose button', function() {
  event.preventDefault()
  var msg = $(this).closest('.compose').find('textarea').val()

  // get the id of the tweet 
  var id = $(this).closest('.thread').find('.tweet').attr('id')
  // slice off "tweet-"
  var idNum = id.substr(6)
  // append it
  $(this).parents('.replies').append(template.renderTweet(currentUser, msg))
  // post to db
  $.post('http://localhost:3000/replies', {
    userId: currentUser.id,
    tweetId: idNum, // id of the tweet being responded to
    message: msg
  })

  //close textarea and reset placeholder text
  $(this).parents('.compose').removeClass('expand')
  $('.compose > textarea').val('')     
});


//expand "compose new tweet" textarea
$('body').on('click', '.compose > textarea', function() {
  $(this).parent().addClass('expand')
});


//expand thread
$('body').on('click', '.tweet', function() {
  $(this).parent().toggleClass('expand')
})


// Get replies (if not yet posted to DOM)
$('body').on('click', '.tweet', function() {
  var repliesExist = $(this).closest('.thread').find('.replies .tweet').length
  if (repliesExist == 0) {   
    var _this = (this)
    var id = $(this).closest('.thread').find('.tweet').attr('id')
    var idNum = id.substr(6)
    $.get('http://localhost:3000/tweets/' + idNum + '/replies', function (replies) {
        replies.forEach(function (reply) {
          // get user data for renderTweet 
          $.get('http://localhost:3000/users/' + reply.userId)
            .done(function (userinfo) {
              var user = userinfo
          $(_this).closest('.thread').find('.replies').append(template.renderTweet(user, reply.message, reply.id))
          })
        })
    })
  } else {
    console.log('already posted replies or none to post')
  }
})



});
