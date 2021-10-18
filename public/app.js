const client = io()
const input = document.querySelector('input')
const ulElement = document.querySelector('ul')
let username;
let set= new Set()

if(!localStorage.getItem('username')){
	username = prompt('Ismingini kiriritg:')
	localStorage.setItem('username',username)
}
if(localStorage.getItem('username')) {
	client.emit('new_user',localStorage.getItem('username'))
	client.emit('ac',localStorage.getItem('username'))
}
message.onkeyup = ev =>{
	if(ev.keyCode ==13){
		let data = {
			message:ev.target.value,
			username:localStorage.getItem('username')
		}
		client.emit('new_message',JSON.stringify(data))
		ev.target.value = null
	}
}

client.on('yangi',data=>{
	data = JSON.parse(data)
    ren(data)
})

client.on('active_l',data=>{
	data = JSON.parse(data)
	console.log(data)
    ren2(data)
})
client.on('active_us',data=>{
	console.log(data)
	data = JSON.parse(data)
    ren2(data)
})

client.on('active',data=>{
	data = JSON.parse(data)
	console.log(data)
    ren2(data)
})
client.on('kir',data=>{
	data = JSON.parse(data)
    ren2(data)
})

client.on('kirish',data=>{
	kir.textContent = "Assalomu alaykum"
	ren(JSON.parse(data))
})

function ren(data){
	ulList.innerHTML = null
	let dat = new Date()
	for(let i of data){
		const liElement = document.createElement('li')
		const p = document.createElement('p')
		const pU = document.createElement('p')
		liElement.textContent = i.message_title
		p.textContent = dat.toString(i.message_time)
		pU.textContent = i.username
		liElement.append(p,pU)
		ulElement.append(liElement)
	}
}


function ren2(data){
	set = new Set()
	data.forEach(el=> set.add(el.username))
	data=[...set]
	ulAc.innerHTML = null
	for(let i of data){
		const liElement = document.createElement('li')
		const p = document.createElement('p')
		const pU = document.createElement('p')
		liElement.textContent = i
		ulAc.append(liElement)
	}
}

chiq.onclick = ()=>{
	client.emit('leave',localStorage.getItem('username'))
	window.location.reload()
	localStorage.removeItem('username')
}