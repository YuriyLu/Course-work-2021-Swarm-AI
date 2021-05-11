function Swarm(two, playArea) {

    let agents = [];

    const spawnAgent = function (i) {
        const colour = i % 2 === 0 ? AGENT_MAIN_COLOR : AGENT_SUPPORT_COLOR;
        const dot = createDot(two, colour);
        const agent = new Agent(dot, playArea, i);
        agents.push(agent);
    };

    const spawnAgents = () => {
        for (let i = 0; i < AGENTS_AMOUNT; i++) {
            spawnAgent(i);
        }
    }

    const update = (targets) => {
        agents.map((agent) => {
            const agentTarget = getTargetById(agent.getTargetId(), targets);

            let newAgentTarget = undefined;

            targets.map((newTarget) => {
                if (newTarget.id !== agentTarget.id) {
                    const distanceToNewTarget = getDistance(distanceTo(agent.dot.translation, newTarget.translation));
                    const distanceToTarget = getDistance(distanceTo(agent.dot.translation, agentTarget.translation));
                    if (!agentTarget || distanceToNewTarget < distanceToTarget) {
                        newAgentTarget = newTarget
                    } else if (distanceToNewTarget === agentTarget.distance && newTarget.id === 0) {
                        newAgentTarget = newTarget;
                    }
                }
            })
            if (newAgentTarget) {
                agent.setTargetId(newAgentTarget.id)
            }
            agent.update(targets)
        })
    };

    return {
        spawnAgents: spawnAgents,
        update: update,
        agents: agents
    };
}
