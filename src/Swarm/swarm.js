function Swarm(two, playArea) {

    let agents = [];

    let globalUpdateTime = Date.now();
    const getGlobal = () => {
        return globalUpdateTime;
    }
    const setGlobal = (time) => {
        globalUpdateTime = time;
    }

    const spawnAgent = function (i) {
        let colour = i % 2 === 0 ? AGENT_MAIN_COLOR : AGENT_SUPPORT_COLOR;
        if (i === 0){
            colour = "purple";
        }
        const dot = createDot(two, colour);
        const agent = new Agent(dot, playArea, i, getSwarmSystem, getGlobal, setGlobal);
        agents.push(agent);
    };

    const spawnAgents = () => {
        for (let i = 0; i < AGENTS_AMOUNT; i++) {
            spawnAgent(i);
        }
    }

    const update = (targets) => {
        agents.map((agent) => {
            agent.update(targets);
        })
    };

    const getSwarmSystem = () => {
        return agents;
    }



    return {
        spawnAgents: spawnAgents,
        update: update,
        agents: agents,
        getSwarmSystem: getSwarmSystem,
    };
}
