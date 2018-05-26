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
        }
    }

    {
        let creeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

        if (creeps.length < 1) {
            console.log("spawning upgrader");
            let c = jobs.serf.spawn(spawn, "upgrader");
        }
    }

    {
        let creeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'charger');

        if (creeps.length < 2) {
            console.log("spawning charger");
            let c = jobs.serf.spawn(spawn, "charger");
        }
    }

    for (let n in Game.creeps) {
        let c = Game.creeps[n];

        new jobs[c.memory.job](c).tick();
    }
};
