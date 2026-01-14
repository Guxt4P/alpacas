document.addEventListener('DOMContentLoaded', () => {
    
    // ==============================================
    // LOADING SCREEN
    // ==============================================
    window.addEventListener('load', () => {
        const loader = document.getElementById('loading-screen');
        setTimeout(() => {
            loader.classList.add('loaded');
        }, 1500);
    });

    // ==============================================
    // MENU MOBILE
    // ==============================================
    const menuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if(menuIcon) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
        });
    });

    // ==============================================
    // SCROLL REVEAL
    // ==============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.player-card, .position-title, section h3, .roster-group, .stat-box, .gallery-item, .match-card, .faq-item');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('hidden-element');
        observer.observe(el);
    });

    // ==============================================
    // EFEITO 3D TILT NOS CARDS
    // ==============================================
    const cards = document.querySelectorAll('.player-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            const xRotation = -1 * ((y - rect.height / 2) / 15); 
            const yRotation = (x - rect.width / 2) / 15;

            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`;
            card.style.zIndex = 100;
            card.style.borderColor = 'var(--gold)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.zIndex = 1;
            card.style.borderColor = '';
        });
    });

    // ==============================================
    // NAVBAR INTELIGENTE
    // ==============================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 26, 56, 0.98)';
            navbar.style.padding = '10px 5%';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.8)';
        } else {
            navbar.style.background = 'rgba(0, 43, 92, 0.95)';
            navbar.style.padding = '15px 5%';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        }
    });

    // ==============================================
    // CITAÇÕES DINÂMICAS
    // ==============================================
    const quotes = [
        { text: "Aqui não jogamos apenas por jardas. Jogamos pela pessoa ao nosso lado. Somos uma família.", author: "- HC COIÓ #53" },
        { text: "O trabalho duro vence o talento quando o talento não trabalha duro.", author: "- QB RICARDO #15" },
        { text: "Defesa ganha campeonato. Ataque vende ingresso, mas nós garantimos a taça.", author: "- S MOHAMED #12" }
    ];

    let currentQuoteIndex = 0;
    const quoteTextElem = document.getElementById('dynamic-quote');
    const quoteAuthorElem = document.getElementById('dynamic-author');
    const dots = document.querySelectorAll('.dot');

    function changeQuote() {
        quoteTextElem.style.opacity = 0;
        quoteAuthorElem.style.opacity = 0;

        setTimeout(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            quoteTextElem.textContent = `"${quotes[currentQuoteIndex].text}"`;
            quoteAuthorElem.textContent = quotes[currentQuoteIndex].author;

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentQuoteIndex);
            });

            quoteTextElem.style.opacity = 1;
            quoteAuthorElem.style.opacity = 1;
        }, 500);
    }

    setInterval(changeQuote, 5000);

    // Permite clicar nos dots para mudar
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            quoteTextElem.style.opacity = 0;
            quoteAuthorElem.style.opacity = 0;

            setTimeout(() => {
                currentQuoteIndex = index;
                quoteTextElem.textContent = `"${quotes[currentQuoteIndex].text}"`;
                quoteAuthorElem.textContent = quotes[currentQuoteIndex].author;

                dots.forEach((d, i) => {
                    d.classList.toggle('active', i === currentQuoteIndex);
                });

                quoteTextElem.style.opacity = 1;
                quoteAuthorElem.style.opacity = 1;
            }, 500);
        });
    });

    // ==============================================
    // FAQ ACCORDION
    // ==============================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if(otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });
    });

    // ==============================================
    // MENU ATIVO INTELIGENTE (SCROLL SPY)
    // ==============================================
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active-link');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active-link');
            }
        });
    });

    console.log("🔥 Sistema Alpacas: Carregado e Pronto!");
});

// ==============================================
// FILTROS DO ELENCO (Função Global)
// ==============================================
window.filterRoster = function(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        const btnText = btn.innerText.trim().toUpperCase();
        
        if(category === 'all' && btnText === 'TODOS') btn.classList.add('active');
        if(category === 'attack' && btnText === 'ATAQUE') btn.classList.add('active');
        if(category === 'defense' && btnText === 'DEFESA') btn.classList.add('active');
        if(category === 'staff' && btnText === 'STAFF') btn.classList.add('active');
    });

    const groups = document.querySelectorAll('.roster-group');
    
    groups.forEach(group => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            const groupCategory = group.getAttribute('data-category');
            
            if (category === 'all' || groupCategory === category) {
                group.style.display = 'block';
                setTimeout(() => {
                    group.style.opacity = '1';
                    group.style.transform = 'translateY(0)';
                }, 50);
            } else {
                group.style.display = 'none';
            }
        }, 200);
    });
}