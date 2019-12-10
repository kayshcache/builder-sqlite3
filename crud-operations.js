// Values that can be handled by sqlite module:
/*
    $customer_name
    $customer_address
    $customer_id
    $quote
    $job_description
    $job_status
    $job_id
    $material_name
    $qty_bought
    $qty_used
    $cost
*/
function prepareKeys(table, data) {
  switch (table) {
    case 'customers':
      const { 
	name: $customer_name, 
	address: $customer_address, 
	id: $customer_id 
      } = data;
      break;
    case 'jobs':
      const {
	description: $job_description,
	_status: $job_status,
	id: $job_id,
	quote: $quote
      } = data;
      break;
    case 'materials':
      break;
  }
}

function insertRecord(db, table, data) {

  const dataKeys = Object.keys(data);
  const dataKeysNoDollar = dataKeys.map(key => key.slice(1));
  const sql =`
      INSERT INTO ${table}(${dataKeysNoDollar.join(', ')})
      VALUES (${dataKeys.join(', ')});
    `;

  return new Promise ((resolve, reject) => {
    db.run(sql, data, function(result, error) {
      if(error) {
	reject(error);
      }
      resolve(this.lastID);
    });
  });
}

function readRecords(db, table, data) {
  const sql =`
    SELECT ${data} FROM ${table};
  `;

  return new Promise ((resolve, reject) => {
    db.get(sql, function(error, row) {
      if(error) {
	reject(error);
      }
      resolve(row);
    });
  });
}

function deleteRecords(db, table, conditions) {
  const sql =`
    DELETE FROM ${table} WHERE ${conditions};
  `;

  return new Promise ((resolve, reject) => {
    db.run(sql, function(error) {
      if(error) {
	reject(error);
      }
      resolve(this);
    });
  });
}

module.exports = {
  insertRecord,
  readRecords,
  deleteRecords,
};
