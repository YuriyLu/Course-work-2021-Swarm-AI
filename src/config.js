const getRandomPosition = (frame, agentRadius) => {
    const minX = agentRadius;
    const minY = agentRadius;
    const maxX = frame.width - agentRadius;
    const maxY = frame.height - agentRadius;

    const x = getRandomInt(minX, maxX);
    const y = getRandomInt(minY, maxY);
    return {x , y};
}
