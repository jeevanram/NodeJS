const router = express.Router();
const pg = require('pg');
const connectionString = 'postgres://postgres:welcome123@localhost:5432/postgres';
var cluster = require('cluster');

if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

// Code to run if we're in a worker process
}
else
{
	router.post('/api/v1/todos',(req,res,next) => {
			console.log('Worker %d running!', cluster.worker.id);
		const results = [];
		const data = {text : req.body.text, complete: false};
		
		pg.connect(connectionString,(err,client,done) => {
			if(err){
				done();
				console.log(err);
				return res.status(500).json({success:false,data:err});
			}
			
			client.query('INSERT INTO ToDoItems(taskdescription,iscomplete) VALUES($1,$2)',[data.text,data.complete]);
			const query = client.query('SELECT * FROM ToDoItems ORDER BY id asc');
			
			query.on('row',(row) => {
				results.push(row);
			});
			
			query.on('end',() => {
			 done();
			 return res.json(results);
			});
		});
	});
}