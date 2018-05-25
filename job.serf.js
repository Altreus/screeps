/* Serf job is [ CARRY, WORK, MOVE ]
 * Basic unit that can be repurposed
 */

// FIXME: is new too expensive?
var doSpawn = require('task.spawn');
var doHarvest = require('task.harvest');
var doUpgrade = require('task.upgrade');
var doCharge = require('task.charge');
var doBuild = require('task.build');

/* new Serf(creep)
 *
 * Creates a Serf object out of a creep. The creep must be able to at least do
 * CARRY, WORK, MOVE.
 */
var Serf = function (creep) {
    this.creep = creep;
}

/* TODO base class */
Serf.prototype.role = function() { return this.creep.memory.role }
Serf.prototype.mode = function() { return this.creep.memory.mode || 'harvest' }

/* serf = Serf.spawn(spawn, role, name)
 *
 * Spawns a new creep of the serf type, [CARRY,WORK,MOVE].
 *
 * Arguments:
 *
 * spawn: a StructureSpawn
 * role: a role for this creep, currently charger, upgrader, builder
 * name: an optional name for the creep; generated if not supplied.
 *
 * Returns a new Serf if successful, or else returns the error value of
 * spawnCreep on the spawn object.
 *
 * see task.spawn
 */
Serf.spawn = function(spawn, role, name) {
    var c = doSpawn({
        parts: [CARRY, WORK, MOVE],
        role: role,
        memory: {
            job: "serf"
        }
    }, spawn, name);
    if (c instanceof Creep) {
        return new Serf(c);
    }
    else {
        return c;
    }
};

/* serf.tick()
 *
 * Depending on the serf's mode, either do that thing, or complain that it
 * can't.
 *
 * Returns the corresponding value from its task (defined by its role).
 *
 * Normally:
 * 0: Normal tick
 * 1: Mode changed e.g. (work -> harvest)
 * 2: Nothing to do
 *
 * Some tasks may return other values.
 */
Serf.prototype.tick = function () {
    var f = this[this.mode()];

    if (f) {
        f.apply(this, arguments);
    }
    else {
        console.log("No function to handle mode " + this.mode());
    }
}

/* serf.work()
 *
 * Depending on the serf's role, do the relevant task.
 *
 * Runs from tick() when the creep is in work mode.
 *
 * If the task causes a change in mode, redo tick().
 *
 * Returns:
 * 0: Normal tick
 * 1: Mode change
 * 2: Nothing to do
 *
 * Note that 1 will never be returned, because it will return the response from
 * the new task if the mode is changed.
 */
Serf.prototype.work = function () {
    var ret = 0;
    switch (this.role()) {
        case "charger":
            ret = doCharge(this.creep);
            break;
        case "upgrader":
            ret = doUpgrade(this.creep);
            break;
        case "builder":
            ret = doBuild(this.creep);
    }

    if (ret == 1) {
        // mode changed! Tick again to do the new task
        switch(this.mode()) {
            case "harvest":
                this.creep.say("So hungry :(");
                break;
            case "work":
                this.creep.say("Back to work :(");
                break;
        }

        ret = this.tick();
    }

    return ret;
}

/* serf.harvest()
 *
 * Finds a suitable energy source and harvests from it. See task.harvest.
 *
 * Returns:
 * 0: Normal tick
 * 1: Mode mode changed
 */
Serf.prototype.harvest = function () {
    doHarvest(this.creep);
}

module.exports = Serf;
