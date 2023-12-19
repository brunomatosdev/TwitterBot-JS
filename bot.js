const Twit = require("twit");
const fs = require("fs");
require("dotenv").config();

const config = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
};

const T = new Twit(config);

const tweetFile = "tweets.txt";
let tweetedTweets = []; // Array to store tweets that have already been sent

function readTweets() {
  try {
    const tweets = fs.readFileSync(tweetFile, "utf-8").split("\n");
    const uniqueTweets = tweets.filter(
      (tweet) => tweet.trim() !== "" && !tweetedTweets.includes(tweet.trim())
    );

    // Add unique tweets to the array of sent tweets
    tweetedTweets = tweetedTweets.concat(
      uniqueTweets.map((tweet) => tweet.trim())
    );

    return uniqueTweets;
  } catch (error) {
    console.error("Error reading tweet file:", error);
    return [];
  }
}

function tweetWithInterval() {
  const tweets = readTweets();
  let index = 0;

  function tweet() {
    if (index < tweets.length) {
      const tweetText = tweets[index];
      T.post("tweets", { text: tweetText }, (err, data, response) => {
        if (err) {
          console.error("Error tweeting:", err);
        } else {
          console.log("Tweet sent:", tweetText);
          console.log("Twitter API response:", data);
        }
        index++;
        setTimeout(tweet, 8 * 60 * 60 * 1000);
      });
    } else {
      console.log("All tweets have been sent.");
    }
  }

  tweet();
}

tweetWithInterval();
