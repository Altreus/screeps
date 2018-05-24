module.exports = function(proto, spawn, name) {
    var role = proto.role;
    var parts = proto.parts;

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
    memory.mode = "harvest";

    var c = spawn.spawnCreep(parts, name,
        {
            memory: memory
        }
    );

    if (c == OK) {
        return Game.creeps[name];
    }
    else {
        return c;
    }
};
