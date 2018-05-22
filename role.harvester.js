var Upgrader = require('role.upgrader');
var doSpawn = require('job.spawn');

var Harvester = function(creep) {
    this.creep = creep;
}

Harvester.spawnAt = function(spawn, name) {
    doSpawn(spawn, 'harvester', name);
}

Harvester.tick = function(creep) {
    if(creep.carry.energy < creep.carryCapacity) {
        let source = creep.memory.preferredSource;

        if (source) {
            source = creep.room.lookForAt(LOOK_SOURCES,source[0], source[1])
        }

        if (! source) {
            let sources = creep.room.find(FIND_SOURCES);
            source = sources[0];
        }
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
    else {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity;
            }
        });
        if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            Upgrader.tick(creep);
        }
    }
};

module.exports = Harvester;
