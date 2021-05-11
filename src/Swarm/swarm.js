function Swarm(two, playArea) {

    let agents = [];

    const spawnAgent = function (i) {
        const colour = i % 2 === 0 ? AGENT_MAIN_COLOR : AGENT_SUPPORT_COLOR;
        const dot = createDot(two, colour);
        const agent = new Agent(dot, playArea, i);
        agents.push(agent);
    };

    const update = function (targets) {
        for (let x = AGENTS_AMOUNT - 1; x >= 0; x--) {
            agents[x].update(targets);
        }
    };

    const spawnAgents = () => {
        for (let i = 0; i < AGENTS_AMOUNT; i++) {
            spawnAgent(i);
        }
    }

    return {
        spawnAgents: spawnAgents,
        update: update,
        agents: agents
    };
}
