// Funções interativas para a landing page CodeGalaxy
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o campo de estrelas
    initStarfield();
    
    // Seleção de elementos
    const mobileToggle = document.querySelector('.header__mobile-toggle');
    const headerMenu = document.querySelector('.header__menu');
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const nebulaeControls = document.querySelectorAll('.nebulae__control-button');
    const starmapStars = document.querySelectorAll('.starmap__star-group');
    const starmapInfoPanel = document.querySelector('.starmap__info-panel');
    const videoSearchButton = document.getElementById('videoSearchButton');
    const videoSearchInput = document.getElementById('videoSearchInput');
    const videoLanguageSelect = document.getElementById('videoLanguageSelect');
    const videosGrid = document.getElementById('videosGrid');
    const videosLoading = document.getElementById('videosLoading');
    const backToTop = document.querySelector('.footer__back-to-top');
    
    // Menu mobile
    if (mobileToggle && headerMenu) {
        mobileToggle.addEventListener('click', () => {
            headerMenu.classList.toggle('header__menu--active');
            mobileToggle.classList.toggle('header__mobile-toggle--active');
            
            // Adicionar animação às barras do menu
            const bars = mobileToggle.querySelectorAll('.header__mobile-toggle-bar');
            if (mobileToggle.classList.contains('header__mobile-toggle--active')) {
                bars[0].style.transform = 'translateY(8px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
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
                if (headerMenu && headerMenu.classList.contains('header__menu--active')) {
                    headerMenu.classList.remove('header__menu--active');
                    mobileToggle.classList.remove('header__mobile-toggle--active');
                    
                    // Resetar barras do menu
                    const bars = mobileToggle.querySelectorAll('.header__mobile-toggle-bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
                
                // Scroll suave
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cubo rotativo de linguagens
    let currentRotation = 0;
    const cube = document.querySelector('.nebulae__cube');
    const languageInfos = document.querySelectorAll('.nebulae__language-info');
    
    if (cube && nebulaeControls.length === 2) {
        // Botão anterior
        nebulaeControls[0].addEventListener('click', () => {
            currentRotation = (currentRotation - 90) % 360;
            if (currentRotation < 0) currentRotation += 360;
            rotateCube(currentRotation);
        });
        
        // Botão próximo
        nebulaeControls[1].addEventListener('click', () => {
            currentRotation = (currentRotation + 90) % 360;
            rotateCube(currentRotation);
        });
        
        // Clique nas faces do cubo
        const cubeFaces = document.querySelectorAll('.nebulae__cube-face');
        cubeFaces.forEach(face => {
            face.addEventListener('click', () => {
                const language = face.getAttribute('data-language');
                const rotation = getRotationForLanguage(language);
                currentRotation = rotation;
                rotateCube(rotation);
            });
        });
    }
    
    function rotateCube(degrees) {
        if (cube) {
            cube.style.transform = `rotateY(${degrees}deg)`;
            
            // Atualizar informações da linguagem
            const activeLanguage = getLanguageFromRotation(degrees);
            updateLanguageInfo(activeLanguage);
        }
    }
    
    function getRotationForLanguage(language) {
        switch (language) {
            case 'python': return 0;
            case 'javascript': return 90;
            case 'java': return 180;
            case 'csharp': return 270;
            default: return 0;
        }
    }
    
    function getLanguageFromRotation(degrees) {
        const normalizedDegrees = ((degrees % 360) + 360) % 360;
        switch (normalizedDegrees) {
            case 0: return 'python';
            case 90: return 'javascript';
            case 180: return 'java';
            case 270: return 'csharp';
            default: return 'python';
        }
    }
    
    function updateLanguageInfo(language) {
        languageInfos.forEach(info => {
            info.classList.remove('nebulae__language-info--active');
        });
        
        const activeInfo = document.querySelector(`.nebulae__language-info--${language}`);
        if (activeInfo) {
            activeInfo.classList.add('nebulae__language-info--active');
        }
    }
    
    // Mapa estelar interativo
    if (starmapStars.length > 0 && starmapInfoPanel) {
        const starmapInfoTitle = starmapInfoPanel.querySelector('.starmap__info-title');
        const starmapInfoText = starmapInfoPanel.querySelector('.starmap__info-text');
        
        const starmapData = [
            {
                step: 1,
                title: "Fundamentos da Programação",
                text: "Comece dominando os conceitos universais: variáveis, condicionais, loops, funções e estruturas de dados básicas. Estes são os blocos de construção que você usará em qualquer linguagem. Recomendo usar Python ou JavaScript nesta fase por sua sintaxe mais acessível."
            },
            {
                step: 2,
                title: "Primeiro Projeto Prático",
                text: "Após aprender o básico, construa algo concreto! Um projeto simples mas completo (como uma calculadora, um jogo da velha ou um gerenciador de tarefas) solidifica o conhecimento e te dá confiança para avançar. Escolha algo que você realmente usaria."
            },
            {
                step: 3,
                title: "Conceitos Intermediários",
                text: "Aprofunde-se em orientação a objetos, manipulação de arquivos, tratamento de erros e comece a explorar bibliotecas populares. Refatore seu primeiro projeto usando esses novos conceitos para ver a diferença na qualidade do código."
            },
            {
                step: 4,
                title: "Colaboração e Código Aberto",
                text: "Participe de projetos open source ou forme grupos de estudo. Ler e contribuir com código de outros desenvolvedores expõe você a padrões, truques e boas práticas que não encontraria em tutoriais básicos."
            },
            {
                step: 5,
                title: "Especialização e Aprofundamento",
                text: "Escolha uma área específica (desenvolvimento web, mobile, dados, etc.) e aprofunde-se nas ferramentas e frameworks relevantes. Construa um projeto complexo que possa servir como portfólio para demonstrar suas habilidades."
            }
        ];
        
        starmapStars.forEach(star => {
            star.addEventListener('click', () => {
                const step = parseInt(star.getAttribute('data-step'));
                const data = starmapData.find(item => item.step === step);
                
                if (data) {
                    // Atualizar painel de informações
                    starmapInfoTitle.textContent = data.title;
                    starmapInfoText.textContent = data.text;
                    
                    // Animar painel
                    starmapInfoPanel.style.animation = 'none';
                    setTimeout(() => {
                        starmapInfoPanel.style.animation = 'fadeIn 0.5s ease-out forwards';
                    }, 10);
                    
                    // Destacar estrela selecionada
                    starmapStars.forEach(s => {
                        const starElement = s.querySelector('.starmap__star');
                        const haloElement = s.querySelector('.starmap__star-halo');
                        
                        if (s === star) {
                            starElement.style.fill = 'var(--neon-pink)';
                            haloElement.style.stroke = 'var(--neon-pink)';
                            haloElement.style.animation = 'pulse 1s ease-in-out infinite';
                        } else {
                            starElement.style.fill = 'var(--neon-blue)';
                            haloElement.style.stroke = 'var(--neon-blue)';
                            haloElement.style.animation = 'pulse 2s ease-in-out infinite';
                        }
                    });
                }
            });
        });
        
        // Inicializar com a primeira estrela
        starmapStars[0].click();
    }
    
    // Funcionalidade de busca de vídeos do YouTube
    if (videoSearchButton && videoSearchInput && videoLanguageSelect && videosGrid) {
        videoSearchButton.addEventListener('click', () => {
            const query = videoSearchInput.value.trim();
            const language = videoLanguageSelect.value;
            
            if (query) {
                searchYouTubeVideos(query, language);
            } else {
                alert('Por favor, digite um termo de busca.');
            }
        });
        
        // Permitir busca ao pressionar Enter no campo de busca
        videoSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                videoSearchButton.click();
            }
        });
    }
    
    // Função para buscar vídeos do YouTube via API Python
    function searchYouTubeVideos(query, language) {
        // Mostrar loading
        if (videosLoading) {
            videosLoading.style.display = 'flex';
        }
        
        // Limpar grid de vídeos
        if (videosGrid) {
            videosGrid.innerHTML = '';
        }
        
        // Construir a query completa
        const fullQuery = `${query} ${language} tutorial`;
        
        // Fazer requisição para a API Python
        fetch(`/api/youtube-search?query=${encodeURIComponent(fullQuery)}&max_results=6`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                return response.json();
            })
            .then(data => {
                // Esconder loading
                if (videosLoading) {
                    videosLoading.style.display = 'none';
                }
                
                // Verificar se há resultados
                if (data.videos && data.videos.length > 0) {
                    displayVideos(data.videos);
                } else {
                    displayNoResults();
                }
            })
            .catch(error => {
                console.error('Erro ao buscar vídeos:', error);
                
                // Esconder loading
                if (videosLoading) {
                    videosLoading.style.display = 'none';
                }
                
                // Mostrar mensagem de erro
                displayError();
            });
    }
    
    // Função para exibir vídeos na grid
    function displayVideos(videos) {
        if (!videosGrid) return;
        
        videosGrid.innerHTML = '';
        
        videos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'observatory__video-card';
            
            videoCard.innerHTML = `
                <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener noreferrer">
                    <div class="observatory__video-thumbnail">
                        <img src="${video.thumbnail}" alt="${video.title}">
                        <div class="observatory__video-play">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="observatory__video-content">
                        <h3 class="observatory__video-title">${video.title}</h3>
                        <p class="observatory__video-channel">${video.channel}</p>
                        <div class="observatory__video-stats">
                            <div class="observatory__video-stat">
                                <i class="fas fa-eye"></i> ${formatViewCount(video.views)}
                            </div>
                            <div class="observatory__video-stat">
                                <i class="fas fa-calendar-alt"></i> ${formatDate(video.published)}
                            </div>
                        </div>
                    </div>
                </a>
            `;
            
            videosGrid.appendChild(videoCard);
        });
    }
    
    // Função para exibir mensagem de nenhum resultado
    function displayNoResults() {
        if (!videosGrid) return;
        
        videosGrid.innerHTML = `
            <div class="observatory__placeholder">
                <i class="fas fa-satellite-dish"></i>
                <p>Nenhuma transmissão encontrada. Tente outros termos de busca.</p>
            </div>
        `;
    }
    
    // Função para exibir mensagem de erro
    function displayError() {
        if (!videosGrid) return;
        
        videosGrid.innerHTML = `
            <div class="observatory__placeholder">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Ocorreu um erro ao buscar as transmissões. Tente novamente mais tarde.</p>
            </div>
        `;
    }
    
    // Função para formatar contagem de visualizações
    function formatViewCount(views) {
        if (!views) return '0 visualizações';
        
        if (views >= 1000000) {
            return `${(views / 1000000).toFixed(1)}M visualizações`;
        } else if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}K visualizações`;
        } else {
            return `${views} visualizações`;
        }
    }
    
    // Função para formatar data
    function formatDate(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 1) {
            return 'Hoje';
        } else if (diffDays <= 2) {
            return 'Ontem';
        } else if (diffDays <= 7) {
            return `${diffDays} dias atrás`;
        } else if (diffDays <= 30) {
            const weeks = Math.floor(diffDays / 7);
            return `${weeks} ${weeks === 1 ? 'semana' : 'semanas'} atrás`;
        } else if (diffDays <= 365) {
            const months = Math.floor(diffDays / 30);
            return `${months} ${months === 1 ? 'mês' : 'meses'} atrás`;
        } else {
            const years = Math.floor(diffDays / 365);
            return `${years} ${years === 1 ? 'ano' : 'anos'} atrás`;
        }
    }
    
    // Botão de voltar ao topo
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Mostrar/esconder botão com base no scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.pointerEvents = 'auto';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.pointerEvents = 'none';
            }
        });
    }
    
    // Efeito de header ao scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.height = '70px';
                header.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.height = '80px';
                header.style.boxShadow = 'none';
            }
        });
    }
    
    // Animação de elementos ao scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.mission__card, .nebulae__content, .starmap__info-panel, .observatory__video-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Adicionar estilo para animação CSS
    const style = document.createElement('style');
    style.textContent = `
        .mission__card, .nebulae__content, .starmap__info-panel, .observatory__video-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);
    
    // Executar animação ao carregar a página
    window.addEventListener('load', animateOnScroll);
    // Executar animação ao rolar a página
    window.addEventListener('scroll', animateOnScroll);
});

// Função para inicializar o campo de estrelas
function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Configurações
    const stars = [];
    const starCount = 200;
    const starSpeed = 0.2;
    const starSize = 1.5;
    
    // Criar estrelas
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * starSize + 0.5,
            speed: Math.random() * starSpeed + 0.1
        });
    }
    
    // Função de animação
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Desenhar estrelas
        stars.forEach(star => {
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Mover estrela
            star.y += star.speed;
            
            // Resetar posição se sair da tela
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    // Iniciar animação
    animate();
    
    // Redimensionar canvas quando a janela for redimensionada
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
