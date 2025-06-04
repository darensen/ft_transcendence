
let registerForm = document.querySelector('#register-form') as HTMLFormElement;
let loginForm = document.querySelector('#login-form') as HTMLFormElement;

const showRegister = document.getElementById('show-register');
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

const c_page = document.getElementById('c-page') as HTMLDivElement;
const login = document.getElementById("button") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const username = document.getElementById("username") as HTMLButtonElement;
const PASS_FIXE = '1234';

const homePage = document.getElementById("home-page") as HTMLDivElement;
const page_ac = document.getElementById("page-accueil") as HTMLDivElement;
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

const Inscription = document.getElementById("button2") as HTMLInputElement;
const password2 = document.getElementById("password2") as HTMLInputElement;
const username2 = document.getElementById("username2") as HTMLButtonElement;
const email = document.getElementById("email") as HTMLInputElement;
const namee = document.getElementById("name") as HTMLInputElement;

Inscription.addEventListener("click", (e) => {
    e.preventDefault();
    if (username2.value && password2.value && email.value && namee.value)
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

const pongLink = document.getElementById("pongg") as HTMLAnchorElement;
const gameSection = document.getElementById("game"); 
const homeSection = document.getElementById("accueil");

const user_menu = document.getElementById("user-menu") as HTMLDivElement;
const user_menu_button = document.getElementById("user-profile") as HTMLButtonElement;

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
});

homeSection?.addEventListener("click", (e) => {
    e.preventDefault(); // Empêche le scroll en haut de page
    page_ac?.classList.remove("hidden");
    gameSection?.classList.add("hidden");
});


const playbouton = document.getElementById("play-button") as HTMLButtonElement;
playbouton?.addEventListener("click", (e) => {
    e.preventDefault(); // Empêche le scroll en haut de page
    // Affiche la section Pong
    gameSection?.classList.add("hidden");
    page_ac?.classList.add("hidden");
});

const canvashome = document.getElementById("home-canvas") as HTMLCanvasElement;
const ctxHome = canvashome.getContext("2d");
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



const canvas = document.getElementById("pong") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
if (!ctx) {
    throw new Error("Impossible de récupérer le contexte du canvas");
}
// Initialisation des variables
let paddle1Y:number = 150;
let paddle2Y:number = 150;
let ballX:number = 300;
let ballY:number = 200;
let ballSpeedX:number = 3;
let ballSpeedY:number = 1;

// Gestion du clavier
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") paddle2Y -= 20;
    if (e.key === "ArrowDown") paddle2Y += 20;
    if (e.key === "w") paddle1Y -= 20;
    if (e.key === "s") paddle1Y += 20;
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
    if (ballX < 0 || ballX > canvas.width) 
    {
        ballY = 200;
        ballX = 300;
        ballSpeedX = 3;
        ballSpeedY = 1;
        paddle1Y = 150;
        paddle2Y = 150;
        console.log("Resetting game");
    }

    if (paddle1Y <= 0)
    {
        paddle1Y = 0 + 40;
    }
    if (paddle1Y >= canvas.height)
    {
        paddle1Y = canvas.height + 50;
    }
    requestAnimationFrame(draw);
}


draw();
