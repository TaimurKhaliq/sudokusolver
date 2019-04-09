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
            var result = g.isUniqueData([1,2,3,4,5]);
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
            g.setData(mockData);
            g.isSolvable();
            assert.deepStrictEqual(g.isSolvable(), true);
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
            g.isSolvable();
            assert.deepStrictEqual(g.isSolvable(), false);
        });
    });
});
