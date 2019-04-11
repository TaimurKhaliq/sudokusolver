var _ = require('lodash');
module.exports.utilities = {
        getDigits: function (line) {
            var digitArray = [];
            try {
                for(var i = 0; i < line.length; i++)
                {
                    var ch = line.charAt(i);
                    digitArray.push(parseInt(ch, 10));
                }
            } catch (e) {
                throw new Error("Error parsing input");
            }
            return digitArray;
        },
        transposeArray: function (arr) {
            arr.map((col, i) => arr.map(row => row[i]));
            return arr;
        },
        getSum: function (row) {
            var totSum = 0;
            if (Array.isArray(row)) {
                row.forEach(function(subArr) {
                    totSum += _.sum(subArr);
                });
            }
            return totSum;
        }
}
