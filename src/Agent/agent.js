function Agent(two, frame, dot){
    const radius = AGENT_RADIUS;
    let position = getRandomPosition(frame, radius);
    let speed = AGENT_SPEED;
    const agentView = drawAgent(two, position, radius)

    const update = (target) => {
        if(target){
            targetMove(target)
        } else {
            randomMove()
        }
    }

    const randomMove = () => {
        const x = getRandomInt(position.x - speed, position.x + speed);
        const y = getRandomInt(position.y - speed, position.y + speed);
        const vector = new Two.Vector(x, y);
        move(vector)
    }

    const targetMove = (target) => {
        const vector = new Two.Vector(target.x, target.y);
        move(vector);
    }

    const move = (vector) => {
        position = {x: vector.x, y: vector.y};
        agentView.translation.set(vector.x, vector.y);
    }

    // const move = (target) => {
    //     const way = Math.sqrt(Math.pow(position.x - target.x, 2) + Math.pow(position.y - target.y, 2));
    //
    // }

    return {
        update
    }
}
