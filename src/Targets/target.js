function Target(dot, playArea, num) {
    const id = num;

    let clockwise = randomInt(0, 1) === 0,
        degrees = randomInt(1, 360),
        pos = dot.translation,
        speedModifier = randomise(TARGET_SPEED_MODIFIER, 0.15);

    const update = function() {
        const radians = toRadians(degrees / speedModifier); // convert degrees to radians
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
        id: id,
        translation: pos,
        update: update
    };
}
