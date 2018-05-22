var Harvester = require('role.harvester');
var harvest = require('job.harvest');
var doSpawn = require('job.spawn');

var Builder = function(creep) {
    this.creep = creep;
}

Builder.spawnAt = function(spawn, name) {
    doSpawn(spawn, 'builder', name);
}

Builder.tick = function(creep) {
    if( creep.memory.idleZone ) {
        let idleZone = creep.memory.idleZone;
        creep.moveTo(idleZone[0], idleZone[1]);
    }

    // If we have a job, do it. If we're out of energy, go get some. If we don't
    // have a job, be a Harvester

    if (creep.memory.mode == 'work') {
        let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
            var e = creep.build(targets[0]);
            if(e == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            else if (e == ERR_NOT_ENOUGH_RESOURCES) {
                creep.say("So hungry");
                harvest(creep);
            }
        }
        else {
            Harvester.tick(creep);
        }
    }
    else if(creep.memory.mode == "harvest") {
        harvest(creep);
    }
};

module.exports = Builder;
