let socket = io();
socket.on('connect', function(data) {
    socket.emit('join', 'client connected');
});
socket.on('broad', function(data) {
    notifyMe(data.user, data.title);
});

function notifyMe(user, message) {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {
        var options = {
                body: message,
                dir : "ltr",
                icon: "../images/logo.png",
            };
        var notification = new Notification(user + " published a new recipe",options);
    }
    // ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            if (!('permission' in Notification)) {
                Notification.permission = permission;
            }
            if (permission === "granted") {
                var options = {
                        body: message,
                        dir : "ltr",
                };
                var notification = new Notification(user + " published a new recipe", options);
            }
        });
    }
}