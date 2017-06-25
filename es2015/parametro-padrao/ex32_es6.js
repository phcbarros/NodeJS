function click(callback = function() {}) {
    callback();
}

click();
click(undefined);
click(null);