var Collector = require("./Collector");

process.on('SIGINT', function() {
	console.log(new Date() + " - Shutting down gracefully");
	process.exit();
});

// register all collectors
Collector.register("memory_osx");
Collector.register("random");

//Overwrite Collector.log to get log
Collector.setlog( (function() {
	var count = 0;
	return function(time) {
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		process.stdout.write("Last point written at [" + time + "]; Total points = " + ++count);
	};
})() );

function infinite() {
	Collector.iterate();
}

setInterval(infinite, 1000);