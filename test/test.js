var assert = require('assert');
var grid = require('../grid');
describe('Grid', function() {
    describe('Functions', function() {
        var mockData = [
            [ 5, 3, 4, 6, 7, 8, 9, 1, 2 ],
            [ 6, 7, 2, 1, 9, 5, 3, 4, 8 ],
            [ 1, 9, 8, 3, 4, 2, 5, 6, 7 ],
            [ 8, 5, 9, 7, 6, 1, 4, 2, 3 ],
            [ 4, 2, 6, 8, 5, 3, 7, 9, 1 ],
            [ 7, 1, 3, 9, 2, 4, 8, 5, 6 ],
            [ 9, 6, 1, 5, 3, 7, 2, 8, 4 ],
            [ 2, 8, 7, 4, 1, 9, 6, 3, 5 ],
            [ 3, 4, 5, 2, 8, 6, 1, 7, 9 ]
        ];
        var g = new grid.grid();
        it('should not throw error when array passed', function() {
            var result = g.setData(mockData);
            assert.equal(result, mockData);
        });
        it('should  throw error when array passed', function() {
            assert.throws(() => g.setData(12), Error, "Expecting array value");
        });
        it('unique data check should return true for same values', function() {
            var result = g.isUniqueData([1,2,3,4,5, 6, 7, 8 , 9]);
            assert.equal(result, true);
        });
        it('unique data check should return false for different values', function() {
            var result = g.isUniqueData([1,2,3,3,4,5]);
            assert.equal(result, false);
        });

        it('a flattened array should be returned after decomposition', function() {
            g.setData(mockData);
            var result = g.decomposeDataArray();
            var expectedResult = [[5, 3, 4], [6, 7, 8], [9, 1, 2], [6, 7, 2], [1, 9, 5], [3, 4, 8], [1, 9, 8], [3, 4, 2], [5, 6, 7], [8, 5, 9], [7, 6, 1], [4, 2, 3], [4, 2, 6], [8, 5, 3], [7, 9, 1], [7, 1, 3], [9, 2, 4], [8, 5, 6], [9, 6, 1], [5, 3, 7], [2, 8, 4], [2, 8, 7], [4, 1, 9], [6, 3, 5], [3, 4, 5], [2, 8, 6], [1, 7, 9]];
            assert.deepStrictEqual(result, expectedResult);
        });
        it('unique helper should return true for a decomposed array', function() {
            g.setData(mockData);
            var result = g.areGridsUniqueHelper(g.decomposeDataArray());
            assert.deepStrictEqual(result, true);
        });
        it('a correct solution should return true', function () {
            g.setData([
                [ 5, 3, 4, 6, 7, 8, 9, 1, 2 ],
                [ 6, 7, 2, 1, 9, 5, 3, 4, 8 ],
                [ 1, 9, 8, 3, 4, 2, 5, 6, 7 ],
                [ 8, 5, 9, 7, 6, 1, 4, 2, 3 ],
                [ 4, 2, 6, 8, 5, 3, 7, 9, 1 ],
                [ 7, 1, 3, 9, 2, 4, 8, 5, 6 ],
                [ 9, 6, 1, 5, 3, 7, 2, 8, 4 ],
                [ 2, 8, 7, 4, 1, 9, 6, 3, 5 ],
                [ 3, 4, 5, 2, 8, 6, 1, 7, 9 ]
            ]);
            var result = g.isSolvable();
            assert.deepStrictEqual(result, true);
        });
        it('another correct solution should return true', function () {
            g.setData([
                [7, 2, 6, 4, 9, 3, 8, 1, 5],
                [3, 1, 5, 7, 2, 8, 9, 4, 6],
                [4, 8, 9, 6, 5, 1, 2, 3, 7],
                [8, 5, 2, 1, 4, 7, 6, 9, 3],
                [6, 7, 3, 9, 8, 5, 1, 2, 4],
                [9, 4, 1, 3, 6, 2, 7, 5, 8],
                [1, 9, 4, 8, 3, 6, 5, 7, 2],
                [5, 6, 7, 2, 1, 4, 3, 8, 9],
                [2, 3, 8, 5, 7, 9, 4, 6, 1]
            ]);
            var result = g.isSolvable();
            assert.deepStrictEqual(result, true);
        });

        it('an incorrect solution with duplicated should return false', function () {
            var wrongMockData = [
                [ 5, 3, 4, 6, 7, 5, 9, 1, 2 ],
                [ 6, 7, 2, 1, 9, 5, 3, 4, 8 ],
                [ 1, 9, 8, 3, 4, 2, 5, 6, 7 ],
                [ 8, 5, 9, 7, 6, 1, 4, 2, 3 ],
                [ 4, 2, 6, 8, 5, 3, 7, 9, 1 ],
                [ 7, 1, 3, 9, 2, 4, 8, 5, 6 ],
                [ 9, 6, 1, 5, 3, 7, 2, 8, 4 ],
                [ 2, 8, 7, 4, 1, 9, 6, 3, 5 ],
                [ 3, 4, 5, 2, 8, 6, 1, 7, 9 ]
            ];
            g.setData(wrongMockData);
            assert.deepStrictEqual(g.isSolvable(), false);
        });
        it('an incorrect solution with sums greater than 45 should return false', function () {
            var wrongMockData = [
                [ 5, 3, 4, 6, 7, 5, 9, 1, 299 ],
                [ 6, 7, 2, 1, 9, 5, 3, 4, 8 ],
                [ 1, 9, 8, 3, 4, 2, 5, 6, 7 ],
                [ 8, 5, 9, 7, 6, 1, 4, 2, 3 ],
                [ 4, 2, 6, , 5, 3, 7, 9, 1 ],
                [ 7, 1, 3, 9, 2, 4, 8, 5, 6 ],
                [ 9, 6, 1, 5, 3, 7, 2, 8, 4 ],
                [ 2, 8, 7, 4, 1, 9, 6, 3, 5 ],
                [ 3, 4, 5, 2, 8, 6, 1, 7, 9 ]
            ];
            g.setData(wrongMockData);
            assert.deepStrictEqual(g.isSolvable(), false);
        });
        it('an incorrect solution with missing values (expecting 9 digits) should return false', function () {
            var wrongMockData = [
                [ 5, 3, 4, 7, 5, 9, 1 ],
                [ 6, 7, 2, 1, 9, 5, 3, 4, 8 ],
                [ 1, 9, 8, 3, 4, 2, 5, 6, 7 ],
                [ 8, 5, 9, 7, 6, 1, 4, 2, 3 ],
                [ 4, 2, 6, , 5, 3, 7, 9, 1 ],
                [ 7, 1, 3, 9, 2, 4, 8, 5, 6 ],
                [ 9, 6, 1, 5, 3, 7, 2, 8, 4 ],
                [ 2, 8, 7, 4, 1, 9, 6, 3, 5 ],
                [ 3, 4, 5, 2, 8, 6, 1, 7, 9 ]
            ];
            g.setData(wrongMockData);
            assert.deepStrictEqual(g.isSolvable(), false);
        });
        it('an incorrect solution with negative values should return false', function () {
            g.setData([
                [ 5, 3, 4, 6, 7, 8, 11, -1, 2 ],
                [ 6, 7, 2, 1, 9, 5, 3, 4, 8 ],
                [ 1, 9, 8, 3, 4, 2, 5, 6, 7 ],
                [ 8, 5, 9, 7, 6, 1, 4, 2, 3 ],
                [ 4, 2, 6, 8, 5, 3, 7, 9, 1 ],
                [ 7, 1, 3, 9, 2, 4, 8, 5, 6 ],
                [ 9, 6, 1, 5, 3, 7, 2, 8, 4 ],
                [ 2, 8, 7, 4, 1, 9, 6, 3, 5 ],
                [ 3, 4, 5, 2, 8, 6, 1, 7, 9 ]
            ]);
            assert.deepStrictEqual(g.isSolvable(), false);
        });
        it('an empty data should return false', function () {
            assert.throws(() => g.setData([]), Error, "Incorrect Data Format. Please pass a 2d array of integers of size 9, each of size 9");
        });
    });
});
