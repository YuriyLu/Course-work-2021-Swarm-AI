function Target(dot, playArea, utils, systemParameters) {
    let clockwise = utils.randomInt(0, 1) === 0,
        degrees = utils.randomInt(1, 360),
        pos = dot.translation,
        speedModifier = utils.diffuse(systemParameters.defaultSpeed, 0.15);

    const update = function() {
        const radians = utils.toRadians(degrees / speedModifier); // convert degrees to radians
        pos.x = playArea.width  / 2 + (Math.cos(radians) * (playArea.width  / 3));
        pos.y = playArea.height / 2 + (Math.sin(radians) * (playArea.height / 3));

        updateDirection();
    };

    const updateDirection = function() {
        if(clockwise)
            degrees++;
        else
            degrees--;

        if(degrees > 720)
            clockwise = false;
        if(degrees < 0)
            clockwise = true;
    };

    return {
        translation: pos,
        update: update
    };
}
