const http = require("http");

//middleware to handle body parser
const parseBody = function (req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error("Invalid JSON"));
      }
    });
  });
};

const server = http.createServer(async (req, res) => {
  
  if (req.method !== "GET") {
    try {
      req["body"] = await parseBody(req);
    } catch (error) {
      res.writeHead(400, {
        "content-type": "application/json",
      });
      res.end(
        JSON.stringify({
          error: error.message,
        }),
      );
    }
  }

  if (req.url === "/health" && req.method === "GET") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(
      JSON.stringify({
        status: "ok",
        serverStatus: "alive",
      }),
    );
    return;
  }

  if (req.url === "/echo" && req.method === "POST") {
    res.writeHead(201, {
      "content-type": "application/json",
    });
    res.end(
      JSON.stringify({
        success: true,
      }),
    );
    return;
  }

  // if routes doesn't match this will throw 404
  res.writeHead(404, {
    "content-type": "application/json",
  });
  res.end(
    JSON.stringify({
      status: "Not Found",
    }),
  );
});

server.listen(3000, () => {
  console.log("Node server runs on:", 3000);
});
