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
    else if(creep.carry.energy < creep.carryCapacity) {
        let source = creep.memory.preferredSource;
        harvest(creep, source, {visualizePathStyle: {stroke: '#ffaa00'}})
    }
    else {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
};

module.exports = Upgrader;
