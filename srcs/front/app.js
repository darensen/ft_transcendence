var registerForm = document.querySelector('#register-form');
var loginForm = document.querySelector('#login-form');
var showRegister = document.getElementById('show-register');
showRegister === null || showRegister === void 0 ? void 0 : showRegister.addEventListener('click', function (e) {
    e.preventDefault();
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    console.log("Show register form");
});
var showLogin = document.getElementById('show-login');
showLogin === null || showLogin === void 0 ? void 0 : showLogin.addEventListener('click', function (e) {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    console.log("Show login form");
});
var login = document.getElementById("button");
var password = document.getElementById("password");
var username = document.getElementById("username");
var PASS_FIXE = '1234';
var play = document.getElementById("play-button");
login.addEventListener("click", function (e) {
    e.preventDefault();
    if (password.value === PASS_FIXE) {
        console.log("Connexion réussie");
        play.classList.remove("hidden");
        loginForm.classList.add("hidden");
        registerForm.classList.add("hidden");
        play.addEventListener("click", function (e) {
            e.preventDefault();
            console.log("Redirection vers le jeu Pong");
            // Ici, vous pouvez ajouter la logique pour rediriger vers le jeu Pong
            // Par exemple, en changeant la source du canvas ou en naviguant vers une autre page
        });
    }
    else {
        console.log("Mot de passe incorrect");
    }
});
var Inscription = document.getElementById("button2");
var password2 = document.getElementById("password2");
var username2 = document.getElementById("username2");
var email = document.getElementById("email");
var namee = document.getElementById("name");
Inscription.addEventListener("click", function (e) {
    e.preventDefault();
    if (username2.value && password2.value && email.value && namee.value) {
        if (password2.value === PASS_FIXE) {
            console.log("Inscription réussie");
            /*redirection vers la home page du pong*/
        }
        else {
            console.log("Mot de passe incorrect");
        }
    }
    else {
        console.log("Veuillez remplir tous les champs");
    }
});
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
        ballSpeedY *= 1.12;
    }
    if (ballX < 10 && ballY > paddle1Y && ballY < paddle1Y + 50) {
        ballSpeedX = -ballSpeedX;
        ballSpeedX *= 1.12;
    }
    if (ballX > 590 && ballY > paddle2Y && ballY < paddle2Y + 50) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX < 0 || ballX > canvas.width) {
        ballY = 200;
        ballX = 300;
        ballSpeedX = 3;
        ballSpeedY = 1;
        paddle1Y = 150;
        paddle2Y = 150;
        console.log("Resetting game");
    }
    if (paddle1Y <= 0) {
        paddle1Y = 0 + 40;
    }
    if (paddle1Y >= canvas.height) {
        paddle1Y = canvas.height + 50;
    }
    requestAnimationFrame(draw);
}
draw();
