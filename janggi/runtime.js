function Piece(x, y, type) {
	this.x = x;
	this.y = y;
	this.type = type;
}
var red = new Array(
	new Piece(4, 1, 0),
	new Piece(0, 3, 1),
	new Piece(2, 3, 1),
	new Piece(4, 3, 1),
	new Piece(6, 3, 1),
	new Piece(8, 3, 1),
	new Piece(0, 0, 2),
	new Piece(8, 0, 2),
	new Piece(1, 0, 3),
	new Piece(7, 0, 3),
	new Piece(2, 0, 4),
	new Piece(6, 0, 4),
	new Piece(1, 2, 5),
	new Piece(7, 2, 5),
	new Piece(3, 0, 6),
	new Piece(5, 0, 6)
);
var blu = new Array(
	new Piece(4, 8, 0),
	new Piece(0, 6, 1),
	new Piece(2, 6, 1),
	new Piece(4, 6, 1),
	new Piece(6, 6, 1),
	new Piece(8, 6, 1),
	new Piece(0, 9, 2),
	new Piece(8, 9, 2),
	new Piece(1, 9, 3),
	new Piece(7, 9, 3),
	new Piece(2, 9, 4),
	new Piece(6, 9, 4),
	new Piece(1, 7, 5),
	new Piece(7, 7, 5),
	new Piece(3, 9, 6),
	new Piece(5, 9, 6),
);
var available = new Array();
var size = [50, 20, 30, 30, 30, 30, 20];
var redIcon = ["漢", "卒", "車", "馬", "象", "包", "士"];
var bluIcon = ["楚", "兵", "車", "馬", "象", "包", "士"];
var interval;
function update() {
	context.fillStyle="rgb(255, 198, 107)";
	context.fillRect(0, 0, width, height);
	context.strokeStyle="black";
	context.beginPath();
	for(var i=0; i<9; i++) {
		context.moveTo(i*80+130, 90);
		context.lineTo(i*80+130, 810);
	}
	for(var i=0; i<10; i++) {
		context.moveTo(130, i*80+90);
		context.lineTo(770, i*80+90);
	}
	var dx = new Array(1, 1, -1, -1);
	var dy = new Array(1, -1, -1, 1);
	for(var i=0; i<4; i++) {
		context.moveTo(450, 170);
		context.lineTo(80*dx[i]+450, 80*dy[i]+170);
		context.moveTo(450, 730);
		context.lineTo(80*dx[i]+450, 80*dy[i]+730);
	}
	context.stroke();
	context.closePath();
	red.forEach(function (item, index, array) {
		context.beginPath();
		context.arc(item.x*80+130, item.y*80+90, size[item.type], 0, Math.PI*2);
		context.fillStyle = "white";
		context.fill();
		context.closePath();
		context.font = size[item.type] + "pt JhengHei";
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillStyle = "red";
		context.fillText(redIcon[item.type], item.x*80+130, item.y*80+90);
	});
	blu.forEach(function (item, index, array) {
		context.beginPath();
		context.arc(item.x*80+130, item.y*80+90, size[item.type], 0, Math.PI*2);
		context.fillStyle = "white";
		context.fill();
		context.closePath();
		context.font = size[item.type] + "pt Kaiti";
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillStyle = "blue";
		context.fillText(bluIcon[item.type], item.x*80+130, item.y*80+90);
	});
	available.forEach(function (item, index, array) {
		context.beginPath();
		context.arc(item.x*80+130, item.y*80+90, size[item.type], 0, Math.PI*2);
		context.strokeStyle = "grey";
		context.stroke();
		context.closePath();
	});
	if(blu[0].type!=0) {
		alert("한나라 승!");
		clearInterval(interval);
		location.reload();
	} else if(red[0].type!=0) {
		alert("초나라 승!");
		clearInterval(interval);
		location.reload();
	}
}
interval = setInterval(update, 5);
canvas.onclick = function() {
	var x = event.offsetX;
	var y = event.offsetY;
	if(selected>=0) {
		var res=-1;
		available.forEach(function (item, index, array) {
			if(Math.pow(x-item.x*80-130, 2)+Math.pow(y-item.y*80-90, 2)<=Math.pow(size[item.type], 2)) {
				res = index;
				return;
			}
		});
		if(res>=0) {
			if(!started) {
				redSelect.remove();
				bluSelect.remove();
				started = true;
			}
			if(turn=="b") {
				blu[selected] = available[res];
				red.forEach(function (item, index, array) {
					if(blu[selected].x==item.x&&blu[selected].y==item.y) {
						red.splice(index, 1);
						return;
					}
				});
				turn = "r";
			} else if(turn=="r") {
				red[selected] = available[res];
				blu.forEach(function (item, index, array) {
					if(red[selected].x==item.x&&red[selected].y==item.y) {
						blu.splice(index, 1);
						return;
					}
				});
				turn = "b";
			}
		}
		available = new Array();
		selected = -1;
	} else {
		var bav = new Array(), rav = new Array();
		for(var i=0; i<9; i++) {
			bav[i] = new Array(true, true, true, true, true, true, true, true, true, true);
			rav[i] = new Array(true, true, true, true, true, true, true, true, true, true);
		}
		if(turn=="b") {
			blu.forEach(function (item, index, array) {
				bav[item.x][item.y] = false;
				if(selected<0&&Math.pow(x-item.x*80-130, 2)+Math.pow(y-item.y*80-90, 2)<=Math.pow(size[item.type], 2))
					selected = index;
			});
			red.forEach(function (item, index, array) {
				rav[item.x][item.y] = false;
			});
			if(selected>=0) {
				var sltd = blu[selected];
				switch(sltd.type) {
				case 0:
					var xx = sltd.x - 4, yy = sltd.y - 8;
					if(xx>0) {
						if(yy>0) {
							if(bav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(bav[sltd.x-1][sltd.y-1])
								available[available.length] = new Piece(sltd.x-1, sltd.y-1, sltd.type);
						} else if(yy<0) {
							if(bav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
							if(bav[sltd.x-1][sltd.y+1])
								available[available.length] = new Piece(sltd.x-1, sltd.y+1, sltd.type);
						} else {
							if(bav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(bav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
						}
					} else if(xx<0) {
						if(yy>0) {
							if(bav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(bav[sltd.x+1][sltd.y-1])
								available[available.length] = new Piece(sltd.x+1, sltd.y-1, sltd.type);
						} else if(yy<0) {
							if(bav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
							if(bav[sltd.x+1][sltd.y+1])
								available[available.length] = new Piece(sltd.x+1, sltd.y+1, sltd.type);
						} else {
							if(bav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(bav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
						}
					} else {
						if(yy>0) {
							if(bav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(bav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
						} else if(yy<0) {
							if(bav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(bav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
						} else {
							if(bav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(bav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
							if(bav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(bav[sltd.x+1][sltd.y+1])
								available[available.length] = new Piece(sltd.x+1, sltd.y+1, sltd.type);
							if(bav[sltd.x+1][sltd.y-1])
								available[available.length] = new Piece(sltd.x+1, sltd.y-1, sltd.type);
							if(bav[sltd.x-1][sltd.y+1])
								available[available.length] = new Piece(sltd.x-1, sltd.y+1, sltd.type);
							if(bav[sltd.x-1][sltd.y-1])
								available[available.length] = new Piece(sltd.x-1, sltd.y-1, sltd.type);
						}
					}
					break;
				case 1:
					if(sltd.x-1>=0&&bav[sltd.x-1][sltd.y])
						available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
					if(sltd.x+1<9&&bav[sltd.x+1][sltd.y])
						available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
					if(sltd.y-1>=0&&bav[sltd.x][sltd.y-1])
						available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
					break;
				case 2:
					for(var i=1; sltd.y-i>=0&&bav[sltd.x][sltd.y-i]&&rav[sltd.x][sltd.y-i+1]; i++)
						available[available.length] = new Piece(sltd.x, sltd.y-i, sltd.type);
					for(var i=1; sltd.y+i<10&&bav[sltd.x][sltd.y+i]&&rav[sltd.x][sltd.y+i-1]; i++)
						available[available.length] = new Piece(sltd.x, sltd.y+i, sltd.type);
					for(var i=1; sltd.x-i>=0&&bav[sltd.x-i][sltd.y]&&rav[sltd.x-i+1][sltd.y]; i++)
						available[available.length] = new Piece(sltd.x-i, sltd.y, sltd.type);
					for(var i=1; sltd.x+i<9&&bav[sltd.x+1][sltd.y]&&rav[sltd.x+i-1][sltd.y]; i++)
						available[available.length] = new Piece(sltd.x+i, sltd.y, sltd.type);
					if(sltd.x==3||sltd.x==5) {
						if(bav[4][8]&&(sltd.y==9||sltd.y==7))
							available[available.length] = new Piece(4, 8, sltd.type);
						if(bav[4][1]&&(sltd.y==0||sltd.y==2))
							available[available.length] = new Piece(4, 1, sltd.type);
					}
					break;
				case 3:
					if(sltd.x+1<9&&sltd.y+2<10&&bav[sltd.x][sltd.y+1]&&rav[sltd.x][sltd.y+1]&&bav[sltd.x+1][sltd.y+2])
						available[available.length] = new Piece(sltd.x+1, sltd.y+2, sltd.type);
					if(sltd.x-1>=0&&sltd.y+2<10&&bav[sltd.x][sltd.y+1]&&rav[sltd.x][sltd.y+1]&&bav[sltd.x-1][sltd.y+2])
						available[available.length] = new Piece(sltd.x-1, sltd.y+2, sltd.type);
					if(sltd.x+1<9&&sltd.y-2>=0&&bav[sltd.x][sltd.y-1]&&rav[sltd.x][sltd.y-1]&&bav[sltd.x+1][sltd.y-2])
						available[available.length] = new Piece(sltd.x+1, sltd.y-2, sltd.type);
					if(sltd.x-1>=0&&sltd.y-2>=0&&bav[sltd.x][sltd.y-1]&&rav[sltd.x][sltd.y-1]&&bav[sltd.x-1][sltd.y-2])
						available[available.length] = new Piece(sltd.x-1, sltd.y-2, sltd.type);
					if(sltd.x+2<9&&sltd.y+1<10&&bav[sltd.x+1][sltd.y]&&rav[sltd.x+1][sltd.y]&&bav[sltd.x+2][sltd.y+1])
						available[available.length] = new Piece(sltd.x+2, sltd.y+1, sltd.type);
					if(sltd.x+2<9&&sltd.y-1>=0&&bav[sltd.x+1][sltd.y]&&rav[sltd.x+1][sltd.y]&&bav[sltd.x+2][sltd.y-1])
						available[available.length] = new Piece(sltd.x+2, sltd.y-1, sltd.type);
					if(sltd.x-2>=0&&sltd.y+1<10&&bav[sltd.x-1][sltd.y]&&rav[sltd.x-1][sltd.y]&&bav[sltd.x-2][sltd.y+1])
						available[available.length] = new Piece(sltd.x-2, sltd.y+1, sltd.type);
					if(sltd.x-2>=0&&sltd.y-1>=0&&bav[sltd.x-1][sltd.y]&&rav[sltd.x-1][sltd.y]&&bav[sltd.x-2][sltd.y-1])
						available[available.length] = new Piece(sltd.x-2, sltd.y-1, sltd.type);
					break;
				case 4:
					if(sltd.x+2<9&&sltd.y+3<10&&bav[sltd.x][sltd.y+1]&&rav[sltd.x][sltd.y+1]&&bav[sltd.x+1][sltd.y+2]&&rav[sltd.x+1][sltd.y+2]&&bav[sltd.x+2][sltd.y+3])
						available[available.length] = new Piece(sltd.x+2, sltd.y+3, sltd.type);
					if(sltd.x-2>=0&&sltd.y+3<10&&bav[sltd.x][sltd.y+1]&&rav[sltd.x][sltd.y+1]&&bav[sltd.x-1][sltd.y+2]&&rav[sltd.x-1][sltd.y+2]&&bav[sltd.x-2][sltd.y+3])
						available[available.length] = new Piece(sltd.x-2, sltd.y+3, sltd.type);
					if(sltd.x+2<9&&sltd.y-3>=0&&bav[sltd.x][sltd.y-1]&&rav[sltd.x][sltd.y-1]&&bav[sltd.x+1][sltd.y-2]&&rav[sltd.x+1][sltd.y-2]&&bav[sltd.x+2][sltd.y-3])
						available[available.length] = new Piece(sltd.x+2, sltd.y-3, sltd.type);
					if(sltd.x-2>=0&&sltd.y-3>=0&&bav[sltd.x][sltd.y-1]&&rav[sltd.x][sltd.y-1]&&bav[sltd.x-1][sltd.y-2]&&rav[sltd.x-1][sltd.y-2]&&bav[sltd.x-2][sltd.y-3])
						available[available.length] = new Piece(sltd.x-2, sltd.y-3, sltd.type);
					if(sltd.x+3<9&&sltd.y+2<10&&bav[sltd.x+1][sltd.y]&&rav[sltd.x+1][sltd.y]&&bav[sltd.x+2][sltd.y+1]&&rav[sltd.x+2][sltd.y+1]&&bav[sltd.x+3][sltd.y+2])
						available[available.length] = new Piece(sltd.x+3, sltd.y+2, sltd.type);
					if(sltd.x+3<9&&sltd.y-2>=0&&bav[sltd.x+1][sltd.y]&&rav[sltd.x+1][sltd.y]&&bav[sltd.x+2][sltd.y-1]&&rav[sltd.x+2][sltd.y-1]&&bav[sltd.x+3][sltd.y-2])
						available[available.length] = new Piece(sltd.x+3, sltd.y-2, sltd.type);
					if(sltd.x-3>=0&&sltd.y+2<10&&bav[sltd.x-1][sltd.y]&&rav[sltd.x-1][sltd.y]&&bav[sltd.x-2][sltd.y+1]&&rav[sltd.x-2][sltd.y+1]&&bav[sltd.x-3][sltd.y+2])
						available[available.length] = new Piece(sltd.x-3, sltd.y+2, sltd.type);
					if(sltd.x-3>=0&&sltd.y-2>=0&&bav[sltd.x-1][sltd.y]&&rav[sltd.x-1][sltd.y]&&bav[sltd.x-2][sltd.y-1]&&rav[sltd.x-2][sltd.y-1]&&bav[sltd.x-3][sltd.y-2])
						available[available.length] = new Piece(sltd.x-3, sltd.y-2, sltd.type);
					break;
				case 5:
					var po = new Array();
					for(var i=0; i<9; i++)
						po[i] = new Array(true, true, true, true, true, true, true, true, true, true);
					red.forEach(function (item, index, array) {
						if(item.type==5)
							po[item.x][item.y] = false;
					});
					blu.forEach(function (item, index, array) {
						if(item.type==5)
							po[item.x][item.y] = false;
					});
					var cnt=0;
					for(var i=1; sltd.y-i>=0&&cnt<2&&po[sltd.x][sltd.y-i]; i++) {
						if(cnt>=1&&bav[sltd.x][sltd.y-i])
							available[available.length] = new Piece(sltd.x, sltd.y-i, sltd.type);
						if(!bav[sltd.x][sltd.y-i]||!rav[sltd.x][sltd.y-i])
							cnt++;
					}
					cnt=0;
					for(var i=1; sltd.y+i<10&&cnt<2&&po[sltd.x][sltd.y+i]; i++) {
						if(cnt>=1&&bav[sltd.x][sltd.y+i])
							available[available.length] = new Piece(sltd.x, sltd.y+i, sltd.type);
						if(!bav[sltd.x][sltd.y+i]||!rav[sltd.x][sltd.y+i])
							cnt++;
					}
					cnt=0;
					for(var i=1; sltd.x-i>=0&&cnt<2&&po[sltd.x-i][sltd.y]; i++) {
						if(cnt>=1&&bav[sltd.x-i][sltd.y])
							available[available.length] = new Piece(sltd.x-i, sltd.y, sltd.type);
						if(!bav[sltd.x-i][sltd.y]||!rav[sltd.x-i][sltd.y])
							cnt++;
					}
					cnt=0;
					for(var i=1; sltd.x+i<9&&cnt<2&&po[sltd.x+i][sltd.y]; i++) {
						if(cnt>=1&&bav[sltd.x+i][sltd.y])
							available[available.length] = new Piece(sltd.x+i, sltd.y, sltd.type);
						if(!bav[sltd.x+i][sltd.y]||!rav[sltd.x+i][sltd.y])
							cnt++;
					}
					break;
				case 6:
					var xx = sltd.x - 4, yy = sltd.y - 8;
					if(xx>0) {
						if(yy>0) {
							if(bav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(bav[sltd.x-1][sltd.y-1])
								available[available.length] = new Piece(sltd.x-1, sltd.y-1, sltd.type);
						} else if(yy<0) {
							if(bav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
							if(bav[sltd.x-1][sltd.y-1])
								available[available.length] = new Piece(sltd.x-1, sltd.y+1, sltd.type);
						} else {
							if(bav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(bav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
						}
					} else if(xx<0) {
						if(yy>0) {
							if(bav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(bav[sltd.x+1][sltd.y-1])
								available[available.length] = new Piece(sltd.x+1, sltd.y-1, sltd.type);
						} else if(yy<0) {
							if(bav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
							if(bav[sltd.x+1][sltd.y+1])
								available[available.length] = new Piece(sltd.x+1, sltd.y+1, sltd.type);
						} else {
							if(bav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(bav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
						}
					} else {
						if(yy>0) {
							if(bav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(bav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
						} else if(yy<0) {
							if(bav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(bav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
						} else {
							if(bav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(bav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(bav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
							if(bav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(bav[sltd.x+1][sltd.y+1])
								available[available.length] = new Piece(sltd.x+1, sltd.y+1, sltd.type);
							if(bav[sltd.x+1][sltd.y-1])
								available[available.length] = new Piece(sltd.x+1, sltd.y-1, sltd.type);
							if(bav[sltd.x-1][sltd.y+1])
								available[available.length] = new Piece(sltd.x-1, sltd.y+1, sltd.type);
							if(bav[sltd.x-1][sltd.y-1])
								available[available.length] = new Piece(sltd.x-1, sltd.y-1, sltd.type);
						}
					}
					break;
				}
			}
		} else if(turn=="r") {
			red.forEach(function (item, index, array) {
				rav[item.x][item.y] = false;
				if(selected<0&&Math.pow(x-item.x*80-130, 2)+Math.pow(y-item.y*80-90, 2)<=Math.pow(size[item.type], 2))
					selected = index;
			});
			blu.forEach(function (item, index, array) {
				bav[item.x][item.y] = false;
			});
			if(selected>=0) {
				var sltd = red[selected];
				switch(sltd.type) {
				case 0:
					var xx = sltd.x - 4, yy = sltd.y - 1;
					if(xx>0) {
						if(yy>0) {
							if(rav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(rav[sltd.x-1][sltd.y-1])
								available[available.length] = new Piece(sltd.x-1, sltd.y-1, sltd.type);
						} else if(yy<0) {
							if(rav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
							if(rav[sltd.x-1][sltd.y-1])
								available[available.length] = new Piece(sltd.x-1, sltd.y+1, sltd.type);
						} else {
							if(rav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(rav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
						}
					} else if(xx<0) {
						if(yy>0) {
							if(rav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(rav[sltd.x+1][sltd.y-1])
								available[available.length] = new Piece(sltd.x+1, sltd.y-1, sltd.type);
						} else if(yy<0) {
							if(rav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
							if(rav[sltd.x+1][sltd.y+1])
								available[available.length] = new Piece(sltd.x+1, sltd.y+1, sltd.type);
						} else {
							if(rav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(rav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
						}
					} else {
						if(yy>0) {
							if(rav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(rav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
						} else if(yy<0) {
							if(rav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(rav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
						} else {
							if(rav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(rav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
							if(rav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(rav[sltd.x+1][sltd.y+1])
								available[available.length] = new Piece(sltd.x+1, sltd.y+1, sltd.type);
							if(rav[sltd.x+1][sltd.y-1])
								available[available.length] = new Piece(sltd.x+1, sltd.y-1, sltd.type);
							if(rav[sltd.x-1][sltd.y+1])
								available[available.length] = new Piece(sltd.x-1, sltd.y+1, sltd.type);
							if(rav[sltd.x-1][sltd.y-1])
								available[available.length] = new Piece(sltd.x-1, sltd.y-1, sltd.type);
						}
					}
					break;
				case 1:
					if(sltd.x-1>=0&&rav[sltd.x-1][sltd.y])
						available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
					if(sltd.x+1<9&&rav[sltd.x+1][sltd.y])
						available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
					if(sltd.y-1>=0&&rav[sltd.x][sltd.y+1])
						available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
					break;
				case 2:
					for(var i=1; sltd.y-i>=0&&rav[sltd.x][sltd.y-i]&&bav[sltd.x][sltd.y-i+1]; i++)
						available[available.length] = new Piece(sltd.x, sltd.y-i, sltd.type);
					for(var i=1; sltd.y+i<10&&rav[sltd.x][sltd.y+i]&&bav[sltd.x][sltd.y+i-1]; i++)
						available[available.length] = new Piece(sltd.x, sltd.y+i, sltd.type);
					for(var i=1; sltd.x-i>=0&&rav[sltd.x-i][sltd.y]&&bav[sltd.x-i+1][sltd.y]; i++)
						available[available.length] = new Piece(sltd.x-i, sltd.y, sltd.type);
					for(var i=1; sltd.x+i<9&&rav[sltd.x+1][sltd.y]&&bav[sltd.x+i-1][sltd.y]; i++)
						available[available.length] = new Piece(sltd.x+i, sltd.y, sltd.type);
					if(sltd.x==3||sltd.x==5) {
						if(rav[4][8]&&(sltd.y==9||sltd.y==7))
							available[available.length] = new Piece(4, 8, sltd.type);
						if(rav[4][1]&&(sltd.y==0||sltd.y==2))
							available[available.length] = new Piece(4, 1, sltd.type);
					}
					break;
				case 3:
					if(sltd.x+1<9&&sltd.y+2<10&&rav[sltd.x][sltd.y+1]&&bav[sltd.x][sltd.y+1]&&rav[sltd.x+1][sltd.y+2])
						available[available.length] = new Piece(sltd.x+1, sltd.y+2, sltd.type);
					if(sltd.x-1>=0&&sltd.y+2<10&&rav[sltd.x][sltd.y+1]&&bav[sltd.x][sltd.y+1]&&rav[sltd.x-1][sltd.y+2])
						available[available.length] = new Piece(sltd.x-1, sltd.y+2, sltd.type);
					if(sltd.x+1<9&&sltd.y-2>=0&&rav[sltd.x][sltd.y-1]&&bav[sltd.x][sltd.y-1]&&rav[sltd.x+1][sltd.y-2])
						available[available.length] = new Piece(sltd.x+1, sltd.y-2, sltd.type);
					if(sltd.x-1>=0&&sltd.y-2>=0&&rav[sltd.x][sltd.y-1]&&bav[sltd.x][sltd.y-1]&&rav[sltd.x-1][sltd.y-2])
						available[available.length] = new Piece(sltd.x-1, sltd.y-2, sltd.type);
					if(sltd.x+2<9&&sltd.y+1<10&&rav[sltd.x+1][sltd.y]&&bav[sltd.x+1][sltd.y]&&rav[sltd.x+2][sltd.y+1])
						available[available.length] = new Piece(sltd.x+2, sltd.y+1, sltd.type);
					if(sltd.x+2<9&&sltd.y-1>=0&&rav[sltd.x+1][sltd.y]&&bav[sltd.x+1][sltd.y]&&rav[sltd.x+2][sltd.y-1])
						available[available.length] = new Piece(sltd.x+2, sltd.y-1, sltd.type);
					if(sltd.x-2>=0&&sltd.y+1<10&&rav[sltd.x-1][sltd.y]&&bav[sltd.x-1][sltd.y]&&rav[sltd.x-2][sltd.y+1])
						available[available.length] = new Piece(sltd.x-2, sltd.y+1, sltd.type);
					if(sltd.x-2>=0&&sltd.y-1>=0&&rav[sltd.x-1][sltd.y]&&bav[sltd.x-1][sltd.y]&&rav[sltd.x-2][sltd.y-1])
						available[available.length] = new Piece(sltd.x-2, sltd.y-1, sltd.type);
					break;
				case 4:
					if(sltd.x+2<9&&sltd.y+3<10&&rav[sltd.x][sltd.y+1]&&bav[sltd.x][sltd.y+1]&&rav[sltd.x+1][sltd.y+2]&&bav[sltd.x+1][sltd.y+2]&&rav[sltd.x+2][sltd.y+3])
						available[available.length] = new Piece(sltd.x+2, sltd.y+3, sltd.type);
					if(sltd.x-2>=0&&sltd.y+3<10&&rav[sltd.x][sltd.y+1]&&bav[sltd.x][sltd.y+1]&&rav[sltd.x-1][sltd.y+2]&&bav[sltd.x-1][sltd.y+2]&&rav[sltd.x-2][sltd.y+3])
						available[available.length] = new Piece(sltd.x-2, sltd.y+3, sltd.type);
					if(sltd.x+2<9&&sltd.y-3>=0&&rav[sltd.x][sltd.y-1]&&bav[sltd.x][sltd.y-1]&&rav[sltd.x+1][sltd.y-2]&&bav[sltd.x+1][sltd.y-2]&&rav[sltd.x+2][sltd.y-3])
						available[available.length] = new Piece(sltd.x+2, sltd.y-3, sltd.type);
					if(sltd.x-2>=0&&sltd.y-3>=0&&rav[sltd.x][sltd.y-1]&&bav[sltd.x][sltd.y-1]&&rav[sltd.x-1][sltd.y-2]&&bav[sltd.x-1][sltd.y-2]&&rav[sltd.x-2][sltd.y-3])
						available[available.length] = new Piece(sltd.x-2, sltd.y-3, sltd.type);
					if(sltd.x+3<9&&sltd.y+2<10&&rav[sltd.x+1][sltd.y]&&bav[sltd.x+1][sltd.y]&&rav[sltd.x+2][sltd.y+1]&&bav[sltd.x+2][sltd.y+1]&&rav[sltd.x+3][sltd.y+2])
						available[available.length] = new Piece(sltd.x+3, sltd.y+2, sltd.type);
					if(sltd.x+3<9&&sltd.y-2>=0&&rav[sltd.x+1][sltd.y]&&bav[sltd.x+1][sltd.y]&&rav[sltd.x+2][sltd.y-1]&&bav[sltd.x+2][sltd.y-1]&&rav[sltd.x+3][sltd.y-2])
						available[available.length] = new Piece(sltd.x+3, sltd.y-2, sltd.type);
					if(sltd.x-3>=0&&sltd.y+2<10&&rav[sltd.x-1][sltd.y]&&bav[sltd.x-1][sltd.y]&&rav[sltd.x-2][sltd.y+1]&&bav[sltd.x-2][sltd.y+1]&&rav[sltd.x-3][sltd.y+2])
						available[available.length] = new Piece(sltd.x-3, sltd.y+2, sltd.type);
					if(sltd.x-3>=0&&sltd.y-2>=0&&rav[sltd.x-1][sltd.y]&&bav[sltd.x-1][sltd.y]&&rav[sltd.x-2][sltd.y-1]&&bav[sltd.x-2][sltd.y-1]&&rav[sltd.x-3][sltd.y-2])
						available[available.length] = new Piece(sltd.x-3, sltd.y-2, sltd.type);
					break;
				case 5:
					var po = new Array();
					for(var i=0; i<9; i++)
						po[i] = new Array(true, true, true, true, true, true, true, true, true, true);
					blu.forEach(function (item, index, array) {
						if(item.type==5)
							po[item.x][item.y] = false;
					});
					red.forEach(function (item, index, array) {
						if(item.type==5)
							po[item.x][item.y] = false;
					});
					var cnt=0;
					for(var i=1; sltd.y-i>=0&&cnt<2&&po[sltd.x][sltd.y-i]; i++) {
						if(cnt>=1&&rav[sltd.x][sltd.y-i])
							available[available.length] = new Piece(sltd.x, sltd.y-i, sltd.type);
						if(!rav[sltd.x][sltd.y-i]||!bav[sltd.x][sltd.y-i])
							cnt++;
					}
					cnt=0;
					for(var i=1; sltd.y+i<10&&cnt<2&&po[sltd.x][sltd.y+i]; i++) {
						if(cnt>=1&&rav[sltd.x][sltd.y+i])
							available[available.length] = new Piece(sltd.x, sltd.y+i, sltd.type);
						if(!rav[sltd.x][sltd.y+i]||!bav[sltd.x][sltd.y+i])
							cnt++;
					}
					cnt=0;
					for(var i=1; sltd.x-i>=0&&cnt<2&&po[sltd.x-i][sltd.y]; i++) {
						if(cnt>=1&&rav[sltd.x-i][sltd.y])
							available[available.length] = new Piece(sltd.x-i, sltd.y, sltd.type);
						if(!rav[sltd.x-i][sltd.y]||!bav[sltd.x-i][sltd.y])
							cnt++;
					}
					cnt=0;
					for(var i=1; sltd.x+i<9&&cnt<2&&po[sltd.x+i][sltd.y]; i++) {
						if(cnt>=1&&rav[sltd.x+i][sltd.y])
							available[available.length] = new Piece(sltd.x+i, sltd.y, sltd.type);
						if(!rav[sltd.x+i][sltd.y]||!bav[sltd.x+i][sltd.y])
							cnt++;
					}
					break;
				case 6:
					var xx = sltd.x - 4, yy = sltd.y - 1;
					if(xx>0) {
						if(yy>0) {
							if(rav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(rav[sltd.x-1][sltd.y-1])
								available[available.length] = new Piece(sltd.x-1, sltd.y-1, sltd.type);
						} else if(yy<0) {
							if(rav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
							if(rav[sltd.x-1][sltd.y-1])
								available[available.length] = new Piece(sltd.x-1, sltd.y+1, sltd.type);
						} else {
							if(rav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(rav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
						}
					} else if(xx<0) {
						if(yy>0) {
							if(rav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(rav[sltd.x+1][sltd.y-1])
								available[available.length] = new Piece(sltd.x+1, sltd.y-1, sltd.type);
						} else if(yy<0) {
							if(rav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
							if(rav[sltd.x+1][sltd.y+1])
								available[available.length] = new Piece(sltd.x+1, sltd.y+1, sltd.type);
						} else {
							if(rav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(rav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
						}
					} else {
						if(yy>0) {
							if(rav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(rav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
						} else if(yy<0) {
							if(rav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(rav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
						} else {
							if(rav[sltd.x+1][sltd.y])
								available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type);
							if(rav[sltd.x-1][sltd.y])
								available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type);
							if(rav[sltd.x][sltd.y+1])
								available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type);
							if(rav[sltd.x][sltd.y-1])
								available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type);
							if(rav[sltd.x+1][sltd.y+1])
								available[available.length] = new Piece(sltd.x+1, sltd.y+1, sltd.type);
							if(rav[sltd.x+1][sltd.y-1])
								available[available.length] = new Piece(sltd.x+1, sltd.y-1, sltd.type);
							if(rav[sltd.x-1][sltd.y+1])
								available[available.length] = new Piece(sltd.x-1, sltd.y+1, sltd.type);
							if(rav[sltd.x-1][sltd.y-1])
								available[available.length] = new Piece(sltd.x-1, sltd.y-1, sltd.type);
						}
					}
					break;
				}
			}
		}
		if(available.length<=0)
			selected = -1;
	}
}
function bluChange() {
	var res;
	document.getElementsByName("blu").forEach(function (item, index, array) {
		if(item.checked)
			res = item.value;
	});
	switch(res) {
	case "in":
		blu[8] = new Piece(1, 9, 3);
		blu[9] = new Piece(7, 9, 3);
		blu[10] = new Piece(2, 9, 4);
		blu[11] = new Piece(6, 9, 4);
		break;
	case "out":
		blu[8] = new Piece(2, 9, 3);
		blu[9] = new Piece(6, 9, 3);
		blu[10] = new Piece(1, 9, 4);
		blu[11] = new Piece(7, 9, 4);
		break;
	case "left":
		blu[8] = new Piece(2, 9, 3);
		blu[9] = new Piece(7, 9, 3);
		blu[10] = new Piece(1, 9, 4);
		blu[11] = new Piece(6, 9, 4);
		break;
	case "right":
		blu[8] = new Piece(1, 9, 3);
		blu[9] = new Piece(6, 9, 3);
		blu[10] = new Piece(2, 9, 4);
		blu[11] = new Piece(7, 9, 4);
		break;
	}
}
function redChange() {
	var res;
	document.getElementsByName("red").forEach(function (item, index, array) {
		if(item.checked)
			res = item.value;
	});
	switch(res) {
	case "in":
		red[8] = new Piece(1, 0, 3);
		red[9] = new Piece(7, 0, 3);
		red[10] = new Piece(2, 0, 4);
		red[11] = new Piece(6, 0, 4);
		break;
	case "out":
		red[8] = new Piece(2, 0, 3);
		red[9] = new Piece(6, 0, 3);
		red[10] = new Piece(1, 0, 4);
		red[11] = new Piece(7, 0, 4);
		break;
	case "left":
		red[8] = new Piece(1, 0, 3);
		red[9] = new Piece(6, 0, 3);
		red[10] = new Piece(2, 0, 4);
		red[11] = new Piece(7, 0, 4);
		break;
	case "right":
		red[8] = new Piece(2, 0, 3);
		red[9] = new Piece(7, 0, 3);
		red[10] = new Piece(1, 0, 4);
		red[11] = new Piece(6, 0, 4);
		break;
	}
}