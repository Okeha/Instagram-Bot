const express = require("express");
const app = express();
const Instagram = require("instagram-web-api");
require("dotenv").config();
const FileCookieStore = require("tough-cookie-filestore2");
const cronJob = require("node-cron");
const generateImage = require("./generateImage");
const { generateRandomJoke } = require("./generateImage");
const port = process.env.PORT || 4000;

const cookieStore = new FileCookieStore("./cookies.json");

const client = new Instagram(
  {
    username: process.env.INSTAGRAM_USERNAME,
    password: process.env.INSTAGRAM_PASSWORD,
    cookieStore,
  },
  {
    language: "en-US",
  }
);
cronJob.schedule("* * * * *", () => {
  generateImage.ImageGenerate;
  console.log("Auto generated image");
});
cronJob.schedule("0-59/29 18 * * *", async () => {
  const instagramPostFunction = async () => {
    generateImage.ImageGenerate;
    await client
      .uploadPhoto({
        photo: "./resources/drawnImage.jpg",
        caption: `${generateImage.randomJoke} #TonyBot2.0 #ProgrammingMemes`,
        post: "feed",
      })
      .then(async (res) => {
        const media = res.media;

        console.log(`https://instagram.com/p/${media.code}`);

        await client.addComment({
          mediaId: media.id,
          text: "#TonyBot2.0 #funny #jokes #programmingHumor",
        });
      });
  };

  const loginFunction = async () => {
    await generateImage.ImageGenerate;
    console.log("Logging in...");

    await client
      .login()
      .then(() => {
        console.log("Login Successful!");
      })
      .catch((err) => {
        console.log("Login Failed!");
        console.log(err);
      });
  };

  loginFunction();
  instagramPostFunction();
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
