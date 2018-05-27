/* Builds a construction site.
 * Puts the creep in harvest mode if it gets hungry.
 *
 * Returns:
 * 0: Normal tick
 * 1: Mode changed
 * 2: Nothing to do
 */
module.exports = function(creep) {
    let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if(targets.length) {
        var e = creep.build(targets[0]);
        if(e == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
        }
        else if (e == ERR_NOT_ENOUGH_RESOURCES) {
            creep.memory.mode = "harvest";
            return 1;
        }

        return 0;
    }
    else {
        return 2;
    }
}
