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
var spawn = Game.spawns.BestSpawnYet;
module.exports.loop = function() {
    cleanupDeadCreeps();
    for (let n in config.spawnPriority) {
        if (spawn.spawning) break;
        let type = config.spawnPriority[n];
        let count = config.targetCounts[type](spawn);

        if (roles[type]) {
            // FIXME: can we keep track of this?
            let creeps = _.filter(Game.creeps, (creep) => creep.memory.role == type);
            if (creeps.length < count) {
                console.log("Spawning " + type);
                let e = ranks.serf.spawn(spawn, type);
                if (e == ERR_NOT_ENOUGH_ENERGY) {
                    break;
                }
            }
        }
    }

    for (let n in Game.creeps) {
        let c = Game.creeps[n];

        new ranks.serf(c).tick();
    }
};
