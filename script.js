// ================= 1. HLAVIČKA A MOBILNÍ MENU =================
const header = document.getElementById('header');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.innerText = navLinks.classList.contains('active') ? '✕' : '☰';
});

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
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.dataset.filter;

        menuItems.forEach(item => {
            item.classList.remove('visible');
        });

        setTimeout(() => {
            menuItems.forEach(item => {
                const isHidden = filterValue !== 'all' && item.dataset.category !== filterValue;
                
                item.classList.toggle('hide', isHidden);

                if (!isHidden) {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 50);
                }
            });
        }, 100); // rychlost transition
    });
});

// ================= 3. ANIMACE PŘI SCROLLOVÁNÍ =================

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });


document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// ================= 4. REZERVACE A NOTIFIKACE =================
const resForm = document.getElementById('resForm');
const toast = document.getElementById('toast');

if (resForm) {
    resForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        toast.classList.add('show');
        resForm.reset(); 

        // Automatické skrytí po 3.5 vteřinách (zkrácen zápis funkce)
        setTimeout(() => toast.classList.remove('show'), 3500);
    });
}