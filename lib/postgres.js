const  pg  = require('pg') 

const pool = new pg.Pool({
	connectionString:'postgres://hmvenvrz:CVP2URt7rx1xQ7TGxFzAQh8lcrZBU-qu@satao.db.elephantsql.com/hmvenvrz'
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

