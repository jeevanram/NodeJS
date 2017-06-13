var express = require('express');
const router = express.Router();
const pg = require('pg');
const connectionString = 'postgres://postgres:welcome123@localhost:5432/postgres';
var sleep = require('system-sleep');
	
router.post('/add',(req,res,next) => {
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

router.get('/get/:todo_taskid',(req,res,done) =>{
	const results = [];
	const taskId = req.params.todo_taskid;
	sleep(50000);
	console.log(cluster.worker.id);
	pg.connect(connectionString,(err,client,done) => {
		if(err){
			done();
			console.log(err);
			return res.status(500).json({success:false,data:err});
		}
		
		const query = client.query('SELECT * FROM ToDoItems WHERE id = $1',[taskId]);
		
		query.on('row',(row) => {
			results.push(row);
		});
		
		query.on('end',() => {
			done();
			return res.json(results);
		});
	});
});

router.put('/update/:todo_taskid',(req,res,done)=>{
	const results = [];
	const taskId = req.params.todo_taskid;
	const data = {text:req.body.text, iscomplete:req.body.iscomplete}
	
	pg.connect(connectionString,(err,client,done)=>{
		if(err){
			done();
			console.log(err);
			return res.status(500).json({success:false,data:err});
		}
		
		client.query('UPDATE ToDoItems SET taskdescription=($1), iscomplete=($2) WHERE id=($3)',[data.text,data.iscomplete,taskId]);
		
		const query = client.query('SELECT * FROM ToDoItems ORDER BY id asc');
		
		query.on('row',(row)=>{
			results.push(row);
		});
		
		query.on('end',()=>{
			return res.json(results);
		});
	});
});

router.delete('/delete/:todo_taskid',(req,res,done)=>{
	const taskId = req.params.todo_taskid;
	const results = [];
	
	pg.connect(connectionString,(err,client,done)=>{
		if(err){
			done();
			console.log(err);
			return res.status(500).json({success:false,data:err});
		}
		
		client.query('DELETE FROM ToDoItems WHERE id=$1',[taskId]);
		
		query = client.query('SELECT * FROM ToDoItems ORDER BY id ASC');
		
		query.on('row',(row)=>{
			results.push(row);
		});
		
		query.on('end',()=>{
			return res.json(results);
		});
	});
});

module.exports = router;