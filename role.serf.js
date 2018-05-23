/* Serf role
 * [ CARRY, WORK, MOVE ]
 * Can be repurposed for whatever currently needs doing.
 */

// FIXME: is new too expensive?
var doSpawn = require('job.spawn');
var doHarvest = require('job.harvest');
//var doUpgrade = require('job.upgrade');
//var doCharge = require('job.charge');
//var doBuild = require('job.build');

var Serf = function (creep) {
    this.creep = creep;
    this.role = creep.memory.role;
    this.mode = creep.memory.mode;
}

Serf.spawn = function(spawn, role, name) {
    var c = doSpawn({
        parts: [CARRY, WORK, MOVE],
        role: role
    }, spawn, name);
};

Serf.prototype.tick = function () {
    var f = this[this.mode];

    if (f) {
        f.apply(this, arguments);
    }
    else {
        console.log("No function handle mode " + mode);
    }
}

Serf.prototype.work = function () {
    switch (this.role) {
        case "charger":
            doCharge(this.creep);
            break;
        case "upgrader":
            doUpgrade(this.creep);
            break;
        case "builder":
            doBuild(this.creep);
    }
}

Serf.prototype.harvest = function () {
    doHarvest(this.creep);
}
