function Agent(dot, playArea, num) {

    let velocity = {x: 0.0, y: 0.0};
    let position = getRandomPosition(playArea);
    let targetId = 0;

    const id = num;
    const accelerationClamp = randomise(ACCELERATION_CLAMP, AGENT_DELTA_VALUE);
    const velocityClamp = randomise(VELOCITY_CLAMP, AGENT_DELTA_VALUE);
    const randomFactor = randomFloat(0.00002, 0.00009);

    const update = function (targets) {
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
    };

    const getTargetId = () => {
        return targetId;
    }

    const setTargetId = (newTarget) => {
        targetId = newTarget;
    }

    const getId = () => {
        return id;
    }

    return {
        dot: dot,
        update: update,
        getId: getId,
        getTargetId: getTargetId,
        setTargetId: setTargetId,
    };
}
