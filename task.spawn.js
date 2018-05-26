module.exports = function(proto, spawn, name) {
    var role = proto.role;
    var parts = proto.parts;

    if (name === undefined) {
        name = role.charAt(0).toUpperCase() + role.substring(1) + Game.time;
    }

    var memory = proto.memory || {};
    var defaults = spawn.memory.defaults || {};

    memory = Object.assign(defaults, memory);

    memory.role = role;
    memory.mode = "harvest";

    var c = spawn.spawnCreep(parts, name);

    if (c == OK) {
        let creep = Game.creeps[name];
        creep.memory = memory;
        return creep;
    }
    else {
        return c;
    }
};
