var points = [];

var sh = require("exec-sync");

var getPoints = function() {
	var raw_output = sh("vm_stat"),
		time = new Date(),
		points = [{time: time}],
		lines = raw_output.match(/[^\r\n]+/g);
	for(var i=1;i<lines.length;i++) {
		var tmp = lines[i].split(':');
		//ignore if something is trying to override time
		if(tmp[0] !== 'time')
			points[0][tmp[0]] = parseInt(tmp[1]);
	}
	return points;
};

module.exports = {
	name: "memory",
	collect: getPoints()
};