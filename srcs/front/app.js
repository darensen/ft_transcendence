var message = "Hello World ";
console.log(message);
var text = document.createElement("h1");
text.textContent = message;
document.body.appendChild(text);
var canvas = document.getElementById("pong");
var ctx = canvas.getContext("2d");
// Dessine un rectangle (raquette)
var paddle1Y = 150;
var paddle2Y = 150;
var ballX = 300;
var ballY = 200;
var ballSpeedX = 3;
var ballSpeedY = 1;
// Gestion du clavier
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp")
        paddle2Y -= 20;
    if (e.key === "ArrowDown")
        paddle2Y += 20;
    if (e.key === "w")
        paddle1Y -= 20;
    if (e.key === "s")
        paddle1Y += 20;
});
// Boucle de jeu
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Raquettes
    ctx.fillStyle = "black";
    ctx.fillRect(0, paddle1Y, 10, 50);
    ctx.fillRect(590, paddle2Y, 10, 50);
    // Balle
    ctx.beginPath();
    ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
    ctx.fillStyle = "purple";
    ctx.fill();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballX < 10 && ballY > paddle1Y && ballY < paddle1Y + 50) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX > 590 && ballY > paddle2Y && ballY < paddle2Y + 50) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX < 0 || ballX > canvas.width) {
        ballY = 200;
        ballX = 300;
    }
    if (paddle1Y <= 0) {
        paddle1Y = 0;
    }
    if (paddle1Y >= canvas.height) {
        paddle1Y = canvas.height + 50;
    }
    requestAnimationFrame(draw);
}
draw();
