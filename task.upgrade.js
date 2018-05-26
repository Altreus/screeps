/* Upgrades a controller.
 * Puts the creep in harvest mode if it is hungry.
 *
 * Returns:
 * 0: Normal tick
 * 1: Mode was changed
 */

module.exports = function(creep) {
    var e = creep.upgradeController(creep.room.controller);
    if (e == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
    else if (e == ERR_NOT_ENOUGH_RESOURCES) {
        creep.memory.mode = "harvest";
        return 1;
    }
    else if (e != OK) {
        console.log(creep.name + " upgrade error " + e);
    }

    return 0;
}
