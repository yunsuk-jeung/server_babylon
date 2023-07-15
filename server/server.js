const express = require('express');
const expressWs = require('express-ws');

const app = express();
expressWs(app);

app.ws('/socket', function(ws, req) {
    console.log('Socket connection established');

    // Send new position every second
    setInterval(() => {
        let message = JSON.stringify({
            x: Math.random() * 10,
            y: Math.random() * 10,
            z: Math.random() * 10
        });

        if(ws.readyState === ws.OPEN){
            ws.send(message);
        }
    }, 1000);

    ws.on('close', function() {
        console.log('Socket connection closed');
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});