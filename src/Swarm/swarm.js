function Swarm(two, playArea, utils, systemParameters) {

    let agents = [];

    const spawnAgent = function() {
        const colour = i % 3 === 0 ? systemParameters.beeAltColour : systemParameters.beeColour;
        const dot = utils.createDot(two, colour);
        const agent = new Agent(dot, playArea, utils, systemParameters);
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
                    agent.update(target, systemParameters.indicator);
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
