document.addEventListener('DOMContentLoaded', () => {
    
    // ==============================================
    // 1. LOADING SCREEN
    // ==============================================
    window.addEventListener('load', () => {
        const loader = document.getElementById('loading-screen');
        if(loader) {
            setTimeout(() => {
                loader.classList.add('loaded');
            }, 1500);
        }
    });

    // ==============================================
    // 2. MENU MOBILE
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
    // 3. SCROLL REVEAL
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

    const elementsToAnimate = document.querySelectorAll('.player-card, .position-title, section h3, .roster-group, .stat-box, .gallery-item, .match-card, .faq-item, .timeline-item, .stat-quick-item');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('hidden-element');
        observer.observe(el);
    });

    // ==============================================
    // 4. EFEITO 3D TILT + HOLOGRÁFICO (GLARE)
    // ==============================================
    const cards = document.querySelectorAll('.player-card');

    cards.forEach(card => {
        const glare = document.createElement('div');
        glare.classList.add('card-glare');
        card.appendChild(glare);

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            const xRotation = -1 * ((y - rect.height / 2) / 15); 
            const yRotation = (x - rect.width / 2) / 15;

            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;

            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`;
            card.style.zIndex = 100;
            card.style.borderColor = 'var(--gold)';
            
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.0) 80%)`;
            glare.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.zIndex = 1;
            card.style.borderColor = '';
            glare.style.opacity = '0';
        });
    });

    // ==============================================
    // 5. TYPEWRITER (MÁQUINA DE ESCREVER)
    // ==============================================
    const typeTarget = document.querySelector('.type-target');
    const cursorSpan = document.querySelector('.cursor');
    
    if (typeTarget) {
        const phrases = ["FAMILY", "FOCUS", "RAÇA", "ALPACAS"]; 
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 150;

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typeTarget.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 100;
            } else {
                typeTarget.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                if(phraseIndex === phrases.length - 1) {
                    if(cursorSpan) cursorSpan.style.display = 'none';
                    return;
                }
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex++;
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        }

        setTimeout(typeWriter, 1000);
    }

    // ==============================================
    // 6. CONTADOR ANIMADO (STATS HIGHLIGHT)
    // ==============================================
    const statNumbers = document.querySelectorAll('.stat-quick-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));

    // ==============================================
    // 7. NAVBAR INTELIGENTE
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
    // 8. CITAÇÕES DINÂMICAS
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

    if (quoteTextElem && quoteAuthorElem) {
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
    }

    // ==============================================
    // 9. FAQ ACCORDION
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
    // 10. MENU ATIVO INTELIGENTE (SCROLL SPY)
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
            if (a.getAttribute('href') && a.getAttribute('href').includes(current)) {
                a.classList.add('active-link');
            }
        });
    });

    // ==============================================
    // 11. BARRA DE PROGRESSO & VOLTAR AO TOPO
    // ==============================================
    const progressBar = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if(progressBar) {
            progressBar.style.width = scrolled + "%";
        }

        if (backToTopBtn) {
            if (window.scrollY > 500) { 
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==============================================
    // 12. LIGHTBOX (ZOOM NA GALERIA)
    // ==============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById("lightbox-img");
    const captionText = document.getElementById("lightbox-caption");
    const closeBtn = document.querySelector(".lightbox-close");

    const galleryImages = document.querySelectorAll('.gallery-item img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            if(lightbox && lightboxImg) {
                lightbox.style.display = "block";
                lightboxImg.src = img.src;
                
                const overlaySpan = img.parentElement.querySelector('.gallery-overlay span');
                if(overlaySpan && captionText) {
                    captionText.innerHTML = overlaySpan.innerHTML;
                } else if(captionText) {
                    captionText.innerHTML = "ALPACAS EM AÇÃO";
                }
            }
        });
    });

    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = "none";
        });
    }

    if(lightbox) {
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }

    // ==============================================
    // 13. BUSCA DE JOGADORES (NOVA FUNCIONALIDADE!)
    // ==============================================
    const searchInput = document.getElementById('player-search');
    
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            const allCards = document.querySelectorAll('.player-card');
            
            if(searchTerm === '') {
                allCards.forEach(card => {
                    card.style.display = 'block';
                });
                return;
            }
            
            allCards.forEach(card => {
                const name = card.getAttribute('data-name').toLowerCase();
                const number = card.getAttribute('data-number');
                
                if(name.includes(searchTerm) || number.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    console.log("🔥 Sistema Alpacas: Carregado e Pronto!");
    console.log("✅ Todas as funcionalidades ativadas:");
    console.log("• Loading Screen");
    console.log("• Menu Mobile Responsivo");
    console.log("• Scroll Reveal Animations");
    console.log("• Cards 3D com Efeito Holográfico");
    console.log("• Typewriter Effect");
    console.log("• Contador Animado");
    console.log("• Navbar Inteligente");
    console.log("• Citações Rotativas");
    console.log("• FAQ Accordion");
    console.log("• Scroll Spy (Menu Ativo)");
    console.log("• Barra de Progresso");
    console.log("• Botão Voltar ao Topo");
    console.log("• Lightbox para Galeria");
    console.log("• Busca de Jogadores");
});

// ==============================================
// FUNÇÕES GLOBAIS (FORA DO DOMContentLoaded)
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
    
    const searchInput = document.getElementById('player-search');
    if(searchInput) {
        searchInput.value = '';
    }
}