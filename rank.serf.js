/* Serf role
 * [ CARRY, WORK, MOVE ]
 * Can be repurposed for whatever currently needs doing.
 */

// FIXME: is new too expensive?
var doSpawn = require('job.spawn');
var doHarvest = require('job.harvest');
var doUpgrade = require('job.upgrade');
var doCharge = require('job.charge');
//var doBuild = require('job.build');

/* new Serf(creep)
 *
 * Creates a Serf object out of a creep. The creep must be able to at least do
 * CARRY, WORK, MOVE.
 */
var Serf = function (creep) {
    this.creep = creep;
    this.role = creep.memory.role;
    this.mode = creep.memory.mode;
}

/* error = Serf.spawn(spawn, role, name)
 *
 * Spawns a new creep of the serf type, [CARRY,WORK,MOVE].
 *
 * Arguments:
 *
 * spawn: a StructureSpawn
 * role: a role for this creep, currently charger, upgrader, builder
 * name: an optional name for the creep; generated if not supplied.
 *
 * Returns the error value of spawnCreep on the spawn object.
 * (Should this return the new creep?)
 *
 * see job.spawn
 */
Serf.spawn = function(spawn, role, name) {
    var c = doSpawn({
        parts: [CARRY, WORK, MOVE],
        role: role
    }, spawn, name);
    return c;
};

/* serf.tick()
 *
 * Depending on the serf's mode, either do that thing, or complain that it
 * can't.
 *
 * Returns the corresponding value from its job (defined by its role).
 *
 * Normally:
 * 0: Normal tick
 * 1: Mode changed e.g. (work -> harvest)
 * 2: Nothing to do
 *
 * Some jobs may return other values.
 */
Serf.prototype.tick = function () {
    var f = this[this.mode];

    if (f) {
        f.apply(this, arguments);
    }
    else {
        console.log("No function handle mode " + mode);
    }
}

/* serf.work()
 *
 * Depending on the serf's role, do the relevant job.
 *
 * Runs from tick() when the creep is in work mode.
 *
 * If the job causes a change in mode, redo tick().
 *
 * Returns:
 * 0: Normal tick
 * 1: Mode change
 * 2: Nothing to do
 *
 * Note that 1 will never be returned, because it will return the response from
 * the new job if the mode is changed.
 */
Serf.prototype.work = function () {
    var ret = 0;
    switch (this.role) {
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
        // mode changed! Tick again to do the new job
        this.mode = this.creep.memory.mode;

        switch(this.mode) {
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
 * Finds a suitable energy source and harvests from it. See job.harvest.
 *
 * Returns:
 * 0: Normal tick
 * 1: Mode mode changed
 */
Serf.prototype.harvest = function () {
    doHarvest(this.creep);
}
