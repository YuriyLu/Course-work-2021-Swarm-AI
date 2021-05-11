function TargetCollection(two, playArea) {

    let targets = [];

    const spawnTarget = (i) => {
        const targetDot = createDot(two, TARGETS_COLOR, TARGETS_SIZE);
        const target = new Target(targetDot, playArea, i);
        targets.push(target);
    };

    const spawnTargets = () => {
        for (let i = 0; i < TARGETS_AMOUNT; i++) {
            spawnTarget(i + 10);
        }
    }

    const spawnMouseTarget = () => {
        const targetDot = createDot(two, MOUSE_TARGET_COLOR, MOUSE_TARGET_SIZE);
        const target = new MouseTarget(targetDot, 0);
        targets.push(target);
    };

    const update = () => {
        for (let i = targets.length - 1; i >= 0; i--) {
            targets[i].update();
        }
    };

    const groupAgents = (agents) => {
        agents.map((agent) => {
            const agentTarget = getTargetById(agent.getTargetId(), targets);

            let newAgentTarget = undefined;

            targets.map((newTarget) => {
                if (newTarget.id !== agentTarget.id) {
                    const distanceToNewTarget = getDistance(distanceTo(agent.dot.translation, newTarget.translation));
                    const distanceToTarget = getDistance(distanceTo(agent.dot.translation, agentTarget.translation));
                    if (!agentTarget || distanceToNewTarget < distanceToTarget) {
                        newAgentTarget = newTarget
                    } else if (distanceToNewTarget === agentTarget.distance) {
                        const rnd = randomInt(0, 1);
                        newAgentTarget = rnd === 0 ? agentTarget : newTarget;
                    }
                }
            })
            if (newAgentTarget) {
                agent.setTargetId(newAgentTarget.id)
            }
        })
    };

    return {
        update: update,
        spawnTargets: spawnTargets,
        targets: targets,
        groupAgents: groupAgents,
        spawnMouseTarget: spawnMouseTarget
    };
}
