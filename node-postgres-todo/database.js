const pg = require('pg');
const connectionString = 'postgres://postgres:welcome123@localhost:5432/postgres';
const client = new pg.Client(connectionString);
client.connect();

const query = client.query('CREATE TABLE ToDoItems(id SERIAL PRIMARY KEY, taskDescription VARCHAR(40) NOT NULL, isComplete BOOLEAN)');
query.on('end',()=>{client.end();});