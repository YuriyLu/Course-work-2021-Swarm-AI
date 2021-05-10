function Agent(dot, playArea, utils, systemParameters) {

    let velocity = { x: 0.0, y: 0.0 },
        acceleration = { x: 0.0, y: 0.0 },
        position = utils.getRandomPosition(playArea),
        rf = utils.randomFloat(0.00002, 0.00009),
        initialFill = dot.fill,
        accelerationClamp = utils.diffuse(systemParameters.accelerationClamp, 0.15),
        velocityClamp = utils.diffuse(systemParameters.velocityClamp, 0.15);

    const update = function(targetDot, settings) {
        const target = targetDot.translation;

        const d = utils.distanceTo(position, target);
        const distance = utils.getDistance(d);

        const accelerationRate = distance * rf;
        acceleration.x = d.x * accelerationRate;
        acceleration.y = d.y * accelerationRate;

        acceleration.x = utils.clamp(acceleration.x, accelerationClamp);
        acceleration.y = utils.clamp(acceleration.y, accelerationClamp);

        velocity.x = velocity.x + acceleration.x;
        velocity.y = velocity.y + acceleration.y;

        velocity.x = utils.clamp(velocity.x, velocityClamp);
        velocity.y = utils.clamp(velocity.y, velocityClamp);

        position.x += velocity.x;
        position.y += velocity.y;

        dot.translation.set(position.x, position.y);

        updateLeaderState(settings);
    };

    const updateLeaderState = function(settings) {
        if(systemParameters.debug === true) {
            if(settings != null){
                dot.fill = settings.fill;
                dot.scale = settings.scale;
            }
            else{
                if(dot.scale !== 1) {
                    dot.fill = initialFill;
                    dot.scale = 1;
                }
            }
        }
    };

    return {
        dot: dot,
        update: update
    };
}
