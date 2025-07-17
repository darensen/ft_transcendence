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

const pongLink = document.getElementById("pongg") as HTMLAnchorElement;
const gameSection = document.getElementById("game"); 
const homeSection = document.getElementById("accueil");
const pongsection = document.getElementById("pong-game") as HTMLDivElement;
const playbouton = document.getElementById("play-button") as HTMLButtonElement;


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
