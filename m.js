/*
Variables to save some values
*/
var mineArray = new Array();
var time = false;
var flagNumber;
var cNum;
var rNum;
var mm;
var seconds = 0;
var explore = 0;
setInterval(function () {
    if (time) {
        $('#timer').html(seconds);
        seconds++;
    }
}, 1000);

function start(){
  seconds = 0;
  $('#timer').html(0);
  time = false;
  $('#table').html('');

  cNum = document.getElementById('cNum').value;
  rNum = document.getElementById('rNum').value;
  mm = document.getElementById('mm').value;
  flagNumber = mm;
  explore = cNum * rNum;
  //alert(explore);
  //alert(explore);
  $('#Board').width(cNum*53);
    $('#Board').height(rNum * 53 + 53);
    $('#bombNumber').html(mm);

//Generate a table
for(i = 0;i < rNum; i++){
  mineArray[i] = new Array();
  for(j = 0; j < cNum; j++){
    mineArray[i][j] = 0;
    $('#table').append("<input type = 'button' id=" + i +'_' + j + " value='' onclick='getFlag(" + i + "," + j + ")'/>" );
  }
  // once finish a line, go to next line.
  $('#table').append('<br>');

}
// bury mines
var i = mm;
   while (i > 0) {
       var x = getRandom(rNum);
       var y = getRandom(cNum);
       if (mineArray[x][y] == 0) {
           mineArray[x][y] = 1;
           i--;
}

}

}

/*
1. bury + no flag 1
2. bury + Flag 1+2
3. no bomb + no flag 0+0
4. no bomb + flag 0+2
*/
function getFlag(i, j) {
  time = true;
  if(event.shiftKey){
  var sth = "#" + i + "_" + j;
    if (!$(sth).hasClass('reveal')) {
        if (mineArray[i][j] < 2) {
            if (flagNumber > 0) {
                mineArray[i][j] += 2;
                $(sth).prop('value', "F");
                $(sth).css("color", "#FF0000");
                flagNumber--;
                $('#bombNumber').html(flagNumber);
            }
        } else {
            mineArray[i][j] -= 2;
            $(sth).prop('value', "");
            $(sth).css("color", "");
             flagNumber++;
             $('#bombNumber').html(flagNumber);
        }
    }
}else{
  sweep(i,j);
}
}
/*
If it's a bomb, game over and show all the bombs
*/
function sweep(i,j){
// touch the mine
  if(mineArray[i][j]==3||mineArray[i][j]==2){
    return;
  }
  if(mineArray[i][j]==1){
    var st2 = "#" + i + "_" + j;
    $(st2).addClass('reveal');
    alert('Game Over');
    time = false;
    bb();
}

else{
  // if it's not a mine
  // 1 CountNumber: if there is nothing around, resursively check everything
  // 2. There is mine, check the area around it.
  explore--;
  //alert(explore);
  var sth = "#" + i + "_" + j;
  $(sth).attr('onclick', '');
  $(sth).addClass('reveal');
  var aroudMine = countMine(i,j);
  if(aroudMine!=0){
    $(sth).prop('value',aroudMine);
  }else{

    for (var x = Math.max(0, i - 1); x <= Math.min(rNum - 1, i + 1); x++){
    for (var y = Math.max(0, j - 1); y <= Math.min(cNum - 1, j + 1); y++){
      var s2 = '#'+x+'_'+y;
      if(!$(s2).hasClass('reveal')){
        sweep(x,y);
      }
    }
  }

/*
  var x = i - 1;
  var y = j - 1;

  if (x == -1){
    x = 0;
  }
  if(y == -1){
    y = 0;
  }
 for(x1 = x;x1<=Math.min(i+1,rNum-1);x1++){
   for(y1 = y;y1<=Math.min(j+1,cNum-1);y1++){
     var sth3 = "#" + x1 + "_" + y1;
     if(!$(sth3).hasClass('reveal')){
     sweep(x1,y1);}
   }
 }

*/

}
checkVictory();
}

}
/* count the mine aroud

*/
function countMine(i, j) {
    var number = 0;
    for (var x = Math.max(0, i - 1); x <= Math.min(rNum - 1, i + 1); x++){
    for (var y = Math.max(0, j - 1); y <= Math.min(cNum - 1, j + 1); y++){
    if (mineArray[x][y] == 3 || mineArray[x][y] == 1 ){

      number++;
    };
  }}
    return number;
}
/*
function countMine(i,j){
   var x = i - 1;
   var y = j - 1;
   var near = 0;
   if (x == -1){
     x = i;
   }
   if(y == -1){
     y = j;
   }
  for(x;x<=Math.min(i+1,rNum-1);x++){
    for(y;y<=Math.min(j+1,cNum-1);y++){
      if(mineArray[x][y] == 3 || mineArray[x][y] == 1){
           near++;
      }
    }
  }
  return near;
}
*/
function bb(){
  for(x = 0;x < rNum; x++){
    for(y = 0; y < cNum; y++){
      var sth = "#" + x + "_" + y;
      if(mineArray[x][y] == 1 || mineArray[x][y] == 3){
        $(sth).prop('value', "B");
        $(sth).css("color","Red");

      }
}
}
}
function checkVictory(){

 if ((explore - mm)== 0){
   time = false;
   // add function for records....
   explore = -1;
   alert('you won!!');
   bb();

 }

}
function getRandom(max){
  return Math.floor(Math.random() * Math.floor(max));
}
