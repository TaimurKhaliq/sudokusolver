module.exports.utilities = {
        getDigits: function (line) {
            var digitArray = [];
            for(var i = 0; i < line.length; i++)
            {
                var ch = line.charAt(i);
                digitArray.push(parseInt(ch, 10));
            }
            return digitArray;
        },
        transposeArray: function (arr) {
            arr.map((col, i) => arr.map(row => row[i]));
            return arr;
        }
}
