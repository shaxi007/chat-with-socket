const  pg  = require('pg') 

const pool = new pg.Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'postgres',
	port: 5432,
	password: "5596"
})

async function fetch (query, ...array) {
	const client = await pool.connect()
	try {
		const { rows:[row] } = await client.query(query, array.length ? array : null)
		return row
	} catch(error) {
		throw error
	} finally {
		await client.release()
	}
}

async function fetchAll (query, ...array) {
	const client = await pool.connect()
	try {
		const { rows } = await client.query(query, array.length ? array : null)
		return rows
	} catch(error) {
		throw error
	} finally {
		await client.release()
	}
}

module.exports={
	fetch,
	fetchAll
} 

