/* Repairs something if it can
 * Puts the creep in harvest mode if it gets hungry.
 *
 * Returns:
 * 0: Normal tick
 * 1: Mode changed
 * 2: Nothing to do
 */
module.exports = function(creep) {
    const targets = creep.room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax
    });

    if (! targets.length) {
        return 2;
    }

    if(targets.length > 0) {
        let e = creep.repair(targets[0]) 
        if (e == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
            return 0;
        }
        else if (e == ERR_NOT_ENOUGH_RESOURCES) {
            creep.mode = "harvest";
            return 1;
        }
        else if (e != OK) {
            console.log("Repair error: " + e);
            creep.say (":(");
        }

        return e;
    }
};
