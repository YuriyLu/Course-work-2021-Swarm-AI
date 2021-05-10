const getRandomInt = (min, max) => {
    return Math.round(getRandomFloat(min, max));
}

const getRandomFloat = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(5);
}

const getTarget = () => {
    return target ? {x: target.x, y: target.y} : false;
}
