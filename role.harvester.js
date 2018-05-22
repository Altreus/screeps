var Upgrader = require('role.upgrader');
var doSpawn = require('job.spawn');
var harvest = require('job.harvest');

var Harvester = function(creep) {
    this.creep = creep;
}

Harvester.spawnAt = function(spawn, name) {
    return doSpawn(spawn, 'harvester', name);
}

Harvester.tick = function(creep) {
    if(creep.memory.mode == "work") {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity;
            }
        });
        if(targets.length > 0) {
            var e = creep.transfer(targets[0], RESOURCE_ENERGY);
            if(e == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            else if(e == ERR_NOT_ENOUGH_RESOURCES) {
                harvest(creep);
            }
        }
        else {
            Upgrader.tick(creep);
        }
    }
    else if(creep.memory.mode == "harvest") {
        harvest(creep);
    }
};

module.exports = Harvester;
