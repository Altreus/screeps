var config = require('config');
var roles = require('roles');

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
                var e = roles[type].spawnAt(spawn)
                if (e == ERR_NOT_ENOUGH_ENERGY) {
                    break;
                }
            }
        }
    }

    for (let n in Game.creeps) {
        let c = Game.creeps[n];
        if (!c) continue;
        let r = roles[c.memory.role];
        if (r) {
            r.tick(c);
        }
    }
};
