function Swarm(two, frame, agentAmount, target){
    let agents = [];

    const spawnAgent = () => {
        agents.push(new Agent(two, frame))
    }

    const createSwarm = () => {
        for (let i = 0; i < agentAmount; i++) {
            spawnAgent();
        }
    }

    const update = () => {
        agents.map((agent) => {
            agent.update(getTarget());
        })
    }

    return {
        spawnAgent, createSwarm, update, agents
    }
}
