function Agent(dot, playArea) {

    let velocity = { x: 0.0, y: 0.0 },
        acceleration = { x: 0.0, y: 0.0 },
        position = getRandomPosition(playArea),
        rf = randomFloat(0.00002, 0.00009),
        accelerationClamp = diffuse(ACCELERATION_CLAMP, 0.15),
        velocityClamp = diffuse(VELOCITY_CLAMP, 0.15);

    const update = function(targetDot, settings) {
        const target = targetDot.translation;

        const d = distanceTo(position, target);
        const distance = getDistance(d);

        const accelerationRate = 1;
        acceleration.x = d.x * accelerationRate;
        acceleration.y = d.y * accelerationRate;

        acceleration.x = clamp(acceleration.x, accelerationClamp);
        acceleration.y = clamp(acceleration.y, accelerationClamp);

        velocity.x = velocity.x + acceleration.x;
        velocity.y = velocity.y + acceleration.y;

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
