function MouseTarget(dot) {
    let pos = dot.translation,
        mouseX = 0,
        mouseY = 0;

    const update = function() {
        pos.x = mouseX;
        pos.y = mouseY;
    };

    window.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        event = event || window.event;
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    return {
        translation: pos,
        update: update
    };
}
