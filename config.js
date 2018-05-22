function howManyBuilders(spawn) {
    var constructions = spawn.room.find(FIND_CONSTRUCTION_SITES);

    var sum = (acc, c) => acc + parseInt(c.progressTotal, "10");
    var total = constructions.reduce(sum, 0);

    return Math.trunc(total / 3000);
}

module.exports = {
    spawnPriority: [ 'harvester', 'upgrader', 'builder' ],
    targetCounts: {
        harvester: function() { return 1 },
        upgrader: function() { return 2 },
        builder: howManyBuilders
    }
};
