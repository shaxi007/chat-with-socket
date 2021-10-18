const express = require('express')
const socket  = require('socket.io')
const app = express()
const server = require('http').createServer(app)
const { fetchAll } = require('../lib/postgres.js')

const io = socket(server)
app.use( express.static('public') )


app.use((req,res,next)=>{
	res.set({
		'Access-Control-Allow-Origin':'*'
	})
	next()
})

io.on('connection',async client=> {
	client.emit('kirish',JSON.stringify(await fetchAll('SELECT * FROM messages')))
	client.on('ac',async data=>{
		JSON.stringify(await fetchAll('SELECT username FROM messages WHERE active=true'))
		client.emit('active',JSON.stringify(await fetchAll('SELECT username FROM messages WHERE active=true')))
		client.broadcast.emit('active',JSON.stringify(await fetchAll('SELECT username FROM messages WHERE active=true')))
	})
	client.on('new_message',async data=> {
		data = JSON.parse(data)
		await fetchAll('INSERT INTO messages(message_title,username,active) VALUES($1,$2,true)',data.message,data.username)
		client.emit('yangi',JSON.stringify(await fetchAll('SELECT * FROM messages')))
		client.broadcast.emit('yangi',JSON.stringify(await fetchAll('SELECT * FROM messages')))
	})
	client.on('new_user',async data=>{
		await fetchAll('UPDATE messages SET active=true WHERE username=$1',data)
		client.emit('active_us',JSON.stringify(await fetchAll('SELECT username FROM messages WHERE active=true ')))
		client.broadcast.emit('active_us',JSON.stringify(await fetchAll('SELECT username FROM messages WHERE active=true ')))
	})
	client.on('leave',async data=>{	
		await fetchAll('UPDATE messages SET active=false WHERE username=$1',data)
		client.emit('active_l',JSON.stringify(await fetchAll('SELECT username FROM messages WHERE active=true ')))
		client.broadcast.emit('active_l',JSON.stringify(await fetchAll('SELECT username FROM messages WHERE active=true ')))
	})


})

server.listen(process.env.PORT, function() {
	console.log('http://localhost:'+8080)
})
