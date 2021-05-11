function TargetCollection(two, playArea) {

    let targets = [];

    const spawnTarget = (i) => {
        const targetDot = createDot(two, TARGETS_COLOR, TARGETS_SIZE);
        const target = new Target(targetDot, playArea, i);
        targets.push(target);
    };

    const spawnMouseTarget = () => {
        const targetDot = createDot(two, MOUSE_TARGET_COLOR, MOUSE_TARGET_SIZE);
        const target = new MouseTarget(targetDot, 0);
        targets.push(target);
    };

    const spawnTargets = () => {
        spawnMouseTarget()
        for (let i = 0; i < TARGETS_AMOUNT; i++) {
            spawnTarget(i + 10);
        }
    }

    const update = () => {
        for (let i = targets.length - 1; i >= 0; i--) {
            targets[i].update();
        }
    };

    return {
        update: update,
        spawnTargets: spawnTargets,
        targets: targets,
        spawnMouseTarget: spawnMouseTarget
    };
}
