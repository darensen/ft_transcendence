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
    canHome.strokeStyle = "white";
    canHome.setLineDash([10, 10]);
    canHome.beginPath();
    canHome.moveTo(canvashome.width / 2, 0);
    canHome.lineTo(canvashome.width / 2, canvashome.height);
    canHome.stroke();
    canHome.setLineDash([]);
    canHome.restore();
    canHome.fillStyle = "white";
    canHome.fillRect(20, 80, 10, 60);
    canHome.fillRect(canvashome.width - 30, 10, 10, 60);
    canHome.beginPath();
    canHome.arc(100, 100, 6, 0, Math.PI * 2);
    canHome.fillStyle = "white";
    canHome.fill();
}
var pongLink = document.getElementById("pongg");
var gameSection = document.getElementById("game");
var homeSection = document.getElementById("accueil");
var pongsection = document.getElementById("pong-game");
var playbouton = document.getElementById("play-button");
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
