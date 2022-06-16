const fs = require("fs");
const Jimp = require("jimp");
const cronJob = require("node-cron");
const jokes = fs.readFileSync("./joke.json", "utf8");

cronJob.schedule("* * * * *", async () => {
  const joke = JSON.parse(jokes);
  console.log(typeof joke);
  var length = Object.keys(joke).length;
  console.log(length);

  function generateRandomJoke() {
    let rand = Math.floor(Math.random() * length);
    newJoke = joke[`${rand}.jpeg`];
    return newJoke;
  }
  console.log(generateRandomJoke());

  function generateRandomImage() {
    let rand = Math.floor(Math.random() * 17);
    newImage = `image${rand}.jpg`;
    return newImage;
  }
  console.log(generateRandomImage());

  const images = generateRandomImage();

  const imgText = generateRandomJoke();

  const randomJoke = generateRandomJoke();

  async function textOverlay() {
    // Reading image
    const image = await Jimp.read(`./images/${images}`);
    image.resize(800, 500, function (err) {
      if (err) throw err;
    });
    //   image.blur(2, function (err) {
    //     if (err) throw err;
    //   });
    image.grayscale();
    // Defining the text font
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
    //   image.print(font, 10, 10, imgText);
    image.print(font, 5, 5, imgText);
    // Writing image after processing
    await image.writeAsync("./resources/drawnImage.jpg");
  }

  const ImageGenerate = textOverlay();
  ImageGenerate;
  console.log("Image is processed succesfully");
});
// module.exports = { randomJoke };
