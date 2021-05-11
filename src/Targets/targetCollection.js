function TargetCollection(two, playArea) {

    let targets = [];

    const spawnTarget = function() {
        const targetDot = createDot(two, TARGETS_COLOR, TARGETS_SIZE);
        const target = new Target(targetDot, playArea);
        targets.push(target);
    };

    const spawnMouseTarget = function() {
        const targetDot = createDot(two, MOUSE_TARGET_COLOR, MOUSE_TARGET_SIZE);
        const target = new MouseTarget(targetDot, playArea);
        targets.push(target);
    };

    const update = function() {
        for (let i = targets.length - 1; i >= 0; i--) {
            targets[i].update();
        }
    };

    const groupBees = function(bees) {
        let targetGroups = [];

        // turn target collection into a wrapped target with children
        for (let i = targets.length - 1; i >= 0; i--) {
            targetGroups.push(new TargetGroup(targets[i]));
        }

        // assign a bee to a target group
        for (let i = bees.length - 1; i >= 0; i--) {
            const bee = bees[i];

            let beeTarget = null;

            // works out closest target for each bee and adds the bee to that target's group
            for (let j = targetGroups.length - 1; j >= 0; j--) {
                const target = targetGroups[j].target,
                    distance = getDistance(distanceTo(bee.dot.translation, target.translation));

                if(beeTarget == null || distance < beeTarget.distance) {
                    beeTarget = { target: target, distance: distance, id: j };
                }
                else if(distance === beeTarget.distance) {
                    // if they are the same, pick a random one
                    const rnd = randomInt(0, 1);
                    beeTarget = rnd === 0 ? beeTarget : { target: target, distance: distance, id: j };
                }
            }

            if(beeTarget != null) {
                targetGroups[beeTarget.id].addBee(bee);
            }
        }

        return targetGroups;
    };

    return {
        update: update,
        spawnTarget: spawnTarget,
        targets: targets,
        groupBees: groupBees,
        spawnMouseTarget: spawnMouseTarget
    };
}
