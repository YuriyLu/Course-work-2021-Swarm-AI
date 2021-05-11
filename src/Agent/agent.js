function Agent(dot, playArea) {

    let velocity = { x: 0.0, y: 0.0 },
        position = getRandomPosition(playArea);
    const accelerationClamp = randomise(ACCELERATION_CLAMP, AGENT_DELTA_VALUE),
        velocityClamp = randomise(VELOCITY_CLAMP, AGENT_DELTA_VALUE),
        randomFactor = randomFloat(0.00002, 0.00009);

    const update = function(targetDot) {
        const target = targetDot.translation;

        const d = distanceTo(position, target);
        const distance = getDistance(d);

        const accelerationRate = distance * randomFactor;

        velocity.x += clamp(d.x * accelerationRate, accelerationClamp);
        velocity.y += clamp(d.y * accelerationRate, accelerationClamp);

        velocity.x = clamp(velocity.x, velocityClamp);
        velocity.y = clamp(velocity.y, velocityClamp);

        position.x += velocity.x;
        position.y += velocity.y;

        dot.translation.set(position.x, position.y);
    };

    return {
        dot: dot,
        update: update
    };
}
