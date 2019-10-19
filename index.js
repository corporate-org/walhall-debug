const http = require("http");
const url = require("url");
const {testDatabase} = require("./test-db");
const {formatDebugInfoAsHtml} = require("./format-debug-info-html");

// Run the tests to collect the debug information to show in the response
// Note, this is an async function which means it returns a promise.
async function getDebugInfo() {
  return {
    timestamp: (new Date()).toISOString(),
    env : process.env,
    database : await testDatabase(process.env.DATABASE_USER,
      process.env.DATABASE_PASSWORD,
      process.env.DATABASE_NAME,
      process.env.DATABASE_HOST,
      process.env.DATABASE_PORT),
  };
}

const httpServer = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url);

  // Log all requests made to the server
  console.log(`${req.method} ${req.url}`);

  // We only support the GET method so reject everything else.
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET');
    res.end();
  } else {

    // Lots of browsers will request the favicon - so explicitly say this does not exist.
    if (reqUrl.pathname === "/favicon.ico") {
      res.statusCode = 404;
      res.end();
      return;
    }

    const queryString = reqUrl.query ? reqUrl.query : "";
    console.log(`This is an INFO level message. [${queryString}]`);
    console.error(`This is an ERROR level message. [${queryString}]`);

    res.statusCode = 200;

    // Some diagnostic tests are asynchonus, so we use a Promise to pick up when they
    // all finish
    getDebugInfo().then(async (debugInfo) => {
      if (reqUrl.pathname === "/json") {
        // Handle the JSON version of the endpoint
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(debugInfo));
      } else {
        // For ease of use, we serve the HTML version on anything that is not /json
        res.setHeader('Content-Type', 'text/html');
        res.end(await formatDebugInfoAsHtml(debugInfo));
      }
    });
  }
});

httpServer.listen(process.env.PORT || '8080');
