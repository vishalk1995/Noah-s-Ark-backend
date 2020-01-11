const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

ping = async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test');
      const results = { 'results': (result) ? result.rows : null};
      res.send( results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  }

login = async (req, res) => {
	const checklogin = 'SELECT * from users WHERE users.name=$1'
	const getprofile = 'SELECT * from user_profile WHERE user_profile.name=$1'
	const values = [req.body.user]
	output = {}
	try {
		const client = await pool.connect()
		const results = await pool.query(checklogin, values)
		console.log("login reslut:", results)
		if ( results.rows[0].pass == req.body.pass ){
			output["result"] = "success"
			output["code"] = 200
			const profile = await pool.query(getprofile, values)
			output["profile"] = profile.rows
		} else {
			output["result"] = "failure"
			output["code"] = 400
		}
		res.send(output)
		client.release()
	} catch (err) {
		console.error(err);
		output["result"] = "failure"
		output["code"] = 400
		output["message"] = err
		res.send(output);
	}
}

getProfile = async (req, res) => {
	const getprofile = 'SELECT * from user_profile WHERE user_profile.name=$1'
	const values = [req.query.user]
	console.log("getting profile for :", values)
	output = {}
	try {
		const client = await pool.connect()
		const results = await pool.query(getprofile, values)
		output["result"] = "success"
		output["code"] = 200
		output["profile"] = results.rows
		res.send(output)
		console.log("result of query :", results)
		client.release()
	} catch (err) {
		console.error(err);
		output["result"] = "failure"
		output["code"] = 400
		output["message"] = err
		res.send(output);
	}
}

addProfile = async (req, res) => {
	const addQuery = 'insert into user_profile (name, age, phno, address, city, state, emergency, bloodgrp) values ($1, $2, $3, $4, $5, $6, $7, $8)'
	const addUser = 'insert into users (name, pass) values ($1, $2)'
	const values = [req.body.name, req.body.age, req.body.phno, req.body.addr, req.body.state, req.body.city, req.body.emergency, req.body.bloodgrp]
	const values2 = [req.body.name, req.body.passwd]
	console.log("trying to add profile with valuesL", values)
	output = {}
	try {
		const client = await pool.connect()
		const results = await pool.query(addQuery, values)
		console.log("result fo query:", results)

		const usr_result = await pool.query(addUser, values2)
		console.log("result of usr query:", usr_result)

		output["result"] = "success"
		output["code"] = 200
		
		console.log("output of api:", output)
		res.send(output)
		client.release()
	} catch (err) {
		console.error(err);
		output["result"] = "failure"
		output["code"] = 400
		output["message"] = err
		res.send(output);
	}
}

module.exports = {
	"ping": ping,
	"login": login,
	"getProfile": getProfile,
	"addProfile": addProfile
};