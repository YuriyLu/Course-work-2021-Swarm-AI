const randomInt = (min, max) => {
    return Math.round(randomFloat(min, max));
}

const randomFloat = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(5);
}

const toRadians = (degrees) => {
    return degrees * Math.PI / 180;
}

const distanceTo = (self, target) => {
    return {
        x: target.x - self.x,
        y: target.y - self.y
    };
}

const getDistance = (distanceBetween) => {
    return Math.sqrt((distanceBetween.x * distanceBetween.x) + (distanceBetween.y * distanceBetween.y));
}

const checkTheLimit = (value, limit) => {
    if(value > limit)
        value = limit;
    if(value < -limit)
        value = -limit;

    return value;
}

const getRandomPosition = (playArea) => {
    const degrees = randomInt(1, 360);
    const radians = toRadians(degrees);
    const radius = randomInt(1, 300);
    const x = playArea.width  / 2 + (Math.cos(radians) * radius);
    const y = playArea.height / 2 + (Math.sin(radians) * radius);

    return { x: x, y: y };
}

const createDot = (two, color, size) => {
    const dot = two.makeCircle(AGENT_SIZE, AGENT_SIZE, size || AGENT_SIZE);
    dot.fill = color || 'yellow';

    return dot;
};

const randomise = (value, differential) => {
    const min = 1 - differential,
        max = 1 + differential;

    return value * randomFloat(min, max);
};

const getTargetById = (id, targets) => {
    return targets.find(target => target.id === id)
}
