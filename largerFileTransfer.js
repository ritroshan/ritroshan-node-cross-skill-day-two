const fs = require("fs");
const { Transform, pipeline } = require("stream");

const outputFile = `./export_${Date.now()}.txt`

if (!fs.existsSync("./sample.txt")) {
  console.error("Error: sample.txt not found");
  process.exit(1);
}

const readStream = fs.createReadStream("./sample.txt");
const writeStream = fs.createWriteStream(outputFile);

const TransformUpperCase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

pipeline(readStream, TransformUpperCase, writeStream, (err) => {
  if (err) {
    console.error("Pipeline failed:", err.message);
    process.exit(1);
  }
  console.log('Done. Written to -', outputFile);
});
