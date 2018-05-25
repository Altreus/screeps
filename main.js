var config = require('config');
var jobs = require('jobs');

function cleanupDeadCreeps() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            console.log('Clearing non-existing creep memory:', name);
            delete Memory.creeps[name];
        }
    }
}

// TODO: deal with multiple spawns
var spawn = Game.spawns.SerfsUp;
spawn.memory.serfs = spawn.memory.serfs || {};

module.exports.loop = function() {
    cleanupDeadCreeps();

    // Only spawning serfs for now
    for (let n in config.spawnPriority) {
        if (!! spawn.spawning) {
            break;
        }
        if (spawn.memory.tryAgainAt
            && spawn.memory.tryAgainAt < spawn.energy) {
            break;
        }

        if (spawn.memory.tryAgainAt) {
            delete spawn.memory['tryAgainAt'];
        }
        let type = config.spawnPriority[n];
        let count = config.targetCounts[type](spawn);

        console.log("Need " + count + " of " + type);

        // FIXME: can we keep track of this?
        let creeps = _.filter(Game.creeps, (creep) => creep.memory.role == type);
        console.log("Have " + creeps.length);
        if (creeps.length < count) {
            console.log("Spawning " + type);
            let c = jobs.serf.spawn(spawn, type);

            // FIXME is this right?
            if (c instanceof Function) {
                console.log("New creep: " + c.id + " is a " + c.memory.role);
                spawn.memory.serfs[c.id] = c.memory.role;
            }
            if (c == ERR_NOT_ENOUGH_ENERGY) {
                console.log("Never mind");
                spawn.memory.tryAgainAt = spawn.energy + 50;
                break;
            }
        }
    }

    for (let n in Game.creeps) {
        let c = Game.creeps[n];

        if(!c) {
            delete spawn.memory.serfs[n]
            continue;
        }

        new jobs[c.memory.job](c).tick();
    }
};
