var influx = require("influx"),
	fs = require("fs"),
	config = {
		host: "<create config.json to override or just edit here>",
		//it's adviced to use config.json
		port: 8086,
		username: "username",
		password: "password",
		database: "database"
	};

if(fs.existsSync('./config.json'))
	config = JSON.parse(fs.readFileSync("./config.json"));

var client = influx(config);

Collector = {
	registry: [],
	series: {},
	log: null,
	setlog: function(fn) {
		if(typeof fn === "function")
			Collector.log = fn;
		//else just ignore the bastard trying to break things
	},
	flush: function() {
		Collector.series = {};
	},
	register: function(item) {
		Collector.registry.push(item);
	},
	collect: function() {
		for(var i=0;i<Collector.registry.length;i++) {
			var obj = require("./collectors/" + Collector.registry[i]);
			//ignore if series is already present
			if(!Collector.series.hasOwnProperty(obj.name))
				Collector.series[obj.name] = obj.points;
		}
	},
	iterate: function() {
		Collector.flush();
		Collector.collect();
		Collector.send();
	},
	send: function() {
		client.writeSeries(Collector.series, {}, function(){
			if(typeof Collector.log === "function") {
				Collector.log.apply(this, [new Date()]);
			}
		});
	}
};

module.exports = Collector;