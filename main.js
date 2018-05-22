var config = require('config');
var roles = require('roles');

console.log(Object.keys(config.targetCounts));

// TODO: deal with multiple spawns
var spawn = Game.spawns.BestSpawnYet;
module.exports.loop = function() {
    if (! spawn.spawning) {
        for (let n in config.spawnPriority) {
            let type = config.spawnPriority[n];
            let count = config.targetCounts[type];

            if (roles[type]) {
                // FIXME: can we keep track of this?
                let creeps = _.filter(Game.creeps, (creep) => creep.memory.role == type);
                if (creeps.length < count) {
                    console.log("Spawning " + type);
                    var newCreep = roles[type].spawnAt(spawn)
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
