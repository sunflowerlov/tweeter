$(document).ready(function () {
  $(".tweet-form").on("submit", onSubmit);
  console.log("ready");
  loadtweets();
});

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const isUserInputValid = function (text) {
  $("#tweet-alarm-empty").slideUp();
  $("#tweet-alarm-tooLong").slideUp();
  if (text.length < 1) {
    $('#tweet-alarm-empty').slideDown('slow')
    return false;
  } 
  if (text.length > 140) {
    $('#tweet-alarm-tooLong').slideDown('slow')
    return false;
  } 

  return true
}

const onSubmit = function (event) {
  event.preventDefault();
  const data = $(this).serialize();
  console.log("this", this);

  let text = $("#tweet-text").val();

  //reach the condition then warning tag comes out
 if (isUserInputValid(text)) {
   //tag hidden again
   $.post("/tweets", data).then(() => {
     $("#tweet-text").val('');
     $(".tweets-container").empty();
     $("#tweet-alarm-empty").slideUp();
     $("#tweet-alarm-tooLong").slideUp();
     loadtweets();
   });
 }

};

const loadtweets = function () {
  $.get("/tweets").then((data) => {
    renderTweets(data);
  });
};

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    let element = createTweetElement(tweet);

    $(".tweets-container").prepend(element);
  }
};

const createTweetElement = function (tweet) {
  let name = tweet.user.name;
  let avatars = tweet.user.avatars;
  let handle = tweet.user.handle;
  let text = tweet.content.text;
  let time = timeago.format(tweet.created_at);
  let $tweet = `
  <article class="tweet-one">
  <header class="tweet-one-header">
    <label>
      <img src="${avatars}" />
      ${name}
    </label>
    <div class="tweet-one-username-right">${handle}</div>
  </header>

  <div class="tweet-one-textarea">
    <p class="tweet-one-input">${escape(text)}</p>
  </div>

  <footer class="tweet-one-footer">
    <div>${time}</div>

    <div class="tweet-one-emoji">
      <i id="fa-flag" class="fas fa-flag"></i>
      <i id="fa-smile-wink" class="fas fa-smile-wink"></i>
      <i id="fa-heart" class="fas fa-heart"></i>
    </div>
  </footer>
</article>
  `;

  return $tweet;
};
