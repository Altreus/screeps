/* Pathing task. Reimplements moveTo in a way I can control.
 *
 * moveTo(creep, target, opts)
 *
 * Same as creep.moveTo(target, opts)
 */

module.exports = function(creep, target, opts) {
    return creep.moveTo(target)

    // TODO Cache path in some clever way
    var path = PathFinder.search(creep.pos, target);
    var moveSpeed = moveSpeed(creep);

    // Can it get there *and back*?
    var journeyTime = path.length * 2 * moveSpeed;

    if (creep.ticksToLive < journeyTime) {
        creep.mode = "retire";
        return 2;
    }
    else {
        creep.moveByPath(path);
    }
};

/* Ticks per tile */
function moveSpeed(creep) {
    // TODO
    // For now, just assume an average speed on plains
    return 2
}
