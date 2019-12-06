CREATE TABLE customers(
  customer_id INTEGER PRIMARY KEY,
  customer_name TEXT NO NULL,
  customer_address TEXT NO NULL
);

CREATE TABLE jobs(
  jobs_id INTEGER PRIMARY KEY,
  customer_id INT NO NULL,
  quote REAL,
  job_description TEXT NO NULL,
  job_status TEXT NO NULL
);

CREATE TABLE materials(
  material_id INTEGER PRIMARY KEY,
  job_id INT NO NULL,
  material_name TEXT,
  qty_bought TEXT NO NULL,
  qty_used TEXT NO NULL,
  cost REAL
);
 
