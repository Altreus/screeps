module.exports = function(spawn, role, name) {
    if (name === undefined) {
        name = role.charAt(0).toUpperCase() + role.substring(1) + Game.time;
    }

    var memory = spawn.memory.defaults;
    if (memory) {
        memory = memory[role] || {};
    }
    else {
        memory = {};
    }

    memory.role = role;

    var c = spawn.spawnCreep([CARRY, WORK, MOVE], name,
        {
            memory: memory
        }
    );
};
