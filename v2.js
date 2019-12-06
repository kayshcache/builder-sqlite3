const sqlite = require('sqlite3').verbose();
const fakeData = require('faker');
const { createMockCustomer, createMockJob, createMockMaterial } = require('./helpers');

const customerTableLength = 4;
const jobTableLength = 4;

// INITIALISE DATABASE: initialising an object that lets you control the db
const db = new sqlite.Database('./db/builder.db');

// DATABASE COMMANDS: the place where you call functions to do db operations
db.serialize(function() {

  insertRecord('customers', createMockCustomer())
    .then(customerId => console.log('New cust: ' + customerId))
    .catch(err => console.log(err));

  insertRecord('jobs', createMockJob(customerTableLength))
    .then(jobId => console.log('New job: ' + jobId))
    .catch(err => console.log(err));

  insertRecord('materials', createMockMaterial(jobTableLength))
    .then(materialId => console.log('New material: ' + materialId))
    .catch(err => console.log(err));
});

// FUNCTIONS TO CREATE TABLES: functions which parameterise SQL queries and perform operation
function insertRecord(table, data) {
  const parameters = data;
  const dataKeys = Object.keys(data);
  const dataKeysNoDollar = dataKeys.map(key => key.slice(1));
  const sql =`
      INSERT INTO ${table}(${dataKeysNoDollar.join(', ')})
      VALUES (${dataKeys.join(', ')});
    `;

  return new Promise ((resolve, reject) => {
    db.run(sql, parameters, function(result, error) {
      if(error) {
	reject(error);
      }
      resolve(this.lastID);
    });
  });
}

// HELPER FUNCTIONS
// Moved to ./helper.js

