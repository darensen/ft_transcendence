let registerForm = document.querySelector('#register-form') as HTMLFormElement;
let loginForm = document.querySelector('#login-form') as HTMLFormElement;
const c_page = document.getElementById('c-page') as HTMLDivElement;
const login = document.getElementById("button") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const username = document.getElementById("username") as HTMLButtonElement;
const PASS_FIXE = '';
const homePage = document.getElementById("home-page") as HTMLDivElement;
const page_ac = document.getElementById("page-accueil") as HTMLDivElement;
const showRegister = document.getElementById('show-register');

const Inscription = document.getElementById("button2") as HTMLInputElement;
const password2 = document.getElementById("password2") as HTMLInputElement;
const username2 = document.getElementById("username2") as HTMLButtonElement;
const email = document.getElementById("email") as HTMLInputElement;
const namee = document.getElementById("name") as HTMLInputElement;
const pongLink = document.getElementById("pongg") as HTMLAnchorElement;
const gameSection = document.getElementById("game"); 
const homeSection = document.getElementById("accueil");
const user_menu = document.getElementById("user-menu") as HTMLDivElement;
const user_menu_button = document.getElementById("user-profile") as HTMLButtonElement;
const gamesection = document.getElementById("game");
const playButton = document.getElementById("play-button");

const pongsection = document.getElementById("pong-game") as HTMLDivElement;
const playbouton = document.getElementById("play-button") as HTMLButtonElement;
const navbar = document.getElementById("nav-bar") as HTMLDivElement;


let paddle1Y:number = 150;
let paddle2Y:number = 150;
let ballX:number = 300;
let ballY:number = 200;
let ballSpeedX:number = 3;
let ballSpeedY:number = 1;;
let aiSpeed:number = 2; 
let score1: number = 0;
let score2: number = 0;
// Helper to close all modals except the one passed
function openSingleModal(modalId: string) {
    const modals = ['profile-page', 'settings-page', 'matchmaking-page', 'user-menu'];
    modals.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (id === modalId) 
                el.classList.remove('hidden');
            else 
                el.classList.add('hidden');
        }
    });
}
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
    if (password.value === PASS_FIXE) 
    {
        console.log("Connexion réussie");
        loginForm.classList.add("hidden");
        registerForm.classList.add("hidden");  
        homePage.classList.remove("hidden");
        page_ac.classList.remove("hidden");
        c_page.classList.add("hidden");
    }
    else 
    {
        console.log("Mot de passe incorrect");
    }
});

Inscription.addEventListener("click", (e) => {
    e.preventDefault();
    if (username2.value && email.value && namee.value)
    {
        if (password2.value === PASS_FIXE)
        {
            console.log("Inscription réussie"); 
            registerForm.classList.add("hidden");
            loginForm.classList.add("hidden");
            homePage.classList.remove("hidden");
            page_ac.classList.remove("hidden");
            c_page.classList.add("hidden");            
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



user_menu_button?.addEventListener("click", (e) => {
    e.preventDefault();
    user_menu.classList.toggle("hidden");
});

pongLink?.addEventListener("click", (e) => {
    e.preventDefault(); // Empêche le scroll en haut de page
    // Affiche la section Pong
    gameSection?.classList.remove("hidden");
    // Cache la page d'accueil
    page_ac?.classList.add("hidden");
    pongsection?.classList.add("hidden");
});

homeSection?.addEventListener("click", (e) => {
    e.preventDefault(); // Empêche le scroll en haut de page
    page_ac?.classList.remove("hidden");
    gameSection?.classList.add("hidden");
    pongsection?.classList.add("hidden");
});



 
// Profile/settings logic
document.getElementById('profile-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  openSingleModal('profile-page');
});

document.getElementById('settings-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  openSingleModal('settings-page');
});

document.getElementById('close-profile-btn')?.addEventListener('click', () => {
  document.getElementById('profile-page').classList.add('hidden');
});

document.getElementById('close-settings-btn')?.addEventListener('click', () => {
  document.getElementById('settings-page').classList.add('hidden');
});

const canvashome = document.getElementById("home-canvas") as HTMLCanvasElement;
const ctxHome = canvashome.getContext("2d");
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


playbouton?.addEventListener("click", (e) => {
    e.preventDefault(); // Empêche le scroll en haut de page
    // Affiche la section Pong
    gameSection?.classList.add("hidden");
    page_ac?.classList.add("hidden");
    pongsection?.classList.remove("hidden");
    navbar?.classList.add("hidden");
    resetGame(); // Réinitialise le jeu Pong
    // Démarre le jeu Pong
    draw(); // Démarre la boucle de jeu
    console.log("Démarrage du jeu Pong");
});

const canvas = document.getElementById("pong") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
if (!ctx) {
    throw new Error("Impossible de récupérer le contexte du canvas");
}


function resetGame() {
    ballY = 200;
    ballX = 300;
    ballSpeedX = 3;
    ballSpeedY = 1;
    paddle1Y = 150;
    paddle2Y = 150;
}


document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") paddle2Y -= 20;
    if (e.key === "ArrowDown") paddle2Y += 20;
});

// Boucle de jeu
function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Affichage du score
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

    // Limites des raquettes
    if (paddle1Y < 0) paddle1Y = 0;
    if (paddle1Y > canvas.height - 50) paddle1Y = canvas.height - 50;
    if (paddle2Y < 0) paddle2Y = 0;
    if (paddle2Y > canvas.height - 50) paddle2Y = canvas.height - 50;

    requestAnimationFrame(draw);
}



