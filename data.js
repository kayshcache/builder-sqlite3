/*
    Let's use JavaScript to:
		* create a connection to the database
        * create tables
        * insert mock records
*/

// IMPORT SQLITE3 AND FAKER: require dependencies
const sqlite = require('sqlite3').verbose();
const fakeData = require('faker');

const customerTableLength = 4;
const jobTableLength = 4;

// INITIALISE DATABASE: initialising an object that lets you control the db
const db = new sqlite.Database('./db/builder.db');

// DATABASE COMMANDS: the place where you call functions to do db operations
db.serialize(function() {
  // Call functions to do stuff to the database

//  insertCustomer(createMockCustomer()).then(customerId => console.log('New cust: ' + customerId)).catch(err => console.log(err));
//   insertJob(createMockJob()).then(jobId => console.log('New job: ' + jobId)).catch(err => console.log(err));
   insertMaterial(createMockMaterial()).then(materialId => console.log('New material: ' + materialId)).catch(err => console.log(err));
});

// FUNCTIONS TO CREATE TABLES: functions which parameterise SQL queries and perform operation


// FUNCTIONS TO INSERT RECORDS
//
function insertCustomer(customer) {
  // Sqlite3 package uses this parameters object and finds the dollar sign keys
  // $keys must be named according to db.schema
  const parameters = {
    $customer_name: customer.customerName,
    $customer_address: customer.customerAddress
  };

  const sql = `
    INSERT INTO customers(customer_name, customer_address)
    VALUES ($customer_name, $customer_address)
  `;

  return new Promise((resolve, reject) => {
    // DB.run callback must not be an arrow function
    // because arrow functions don't bind to the this
    // key word.
    db.run(sql, parameters, function(result, error) {
      if(error) {
	reject(error)
      }
      resolve(this.lastID)
    });
  });
}

function insertJob(job) {
  const parameters = {
    $customer_id: job.customerId,
    $quote: job.quote,
    $job_description: job.jobDescription,
    $job_status: job.jobStatus,
  };

  const sql = `
    INSERT INTO jobs(customer_id, quote, job_description, job_status)
    VALUES ($customer_id, $quote, $job_description, $job_status)
  `;

  return new Promise((resolve, reject) => {
    db.run(sql, parameters, function(result, error) {
      if(error) {
	reject(error)
      }
      resolve(this.lastID)
    });
  });
}

function insertMaterial(mat) {
  const parameters = {
    $job_id: mat.job,
    $material_name: mat.name,
    $qty_bought: mat.qty_bought,
    $qty_used: mat.qty_used,
    $cost: mat.cost,
  };

  const sql = `
    INSERT INTO materials(job_id, material_name, qty_bought, qty_used, cost)
    VALUES ($job_id, $material_name, $qty_bought, $qty_used, $cost)
  `;

  return new Promise((resolve, reject) => {
    db.run(sql, parameters, function(result, error) {
      if(error) {
	reject(error)
      }
      resolve(this.lastID)
    });
  });
}


// HELPER FUNCTIONS

function randomNumberInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createMockCustomer() {
  return {
    customerName: `${fakeData.name.firstName()} ${fakeData.name.lastName()}`,
    customerAddress: `${fakeData.address.streetAddress()}`
  }
}

function createMockJob() {
  const rando = randomNumberInRange;
  const statuses = ['quoted', 'quote accepted', 'in progress', 'complete'];

  return {
    customerId: rando(1, customerTableLength),
    quote: `${fakeData.commerce.price()}`,
    jobDescription: `${fakeData.lorem.sentences()}`,
    jobStatus: `${statuses[rando(0, 3)]}`
  }
}

function createMockMaterial() {
  const rando = randomNumberInRange;
  const qtyBought = fakeData.random.number();

  return {
    job: rando(1, jobTableLength),
    name: `${fakeData.random.word()}`,
    qty_bought: `${qtyBought}`,
    qty_used: `${qtyBought - rando(1, qtyBought)}`,
    cost: `${fakeData.commerce.price()}`
  }
}
