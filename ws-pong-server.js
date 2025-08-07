const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });


let waiting = null;
let rooms = [];


wss.on('connection', ws => {
  ws.playernumber = null;
  ws.room = null;

  ws.on('message', msg => {
    let data;
    try { data = JSON.parse(msg); } catch { return; }
    if (data.type === 'join') {
      if (waiting) {
        // Création d'une room
        const width = 800, height = 400;
        const room = {
          players: [waiting, ws],
          state: {
            ball: { x: width/2, y: height/2, vx: 4, vy: 3 },
            paddle1: { y: 150 },
            paddle2: { y: 150 },
            score1: 0,
            score2: 0
          },
          width,
          height
        };
        waiting.playernumber = 1;
        ws.playernumber = 2;
        waiting.room = room;
        ws.room = room;
        rooms.push(room);
        waiting.send(JSON.stringify({ type: 'match_found', playernumber: 1 }));
        ws.send(JSON.stringify({ type: 'match_found', playernumber: 2 }));
        waiting.send(JSON.stringify({ type: 'canvas_size', width, height }));
        ws.send(JSON.stringify({ type: 'canvas_size', width, height }));
        waiting = null;
        startGameLoop(room);
      } else {
        waiting = ws;
      }
    }
    if (data.type === 'paddle_move' && ws.room) {
      if (ws.playernumber === 1) ws.room.state.paddle1.y = data.y;
      if (ws.playernumber === 2) ws.room.state.paddle2.y = data.y;
    }
  });

  ws.on('close', () => {
    if (waiting === ws) waiting = null;
    if (ws.room) {
      ws.room.players.forEach(p => {
        if (p !== ws && p.readyState === WebSocket.OPEN) {
          p.send(JSON.stringify({ type: 'opponent_left' }));
        }
      });
      rooms = rooms.filter(r => r !== ws.room);
    }
  });
});

function startGameLoop(room) {
  const width = 800, height = 400, paddleH = 80, paddleW = 10;
  function loop() {
    let s = room.state;
    s.ball.x += s.ball.vx;
    s.ball.y += s.ball.vy;
    if (s.ball.y < 0 || s.ball.y > height) s.ball.vy *= -1;
    if (s.ball.x < 30 && s.ball.y > s.paddle1.y && s.ball.y < s.paddle1.y + paddleH) s.ball.vx *= -1;
    if (s.ball.x > width - 30 && s.ball.y > s.paddle2.y && s.ball.y < s.paddle2.y + paddleH) s.ball.vx *= -1;
    if (s.ball.x < 0) { s.score2++; resetBall(s); }
    if (s.ball.x > width) { s.score1++; resetBall(s); }
    room.players.forEach(p => {
      if (p.readyState === WebSocket.OPEN) {
        p.send(JSON.stringify({ type: 'game_state', state: s }));
      }
    });
    if (room.players.every(p => p.readyState === WebSocket.OPEN)) {
      setTimeout(loop, 1000/60);
    }
    if (s.score1 >= 5 || s.score2 >= 5) {
      room.players.forEach(p => {
        if (p.readyState === WebSocket.OPEN) {
          if (s.score1 >= 5) 
          {
            p.send(JSON.stringify({ type: 'winner', score1: s.score1, score2: s.score2 }));
          } else {
            p.send(JSON.stringify({ type: 'loser', score1: s.score1, score2: s.score2 }));
          }
        } 
      });
      rooms = rooms.filter(r => r !== room);
      return;
      
    }
  }
  loop();
}

function resetBall(s) {
  s.ball.x = 300;
  s.ball.y = 200;
  s.ball.vx = (Math.random() > 0.5 ? 4 : -4);
  s.ball.vy = (Math.random() > 0.5 ? 3 : -3);
}

console.log('WebSocket Pong server running on ws://localhost:8081');
