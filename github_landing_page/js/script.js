// Funções para interatividade da landing page sobre GitHub
document.addEventListener('DOMContentLoaded', function() {
    // Seleção de elementos
    const tabButtons = document.querySelectorAll('.portfolio__tab-button');
    const tabPanels = document.querySelectorAll('.portfolio__tab-panel');
    const mobileToggle = document.querySelector('.header__mobile-toggle');
    const headerMenu = document.querySelector('.header__menu');
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    // Funcionalidade de abas na seção de portfólio
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe ativa de todos os botões
            tabButtons.forEach(btn => {
                btn.classList.remove('portfolio__tab-button--active');
            });
            
            // Adicionar classe ativa ao botão clicado
            button.classList.add('portfolio__tab-button--active');
            
            // Obter o ID do painel correspondente
            const tabId = button.getAttribute('data-tab');
            
            // Esconder todos os painéis
            tabPanels.forEach(panel => {
                panel.classList.remove('portfolio__tab-panel--active');
            });
            
            // Mostrar o painel correspondente
            document.getElementById(tabId).classList.add('portfolio__tab-panel--active');
        });
    });
    
    // Menu mobile
    if (mobileToggle && headerMenu) {
        mobileToggle.addEventListener('click', () => {
            headerMenu.classList.toggle('header__menu--active');
            mobileToggle.classList.toggle('header__mobile-toggle--active');
        });
    }
    
    // Animação de scroll suave para links de âncora
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Fechar menu mobile se estiver aberto
                if (headerMenu.classList.contains('header__menu--active')) {
                    headerMenu.classList.remove('header__menu--active');
                    mobileToggle.classList.remove('header__mobile-toggle--active');
                }
                
                // Scroll suave
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação de elementos ao scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.why__card, .strategies__item, .portfolio__split, .resources__card, .journey__stat');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate-in');
            }
        });
    };
    
    // Adicionar classe para animação CSS
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .why__card, .strategies__item, .portfolio__split, .resources__card, .journey__stat {
            opacity: 0;
        }
        
        .header__mobile-toggle--active .header__mobile-toggle-bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .header__mobile-toggle--active .header__mobile-toggle-bar:nth-child(2) {
            opacity: 0;
        }
        
        .header__mobile-toggle--active .header__mobile-toggle-bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    `;
    document.head.appendChild(style);
    
    // Executar animação ao carregar a página
    window.addEventListener('load', animateOnScroll);
    // Executar animação ao rolar a página
    window.addEventListener('scroll', animateOnScroll);
    
    // Efeito de header ao scroll
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        });
        
        // Adicionar estilo para o header com scroll
        const headerStyle = document.createElement('style');
        headerStyle.textContent = `
            .header--scrolled {
                height: 70px;
                box-shadow: var(--shadow-lg);
                background-color: rgba(255, 255, 255, 0.98);
            }
            
            .header--scrolled .header__container {
                height: 70px;
            }
        `;
        document.head.appendChild(headerStyle);
    }
    
    // Contador de estatísticas na seção de jornada
    const statsElements = document.querySelectorAll('.journey__stat-number');
    let hasAnimated = false;
    
    const animateStats = () => {
        if (hasAnimated) return;
        
        const journeySection = document.querySelector('.journey');
        const journeyPosition = journeySection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (journeyPosition < screenPosition) {
            statsElements.forEach(stat => {
                const targetValue = stat.textContent;
                let currentValue = 0;
                const duration = 2000; // 2 segundos
                const increment = parseFloat(targetValue) / (duration / 16); // 60fps
                
                const updateCounter = () => {
                    if (currentValue < parseFloat(targetValue)) {
                        currentValue += increment;
                        
                        // Se o valor alvo contém um "x" (como em "3x")
                        if (targetValue.includes('x')) {
                            stat.textContent = Math.floor(currentValue) + 'x';
                        } 
                        // Se o valor alvo contém um "+" (como em "5+")
                        else if (targetValue.includes('+')) {
                            stat.textContent = Math.floor(currentValue) + '+';
                        } 
                        // Caso contrário, apenas o número
                        else {
                            stat.textContent = Math.floor(currentValue);
                        }
                        
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = targetValue;
                    }
                };
                
                updateCounter();
            });
            
            hasAnimated = true;
        }
    };
    
    // Executar animação de estatísticas ao rolar
    window.addEventListener('scroll', animateStats);
    
    // Efeito de hover nos cards de recursos
    const resourceCards = document.querySelectorAll('.resources__card');
    
    resourceCards.forEach(card => {
        const icon = card.querySelector('.resources__card-icon');
        const originalBackground = window.getComputedStyle(icon).background;
        
        card.addEventListener('mouseenter', () => {
            icon.style.background = 'linear-gradient(135deg, var(--color-secondary-light), var(--color-secondary))';
        });
        
        card.addEventListener('mouseleave', () => {
            icon.style.background = originalBackground;
        });
    });
    
    // Efeito de digitação na seção hero
    const heroTitle = document.querySelector('.hero__title--highlight');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let charIndex = 0;
    
    const typeEffect = () => {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 100);
        } else {
            // Adicionar cursor piscante após a digitação
            heroTitle.classList.add('hero__title--typed');
            
            // Adicionar estilo para o cursor
            const cursorStyle = document.createElement('style');
            cursorStyle.textContent = `
                .hero__title--typed::after {
                    content: '|';
                    animation: blink 1s infinite;
                }
                
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `;
            document.head.appendChild(cursorStyle);
            
            // Remover o cursor após 3 segundos
            setTimeout(() => {
                heroTitle.classList.remove('hero__title--typed');
            }, 3000);
        }
    };
    
    // Iniciar efeito de digitação após um pequeno delay
    setTimeout(typeEffect, 500);
});
