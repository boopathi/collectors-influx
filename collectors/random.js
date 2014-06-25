var getPoints = function() {
	return [{
		time: time,
		value: Math.random()
	}];
};

module.exports = {
	name: "random",
	collect: getPoints
};