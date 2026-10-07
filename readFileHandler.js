const fs = require("fs"); //normal version
const file = require("fs").promises; // modern version to create promise manually

// callback based asynchronous file read
// encodeing option to convert content from buffer data
fs.readFile("read.txt", "utf-8", (err, res) => {
  if (err) console.log("callback err:", err.message);
  if (res) console.log("callback:", res);
});

// Promise based asynchronous file read
const readFilePromise = new Promise((resolve, reject) => {
  fs.readFile("read.txt", "utf-8", (err, res) => {
    if (err) return reject(err);
    resolve(res);
  });
});
readFilePromise
  .then((res) => console.log("Promise:", res))
  .catch((err) => console.log("Promise err:", err.message))
  .finally(() => console.log("readfile promise execution completed"));

// to handle fs module in modern js (async/await) 
// const file = require("fs").promises; this import automatically create a promise
const readData = async function () {
  try {
    const data = await file.readFile("read.txt", "utf-8");
    console.log("Ayunc/await:", data);
  } catch (error) {
    console.log("Ayunc/await err:", error.message);
  }
};
readData();
