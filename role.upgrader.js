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
    else if(creep.carry.energy == 0) {
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    }
    else {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
};

module.exports = Upgrader;
