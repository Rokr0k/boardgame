let red = new Array(8), blu = new Array(8);
let selection = -1;
let rcaught = [], bcaught = [];
const pieces = {
    'wk': '♔',
    'bk': '♚',
    'wq': '♕',
    'bq': '♛',
    'wb': '♗',
    'bb': '♝',
    'wn': '♘',
    'bn': '♞',
    'wr': '♖',
    'br': '♜',
    'wp': '♙',
    'bp': '♟'
};
(function() {
    for(var i=0; i<8; i++) {
        red[i] = new Array(8);
        blu[i] = new Array(8);
        for(var j=0; j<8; j++) {
            red[i][j] = '';
            blu[i][j] = '';
        }
    }
    red[4][7] = 'wk';
    red[3][7] = 'wq';
    red[2][7] = red[5][7] = 'wb';
    red[1][7] = red[6][7] = 'wn';
    red[0][7] = red[7][7] = 'wr';
    blu[3][7] = 'bk';
    blu[4][7] = 'bq';
    blu[2][7] = blu[5][7] = 'bb';
    blu[1][7] = blu[6][7] = 'bn';
    blu[0][7] = blu[7][7] = 'br';
    for(var i=0; i<8; i++) {
        red[i][6] = 'wp';
        blu[i][6] = 'bp';
    }
    requestAnimationFrame(draw);
})();
let pawnSelect = '';
let pawnX, pawnY;
let size;
function draw() {
    var s = Math.min(window.innerWidth, window.innerHeight);
    cvs.width = cvs.height = s;
    size = s/8;
    ctx.fillStyle = 'bisque';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = 'peru';
    for(var i=0; i<8; i++) {
        for(var j=0; j<8; j++) {
            if((i+j)&1) {
                ctx.fillRect(getPosX(i), getPosY(j), size, size);
            }
        }
    }
    ctx.font = size+'px Meiryo';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'black';
    for(var i=0; i<8; i++) {
        for(var j=0; j<8; j++) {
            if(red[i][j].length) {
                ctx.fillText(pieces[red[i][j]], getPosX(i), getPosY(j));
            }
        }
    }
    ctx.save();
    ctx.translate(cvs.width/2, cvs.height/2);
    ctx.rotate(Math.PI);
    ctx.translate(-cvs.width/2, -cvs.height/2);
    for(var i=0; i<8; i++) {
        for(var j=0; j<8; j++) {
            if(blu[i][j].length) {
                ctx.fillText(pieces[blu[i][j]], getPosX(i), getPosY(j));
            }
        }
    }
    ctx.restore();
    if(selection!=-1) {
        ctx.fillStyle = '#0004';
        ctx.fillRect(getPosX(selection.x), getPosY(selection.y), size, size);
    }
    if(pawnSelect=='w') {
        ctx.fillStyle = '#0004';
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.fillText(pieces['wq']+pieces['wb']+pieces['wn']+pieces['wr'], cvs.width/2, cvs.height/2);
    }
    if(pawnSelect=='b') {
        ctx.save();
        ctx.translate(cvs.width/2, cvs.height/2);
        ctx.rotate(Math.PI);
        ctx.translate(-cvs.width/2, -cvs.height/2);
        ctx.fillStyle = '#0004';
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.fillText(pieces['bq']+pieces['bb']+pieces['bn']+pieces['br'], cvs.width/2, cvs.height/2);
        ctx.restore();
    }
    requestAnimationFrame(draw);
}
function getPosX(x) {
    return cvs.width/8*x;
}
function getPosY(y) {
    return cvs.height/8*y;
}
cvs.onclick = e => clickEvent(e.offsetX, e.offsetY);
cvs.ontouchstart = e => clickEvent(e.touches[0].offsetX, e.touches[0].offsetY);
function clickEvent(_x, _y) {
    var x = Math.floor(_x*8/cvs.width), y = Math.floor(_y*8/cvs.height);
    if(selection==-1) {
        if(pawnSelect) {
            var s = Math.floor((_x-cvs.width/2)/size)+2;
            if(s<0||s>3)
                return;
            if(pawnSelect=='b')
                s = 3-s;
            var c = (['q','b','n','r'])[s];
            if(pawnSelect=='w') {
                red[pawnX][pawnY] = 'w'+c;
            }
            else if(pawnSelect=='b') {
                blu[pawnX][pawnY] = 'b'+c;
            }
            pawnSelect = false;
        }
        else if(red[x][y].length||blu[7-x][7-y].length) {
            selection = {x: x, y: y};
        }
    }
    else {
        if(red[selection.x][selection.y].length&&red[x][y].length==0) {
            red[x][y] = red[selection.x][selection.y];
            red[selection.x][selection.y] = '';
            if(blu[7-x][7-y].length) {
                blu[7-x][7-y] = '';
            }
            if(red[x][y]=='wp'&&!y) {
                pawnSelect = 'w';
                pawnX = x;
                pawnY = y;
            }
        }
        else if(blu[7-selection.x][7-selection.y].length&&blu[7-x][7-y].length==0) {
            blu[7-x][7-y] = blu[7-selection.x][7-selection.y];
            blu[7-selection.x][7-selection.y] = '';
            if(red[x][y].length) {
                red[x][y] = '';
            }
            if(blu[7-x][7-y]=='bp'&&7==y) {
                pawnSelect = 'b';
                pawnX = 7-x;
                pawnY = 7-y;
            }
        }
        selection = -1;
    }
}