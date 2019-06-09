const express = require('express');
const router = express.Router();

const Task = require('../models/task.ts');

router.get('/', async (req, res)=>{
	//res.send('hello world');
	const tasks = await Task.find();
	res.render('index', {
		tasks // tasks: tasks
	});
});

router.post('/add', async (req, res)=>{
	const task = new Task(req.body);
	await task.save();
	//res.send('received');
	res.redirect('/');
});

router.get('/turn/:id', async (req,res) =>{
	// obtiene la propiedad id de req.params
	const {id} = req.params;
	const task = await Task.findById(id);
	task.status = !task.status;
	await task.save();
	res.redirect('/');
});

router.get('/edit/:id', async (req,res) =>{
	// obtiene la propiedad id de req.params
	const {id} = req.params;
	const task = await Task.findById(id);
	res.render('edit',{
		task
	});
});

router.post('/edit/:id', async (req,res) =>{
	const {id} = req.params;
	await Task.update({_id: id}, req.body);
	res.redirect('/');
});

// :id hace referencia a que recibe un parametro
router.get('/delete/:id', async (req,res)=>{
	// obtiene la propiedad id de req.params
	const {id} = req.params;
	await Task.remove({_id: id});
	res.redirect('/');
});

module.exports = router;