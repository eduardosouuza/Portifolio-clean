// Intersection Observer para animações de scroll
document.addEventListener('DOMContentLoaded', function() {
    // Configurações do observer
    const observerOptions = {
        threshold: 0.1, // Elemento será considerado visível quando 10% dele estiver na viewport
        rootMargin: '0px 0px -50px 0px' // Margem negativa para ativar um pouco antes
    };

    // Criar o observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adicionar classe para ativar animação
                entry.target.classList.add('animate-visible');
                
                // Para elementos com stagger animation, animar os filhos
                const staggerChildren = entry.target.querySelectorAll('.stagger-animation');
                if (staggerChildren.length > 0) {
                    staggerChildren.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-visible');
                        }, index * 100); // 100ms de delay entre cada elemento
                    });
                }
                
                // Opcional: parar de observar o elemento após animação
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Selecionar todos os elementos com classes de animação
    const animatedElements = document.querySelectorAll('.animate-left, .animate-right, .animate-up, .animate-fade');
    
    // Observar cada elemento
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Animação especial para skill bars
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target.querySelector('.skill-fill');
                if (skillFill) {
                    // Adicionar classe para ativar animação da barra
                    setTimeout(() => {
                        skillFill.style.transition = 'width 1.5s ease-in-out';
                        skillFill.style.width = skillFill.style.width; // Força re-render
                    }, 200);
                }
                entry.target.classList.add('animate-visible');
            }
        });
    }, observerOptions);

    // Observar skill bars
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Animação inicial para elementos já visíveis (como o hero)
    const heroElements = document.querySelectorAll('.hero .animate-left, .hero .animate-right');
    heroElements.forEach(element => {
        // Pequeno delay para animação do hero
        setTimeout(() => {
            element.classList.add('animate-visible');
            
            // Animar elementos stagger do hero
            const heroStagger = element.querySelectorAll('.stagger-animation');
            heroStagger.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animate-visible');
                }, 500 + (index * 150)); // Começar após 500ms, com 150ms entre elementos
            });
        }, 300);
    });
});

// Função para adicionar animação hover aos project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-highlight, .stat-item, .contact-item');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Smooth scroll aprimorado para navegação
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"], .buttons a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 