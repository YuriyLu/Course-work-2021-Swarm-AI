function Utils() {

    const randomInt = function(min, max) {
        return Math.round(randomFloat(min, max));
    }

    const randomFloat = function(min, max) {
        return (Math.random() * (max - min) + min).toFixed(5);
        //return (Math.random() * max) + min;
    }

    const toRadians = function(degrees) {
        return degrees * Math.PI / 180;
    }

    const getAngleBetween = function(self, target) {
        return Math.atan2(target.y - self.y, target.x - self.x);
    }

    const getRadiansBetween = function(self, target) {
        return toRadians(getAngleBetween(self, target));
    }

    const distanceTo = function(self, target) {
        return {
            x: target.x - self.x,
            y: target.y - self.y
        };
    }

    const getDistance = function(distanceBetween) {
        return Math.sqrt((distanceBetween.x * distanceBetween.x) + (distanceBetween.y * distanceBetween.y));
    }

    const clamp = function(value, limit) {
        if(value > limit)
            value = limit;
        if(value < -limit)
            value = -limit;

        return value;
    }

    const urlParam = function(name) {
        const results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (!results)
        {
            return 0;
        }
        return results[1] || 0;
    }

    const getRandomPosition = function(playArea) {
        const degrees = randomInt(1, 360);
        const radians = toRadians(degrees);
        const radius = randomInt(1, 300);
        const x = playArea.width  / 2 + (Math.cos(radians) * radius);
        const y = playArea.height / 2 + (Math.sin(radians) * radius);

        return { x: x, y: y };
    }

    const createDot = function(two, colour, size) {
        const x = -5,
            y = -5;

        size = size || 2;

        const dot = two.makeCircle(x, y, size);
        dot.fill = colour || 'yellow';

        return dot;
    };

    const diffuse = function(value, differential) {
        const min = 1 - differential,
            max = 1 + differential;

        return value * randomFloat(min, max);
    };

    return {
        randomInt: randomInt,
        randomFloat: randomFloat,
        toRadians: toRadians,
        getAngleBetween: getAngleBetween,
        getRadiansBetween: getRadiansBetween,
        distanceTo: distanceTo,
        getDistance: getDistance,
        clamp: clamp,
        urlParam: urlParam,
        getRandomPosition: getRandomPosition,
        createDot: createDot,
        diffuse: diffuse
    };
}
