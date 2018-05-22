// Puts a creep in harvest mode until it is full. Then puts it in work mode.
// opts can contain moveOpts, which is passed to creep.moveTo

module.exports = function(creep, opts) {
    creep.memory.mode = "harvest";
    opts = opts || {};
    let target = creep.memory.preferredSource;
    if (target instanceof Array) {
        target = creep.room.lookForAt(LOOK_SOURCES, target[0], target[1])[0];
    }

    if (! target) {
        let sources = creep.room.find(FIND_SOURCES);
        target = sources[0];
    }

    let e = creep.harvest(target);
    if(e == ERR_NOT_IN_RANGE) {
        // TODO: make pathfind job
        let moveOpts = opts.moveOpts || {};
        creep.moveTo(target, moveOpts);
    }
    else if (e) {
        console.log("Harvest error: " + e);
    }
    else {
        if (creep.carry.energy == creep.carryCapacity) {
            creep.say("So full");
            creep.memory.mode = "work";
        }
    }
};
