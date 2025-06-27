var _a, _b, _c, _d;
// --- LOGIN/REGISTER ---
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
var aff_username = document.getElementById("user-name");
var user = {
    username: "",
    email: "",
    name: "",
    password: ""
};
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
            drawHomePong();
            updateMyProfile();
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
            user.username = username2.value;
            user.email = email.value;
            user.name = namee.value;
            user.password = password2.value;
            aff_username.textContent = user.username;
            registerForm.classList.add("hidden");
            loginForm.classList.add("hidden");
            homePage.classList.remove("hidden");
            page_ac.classList.remove("hidden");
            c_page.classList.add("hidden");
            updateMyProfile();
            drawHomePong();
        }
        else {
            console.log("Mot de passe incorrect");
        }
    }
    else {
        console.log("Veuillez remplir tous les champs");
    }
});
// --- USER MENU / PROFILE / SETTINGS ---
var user_menu = document.getElementById("user-menu");
var user_menu_button = document.getElementById("user-profile");
// Onglets profil
var tabInfos = document.getElementById("tab-infos");
var tabStats = document.getElementById("tab-stats");
var tabHistory = document.getElementById("tab-history");
var profileInfos = document.getElementById("profile-infos");
var profileStats = document.getElementById("profile-stats");
var profileHistoryTab = document.getElementById("profile-history-tab");
function showProfileTab(tab) {
    profileInfos.classList.add('hidden');
    profileStats.classList.add('hidden');
    profileHistoryTab.classList.add('hidden');
    if (tab === 'infos')
        profileInfos.classList.remove('hidden');
    if (tab === 'stats')
        profileStats.classList.remove('hidden');
    if (tab === 'history')
        profileHistoryTab.classList.remove('hidden');
}
tabInfos === null || tabInfos === void 0 ? void 0 : tabInfos.addEventListener('click', function () { return showProfileTab('infos'); });
tabStats === null || tabStats === void 0 ? void 0 : tabStats.addEventListener('click', function () { return showProfileTab('stats'); });
tabHistory === null || tabHistory === void 0 ? void 0 : tabHistory.addEventListener('click', function () { return showProfileTab('history'); });
// Affichage par défaut : infos
showProfileTab('infos');
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
function updateMyProfile() {
    var profileuser = document.getElementById('profile-username');
    var profileemail = document.getElementById('profile-email');
    var profilename = document.getElementById('profile-name');
    if (profileuser && profileemail && profilename) {
        profileuser.textContent = user.username;
        profileemail.textContent = user.email;
        profilename.textContent = user.name;
    }
}
user_menu_button === null || user_menu_button === void 0 ? void 0 : user_menu_button.addEventListener("click", function (e) {
    e.preventDefault();
    user_menu.classList.toggle("hidden");
});
(_a = document.getElementById('profile-link')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (e) {
    e.preventDefault();
    openSingleModal('profile-page');
});
(_b = document.getElementById('settings-link')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function (e) {
    e.preventDefault();
    openSingleModal('settings-page');
});
(_c = document.getElementById('close-profile-btn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    var _a;
    (_a = document.getElementById('profile-page')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
});
(_d = document.getElementById('close-settings-btn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
    var _a;
    (_a = document.getElementById('settings-page')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
});
// --- GAME ---
var pongLink = document.getElementById("pongg");
var gameSection = document.getElementById("game");
var homeSection = document.getElementById("accueil");
var pongsection = document.getElementById("pong-game");
var playbouton = document.getElementById("play-button");
var paddle1Y = 150;
var paddle2Y = 150;
var ballX = 400;
var ballY = 250;
var ballSpeedX = 3;
var ballSpeedY = 1;
var aiSpeed = 2;
var score1 = 0;
var score2 = 0;
pongLink === null || pongLink === void 0 ? void 0 : pongLink.addEventListener("click", function (e) {
    e.preventDefault();
    gameSection === null || gameSection === void 0 ? void 0 : gameSection.classList.remove("hidden");
    page_ac === null || page_ac === void 0 ? void 0 : page_ac.classList.add("hidden");
    pongsection === null || pongsection === void 0 ? void 0 : pongsection.classList.add("hidden");
});
homeSection === null || homeSection === void 0 ? void 0 : homeSection.addEventListener("click", function (e) {
    e.preventDefault();
    page_ac === null || page_ac === void 0 ? void 0 : page_ac.classList.remove("hidden");
    gameSection === null || gameSection === void 0 ? void 0 : gameSection.classList.add("hidden");
    pongsection === null || pongsection === void 0 ? void 0 : pongsection.classList.add("hidden");
});
var canvas = document.getElementById("pong");
var ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
var nav_bar = document.getElementById("nav-bar");
playbouton === null || playbouton === void 0 ? void 0 : playbouton.addEventListener("click", function (e) {
    e.preventDefault();
    gameSection === null || gameSection === void 0 ? void 0 : gameSection.classList.add("hidden");
    page_ac === null || page_ac === void 0 ? void 0 : page_ac.classList.add("hidden");
    pongsection === null || pongsection === void 0 ? void 0 : pongsection.classList.remove("hidden");
    nav_bar === null || nav_bar === void 0 ? void 0 : nav_bar.classList.add("hidden");
    resetGame();
    paddle1Y = canvas.height / 2 - 25;
    paddle2Y = canvas.height / 2 + 25;
    ballY = 250;
    ballX = 400;
    randomizeBallDirection();
    score1 = 0;
    score2 = 0;
    draw();
    console.log("Démarrage du jeu Pong");
});
function resetGame() {
    ballY = 250;
    ballX = 400;
    randomizeBallDirection();
    paddle1Y = canvas.height / 2 - 25;
    paddle2Y = canvas.height / 2 + 25;
}
function randomizeBallDirection() {
    var speed = 3;
    var angle;
    if (Math.random() < 0.5) {
        angle = (Math.random() * Math.PI / 2) - Math.PI / 4;
    }
    else {
        angle = Math.PI + (Math.random() * Math.PI / 2) - Math.PI / 4;
    }
    ballSpeedX = speed * Math.cos(angle);
    ballSpeedY = speed * Math.sin(angle);
}
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp")
        paddle2Y -= 20;
    if (e.key === "ArrowDown")
        paddle2Y += 20;
});
function getPaddleImpactAngle(ballY, paddleY, paddleHeight) {
    // Renvoie un angle en radians selon la zone d'impact sur la raquette
    var relativeIntersectY = (paddleY + paddleHeight / 2) - ballY;
    var normalized = relativeIntersectY / (paddleHeight / 2); // -1 (bas) à 1 (haut)
    var maxBounceAngle = Math.PI / 3; // 60°
    return normalized * maxBounceAngle;
}
function draw() {
    if (!ctx || !canvas)
        return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    ctx.setLineDash([]);
    ctx.restore();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // Rebond haut/bas
    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
        ballSpeedY *= 1.12;
    }
    // Collision raquette gauche
    if (ballX < 10 && ballY > paddle1Y && ballY < paddle1Y + 50) {
        var angle = getPaddleImpactAngle(ballY, paddle1Y, 50);
        var speed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY) * 1.12;
        ballSpeedX = speed * Math.cos(angle);
        ballSpeedY = -speed * Math.sin(angle);
        if (ballSpeedX < 0)
            ballSpeedX = -ballSpeedX; // Toujours vers la droite
    }
    // Collision raquette droite
    if (ballX > 790 && ballY > paddle2Y && ballY < paddle2Y + 50) {
        var angle = getPaddleImpactAngle(ballY, paddle2Y, 50);
        var speed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY) * 1.12;
        ballSpeedX = -speed * Math.cos(angle);
        ballSpeedY = -speed * Math.sin(angle);
        if (ballSpeedX > 0)
            ballSpeedX = -ballSpeedX; // Toujours vers la gauche
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
    if (paddle1Y < 0)
        paddle1Y = 0;
    if (paddle1Y > canvas.height - 50)
        paddle1Y = canvas.height - 50;
    if (paddle2Y < 0)
        paddle2Y = 0;
    if (paddle2Y > canvas.height - 50)
        paddle2Y = canvas.height - 50;
    if (score1 >= 1) {
        showWinnerPopup("L'IA");
        return;
    }
    else if (score2 >= 1) {
        showWinnerPopup(user.username);
        return;
    }
    requestAnimationFrame(draw);
}
function showWinnerPopup(winner) {
    var oldPopup = document.getElementById("winner-popup");
    if (oldPopup)
        oldPopup.remove();
    var popup = document.createElement("div");
    popup.id = "winner-popup";
    popup.className = "";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "rgba(0,0,0,0.85)";
    popup.style.color = "#10b981";
    popup.style.padding = "2rem 3rem";
    popup.style.borderRadius = "1rem";
    popup.style.fontSize = "2rem";
    popup.style.fontWeight = "bold";
    popup.style.zIndex = "9999";
    popup.style.textAlign = "center";
    popup.textContent = "".concat(winner, " a gagn\u00E9 !");
    var closeBtn = document.createElement("button");
    closeBtn.textContent = "Fermer";
    closeBtn.className = "";
    closeBtn.style.display = "block";
    closeBtn.style.margin = "2rem auto 0 auto";
    closeBtn.style.padding = "0.5rem 2rem";
    closeBtn.style.background = "#10b981";
    closeBtn.style.color = "white";
    closeBtn.style.border = "none";
    closeBtn.style.borderRadius = "0.5rem";
    closeBtn.style.fontSize = "1.2rem";
    closeBtn.style.cursor = "pointer";
    closeBtn.onclick = function () { return popup.remove(); };
    closeBtn.addEventListener("click", function () {
        popup.classList.add("hidden");
        closeBtn.classList.add("hidden");
        gameSection === null || gameSection === void 0 ? void 0 : gameSection.classList.remove("hidden");
        pongsection === null || pongsection === void 0 ? void 0 : pongsection.classList.add("hidden");
        nav_bar === null || nav_bar === void 0 ? void 0 : nav_bar.classList.remove("hidden");
    });
    popup.appendChild(closeBtn);
    document.body.appendChild(popup);
}
// --- HOME CANVAS ---
var canvashome = document.getElementById("home-canvas");
var canHome = canvashome === null || canvashome === void 0 ? void 0 : canvashome.getContext("2d");
if (!canHome) {
    throw new Error("Impossible de récupérer le contexte du canvas");
}
function drawHomePong() {
    if (!canHome)
        return;
    canHome.clearRect(0, 0, canvashome.width, canvashome.height);
    canHome.save();
    canHome.strokeStyle = "#10b981";
    canHome.setLineDash([10, 10]);
    canHome.beginPath();
    canHome.moveTo(canvashome.width / 2, 0);
    canHome.lineTo(canvashome.width / 2, canvashome.height);
    canHome.stroke();
    canHome.setLineDash([]);
    canHome.restore();
    canHome.fillStyle = "#10b981";
    canHome.fillRect(20, 80, 10, 60);
    canHome.fillRect(canvashome.width - 30, 10, 10, 60);
    canHome.beginPath();
    canHome.arc(100, 100, 6, 0, Math.PI * 2);
    canHome.fillStyle = "#10b981";
    canHome.fill();
}
