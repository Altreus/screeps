var Upgrader = function(creep) {
    this.creep = creep;
}

Upgrader.spawnAt = function(spawn, name) {
    if (name === undefined) {
        name = "Upgrader" + Game.time;
    }
    var c = spawn.spawnCreep([CARRY, WORK, MOVE], name,
        {
            memory: { role: "upgrader" }
        }
    );
//    if (c != 0) {
//        console.log("Upgrader spawn error: " + c)
//    }
    return new Upgrader(c);
}

Upgrader.tick = function(creep) {
    if( creep.memory.idleZone ) {
        let idleZone = creep.memory.idleZone;
        creep.moveTo(idleZone[0], idleZone[1]);
    }
    else if(creep.carry.energy < creep.carryCapacity) {
        let source = creep.memory.preferredSource;

        if (source) {
            source = creep.room.lookForAt(LOOK_SOURCES,source[0], source[1])[0];
        }

        if (! source) {
            let sources = creep.room.find(FIND_SOURCES);
            source = sources[0];
            source = creep.room.lookForAt(LOOK_SOURCES, source.pos)[0];
        }

        let e = creep.harvest(source);
        if(e == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        else if (e) {
            console.log("Harvest error: " + e);
        }
    }
    else {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
};

module.exports = Upgrader;
