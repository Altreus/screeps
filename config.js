/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('config');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    spawnPriority: [ 'harvester', 'upgrader', 'builder' ],
    targetCounts: {
        harvester: 1,
        upgrader: 2,
        builder: 2
    }
};
