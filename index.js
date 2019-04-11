var grid = require('./grid');
var data = [];
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input_sudoku.txt')
});
var util = require('./utilities');
lineReader.on('line', function (line) {
    data.push(util.utilities.getDigits(line));
});
lineReader.on('close', function (line) {
    return console.log(isSolved(data));
});

function isSolved(data) {
    var g = new grid.grid();
    g.setData(data);
    return (g.isSolvable());
}
