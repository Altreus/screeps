var Builder = function(creep) {
    this.creep = creep;
}

Builder.spawnAt = function(spawn, name) {
    if (name === undefined) {
        name = "Builder" + Game.time;
    }
    var c = spawn.spawnCreep([CARRY, WORK, MOVE], name,
        {
            memory: { role: "builder" }
        }
    );
    if (c != 0) {
        console.log("Builder spawn error: " + c)
    }
    return new Builder(c);
}

Builder.tick = function(creep) {
    if( creep.memory.idleZone ) {
        let idleZone = creep.memory.idleZone;
        creep.moveTo(idleZone[0], idleZone[1]);
    }
    // FIXME: just weird
    if(creep.memory.building && creep.carry.energy == 0) {
        creep.memory.building = false;
    }
    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
        creep.memory.building = true;
    }

    if(creep.memory.building) {
        let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
    else {
        let sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};

module.exports = Builder;