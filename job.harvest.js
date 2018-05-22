module.exports = function(creep, target, opts) {
    opts = opts || {};
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
};
