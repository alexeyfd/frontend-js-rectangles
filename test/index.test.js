import { areIntersected, filterVisible } from '../src/index';


describe('The function', function () {
	const { freeze } = Object;
	const mainRect = freeze({
		left: 0, top: 0,
		width: 20, height: 20
	});
	const intersectedRects = [
		{
			left: 0, top: 0,
			width: 20, height: 20
		},
		{
			left: 5, top: 5,
			width: 10, height: 10
		},
		{
			left: -5, top: -5,
			width: 30, height: 30
		},
		{
			left: -10, top: -10,
			width: 40, height: 20
		},
		{
			left: 10, top: -10,
			width: 25, height: 25
		},
		{
			left: 10, top: -10,
			width: 20, height: 40
		},
		{
			left: 10, top: 10,
			width: 25, height: 25
		},
		{
			left: -10, top: 10,
			width: 40, height: 25
		},
		{
			left: -10, top: 10,
			width: 20, height: 25
		},
		{
			left: -10, top: -10,
			width: 25, height: 40
		},
		{
			left: -10, top: -10,
			width: 25, height: 25
		},
		{
			left: 0, top: -10,
			width: 20, height: 20
		},
		{
			left: 10, top: -10,
			width: 20, height: 20
		},
		{
			left: 10, top: 0,
			width: 20, height: 20
		},
		{
			left: 10, top: 10,
			width: 20, height: 20
		},
		{
			left: 0, top: 10,
			width: 20, height: 20
		},
		{
			left: -10, top: 10,
			width: 20, height: 20
		},
		{
			left: -10, top: 0,
			width: 20, height: 20
		},
		{
			left: -10, top: -10,
			width: 25, height: 25
		}
	];
	const notIntersectedRects = [
		{
			left: -100, top: -100,
			width: 40, height: 20
		},
		{
			left: -10, top: -100,
			width: 15, height: 25
		},
		{
			left: -10, top: -100,
			width: 40, height: 25
		},
		{
			left: 10, top: -100,
			width: 25, height: 25
		},
		{
			left: 100, top: -100,
			width: 25, height: 25
		},
		{
			left: 100, top: -10,
			width: 20, height: 15
		},
		{
			left: 100, top: -10,
			width: 20, height: 40
		},
		{
			left: 100, top: 10,
			width: 25, height: 25
		},
		{
			left: 100, top: 100,
			width: 20, height: 40
		},
		{
			left: 10, top: 100,
			width: 25, height: 25
		},
		{
			left: -10, top: 100,
			width: 40, height: 25
		},
		{
			left: -10, top: 100,
			width: 15, height: 25
		},
		{
			left: -100, top: 100,
			width: 25, height: 25
		},
		{
			left: -100, top: 10,
			width: 25, height: 25
		},
		{
			left: -100, top: -10,
			width: 20, height: 40
		},
		{
			left: -100, top: -10,
			width: 20, height: 15
		}
	];
	const adjacentRects = [
		{
			left: -20, top: -20,
			width: 20, height: 20
		},
		{
			left: -10, top: -20,
			width: 20, height: 20
		},
		{
			left: 0, top: -20,
			width: 20, height: 20
		},
		{
			left: 10, top: -20,
			width: 20, height: 20
		},
		{
			left: 20, top: -20,
			width: 20, height: 20
		},
		{
			left: 20, top: -10,
			width: 20, height: 20
		},
		{
			left: 20, top: 0,
			width: 20, height: 20
		},
		{
			left: 20, top: 10,
			width: 20, height: 20
		},
		{
			left: 20, top: 20,
			width: 20, height: 20
		},
		{
			left: 10, top: 20,
			width: 20, height: 20
		},
		{
			left: 0, top: 20,
			width: 20, height: 20
		},
		{
			left: -10, top: 20,
			width: 20, height: 20
		},
		{
			left: -20, top: 20,
			width: 20, height: 20
		},
		{
			left: -20, top: 10,
			width: 20, height: 20
		},
		{
			left: -20, top: 0,
			width: 20, height: 20
		},
		{
			left: -20, top: -10,
			width: 20, height: 20
		}
	];
	const zeroRects = [
		{
			left: 0, top: 0,
			width: 20, height: 0
		},
		{
			left: 5, top: 5,
			width: 0, height: 0
		},
		{
			left: 5, top: 5,
			width: 10, height: 0
		},
		{
			left: 5, top: 5,
			width: 0, height: 10
		}
	];

	function stringifyRect (rect) {
		return rect ? `[${rect.left},${rect.top}; ${rect.width} x ${rect.height}]` : '';
	}

	function stringify (strings, ...rects) {
		return strings.map(function (string, index) {
			const rect = rects[index];
			const rectString = stringifyRect(rect);

			return `${string}${rectString}`;
		}).join('');
	}

	function testIntersected ({ rectA, rectB }) {
		it(stringify`${rectA} and ${rectB}`, function () {
			expect(areIntersected(rectA, rectB)).toBe(true);
		});
	}

	function testNotIntersected ({ rectA, rectB }) {
		it(stringify`${rectA} and ${rectB}`, function () {
			expect(areIntersected(rectA, rectB)).toBe(false);
		});
	}

	function pairWithMainRect (rect) {
		return {
			rectA: rect,
			rectB: mainRect
		};
	}

	describe('`areIntersected`', function () {
		it('is defined', function () {
			expect(areIntersected).toBeDefined();
		});

		it('is a function', function () {
			expect(areIntersected).toBeInstanceOf(Function);
		});

		describe('can detect', function () {
			describe('intersected rectangles', function () {
				intersectedRects
					.map(freeze)
					.map(pairWithMainRect)
					.forEach(testIntersected);
			});

			describe('intersection with collapsed rectangles', function () {
				zeroRects
					.map(freeze)
					.map(pairWithMainRect)
					.forEach(testIntersected);
			});

			describe('not intersected rectangles', function () {
				notIntersectedRects
					.map(freeze)
					.map(pairWithMainRect)
					.forEach(testNotIntersected);
			});

			describe('adjacent(surrounding) rectangles are not intersected', function () {
				adjacentRects
					.map(freeze)
					.map(pairWithMainRect)
					.forEach(testNotIntersected);
			});
		});
	});

	describe('`filterVisible`', function () {
		let filtered;

		it('is defined', function () {
			expect(filterVisible).toBeDefined();
		});

		it('is a function', function () {
			expect(filterVisible).toBeInstanceOf(Function);
		});

		beforeEach(function () {
			filtered = undefined;
		});

		describe('can filter', function () {
			it('an array of rectangles', function () {
				const rectangles = [
					intersectedRects[5],
					intersectedRects[6],
					notIntersectedRects[6],
					notIntersectedRects[7],
					intersectedRects[7],
					notIntersectedRects[8],
					notIntersectedRects[9]
				];

				filtered = filterVisible(mainRect, rectangles);
				expect(filtered).toEqual([
					intersectedRects[5],
					intersectedRects[6],
					intersectedRects[7]
				]);
			});

			it('an array of rectangles, where some are invisible', function () {
				const rectangles = [
					intersectedRects[2],
					zeroRects[1],
					intersectedRects[3],
					notIntersectedRects[6],
					notIntersectedRects[7],
					intersectedRects[4],
					zeroRects[3],
					notIntersectedRects[8],
					notIntersectedRects[9]
				];

				filtered = filterVisible(mainRect, rectangles);
				expect(filtered).toEqual([
					intersectedRects[2],
					intersectedRects[3],
					intersectedRects[4]
				]);
			});

			it('an empty array', function () {
				filtered = filterVisible(mainRect, []);
				expect(filtered).toHaveLength(0);
			});

			it('no rectangles, if the parent rectangle is invisible', function () {
				filtered = filterVisible(mainRect, []);
				expect(filtered).toHaveLength(0);
			});
		});
	});
});