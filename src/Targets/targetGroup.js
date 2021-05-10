function TargetGroup(target) {

    let agents = [],
        leader = { agent: null, distance: 0 };

    const addAgent = function(agent) {
        agents.push(agent);

        // works out the current leader while bees are being added to the array
        const distance = getDistance(distanceTo(agent.dot.translation, target.translation));
        if(leader.agent == null || distance < leader.distance) {
            leader.agent = agent;
            leader.distance = distance;
        }
    };

    const getLeader = function() {
        return leader.agent;
    };

    return {
        target: target,
        bees: agents,
        addBee: addAgent,
        getLeader: getLeader
    };
}
