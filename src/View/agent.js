const drawAgent = (two, position, radius, color) => {
    const x = position.x;
    const y = position.y;
    const agent = two.makeCircle(x, y, radius)
    agent.fill = color || 'blue';
    return agent;
}
