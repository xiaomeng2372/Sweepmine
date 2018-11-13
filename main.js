var nbFlags;
var toDiscover;
var arrayMines = new Array();
var timer = false;
var count = 0;

setInterval(function () {
    if (timer) {
        $('#score-time-count').html(("00" + count).slice(-3));
        count++;
    }
}, 1000);

function init() {
    $(document).bind("contextmenu", function (e) {
        return false;
    });
    $('#Mines').html('');
    columns = $("[name='columns']").val();
    lines = $("[name='lines']").val();
    nbMines = $("[name='nbMines']").val();
    nbFlags = nbMines;
    toDiscover = columns * lines - nbMines;
    //count = 0;
    $('#Demineur').width(columns * 21);
    $('#Demineur').height(lines * 21 + 52);
    $('#score-bomb-count').html(("00" + nbFlags).slice(-3));

    //init table
    for (var i = 0; i < lines; i++) {
        arrayMines[i] = new Array();
        for (var j = 0; j < columns; j++) {
            arrayMines[i][j] = 0;
            $("#Mines").append("<input type='button' class='square' id=" + i + "_" + j + " value='' onclick='clickMine(" + i + "," + j + ")' oncontextmenu='switchFlag(" + i + "," + j + ")'/>");
        }
        $("#Mines").append('<br>');
    }
    arrayMines[1][1] = 1;
    arrayMine[3][1] = 1;
    //random put mines
    /*
    var i = 0;
    while (i < nbMines) {
        var x = Math.floor(Math.random() * lines);
        var y = Math.floor(Math.random() * columns);
        if (arrayMines[x][y] === 0) {
            arrayMines[x][y] = 1;
            i++;
        }
    }
    */
    timer = true;
    count = 0;
}

function clickMine(i, j) {
    //alert ("Clicked: "+i+";"+j);
    //remove flag
    if (arrayMines[i][j] > 1) {
        switchFlag(i, j);
    } else if (arrayMines[i][j] == 1) {
        $("#" + i + "_" + j).addClass("active");
        timer = false;
        showBombs();
        alert("BOOM !");
        //init();
    } else {
        $("#" + i + "_" + j).addClass("active");
        $("#" + i + "_" + j).attr('onclick', '');
        toDiscover--;
        var number = countMines(i, j);
        if (number !== 0) $("#" + i + "_" + j).prop('value', number);
        else for (var x = Math.max(0, i - 1); x <= Math.min(lines - 1, i + 1); x++)
        for (var y = Math.max(0, j - 1); y <= Math.min(columns - 1, j + 1); y++)
        if (arrayMines[x][y] < 2 && !$("#" + x + "_" + y).hasClass('active')) clickMine(x, y);

        // Test victory
        checkVictory();
    }
}

function countMines(i, j) {
    var k = 0;
    for (var x = Math.max(0, i - 1); x <= Math.min(lines - 1, i + 1); x++)
    for (var y = Math.max(0, j - 1); y <= Math.min(columns - 1, j + 1); y++)
    if (arrayMines[x][y] == 1 || arrayMines[x][y] == 3) k++;
    return k;
}

function switchFlag(i, j) {
    if (!$("#" + i + "_" + j).hasClass('active')) {
        if (arrayMines[i][j] < 2) {
            if (nbFlags > 0) {
                arrayMines[i][j] += 2;
                $("#" + i + "_" + j).prop('value', "F");
                $("#" + i + "_" + j).css("color", "#FF0000");
                nbFlags--;
            }
        } else {
            arrayMines[i][j] -= 2;
            $("#" + i + "_" + j).prop('value', "");
            $("#" + i + "_" + j).css("color", "");
            nbFlags++;
        }
    }
    $('#score-bomb-count').html(("00" + nbFlags).slice(-3));
}

function showBombs() {
    for (var i = 0; i < lines; i++)
    for (var j = 0; j < columns; j++) {
        if (arrayMines[i][j] == 1) {
            $("#" + i + "_" + j).prop('value', "*");
            $("#" + i + "_" + j).css("font-size", "20px");
            $("#" + i + "_" + j).css("background-color", "#FF0000");
        }
        $("#" + i + "_" + j).attr('onclick', 'init()');
    }
}

function checkVictory() {
    //alert (toDiscover);
    if (toDiscover === 0) {
        timer = false;
        for (var i = 0; i < lines; i++)
        for (var j = 0; j < columns; j++) {
            if (arrayMines[i][j] == 1) {
                $("#" + i + "_" + j).prop('value', "F");
                $("#" + i + "_" + j).css("color", "#FF0000");
            }
            $("#" + i + "_" + j).attr('onclick', 'init()');
        }
        alert("WELL DONE!");
        toDiscover = -1;
    }
}
