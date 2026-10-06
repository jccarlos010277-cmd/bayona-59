// ========================================
// ANIMACIONES SUTILES - TERRAZAS DE BAYONA
// Neuromarketing: confianza + relajación
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 1. HEADER CON ANIMACIÓN AL HACER SCROLL
    // ========================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ========================================
    // 2. INTERSECTION OBSERVER PARA ANIMACIONES
    // ========================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Si es una tarjeta, animar con delay escalonado
                if (entry.target.classList.contains('animar-tarjeta')) {
                    const tarjetas = entry.target.parentElement.querySelectorAll('.animar-tarjeta');
                    tarjetas.forEach((tarjeta, index) => {
                        setTimeout(() => {
                            tarjeta.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observar todas las secciones y tarjetas
    document.querySelectorAll('.animar-seccion, .animar-tarjeta').forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // 3. SCROLL SUAVE PARA ENLACES INTERNOS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // 4. EFECTO PARALLAX SUAVE EN EL HERO
    // ========================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });
    }

    // ========================================
    // 5. CONTADOR ANIMADO EN LAS ESTADÍSTICAS
    // ========================================
    const stats = document.querySelectorAll('.hero-stats strong');
    let statsAnimated = false;

    function animarContadores() {
        if (statsAnimated) return;
        
        stats.forEach(stat => {
            const texto = stat.textContent;
            const numero = parseInt(texto);
            
            if (!isNaN(numero)) {
                let actual = 0;
                const incremento = Math.ceil(numero / 30);
                const intervalo = setInterval(() => {
                    actual += incremento;
                    if (actual >= numero) {
                        actual = numero;
                        clearInterval(intervalo);
                    }
                    stat.textContent = actual + '+ años';
                }, 50);
            }
        });
        
        statsAnimated = true;
    }

    // Detectar cuando las estadísticas están visibles
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animarContadores();
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(heroStats);
    }

});
