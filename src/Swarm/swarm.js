function Swarm(two, playArea) {

    let agents = [];

    const spawnAgent = function(i) {
        const colour = i % 2 === 0 ? AGENT_MAIN_COLOR : AGENT_SUPPORT_COLOR;
        const dot = createDot(two, colour);
        const agent = new Agent(dot, playArea);
        agents.push(agent);
    };

    const update = function(targetGroups) {
        // for each group, detect the leader and update agents

        for (let x = targetGroups.length - 1; x >= 0; x--) {
            const targetGroup = targetGroups[x];
            const target = targetGroup.target;
            const groupedAgents = targetGroups[x].bees;

            const leader = targetGroup.getLeader();

            for (let i = groupedAgents.length - 1; i >= 0; i--) {
                const agent = groupedAgents[i];

                if (agent === leader) {
                    agent.update(target);
                } else {
                    agent.update(leader.dot);
                }
            }
        }
    };

    return {
        spawnAgent: spawnAgent,
        update: update,
        agents: agents
    };
}
