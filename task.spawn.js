module.exports = function(proto, spawn, name) {
    var role = proto.role;
    var parts = proto.parts;

    if (name === undefined) {
        name = role.charAt(0).toUpperCase() + role.substring(1) + Game.time;
    }

    var memory = proto.memory || {};
    var defaults = spawn.memory.defaults || {};
    defaults = defaults[role] || {};

    memory = Object.assign(defaults, memory);

    memory.role = role;
    memory.mode = "harvest";

    var c = spawn.spawnCreep(parts, name, {dryRun: true});

    if (c == OK) {
        var c = spawn.spawnCreep(parts, name, {memory: memory});
        return Game.creeps[name];
    }
    else {
        //console.log(c);
        return c;
    }
};
