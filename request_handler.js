


/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var fs = require("fs");
var url = require("url");
exports.handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;
  var headers = defaultCorsHeaders;
  
  var addExercise = function(message) {
    var timeStamp = new Date();
    message.objectId = timeStamp.getTime();
    message.createdAt = timeStamp.toJSON();
    message.updatedAt = timeStamp.toJSON();
  }

  if (request.url === '/') {
    fs.readFile("data.tsv",'utf8', function(error, data) {
      if(error) {
        headers['Content-Type'] = "text/plain";
        statusCode = 404;
        response.writeHead("Sorry the page was not found!");
      } else {
        headers['Content-Type'] = "text/tab-separated-values";
        response.writeHead(statusCode, headers);
        response.end(data);
      }
    });
  
    fs.readFile("layout.html",'utf8', function(error, data) {
      if(error) {
        headers['Content-Type'] = "text/plain";
        statusCode = 404;
        response.writeHead("Sorry the page was not found!");
      } else {
        headers['Content-Type'] = "text/tab-separated-values";
        response.writeHead(statusCode, headers);
        response.end(data);
      }
    });
  } 

  if (request.method === "POST") {
    fs.appendFile("data.tsv", '\n' + data.date + '\t' + data.weight, function(error) {
     if(error) {
        headers['Content-Type'] = "text/plain";
        statusCode = 404;
        response.writeHead("Sorry the page was not found!");
      } else {
        headers['Content-Type'] = "text/tab-separated-values";
        response.writeHead(statusCode, headers);
        response.end(data);
      }
    })
  }


  if(request.method === 'OPTIONS') {
    headers['Content-Type'] = "text/plain";
    response.writeHead(statusCode, headers);
    response.end();
  }

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */

  /* .writeHead() tells our server what HTTP status code to send back */


  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};