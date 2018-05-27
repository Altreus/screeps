function howManyBuilders(spawn) {
    var constructions = spawn.room.find(FIND_CONSTRUCTION_SITES);

    var sum = (acc, c) => acc + parseInt(c.progressTotal, "10");
    var total = constructions.reduce(sum, 0);

    if (! total) return 0;

    return Math.max(Math.trunc(total / 3000), 1);
}

module.exports = {
    spawnPriority: [ 'charger', 'upgrader', 'builder' ],
    targetCounts: {
        charger: function() { return 2 },
        upgrader: function() { return 2 },
        builder: howManyBuilders
    }
};
