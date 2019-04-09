var utilities = require('./utilities');
var _ = require('lodash');
function grid () {
    this.data = [];
}
grid.prototype.setData = function (data) {
    if(!Array.isArray(data)) {
        throw new Error('Expecting array value');
    }
    this.data = data;
    return this.data;
};
grid.prototype.isUniqueData = function (data) {
    return data.length === new Set(data).size;
};
grid.prototype.isUnique = function () {
    var i = 0;
    while(i < this.data.length && this.isUniqueData(this.data[i])) {
        i++;
    }
    // all rows unique
    return i === (this.data.length);
};
grid.prototype.areRowsUnique = function (data) {
    return this.isUnique(data);
};
grid.prototype.areColumnsUnique = function(data) {
    var columnArray = utilities.utilities.transposeArray(data.slice(0));
    return this.isUnique(columnArray);
};
grid.prototype.areGridsUnique = function (data) {
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
        while ((next + 6) <= lastNext) {
            // check if the next three are unique
            var row = [
                arr[next],
                arr[next + 3],
                arr[next + 6]
            ];
            unique = this.areRowsUnique(row) && this.areColumnsUnique(row);
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
    return this.areRowsUnique(this.data)
    && this.areColumnsUnique(this.data)
    && this.areGridsUnique(this.data);
};

module.exports.grid = grid;
