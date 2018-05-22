var harvest = require('job.harvest');
var doSpawn = require('job.spawn');

var Upgrader = function(creep) {
    this.creep = creep;
}

Upgrader.spawnAt = function(spawn, name) {
    doSpawn(spawn, 'upgrader', name);
}

Upgrader.tick = function(creep) {
    if( creep.memory.idleZone ) {
        let idleZone = creep.memory.idleZone;
        creep.moveTo(idleZone[0], idleZone[1]);
    }
    else if (creep.memory.mode == "work") {
        var e = creep.upgradeController(creep.room.controller);
        if (e == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
        else if(e == ERR_NOT_ENOUGH_RESOURCES) {
            harvest(creep, {visualizePathStyle: {stroke: '#ffaa00'}})
        }
    }
    else if (creep.memory.mode == "harvest") {
        harvest(creep);
    }
};

module.exports = Upgrader;
