// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

$(document).ready(function () {
  console.log('ready')
  renderTweets(data)
})

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    let element = createTweetElement(tweet);
    
    $(".tweet-container").prepend(element);
  }
};

const createTweetElement = function (tweet) {
  let name = tweet.user.name;
  let avatars = tweet.user.avatars;
  let handle = tweet.user.handle;
  let text = tweet.content.text;
  let time = tweet.created_at;
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
    <p class="tweet-one-input">${text}</p>
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

