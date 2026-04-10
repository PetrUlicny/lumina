// ================= 1. HLAVIČKA A MOBILNÍ MENU =================
const header = document.getElementById('header');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

// Přidání pozadí hlavičce při scrollování (zkráceno pomocí toggle podmínky)
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Otevření / zavření mobilního menu
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Ternární operátor pro rychlou změnu textu tlačítka
    menuBtn.innerText = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Skrytí menu po kliknutí na jakýkoliv odkaz
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.innerText = '☰';
    });
});

// ================= 2. FILTROVÁNÍ MENU =================
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Přepnutí aktivního zlatého rámečku
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.dataset.filter; // Moderní přístup k data-* atributům

        // Zobrazení nebo skrytí položek (využití toggle s podmínkou)
        menuItems.forEach(item => {
            const isHidden = filterValue !== 'all' && item.dataset.category !== filterValue;
            item.classList.toggle('hide', isHidden);
        });
    });
});

// ================= 3. ANIMACE PŘI SCROLLOVÁNÍ =================
// Založení hlídače (Observer) s přímým vložením konfigurace pro čistší kód
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target); // Zastaví sledování po zobrazení
        }
    });
}, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

// Spuštění sledování na všech elementech s třídou .scroll-reveal
document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// ================= 4. REZERVACE A NOTIFIKACE =================
const resForm = document.getElementById('resForm');
const toast = document.getElementById('toast');

if (resForm) {
    resForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        toast.classList.add('show');
        resForm.reset(); // Vyčistí formulář

        // Automatické skrytí po 3.5 vteřinách (zkrácen zápis funkce)
        setTimeout(() => toast.classList.remove('show'), 3500);
    });
}