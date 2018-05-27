var config = require('config');
var jobs = require('jobs');

function cleanupDeadCreeps() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            console.log('Clearing non-existing creep memory: ', name);
            delete Memory.creeps[name];
        }
    }
}

// TODO: deal with multiple spawns
var spawn = Game.spawns.SerfsUp;
spawn.memory.serfs = spawn.memory.serfs || {};

module.exports.loop = function() {
    cleanupDeadCreeps();

    for (let type of config.spawnPriority) {

        let count = config.targetCounts[type]();
        //console.log("Need " + count + " of " + type);
        {
            let creeps = _.filter(Game.creeps, (creep) => creep.memory.role == type);
            //console.log("Have " + creeps.length);
            if (creeps.length < count) {
                console.log("spawning " + type);
                let c = jobs.serf.spawn(spawn, type);
                if (Number.isInteger(c)) {
                    console.log(c);
                }

                // In all cases we should stop trying to spawn another thing
                // this tick.
                break;
            }
        }
    }

    for (let n in Game.creeps) {
        let c = Game.creeps[n];

        new jobs[c.memory.job](c).tick();
    }
};
