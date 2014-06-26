var Collector = require("./Collector");

process.on('SIGINT', function() {
	console.log(new Date() + " - Shutting down gracefully");
	process.exit();
});

// register all collectors
Collector.register("memory_osx");
Collector.register("random");

//Overwrite Collector.log to get log
Collector.setlog(function(time) {
	console.log(time);
});

function infinite() {
	Collector.iterate();
}

setInterval(infinite, 1000);