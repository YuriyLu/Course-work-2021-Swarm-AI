const initSwarm = () => {
    let elem = document.getElementById('canvas');
    const playArea = {
        width: $(window).width() - 20,
        height: $(window).height() - 40
    };

    const two = new Two(playArea).appendTo(elem);

    const targetCollection = new TargetCollection(two, playArea);
    targetCollection.spawnTargets();

    const swarm = new Swarm(two, playArea);
    swarm.spawnAgents();

    two.bind('update', function () {
        targetCollection.update();
        swarm.update(targetCollection.targets);
    });

    two.play()

    window.onkeydown = (event) => {
        if (event.code === `Space`) {
            if (two.playing) {
                two.pause()
            } else {
                two.play()
            }
        }
    }
}
