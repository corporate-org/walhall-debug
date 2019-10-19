const ejs = require('ejs');

// Return a promise instead of a callback.
function formatDebugInfoAsHtml(debugInfo) {
  return new Promise((resolve, reject) => {
    ejs.renderFile("format-debug-info-html.ejs", {debugInfo}, function(err, str) {
      if (err) {
        reject(err);
      }
      resolve(str);
    });
  });
}

module.exports = {
  formatDebugInfoAsHtml,
};
