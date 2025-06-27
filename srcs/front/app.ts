// --- LOGIN/REGISTER ---
const registerForm = document.querySelector('#register-form') as HTMLFormElement;
const loginForm = document.querySelector('#login-form') as HTMLFormElement;
const c_page = document.getElementById('c-page') as HTMLDivElement;
const login = document.getElementById("button") as HTMLButtonElement;
const password = document.getElementById("password") as HTMLInputElement;
const username = document.getElementById("username") as HTMLInputElement;
const PASS_FIXE = 'o';
const homePage = document.getElementById("home-page") as HTMLDivElement;
const page_ac = document.getElementById("page-accueil") as HTMLDivElement;
const showRegister = document.getElementById('show-register');
const Inscription = document.getElementById("button2") as HTMLButtonElement;
const password2 = document.getElementById("password2") as HTMLInputElement;
const username2 = document.getElementById("username2") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const namee = document.getElementById("name") as HTMLInputElement;
const aff_username = document.getElementById("user-name") as HTMLSpanElement;

let user = {
    username: "",
    email: "",
    name: "",
    password: ""
};

showRegister?.addEventListener('click', (e) => {
  e.preventDefault();
  registerForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
  console.log("Show register form");
});

const showLogin = document.getElementById('show-login');
showLogin?.addEventListener('click', (e) => {
  e.preventDefault();
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
  console.log("Show login form");
});

login.addEventListener("click", (e) => {
    e.preventDefault();
    if (username.value && password.value) 
    {
        if (password.value === PASS_FIXE) 
        {
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
        else 
        {
            console.log("Mot de passe incorrect");
        }
    }
    else
    {
        console.log("Veuillez remplir tous les champs");
    }
});

Inscription.addEventListener("click", (e) => {
    e.preventDefault();
    if (username2.value && email.value && namee.value)
    {
        if (password2.value === PASS_FIXE)
        {
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
        else
        {
            console.log("Mot de passe incorrect");
        }
    }
    else
    {
        console.log("Veuillez remplir tous les champs");
    }
});


// --- USER MENU / PROFILE / SETTINGS ---
const user_menu = document.getElementById("user-menu") as HTMLDivElement;
const user_menu_button = document.getElementById("user-profile") as HTMLButtonElement;

// Onglets profil
const tabInfos = document.getElementById("tab-infos") as HTMLButtonElement;
const tabStats = document.getElementById("tab-stats") as HTMLButtonElement;
const tabHistory = document.getElementById("tab-history") as HTMLButtonElement;
const profileInfos = document.getElementById("profile-infos") as HTMLDivElement;
const profileStats = document.getElementById("profile-stats") as HTMLDivElement;
const profileHistoryTab = document.getElementById("profile-history-tab") as HTMLDivElement;

function showProfileTab(tab: 'infos' | 'stats' | 'history') {
    profileInfos.classList.add('hidden');
    profileStats.classList.add('hidden');
    profileHistoryTab.classList.add('hidden');
    if (tab === 'infos') profileInfos.classList.remove('hidden');
    if (tab === 'stats') profileStats.classList.remove('hidden');
    if (tab === 'history') profileHistoryTab.classList.remove('hidden');
}

tabInfos?.addEventListener('click', () => showProfileTab('infos'));
tabStats?.addEventListener('click', () => showProfileTab('stats'));
tabHistory?.addEventListener('click', () => showProfileTab('history'));

// Affichage par défaut : infos
showProfileTab('infos');

function openSingleModal(modalId: string) 
{
    const modals = ['profile-page', 'settings-page', 'matchmaking-page', 'user-menu'];
    modals.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (id === modalId) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        }
    });
}

function updateMyProfile() 
{
    let profileuser = document.getElementById('profile-username') as HTMLHeadingElement;
    let profileemail = document.getElementById('profile-email') as HTMLSpanElement;
    let profilename = document.getElementById('profile-name') as HTMLSpanElement;

    if (profileuser && profileemail && profilename) 
    {
        profileuser.textContent = user.username;
        profileemail.textContent = user.email;
        profilename.textContent = user.name;
    }
}

user_menu_button?.addEventListener("click", (e) => {
    e.preventDefault();
    user_menu.classList.toggle("hidden");
});

document.getElementById('profile-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  openSingleModal('profile-page');
});

document.getElementById('settings-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  openSingleModal('settings-page');
});

document.getElementById('close-profile-btn')?.addEventListener('click', () => {
  document.getElementById('profile-page')?.classList.add('hidden');
});

document.getElementById('close-settings-btn')?.addEventListener('click', () => {
  document.getElementById('settings-page')?.classList.add('hidden');
});

