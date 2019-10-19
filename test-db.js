const pg = require('pg');

// Produce a sucessful report entry
function success() {
  return {
    success: true
  };
}

// Produce a report entry for failure
function failure(err) {
  return {
    success: false,
    error : err.toString()
  }
}

async function testDatabase(user, password, database, host, port) {
  const dbReport = {
    parameters : {user, password, database, host, port}
  };
  const client = new pg.Client(dbReport.parameters);

  // Note, we use "await" to make this code seem like it is synchronus
  // The ".then(success, failure)" basically converts the result into the
  // correct format that can be used in reporting.
  dbReport.connection = await client.connect().then(success, failure);

  // It only makes sense to continue the 
  if (dbReport.connection.success) {

    dbReport.query = await client.query("SELECT 1").then(success, failure);

    dbReport.close = await client.end().then(success, failure);
  }
  return dbReport;
}

module.exports = {
  testDatabase,
};
