function Piece(x, y, type, potential=type) {
	this.x = x;
	this.y = y;
	this.type = type;
	this.potential = potential;
}
var up = new Array(
	new Piece(4, 0, 0),
	new Piece(0, 2, 1),
	new Piece(1, 2, 1),
	new Piece(2, 2, 1),
	new Piece(3, 2, 1),
	new Piece(4, 2, 1),
	new Piece(5, 2, 1),
	new Piece(6, 2, 1),
	new Piece(7, 2, 1),
	new Piece(8, 2, 1),
	new Piece(7, 1, 2),
	new Piece(1, 1, 3),
	new Piece(0, 0, 4),
	new Piece(1, 0, 5),
	new Piece(2, 0, 6),
	new Piece(3, 0, 7),
	new Piece(5, 0, 7),
	new Piece(6, 0, 6),
	new Piece(7, 0, 5),
	new Piece(8, 0, 4)
);
var down = new Array(
	new Piece(4, 8, 0),
	new Piece(0, 6, 1),
	new Piece(1, 6, 1),
	new Piece(2, 6, 1),
	new Piece(3, 6, 1),
	new Piece(4, 6, 1),
	new Piece(5, 6, 1),
	new Piece(6, 6, 1),
	new Piece(7, 6, 1),
	new Piece(8, 6, 1),
	new Piece(1, 7, 2),
	new Piece(7, 7, 3),
	new Piece(0, 8, 4),
	new Piece(1, 8, 5),
	new Piece(2, 8, 6),
	new Piece(3, 8, 7),
	new Piece(5, 8, 7),
	new Piece(6, 8, 6),
	new Piece(7, 8, 5),
	new Piece(8, 8, 4)
);
var upCapture = new Array(), downCapture = new Array();
var available = new Array();
var upIcon = ["王將", "歩兵", "角行", "飛車", "香車", "桂馬", "銀將", "金將", "龍王", "龍馬", "成銀", "成桂", "成香", "と"];
var downIcon = ["玉將", "歩兵", "角行", "飛車", "香車", "桂馬", "銀將", "金將", "龍王", "龍馬", "成銀", "成桂", "成香", "と"];
var nariAv = [false, true, true, true, true, true, true, false, false, false, false, false, false, false];
var nari = [0, 13, 9, 8, 12, 11, 10, 7, 8, 9, 10, 11, 12, 13];
var interval;
function update() {
	context.fillStyle="rgb(255, 218, 157)";
	context.fillRect(0, 0, width, height);
	context.strokeStyle="black";
	context.beginPath();
	for(var i=0; i<10; i++) {
		context.moveTo(i*80+90, 90);
		context.lineTo(i*80+90, 810);
	}
	for(var i=0; i<10; i++) {
		context.moveTo(90, i*80+90);
		context.lineTo(810, i*80+90);
	}
	context.stroke();
	context.closePath();
	available.forEach(function (item, index, array) {
		context.fillStyle = "grey";
		context.fillRect(item.x*80+95, item.y*80+95, 70, 70);
	});
	up.forEach(function (item, index, array) {
		context.font = "20pt ＭＳ 明朝";
		context.textAlign = "center";
		context.fillStyle = "black";
		if(item.type>=8)
			context.fillStyle = "red";
		context.textBaseline = "bottom";
		context.fillText(upIcon[item.type], item.x*80+130, item.y*80+130);
		context.textBaseline = "top";
		context.fillText("▼", item.x*80+130, item.y*80+130);
	});
	down.forEach(function (item, index, array) {
		context.font = "20pt ＭＳ 明朝";
		context.textAlign = "center";
		context.fillStyle = "black";
		if(item.type>=8)
			context.fillStyle = "red";
		context.textBaseline = "bottom";
		context.fillText("▲", item.x*80+130, item.y*80+130);
		context.textBaseline = "top";
		context.fillText(downIcon[item.type], item.x*80+130, item.y*80+130);
	});
	upCapture.forEach(function (item, index, array) {
		context.font = "20pt ＭＳ 明朝";
		context.textAlign = "center";
		context.fillStyle = "black";
		context.textBaseline = "middle";
		context.fillText(downIcon[item.type][0], 50+30*index, 50);
	});
	downCapture.forEach(function (item, index, array) {
		context.font = "20pt ＭＳ 明朝";
		context.textAlign = "center";
		context.fillStyle = "black";
		context.textBaseline = "middle";
		context.fillText(upIcon[item.type][0], 850-30*index, 850);
	});
	if(down[0].type!=0) {
		alert("王状の勝ち！");
		clearInterval(interval);
		location.reload();
	} else if(up[0].type!=0) {
		alert("玉状の勝ち！");
		clearInterval(interval);
		location.reload();
	}
}
interval = setInterval(update, 5);
var revival = false;
canvas.onclick = function() {
	var x = event.offsetX;
	var y = event.offsetY;
	if(selected>=0) {
		if(!revival) {
			var res=-1;
			available.forEach(function (item, index, array) {
				if(Math.abs(x-item.x*80-130)<=40&&Math.abs(y-item.y*80-130)<=40) {
					res = index;
					return;
				}
			});
			if(res>=0) {
				if(turn=="d") {
					if(((available[res].type==1||available[res].type==4)&&available[res].y==0)||(available[res].type==5&&available[res].y<=1))
						available[res].type = nari[available[res].type];
					if(nariAv[available[res].type]&&(available[res].y<=2||down[selected].y<=2)) {
						if(confirm("成りますか？")) {
							available[res].type = nari[available[res].type];
						}
					}
					down[selected] = available[res];
					up.forEach(function (item, index, array) {
						if(down[selected].x==item.x&&down[selected].y==item.y) {
							item.type = item.potential;
							downCapture.push(item);
							up.splice(index, 1);
							return;
						}
					});
					turn = "u";
				} else if(turn=="u") {
					if(((available[res].type==1||available[res].type==4)&&available[res].y==8)||(available[res].type==5&&available[res].y>=7))
						available[res].type = nari[available[res].type];
					if(nariAv[available[res].type]&&(available[res].y>=6||up[selected].y>=6)) {
						if(confirm("成りますか？")) {
							available[res].type = nari[available[res].type];
						}
					}
					up[selected] = available[res];
					down.forEach(function (item, index, array) {
						if(up[selected].x==item.x&&up[selected].y==item.y) {
							item.type = item.potential;
							upCapture.push(item);
							down.splice(index, 1);
							return;
						}
					});
					turn = "d";
				}
			}
		} else {
			var res=-1;
			available.forEach(function (item, index, array) {
				if(Math.abs(x-item.x*80-130)<=40&&Math.abs(y-item.y*80-130)<=40) {
					res = index;
					return;
				}
			});
			if(res>=0) {
				if(turn=="d") {
					down.push(available[res]);
					downCapture.splice(selected, 1);
					turn = "u";
				} else if(turn=="u") {
					up.push(available[res]);
					upCapture.splice(selected, 1);
					turn = "d";
				}
			}
			revival = false;
		}
		available = new Array();
		selected = -1;
	} else {
		var dav = new Array(), uav = new Array();
		for(var i=0; i<9; i++) {
			dav[i] = new Array(true, true, true, true, true, true, true, true, true);
			uav[i] = new Array(true, true, true, true, true, true, true, true, true);
		}
		if(turn=="d") {
			down.forEach(function (item, index, array) {
				dav[item.x][item.y] = false;
				if(selected<0&&Math.abs(x-item.x*80-130)<=40&&Math.abs(y-item.y*80-130)<=40)
					selected = index;
			});
			up.forEach(function (item, index, array) {
				uav[item.x][item.y] = false;
			});
			if(selected>=0) {
				var sltd = down[selected];
				switch(sltd.type) {
				case 0:
					if(sltd.x+1<9&&dav[sltd.x+1][sltd.y])
						available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type, sltd.potential);
					if(sltd.x-1>=0&&dav[sltd.x-1][sltd.y])
						available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type, sltd.potential);
					if(sltd.y+1<9&&dav[sltd.x][sltd.y+1])
						available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type, sltd.potential);
					if(sltd.y-1>=0&&dav[sltd.x][sltd.y-1])
						available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type, sltd.potential);
					if(sltd.x+1<9&&sltd.y+1<9&&dav[sltd.x+1][sltd.y+1])
						available[available.length] = new Piece(sltd.x+1, sltd.y+1, sltd.type, sltd.potential);
					if(sltd.x+1<9&&sltd.y-1>=0&&dav[sltd.x+1][sltd.y-1])
						available[available.length] = new Piece(sltd.x+1, sltd.y-1, sltd.type, sltd.potential);
					if(sltd.x-1>=0&&sltd.y+1<9&&dav[sltd.x-1][sltd.y+1])
						available[available.length] = new Piece(sltd.x-1, sltd.y+1, sltd.type, sltd.potential);
					if(sltd.x-1>=0&&sltd.y-1>=0&&dav[sltd.x-1][sltd.y-1])
						available[available.length] = new Piece(sltd.x-1, sltd.y-1, sltd.type, sltd.potential);
					break;
				case 1:
					if(sltd.y-1>=0&&dav[sltd.x][sltd.y-1])
						available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type, sltd.potential);
					break;
				case 2:
					var a=true, b=true, c=true, d=true;
					for(var i=1; i<9; i++) {
						if(a&&sltd.x+i<9&&sltd.y+i<9) {
							if(dav[sltd.x+i][sltd.y+i])
								available[available.length] = new Piece(sltd.x+i, sltd.y+i, sltd.type, sltd.potential);
							if(!dav[sltd.x+i][sltd.y+i]||!uav[sltd.x+i][sltd.y+i])
								a = false;
						}
						if(b&&sltd.x-i>=0&&sltd.y+i<9) {
							if(dav[sltd.x-i][sltd.y+i])
								available[available.length] = new Piece(sltd.x-i, sltd.y+i, sltd.type, sltd.potential);
							if(!dav[sltd.x-i][sltd.y+i]||!uav[sltd.x-i][sltd.y+i])
								b = false;
						}
						if(c&&sltd.x+i<9&&sltd.y-i>=0) {
							if(dav[sltd.x+i][sltd.y-i])
								available[available.length] = new Piece(sltd.x+i, sltd.y-i, sltd.type, sltd.potential);
							if(!dav[sltd.x+i][sltd.y-i]||!uav[sltd.x+i][sltd.y-i])
								c = false;
						}
						if(d&&sltd.x-i>=0&&sltd.y-i>=0) {
							if(dav[sltd.x-i][sltd.y-i])
								available[available.length] = new Piece(sltd.x-i, sltd.y-i, sltd.type, sltd.potential);
							if(!dav[sltd.x-i][sltd.y-i]||!uav[sltd.x-i][sltd.y-i])
								d = false;
						}
					}
					break;
				case 3:
					var a=true, b=true, c=true, d=true;
					for(var i=1; i<9; i++) {
						if(a&&sltd.x+i<9) {
							if(dav[sltd.x+i][sltd.y])
								available[available.length] = new Piece(sltd.x+i, sltd.y, sltd.type, sltd.potential);
							if(!dav[sltd.x+i][sltd.y]||!uav[sltd.x+i][sltd.y])
								a = false;
						}
						if(b&&sltd.y+i<9) {
							if(dav[sltd.x][sltd.y+i])
								available[available.length] = new Piece(sltd.x, sltd.y+i, sltd.type, sltd.potential);
							if(!dav[sltd.x][sltd.y+i]||!uav[sltd.x][sltd.y+i])
								b = false;
						}
						if(c&&sltd.x-i>=0) {
							if(dav[sltd.x-i][sltd.y])
								available[available.length] = new Piece(sltd.x-i, sltd.y, sltd.type, sltd.potential);
							if(!dav[sltd.x-i][sltd.y]||!uav[sltd.x-i][sltd.y])
								c = false;
						}
						if(d&&sltd.y-i>=0) {
							if(dav[sltd.x][sltd.y-i])
								available[available.length] = new Piece(sltd.x, sltd.y-i, sltd.type, sltd.potential);
							if(!dav[sltd.x][sltd.y-i]||!uav[sltd.x][sltd.y-i])
								d = false;
						}
					}
					break;
				case 4:
					for(var i=1; sltd.y-i>=0; i++) {
						if(dav[sltd.x][sltd.y-i])
							available[available.length] = new Piece(sltd.x, sltd.y-i, sltd.type, sltd.potential);
						if(!dav[sltd.x][sltd.y-i]||!uav[sltd.x][sltd.y-i])
							break;
					}
					break;
				case 5:
					if(sltd.y-2>=0) {
						if(sltd.x+1<9&&dav[sltd.x+1][sltd.y-2])
							available[available.length] = new Piece(sltd.x+1, sltd.y-2, sltd.type, sltd.potential);
						if(sltd.x-1>=0&&dav[sltd.x-1][sltd.y-2])
							available[available.length] = new Piece(sltd.x-1, sltd.y-2, sltd.type, sltd.potential);
					}
					break;
				case 6:
					var dx = new Array(-1, 0, 1, -1, 1);
					var dy = new Array(-1, -1, -1, 1, 1);
					for(var i=0; i<5; i++) {
						if(sltd.x+dx[i]<9&&sltd.x+dx[i]>=0&&sltd.y+dy[i]<9&&sltd.y+dy[i]>=0&&dav[sltd.x+dx[i]][sltd.y+dy[i]])
							available[available.length] = new Piece(sltd.x+dx[i], sltd.y+dy[i], sltd.type, sltd.potential);
					}
					break;
				case 8:
					var a=true, b=true, c=true, d=true;
					for(var i=1; i<9; i++) {
						if(a&&sltd.x+i<9) {
							if(dav[sltd.x+i][sltd.y])
								available[available.length] = new Piece(sltd.x+i, sltd.y, sltd.type, sltd.potential);
							if(!dav[sltd.x+i][sltd.y]||!uav[sltd.x+i][sltd.y])
								a = false;
						}
						if(b&&sltd.y+i<9) {
							if(dav[sltd.x][sltd.y+i])
								available[available.length] = new Piece(sltd.x, sltd.y+i, sltd.type, sltd.potential);
							if(!dav[sltd.x][sltd.y+i]||!uav[sltd.x][sltd.y+i])
								b = false;
						}
						if(c&&sltd.x-i>=0) {
							if(dav[sltd.x-i][sltd.y])
								available[available.length] = new Piece(sltd.x-i, sltd.y, sltd.type, sltd.potential);
							if(!dav[sltd.x-i][sltd.y]||!uav[sltd.x-i][sltd.y])
								c = false;
						}
						if(d&&sltd.y-i>=0) {
							if(dav[sltd.x][sltd.y-i])
								available[available.length] = new Piece(sltd.x, sltd.y-i, sltd.type, sltd.potential);
							if(!dav[sltd.x][sltd.y-i]||!uav[sltd.x][sltd.y-i])
								d = false;
						}
					}
					var dx = new Array(1, 1, -1, -1);
					var dy = new Array(1, -1, 1, -1);
					for(var i=0; i<4; i++) {
						if(sltd.x+dx[i]<9&&sltd.x+dx[i]>=0&&sltd.y+dy[i]<9&&sltd.y+dy[i]>=0&&dav[sltd.x+dx[i]][sltd.y+dy[i]])
							available[available.length] = new Piece(sltd.x+dx[i], sltd.y+dy[i], sltd.type, sltd.potential);
					}
					break;
				case 9:
					var a=true, b=true, c=true, d=true;
					for(var i=1; i<9; i++) {
						if(a&&sltd.x+i<9&&sltd.y+i<9) {
							if(dav[sltd.x+i][sltd.y+i])
								available[available.length] = new Piece(sltd.x+i, sltd.y+i, sltd.type, sltd.potential);
							if(!dav[sltd.x+i][sltd.y+i]||!uav[sltd.x+i][sltd.y+i])
								a = false;
						}
						if(b&&sltd.x-i>=0&&sltd.y+i<9) {
							if(dav[sltd.x-i][sltd.y+i])
								available[available.length] = new Piece(sltd.x-i, sltd.y+i, sltd.type, sltd.potential);
							if(!dav[sltd.x-i][sltd.y+i]||!uav[sltd.x-i][sltd.y+i])
								b = false;
						}
						if(c&&sltd.x+i<9&&sltd.y-i>=0) {
							if(dav[sltd.x+i][sltd.y-i])
								available[available.length] = new Piece(sltd.x+i, sltd.y-i, sltd.type, sltd.potential);
							if(!dav[sltd.x+i][sltd.y-i]||!uav[sltd.x+i][sltd.y-i])
								c = false;
						}
						if(d&&sltd.x-i>=0&&sltd.y-i>=0) {
							if(dav[sltd.x-i][sltd.y-i])
								available[available.length] = new Piece(sltd.x-i, sltd.y-i, sltd.type, sltd.potential);
							if(!dav[sltd.x-i][sltd.y-i]||!uav[sltd.x-i][sltd.y-i])
								d = false;
						}
					}
					var dx = new Array(0, 1, 0, -1);
					var dy = new Array(1, 0, -1, 0);
					for(var i=0; i<4; i++) {
						if(sltd.x+dx[i]<9&&sltd.x+dx[i]>=0&&sltd.y+dy[i]<9&&sltd.y+dy[i]>=0&&dav[sltd.x+dx[i]][sltd.y+dy[i]])
							available[available.length] = new Piece(sltd.x+dx[i], sltd.y+dy[i], sltd.type, sltd.potential);
					}
					break;
				case 7:
				case 10:
				case 11:
					var dx = new Array(-1, 0, 1, -1, 1, 0);
					var dy = new Array(-1, -1, -1, 0, 0, 1);
					for(var i=0; i<6; i++) {
						if(sltd.x+dx[i]<9&&sltd.x+dx[i]>=0&&sltd.y+dy[i]<9&&sltd.y+dy[i]>=0&&dav[sltd.x+dx[i]][sltd.y+dy[i]])
							available[available.length] = new Piece(sltd.x+dx[i], sltd.y+dy[i], sltd.type, sltd.potential);
					}
					break;
				}
			} else {
				downCapture.forEach(function (item, index, array) {
					if(selected<0&&Math.abs(x+index*30-850)<=20&&Math.abs(y-850)<=20)
					selected = index;
					revival = true;
				});
				if(revival) {
					var sltd = downCapture[selected];
					var fuhyou = new Array(false, false, false, false, false, false, false, false, false);
					down.forEach(function (item, index, array) {
						if(item.type==1)
							fuhyou[item.x] = true;
					});
					for(var i=0; i<9; i++)
						for(var j=0; j<9; j++)
							if(dav[i][j]&&uav[i][j]) {
								if(sltd.type==1&&(fuhyou[i]||j==0))
									continue;
								if(sltd.type==4&&j==0)
									continue;
								if(sltd.type==5&&j<=1)
									continue;
								available[available.length] = new Piece(i, j, sltd.type);
							}
				}
			}
		} else if(turn=="u") {
			up.forEach(function (item, index, array) {
				uav[item.x][item.y] = false;
				if(selected<0&&Math.abs(x-item.x*80-130)<=40&&Math.abs(y-item.y*80-130)<=40)
					selected = index;
			});
			down.forEach(function (item, index, array) {
				dav[item.x][item.y] = false;
			});
			if(selected>=0) {
				var sltd = up[selected];
				switch(sltd.type) {
				case 0:
					if(sltd.x+1<9&&uav[sltd.x+1][sltd.y])
						available[available.length] = new Piece(sltd.x+1, sltd.y, sltd.type, sltd.potential);
					if(sltd.x-1>=0&&uav[sltd.x-1][sltd.y])
						available[available.length] = new Piece(sltd.x-1, sltd.y, sltd.type, sltd.potential);
					if(sltd.y+1<9&&uav[sltd.x][sltd.y+1])
						available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type, sltd.potential);
					if(sltd.y-1>=0&&uav[sltd.x][sltd.y-1])
						available[available.length] = new Piece(sltd.x, sltd.y-1, sltd.type, sltd.potential);
					if(sltd.x+1<9&&sltd.y+1<9&&uav[sltd.x+1][sltd.y+1])
						available[available.length] = new Piece(sltd.x+1, sltd.y+1, sltd.type, sltd.potential);
					if(sltd.x+1<9&&sltd.y-1>=0&&uav[sltd.x+1][sltd.y-1])
						available[available.length] = new Piece(sltd.x+1, sltd.y-1, sltd.type, sltd.potential);
					if(sltd.x-1>=0&&sltd.y+1<9&&uav[sltd.x-1][sltd.y+1])
						available[available.length] = new Piece(sltd.x-1, sltd.y+1, sltd.type, sltd.potential);
					if(sltd.x-1>=0&&sltd.y-1>=0&&uav[sltd.x-1][sltd.y-1])
						available[available.length] = new Piece(sltd.x-1, sltd.y-1, sltd.type, sltd.potential);
					break;
				case 1:
					if(sltd.y+1<9&&uav[sltd.x][sltd.y+1])
						available[available.length] = new Piece(sltd.x, sltd.y+1, sltd.type, sltd.potential);
					break;
				case 2:
					var a=true, b=true, c=true, d=true;
					for(var i=1; i<9; i++) {
						if(a&&sltd.x+i<9&&sltd.y+i<9) {
							if(uav[sltd.x+i][sltd.y+i])
								available[available.length] = new Piece(sltd.x+i, sltd.y+i, sltd.type, sltd.potential);
							if(!uav[sltd.x+i][sltd.y+i]||!dav[sltd.x+i][sltd.y+i])
								a = false;
						}
						if(b&&sltd.x-i>=0&&sltd.y+i<9) {
							if(uav[sltd.x-i][sltd.y+i])
								available[available.length] = new Piece(sltd.x-i, sltd.y+i, sltd.type, sltd.potential);
							if(!uav[sltd.x-i][sltd.y+i]||!dav[sltd.x-i][sltd.y+i])
								b = false;
						}
						if(c&&sltd.x+i<9&&sltd.y-i>=0) {
							if(uav[sltd.x+i][sltd.y-i])
								available[available.length] = new Piece(sltd.x+i, sltd.y-i, sltd.type, sltd.potential);
							if(!uav[sltd.x+i][sltd.y-i]||!dav[sltd.x+i][sltd.y-i])
								c = false;
						}
						if(d&&sltd.x-i>=0&&sltd.y-i>=0) {
							if(uav[sltd.x-i][sltd.y-i])
								available[available.length] = new Piece(sltd.x-i, sltd.y-i, sltd.type, sltd.potential);
							if(!uav[sltd.x-i][sltd.y-i]||!dav[sltd.x-i][sltd.y-i])
								d = false;
						}
					}
					break;
				case 3:
					var a=true, b=true, c=true, d=true;
					for(var i=1; i<9; i++) {
						if(a&&sltd.x+i<9) {
							if(uav[sltd.x+i][sltd.y])
								available[available.length] = new Piece(sltd.x+i, sltd.y, sltd.type, sltd.potential);
							if(!uav[sltd.x+i][sltd.y]||!dav[sltd.x+i][sltd.y])
								a = false;
						}
						if(b&&sltd.y+i<9) {
							if(uav[sltd.x][sltd.y+i])
								available[available.length] = new Piece(sltd.x, sltd.y+i, sltd.type, sltd.potential);
							if(!uav[sltd.x][sltd.y+i]||!dav[sltd.x][sltd.y+i])
								b = false;
						}
						if(c&&sltd.x-i>=0) {
							if(uav[sltd.x-i][sltd.y])
								available[available.length] = new Piece(sltd.x-i, sltd.y, sltd.type, sltd.potential);
							if(!uav[sltd.x-i][sltd.y]||!dav[sltd.x-i][sltd.y])
								c = false;
						}
						if(d&&sltd.y-i>=0) {
							if(uav[sltd.x][sltd.y-i])
								available[available.length] = new Piece(sltd.x, sltd.y-i, sltd.type, sltd.potential);
							if(!uav[sltd.x][sltd.y-i]||!dav[sltd.x][sltd.y-i])
								d = false;
						}
					}
					break;
				case 4:
					for(var i=1; sltd.y+i<9; i++) {
						if(uav[sltd.x][sltd.y+i])
							available[available.length] = new Piece(sltd.x, sltd.y+i, sltd.type, sltd.potential);
						if(!uav[sltd.x][sltd.y+i]||!dav[sltd.x][sltd.y+i])
							break;
					}
					break;
				case 5:
					if(sltd.y+2>=0) {
						if(sltd.x+1<9&&uav[sltd.x+1][sltd.y+2])
							available[available.length] = new Piece(sltd.x+1, sltd.y+2, sltd.type, sltd.potential);
						if(sltd.x-1>=0&&uav[sltd.x-1][sltd.y+2])
							available[available.length] = new Piece(sltd.x-1, sltd.y+2, sltd.type, sltd.potential);
					}
					break;
				case 6:
					var dx = new Array(-1, 0, 1, -1, 1);
					var dy = new Array(1, 1, 1, -1, -1);
					for(var i=0; i<5; i++) {
						if(sltd.x+dx[i]<9&&sltd.x+dx[i]>=0&&sltd.y+dy[i]<9&&sltd.y+dy[i]>=0&&uav[sltd.x+dx[i]][sltd.y+dy[i]])
							available[available.length] = new Piece(sltd.x+dx[i], sltd.y+dy[i], sltd.type, sltd.potential);
					}
					break;
				case 8:
					var a=true, b=true, c=true, d=true;
					for(var i=1; i<9; i++) {
						if(a&&sltd.x+i<9) {
							if(uav[sltd.x+i][sltd.y])
								available[available.length] = new Piece(sltd.x+i, sltd.y, sltd.type, sltd.potential);
							if(!uav[sltd.x+i][sltd.y]||!dav[sltd.x+i][sltd.y])
								a = false;
						}
						if(b&&sltd.y+i<9) {
							if(uav[sltd.x][sltd.y+i])
								available[available.length] = new Piece(sltd.x, sltd.y+i, sltd.type, sltd.potential);
							if(!uav[sltd.x][sltd.y+i]||!dav[sltd.x][sltd.y+i])
								b = false;
						}
						if(c&&sltd.x-i>=0) {
							if(uav[sltd.x-i][sltd.y])
								available[available.length] = new Piece(sltd.x-i, sltd.y, sltd.type, sltd.potential);
							if(!uav[sltd.x-i][sltd.y]||!dav[sltd.x-i][sltd.y])
								c = false;
						}
						if(d&&sltd.y-i>=0) {
							if(uav[sltd.x][sltd.y-i])
								available[available.length] = new Piece(sltd.x, sltd.y-i, sltd.type, sltd.potential);
							if(!uav[sltd.x][sltd.y-i]||!dav[sltd.x][sltd.y-i])
								d = false;
						}
					}
					var dx = new Array(1, 1, -1, -1);
					var dy = new Array(1, -1, 1, -1);
					for(var i=0; i<4; i++) {
						if(sltd.x+dx[i]<9&&sltd.x+dx[i]>=0&&sltd.y+dy[i]<9&&sltd.y+dy[i]>=0&&uav[sltd.x+dx[i]][sltd.y+dy[i]])
							available[available.length] = new Piece(sltd.x+dx[i], sltd.y+dy[i], sltd.type, sltd.potential);
					}
					break;
				case 9:
					var a=true, b=true, c=true, d=true;
					for(var i=1; i<9; i++) {
						if(a&&sltd.x+i<9&&sltd.y+i<9) {
							if(uav[sltd.x+i][sltd.y+i])
								available[available.length] = new Piece(sltd.x+i, sltd.y+i, sltd.type, sltd.potential);
							if(!uav[sltd.x+i][sltd.y+i]||!dav[sltd.x+i][sltd.y+i])
								a = false;
						}
						if(b&&sltd.x-i>=0&&sltd.y+i<9) {
							if(uav[sltd.x-i][sltd.y+i])
								available[available.length] = new Piece(sltd.x-i, sltd.y+i, sltd.type, sltd.potential);
							if(!uav[sltd.x-i][sltd.y+i]||!dav[sltd.x-i][sltd.y+i])
								b = false;
						}
						if(c&&sltd.x+i<9&&sltd.y-i>=0) {
							if(uav[sltd.x+i][sltd.y-i])
								available[available.length] = new Piece(sltd.x+i, sltd.y-i, sltd.type, sltd.potential);
							if(!uav[sltd.x+i][sltd.y-i]||!dav[sltd.x+i][sltd.y-i])
								c = false;
						}
						if(d&&sltd.x-i>=0&&sltd.y-i>=0) {
							if(uav[sltd.x-i][sltd.y-i])
								available[available.length] = new Piece(sltd.x-i, sltd.y-i, sltd.type, sltd.potential);
							if(!uav[sltd.x-i][sltd.y-i]||!dav[sltd.x-i][sltd.y-i])
								d = false;
						}
					}
					var dx = new Array(1, 0, -1, 0);
					var dy = new Array(0, 1, 0, -1);
					for(var i=0; i<4; i++) {
						if(sltd.x+dx[i]<9&&sltd.x+dx[i]>=0&&sltd.y+dy[i]<9&&sltd.y+dy[i]>=0&&uav[sltd.x+dx[i]][sltd.y+dy[i]])
							available[available.length] = new Piece(sltd.x+dx[i], sltd.y+dy[i], sltd.type, sltd.potential);
					}
					break;
				case 7:
				case 10:
				case 11:
					var dx = new Array(-1, 0, 1, -1, 1, 0);
					var dy = new Array(1, 1, 1, 0, 0, -1);
					for(var i=0; i<6; i++) {
						if(sltd.x+dx[i]<9&&sltd.x+dx[i]>=0&&sltd.y+dy[i]<9&&sltd.y+dy[i]>=0&&uav[sltd.x+dx[i]][sltd.y+dy[i]])
							available[available.length] = new Piece(sltd.x+dx[i], sltd.y+dy[i], sltd.type, sltd.potential);
					}
					break;
				}
			} else {
				upCapture.forEach(function (item, index, array) {
					if(selected<0&&Math.abs(x-index*30-50)<=20&&Math.abs(y-50)<=20)
					selected = index;
					revival = true;
				});
				if(revival) {
					var sltd = upCapture[selected];
					var fuhyou = new Array(false, false, false, false, false, false, false, false, false);
					up.forEach(function (item, index, array) {
						if(item.type==1)
							fuhyou[item.x] = true;
					});
					for(var i=0; i<9; i++)
						for(var j=0; j<9; j++)
							if(dav[i][j]&&uav[i][j]) {
								if(sltd.type==1&&(fuhyou[i]||j==0))
									continue;
								if(sltd.type==4&&j==0)
									continue;
								if(sltd.type==5&&j<=1)
									continue;
								available[available.length] = new Piece(i, j, sltd.type);
							}
				}
			}
		}
		if(available.length<=0) {
			selected = -1;
			revival = false;
		}
	}
}