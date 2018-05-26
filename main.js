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

    let creeps = _.filter(Game.creeps, (creep) => true);

    if (creeps.length < 3) {
        let c = jobs.serf.spawn(spawn, "charger");
    }

    for (let n in Game.creeps) {
        let c = Game.creeps[n];

        new jobs[c.memory.job](c).tick();
    }
};
