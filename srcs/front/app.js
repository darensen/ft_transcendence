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
var c_page = document.getElementById('c-page');
var login = document.getElementById("button");
var password = document.getElementById("password");
var username = document.getElementById("username");
var PASS_FIXE = '1234';
var homePage = document.getElementById("home-page");
var page_ac = document.getElementById("page-accueil");
login.addEventListener("click", function (e) {
    e.preventDefault();
    if (password.value === PASS_FIXE) {
        console.log("Connexion réussie");
        loginForm.classList.add("hidden");
        registerForm.classList.add("hidden");
        homePage.classList.remove("hidden");
        page_ac.classList.remove("hidden");
        c_page.classList.add("hidden");
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
            registerForm.classList.add("hidden");
            loginForm.classList.add("hidden");
            homePage.classList.remove("hidden");
            page_ac.classList.remove("hidden");
            c_page.classList.add("hidden");
        }
        else {
            console.log("Mot de passe incorrect");
        }
    }
    else {
        console.log("Veuillez remplir tous les champs");
    }
});
var pongLink = document.getElementById("pongg");
var gameSection = document.getElementById("game");
var homeSection = document.getElementById("accueil");
var user_menu = document.getElementById("user-menu");
var user_menu_button = document.getElementById("user-profile");
user_menu_button === null || user_menu_button === void 0 ? void 0 : user_menu_button.addEventListener("click", function (e) {
    e.preventDefault();
    user_menu.classList.toggle("hidden");
});
pongLink === null || pongLink === void 0 ? void 0 : pongLink.addEventListener("click", function (e) {
    e.preventDefault(); // Empêche le scroll en haut de page
    // Affiche la section Pong
    gameSection === null || gameSection === void 0 ? void 0 : gameSection.classList.remove("hidden");
    // Cache la page d'accueil
    page_ac === null || page_ac === void 0 ? void 0 : page_ac.classList.add("hidden");
});
homeSection === null || homeSection === void 0 ? void 0 : homeSection.addEventListener("click", function (e) {
    e.preventDefault(); // Empêche le scroll en haut de page
    page_ac === null || page_ac === void 0 ? void 0 : page_ac.classList.remove("hidden");
    gameSection === null || gameSection === void 0 ? void 0 : gameSection.classList.add("hidden");
});
var playbouton = document.getElementById("play-button");
playbouton === null || playbouton === void 0 ? void 0 : playbouton.addEventListener("click", function (e) {
    e.preventDefault(); // Empêche le scroll en haut de page
    // Affiche la section Pong
    gameSection === null || gameSection === void 0 ? void 0 : gameSection.classList.add("hidden");
    page_ac === null || page_ac === void 0 ? void 0 : page_ac.classList.add("hidden");
});
var canvashome = document.getElementById("home-canvas");
var ctxHome = canvashome.getContext("2d");
// Dessin statique d'un pong sur la page d'accueil
function drawHomePong() {
    ctxHome.clearRect(0, 0, canvashome.width, canvashome.height);
    ctxHome.save();
    ctxHome.strokeStyle = "#10b981"; // couleur émeraude
    ctxHome.setLineDash([10, 10]); // 10px trait, 10px espace
    ctxHome.beginPath();
    ctxHome.moveTo(canvashome.width / 2, 0);
    ctxHome.lineTo(canvashome.width / 2, canvashome.height);
    ctxHome.stroke();
    ctxHome.setLineDash([]); // reset
    ctxHome.restore();
    // Raquette de gauche
    ctxHome.fillStyle = "#10b981";
    ctxHome.fillRect(20, 80, 10, 60);
    ctxHome.fillRect(canvashome.width - 30, 10, 10, 60);
    // Balle
    ctxHome.beginPath();
    ctxHome.arc(100, 100, 6, 0, Math.PI * 2);
    ctxHome.fillStyle = "#10b981";
    ctxHome.fill();
}
drawHomePong();
var canvas = document.getElementById("pong");
var ctx = canvas.getContext("2d");
if (!ctx) {
    throw new Error("Impossible de récupérer le contexte du canvas");
}
// Initialisation des variables
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