// --- GAME ---
const pongLink = document.getElementById("pongg") as HTMLAnchorElement;
const gameSection = document.getElementById("game"); 
const homeSection = document.getElementById("accueil");
const pongsection = document.getElementById("pong-game") as HTMLDivElement;
const playbouton = document.getElementById("play-button") as HTMLButtonElement;

let paddle1Y:number = 150;
let paddle2Y:number = 150;
let ballX:number = 400;
let ballY:number = 250;
let ballSpeedX:number = 3;
let ballSpeedY:number = 1;
let aiSpeed:number = 2; 
let score1: number = 0;
let score2: number = 0;

pongLink?.addEventListener("click", (e) => {
    e.preventDefault();
    gameSection?.classList.remove("hidden");
    page_ac?.classList.add("hidden");
    pongsection?.classList.add("hidden");
});

homeSection?.addEventListener("click", (e) => {
    e.preventDefault();
    page_ac?.classList.remove("hidden");
    gameSection?.classList.add("hidden");
    pongsection?.classList.add("hidden");
});

const canvas = document.getElementById("pong") as HTMLCanvasElement;
const ctx = canvas?.getContext("2d");
const nav_bar = document.getElementById("nav-bar");

playbouton?.addEventListener("click", (e) => {
    e.preventDefault();
    
    gameSection?.classList.add("hidden");
    page_ac?.classList.add("hidden");
    pongsection?.classList.remove("hidden");
    nav_bar?.classList.add("hidden");
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
    const speed = 3;
    let angle: number;
    if (Math.random() < 0.5) {
        angle = (Math.random() * Math.PI / 2) - Math.PI / 4;
    } else {
        angle = Math.PI + (Math.random() * Math.PI / 2) - Math.PI / 4;
    }
    ballSpeedX = speed * Math.cos(angle);
    ballSpeedY = speed * Math.sin(angle);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") paddle2Y -= 20;
    if (e.key === "ArrowDown") paddle2Y += 20;
});

function getPaddleImpactAngle(ballY: number, paddleY: number, paddleHeight: number): number {
    // Renvoie un angle en radians selon la zone d'impact sur la raquette
    const relativeIntersectY = (paddleY + paddleHeight / 2) - ballY;
    const normalized = relativeIntersectY / (paddleHeight / 2); // -1 (bas) à 1 (haut)
    const maxBounceAngle = Math.PI / 3; // 60°
    return normalized * maxBounceAngle;
}

function draw() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "32px Arial";
    ctx.fillStyle = "#10b981";
    ctx.textAlign = "center";
    ctx.fillText(`${score1}  -  ${score2}`, canvas.width / 2, 40);
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
        const angle = getPaddleImpactAngle(ballY, paddle1Y, 50);
        const speed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY) * 1.12;
        ballSpeedX = speed * Math.cos(angle);
        ballSpeedY = -speed * Math.sin(angle);
        if (ballSpeedX < 0) ballSpeedX = -ballSpeedX; // Toujours vers la droite
    }
    // Collision raquette droite
    if (ballX > 790 && ballY > paddle2Y && ballY < paddle2Y + 50) {
        const angle = getPaddleImpactAngle(ballY, paddle2Y, 50);
        const speed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY) * 1.12;
        ballSpeedX = -speed * Math.cos(angle);
        ballSpeedY = -speed * Math.sin(angle);
        if (ballSpeedX > 0) ballSpeedX = -ballSpeedX; // Toujours vers la gauche
    }

    if (paddle1Y + 25 < ballY) {
        paddle1Y += aiSpeed;
    } else if (paddle1Y + 25 > ballY) {
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
    if (paddle1Y < 0) paddle1Y = 0;
    if (paddle1Y > canvas.height - 50) paddle1Y = canvas.height - 50;
    if (paddle2Y < 0) paddle2Y = 0;
    if (paddle2Y > canvas.height - 50) paddle2Y = canvas.height - 50;

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

function showWinnerPopup(winner: string) {
    let oldPopup = document.getElementById("winner-popup");
    if (oldPopup) oldPopup.remove();

    const popup = document.createElement("div");
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
    popup.textContent = `${winner} a gagné !`;

    const closeBtn = document.createElement("button");
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
    closeBtn.onclick = () => popup.remove();

    closeBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
        closeBtn.classList.add("hidden");
        gameSection?.classList.remove("hidden");
        pongsection?.classList.add("hidden");
        nav_bar?.classList.remove("hidden");
    });

    popup.appendChild(closeBtn);
    document.body.appendChild(popup);
}

// --- HOME CANVAS ---
const canvashome = document.getElementById("home-canvas") as HTMLCanvasElement;
const canHome = canvashome?.getContext("2d");
if (!canHome) {
    throw new Error("Impossible de récupérer le contexte du canvas");
}

function drawHomePong() 
{
    if (!canHome) return;
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
