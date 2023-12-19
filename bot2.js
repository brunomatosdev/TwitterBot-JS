const Twit = require("twit");
const fs = require("fs");
require("dotenv").config();

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const tweets = fs
  .readFileSync("tweets.txt", "utf-8")
  .split("\n")
  .filter(Boolean);

function tweet() {
  const tweet = tweets[Math.floor(Math.random() * tweets.length)];
  console.log("Attempting to tweet:", tweet);

  T.post("statuses/update", { status: tweet }, (err, data, response) => {
    if (err) {
      console.error("Error tweeting:", err);
    } else {
      console.log("Tweet sent:", tweet);
    }
  });
}

setInterval(tweet, 8 * 60 * 60 * 1000);
