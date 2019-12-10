const sqlite = require('sqlite3').verbose();
const fakeData = require('faker');
const { createMockCustomer, createMockJob, createMockMaterial } = require('./helpers');
const { insertRecord, readRecords, deleteRecords } = require('./crud-operations');

// INITIALISE DATABASE: initialising an object that lets you control the db
const db = new sqlite.Database('./db/builder.db');

// DATABASE COMMANDS: the place where you call functions to do db operations
db.serialize(async function() {
  const totals = { customers: 0, jobs: 0 };
  await readRecords(db, 'customers', 'COUNT(*) AS customers')
    .then(count => totals.customers = count.customers)
    .catch(err => console.log(err));
  await readRecords(db, 'jobs', 'COUNT(*) AS jobs')
    .then(count => totals.jobs = count.jobs)
    .catch(err => console.log(err));

  console.log(totals);

  insertRecord(db, 'customers', createMockCustomer())
    .then(customerId => console.log('New cust: ' + customerId))
    .catch(err => console.log(err));

  insertRecord(db, 'jobs', createMockJob(totals.customers))
    .then(jobId => console.log('New job: ' + jobId))
    .catch(err => console.log(err));

  insertRecord(db, 'materials', createMockMaterial(totals.jobs))
    .then(materialId => console.log('New material: ' + materialId))
    .catch(err => console.log(err));

  deleteRecords(db, 'materials', 'material_id = 1')
    .then(thisThing => console.log('This thing is a this: ' + thisThing))
    .catch(err => console.log(err));

});


// FUNCTIONS TO CREATE TABLES: functions which parameterise SQL queries and perform operation
// Moved to ./crud-operations.js
//
// HELPER FUNCTIONS
// Moved to ./helper.js

