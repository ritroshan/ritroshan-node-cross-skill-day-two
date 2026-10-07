console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve("3").then((v) => console.log(v));

setImmediate(() => {
  console.log("4");
});

process.nextTick(() => console.log("7"));

setTimeout(() => {
  console.log("5");
}, 3000);


console.log("6")

// output: 1,6,7,3,2,4,5
