var board = new Array()
for(var i=0; i<19; i++) {
	board[i] = new Array('v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v')
}
function update() {
	context.fillStyle = "#FFDD88"
	context.fillRect(0, 0, width, height)
	context.beginPath()
	for(var i=0; i<19; i++) {
		context.moveTo(i*44+54, 54)
		context.lineTo(i*44+54, 846)
		context.moveTo(54, i*44+54)
		context.lineTo(846, i*44+54)
	}
	context.strokeStyle = "black"
	context.stroke()
	context.closePath()
	context.fillStyle = "black"
	context.beginPath()
	context.arc(186, 186, 5, 0, 2*Math.PI)
	context.fill()
	context.closePath()
	context.beginPath()
	context.arc(186, 714, 5, 0, 2*Math.PI)
	context.fill()
	context.closePath()
	context.beginPath()
	context.arc(714, 186, 5, 0, 2*Math.PI)
	context.fill()
	context.closePath()
	context.beginPath()
	context.arc(714, 714, 5, 0, 2*Math.PI)
	context.fill()
	context.closePath()
	context.beginPath()
	context.arc(186, 450, 5, 0, 2*Math.PI)
	context.fill()
	context.closePath()
	context.beginPath()
	context.arc(450, 186, 5, 0, 2*Math.PI)
	context.fill()
	context.closePath()
	context.beginPath()
	context.arc(714, 450, 5, 0, 2*Math.PI)
	context.fill()
	context.closePath()
	context.beginPath()
	context.arc(450, 714, 5, 0, 2*Math.PI)
	context.fill()
	context.closePath()
	context.beginPath()
	context.arc(450, 450, 5, 0, 2*Math.PI)
	context.fill()
	context.closePath()
	for(var i=0; i<19; i++) {
		for(var j=0; j<19; j++) {
			if(board[i][j]=='v')
				continue
			context.beginPath()
			context.arc(i*44+54, j*44+54, 20, 0, 2*Math.PI)
			context.fillStyle = board[i][j]
			context.fill()
			context.closePath()
		}
	}
}
update()
canvas.onmousedown = function(e) {
	var x = parseInt((e.offsetX-32)/44)
	var y = parseInt((e.offsetY-32)/44)
	if(x>18||y>18)
		return
	if(board[x][y]!='v') {
		board[x][y] = 'v'
		update()
		return
	}
	document.getElementsByName("mode").forEach(function (item, index, array) {
		if(item.checked)
			board[x][y] = item.value
	})
	update()
}