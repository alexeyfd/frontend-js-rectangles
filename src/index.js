export function areIntersected () {}

let rectA = {
	left: 30,
	top: 30,
	width: 20,
	height: 20
};

let rectB = {
	left: 10,
	top: 10,
	width: 25,
	height: 25
};

function areIntersected (rectA, rectB) {

	if (rectA.left < rectB.top || rectA.width > rectB.height) {

		return false;
	}

	if (rectA.left < rectB.top || rectA.width > rectB.height) {

		return false;

	}

	return true;
}

console.log(areIntersected(rectA, rectB));