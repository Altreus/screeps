/* Charges up a spawn or container.
 * Puts the creep in harvest mode if it gets hungry.
 *
 * Returns:
 * 0: Normal tick
 * 1: Mode changed
 * 2: Nothing to do
 */

module.exports = function(creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                structure.energy < structure.energyCapacity;
        }
    });
    if(targets.length > 0) {
        var e = creep.transfer(targets[0], RESOURCE_ENERGY);
        if(e == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
        }
        else if(e == ERR_NOT_ENOUGH_RESOURCES) {
            creep.memory.mode = "harvest";
            return 1;
        }
    }
    else {
        return 2;
    }
    return 0;
}
