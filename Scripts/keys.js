var keys = {
    isBound: false,
    touchBound: false,
    bind: function() {
        if (keys.isBound)
            return;

        $(document).on('keydown.marioKeys', function(event) {
            return keys.handler(event, true);
        });
        $(document).on('keyup.marioKeys', function(event) {
            return keys.handler(event, false);
        });
        keys.isBound = true;
    },
    reset: function() {
        keys.left = false;
        keys.right = false;
        keys.accelerate = false;
        keys.up = false;
        keys.down = false;
    },
    unbind: function() {
        $(document).off('.marioKeys');
        $(document).off('.marioTouch');
        keys.isBound = false;
        keys.touchBound = false;
    },
    bindTouch: function() {
        if (keys.touchBound)
            return;

        if (!('ontouchstart' in window || navigator.maxTouchPoints > 0))
            return;

        var pressEvents = 'touchstart mousedown pointerdown';
        var releaseEvents = 'touchend touchcancel mouseup mouseleave pointerup pointercancel pointerleave';

        $(document).on(pressEvents + '.marioTouch', '.touch-btn', function(event) {
            var action = $(this).data('action');
            if (typeof keys[action] !== 'undefined') {
                keys[action] = true;
            }
            event.preventDefault();
        });

        $(document).on(releaseEvents + '.marioTouch', '.touch-btn', function(event) {
            var action = $(this).data('action');
            if (typeof keys[action] !== 'undefined') {
                keys[action] = false;
            }
            event.preventDefault();
        });

        keys.touchBound = true;
    },
    handler: function(event, status) {
        switch (event.keyCode) {
            case 57392: // CTRL on MAC
            case 17: // CTRL
            case 65: // A
                keys.accelerate = status;
                break;
            case 40: // DOWN ARROW
                keys.down = status;
                break;
            case 39: // RIGHT ARROW
                keys.right = status;
                break;
            case 37: // LEFT ARROW
                keys.left = status;
                break;
            case 32: // SPACEBAR
                keys.up = status;
                break;
            default:
                return true;
        }

        event.preventDefault();
        return false;
    },
    accelerate: false,
    left: false,
    up: false,
    right: false,
    down: false,
};
