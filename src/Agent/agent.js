let lastTargetUpdate = Date.now();
let lastLogTime = Date.now();

function Agent(dot, playArea, num, getSwarmSystem, getGlobal, setGlobal) {

    let velocity = {x: 0.0, y: 0.0};
    let position = getRandomPosition(playArea);
    let targetId = 0;

    const id = num;
    const accelerationClamp = randomise(ACCELERATION_CLAMP, AGENT_DELTA_VALUE);
    const velocityClamp = randomise(VELOCITY_CLAMP, AGENT_DELTA_VALUE);
    const randomFactor = randomFloat(0.00002, 0.00009);

    let agentBlockchain = WITH_BLOCKCHAIN ? [genesisBlock] : [];

    const update = function (targets) {
        checkTargets(targets)

        const target = getTargetById(targetId, targets)

        const d = distanceTo(position, target.translation);
        const distance = getDistance(d);

        const accelerationRate = distance * randomFactor;

        velocity.x += checkTheLimit(d.x * accelerationRate, accelerationClamp);
        velocity.y += checkTheLimit(d.y * accelerationRate, accelerationClamp);

        velocity.x = checkTheLimit(velocity.x, velocityClamp);
        velocity.y = checkTheLimit(velocity.y, velocityClamp);

        position.x += velocity.x;
        position.y += velocity.y;

        dot.translation.set(position.x, position.y);

        const time = Date.now();
        if (time - lastLogTime >= 3000 && id === 0){
            console.log(agentBlockchain)
            lastLogTime = time;
        }
    };

    const checkTargets = (targets) => {
        const agentTarget = getTargetById(getTargetId(), targets);

        let newAgentTarget = undefined;

        targets.map((newTarget) => {
            if (newTarget.id !== agentTarget.id) {
                const distanceToNewTarget = getDistance(distanceTo(dot.translation, newTarget.translation));
                const distanceToTarget = getDistance(distanceTo(dot.translation, agentTarget.translation));
                if (distanceToNewTarget < distanceToTarget) {
                    newAgentTarget = newTarget
                }
            }
        })
        if (newAgentTarget && newAgentTarget.id !== agentTarget.id) {
            const time = Date.now();
            if (time - lastTargetUpdate >= TIME_TO_UPDATE) {
                lastTargetUpdate = time;
                targetChangeRequest(newAgentTarget.id);
            }

        }
    }

    const getTargetId = () => {
        return targetId;
    }

    const setTargetId = (newTarget) => {
        targetId = newTarget;
    }

    const getId = () => {
        return id;
    }

    const targetChangeRequest = WITH_BLOCKCHAIN ? (newTarget) => {
        const timestamp = Date.now()
        if (timestamp - getGlobal() >= 1) {
            setGlobal(timestamp)
            const data = {
                agentId: id,
                targetId: newTarget,
            }
            const newBlock = generateNextBlock(data, agentBlockchain);
            const request = sendBlock(newBlock);
            if (request.every(res => res === true)) {
                agentBlockchain.push(newBlock);
                setTargetId(newTarget)
            }
        }
    } : (newTarget) => {
        setTargetId(newTarget);
    }

    const getAllSwarm = () => {
        return getSwarmSystem().filter((agent) => agent.getId() !== id);
    }

    // при изменении цели агент создает и отправляет блок на проверку другим агентам
    const sendBlock = (newBlock) => {
        return getAllSwarm().map((agent) => {
            return agent.receiveBlock(newBlock)
        })
    }

    //если блок валиден, записываем в свой блокчейн
    const receiveBlock = (newBlock) => {
        if (isValidNewBlock(newBlock, getLatestBlock(agentBlockchain))) {
            addBlock(newBlock, agentBlockchain);
            return true;
        } else {
            return false;
        }
    }

    return {
        dot: dot,
        update: update,
        getId: getId,
        getTargetId: getTargetId,
        setTargetId: setTargetId,
        receiveBlock: receiveBlock,
    };
}
