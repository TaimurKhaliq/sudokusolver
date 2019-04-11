var utilities = require('./utilities');
var _ = require('lodash');
function grid () {
    this.data = [];
}
grid.prototype.setData = function (data) {
    if(!Array.isArray(data) || !data || data.length === 0) {
        throw new Error('Incorrect Data Format. Please pass a 2d array of integers of size 9, each of size 9');
    }
    this.data = data;
    return this.data;
};
grid.prototype.numbersInRange = function (data) {
  // make sure every row/column numbers are between 1-9 and not negative
  return data.every(function(val) {
      return val <=9 && val >0;
  });
};
grid.prototype.isUniqueData = function (data) {
    return data.length === new Set(data).size && this.checkSum(data) && this.numbersInRange(data);
};
grid.prototype.checkSum = function (data) {
    // The sume of any row and column should be 45 for a correct solution
    var sum = _.reduce(data, function(sum, n) {
            return sum + n;
        }, 0);
    return sum === 45;
};
grid.prototype.isUnique = function () {
    var i = 0;
    while(i < this.data.length && this.isUniqueData(this.data[i])) {
        i++;
    }
    // all rows unique when iterator index is length of array. This means all
    // the isUniqueData function returned true for each data item => data[i]
    return i === (this.data.length);
};
grid.prototype.areRowsUnique = function (data) {
    return this.isUnique(data);
};
grid.prototype.areColumnsUnique = function(data) {
    // transposing an array flips the columns and arrays. This is necessary to
    // get the column values so we can iterate over as row
    var columnArray = utilities.utilities.transposeArray(data.slice(0));
    return this.isUnique(columnArray);
};
grid.prototype.areGridsUnique = function (data) {
    // The algorithm breaks an array into smaller sub arrays of size 3
    //
    /*
        Original
            [ 5, 3, 4, 6, 7, 8, 9, 1, 2 ],
            [ 6, 7, 2, 1, 9, 5, 3, 4, 8 ],
            [ 1, 9, 8, 3, 4, 2, 5, 6, 7 ],
            ....

        After Decomposition
            [ [5, 3, 4], [6, 7, 8], [9, 1, 2]],
            [ [6, 7, 2] [1, 9, 5], [3, 4, 8] ],
            [ [1, 9, 8], [3, 4, 2], [5, 6, 7] ]
            ....

        The helper method then walks over the decomposed array treating the column above as a small sub grid
        It performs a uniqueness check on each subgrid.
     */
    var decomposed = this.decomposeDataArray(data);
    var unique = this.areGridsUniqueHelper(decomposed);
    return unique;
};
grid.prototype.decomposeDataArray = function () {
    var a = this.data.slice(0);
    var spliceLength = 3;

    for (var i = 0; i < a.length; i++) {
        var row = a[i];
        let b = row.map(() => row.splice(0,spliceLength)).filter(row => row);
        a[i] = b;
    }
    return _.flatMap(a);
};
grid.prototype.areGridsUniqueHelper = function (arr) {
        var lastNext = arr.length - 1;
        var next = 0;
        var unique = true;
        var count = 0;
        // The termination condition. Since rows are grouped by hops of 3, the last possible grid
        // the first element of the last subgrid is 6 less than the last element
        while ((next + 6) <= lastNext && unique) {
            // check if the next three entries in the decomposed subarray are unique
            var row = [
                arr[next],
                arr[next + 3],
                arr[next + 6]
            ];

            unique = (utilities.utilities.getSum(row) === 45);
            // this is to jump to the next grid after 3
            if (count === 2) {
                next = next + 7;
                count = 0;
            } else {
                next++;
                count++;
            }
        }
        return unique;
};
grid.prototype.isSolvable = function () {
    var rowsUnique = this.areRowsUnique(this.data);
    var columnsUnique = this.areColumnsUnique(this.data);
    var areGridsUnique = this.areGridsUnique(this.data);

    var sudokuUnique = (rowsUnique === true
        && columnsUnique === true
        && areGridsUnique === true);

    return sudokuUnique;
};

module.exports.grid = grid;
