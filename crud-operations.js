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
