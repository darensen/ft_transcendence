var _a, _b, _c, _d;
var registerForm = document.querySelector('#register-form');
var loginForm = document.querySelector('#login-form');
var c_page = document.getElementById('c-page');
var login = document.getElementById("button");
var password = document.getElementById("password");
var username = document.getElementById("username");
var PASS_FIXE = 'o';
var homePage = document.getElementById("home-page");
var page_ac = document.getElementById("page-accueil");
var showRegister = document.getElementById('show-register');
var Inscription = document.getElementById("button2");
var password2 = document.getElementById("password2");
var username2 = document.getElementById("username2");
var email = document.getElementById("email");
var namee = document.getElementById("name");
var pongLink = document.getElementById("pongg");
var gameSection = document.getElementById("game");
var homeSection = document.getElementById("accueil");
var user_menu = document.getElementById("user-menu");
var user_menu_button = document.getElementById("user-profile");
var gamesection = document.getElementById("game");
var playButton = document.getElementById("play-button");
var aff_username = document.getElementById("user-name");
var pongsection = document.getElementById("pong-game");
var playbouton = document.getElementById("play-button");
var navbar = document.getElementById("nav-bar");
var user = {
    username: "",
    email: "",
    name: "",
    password: ""
};
var paddle1Y = 150;
var paddle2Y = 150;
var ballX = 400;
var ballY = 250;
var ballSpeedX = 3;
var ballSpeedY = 1;
;
var aiSpeed = 2;
var score1 = 0;
var score2 = 0;
// Helper to close all modals except the one passed
function openSingleModal(modalId) {
    var modals = ['profile-page', 'settings-page', 'matchmaking-page', 'user-menu'];
    modals.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
            if (id === modalId) {
                el.classList.remove('hidden');
            }
            else {
                el.classList.add('hidden');
            }
        }
    });
}
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
login.addEventListener("click", function (e) {
    e.preventDefault();
    if (username.value && password.value) {
        if (password.value === PASS_FIXE) {
            console.log("Connexion réussie");
            user.username = username.value;
            user.password = password.value;
            aff_username.textContent = user.username;
            loginForm.classList.add("hidden");
            registerForm.classList.add("hidden");
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
Inscription.addEventListener("click", function (e) {
    e.preventDefault();
    if (username2.value && email.value && namee.value) {
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
if (aff_username) {
    aff_username.textContent = username.value;
}
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
    pongsection === null || pongsection === void 0 ? void 0 : pongsection.classList.add("hidden");
});
homeSection === null || homeSection === void 0 ? void 0 : homeSection.addEventListener("click", function (e) {
    e.preventDefault(); // Empêche le scroll en haut de page
    page_ac === null || page_ac === void 0 ? void 0 : page_ac.classList.remove("hidden");
    gameSection === null || gameSection === void 0 ? void 0 : gameSection.classList.add("hidden");
    pongsection === null || pongsection === void 0 ? void 0 : pongsection.classList.add("hidden");
});
// Profile/settings logic
(_a = document.getElementById('profile-link')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (e) {
    e.preventDefault();
    openSingleModal('profile-page');
});
(_b = document.getElementById('settings-link')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function (e) {
    e.preventDefault();
    openSingleModal('settings-page');
});
(_c = document.getElementById('close-profile-btn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    document.getElementById('profile-page').classList.add('hidden');
});
(_d = document.getElementById('close-settings-btn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
    document.getElementById('settings-page').classList.add('hidden');
});
var canvashome = document.getElementById("home-canvas");
var ctxHome = canvashome.getContext("2d");
if (!ctxHome) {
    throw new Error("Impossible de récupérer le contexte du canvas");
}
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
playbouton === null || playbouton === void 0 ? void 0 : playbouton.addEventListener("click", function (e) {
    e.preventDefault(); // Empêche le scroll en haut de page
    // Affiche la section Pong
    gameSection === null || gameSection === void 0 ? void 0 : gameSection.classList.add("hidden");
    page_ac === null || page_ac === void 0 ? void 0 : page_ac.classList.add("hidden");
    pongsection === null || pongsection === void 0 ? void 0 : pongsection.classList.remove("hidden");
    resetGame(); // Réinitialise le jeu
    paddle1Y = canvas.height / 2 - 25; // Centrer la raquette de gauche
    paddle2Y = canvas.height / 2 + 25; // Centrer la raquette de droite
    ballY = 250;
    ballX = 400;
    ballSpeedX = 3;
    ballSpeedY = 1;
    score1 = 0;
    score2 = 0;
    draw(); // Démarre la boucle de jeu
    console.log("Démarrage du jeu Pong");
});
var canvas = document.getElementById("pong");
var ctx = canvas.getContext("2d");
if (!ctx) {
    throw new Error("Impossible de récupérer le contexte du canvas");
}
function resetGame() {
    ballY = 250;
    ballX = 400;
    ballSpeedX = 3;
    ballSpeedY = 1;
    paddle1Y = canvas.height / 2 - 25; // Centrer la raquette de gauche
    paddle2Y = canvas.height / 2 + 25; // Centrer la raquette de droite
}
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp")
        paddle2Y -= 20;
    if (e.key === "ArrowDown")
        paddle2Y += 20;
});
// Boucle de jeu
function draw() {
    if (!ctx)
        return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Affichage du score
    ctx.font = "32px Arial";
    ctx.fillStyle = "#10b981";
    ctx.textAlign = "center";
    ctx.fillText("".concat(score1, "  -  ").concat(score2), canvas.width / 2, 40);
    ctx.fillStyle = "black";
    ctx.fillRect(0, paddle1Y, 10, 50);
    ctx.fillRect(790, paddle2Y, 10, 50);
    ctx.beginPath();
    ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#10b981";
    ctx.fill();
    ctx.save();
    ctx.strokeStyle = "#10b981";
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]); // reset
    ctx.restore();
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
    if (ballX > 790 && ballY > paddle2Y && ballY < paddle2Y + 50) {
        ballSpeedX = -ballSpeedX;
    }
    if (paddle1Y + 25 < ballY) {
        paddle1Y += aiSpeed;
    }
    else if (paddle1Y + 25 > ballY) {
        paddle1Y -= aiSpeed;
    }
    if (ballX < 0) {
        score2++;
        resetGame();
    }
    if (ballX > canvas.width) {
        score1++;
        resetGame();
    }
    // Limites des raquettes
    if (paddle1Y < 0)
        paddle1Y = 0;
    if (paddle1Y > canvas.height - 50)
        paddle1Y = canvas.height - 50;
    if (paddle2Y < 0)
        paddle2Y = 0;
    if (paddle2Y > canvas.height - 50)
        paddle2Y = canvas.height - 50;
    // Appel de la fonction draw à chaque frame
    requestAnimationFrame(draw);
}
