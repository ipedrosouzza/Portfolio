// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Iniciar animações após o preloader
        animateOnScroll();
        animateSkillBars();
    }, 1000);
});

// Cursor personalizado
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Efeito hover em links e botões
    const links = document.querySelectorAll('a, button, .project-card, .skill-item, .social-icon');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorFollower.style.border = '1px solid rgba(108, 99, 255, 0.2)';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.border = '1px solid var(--primary-color)';
        });
    });
});

// Alternar tema claro/escuro
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.querySelector('.theme-switch');
    const themeIcon = themeSwitch.querySelector('i');
    
    // Verificar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
});

// Navegação fixa ao rolar
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
    
    // Atualizar link ativo no menu
    updateActiveNavLink();
});

// Atualizar link ativo no menu
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Menu mobile
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animar links
        navLinksItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
    
    // Fechar menu ao clicar em um link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            navLinksItems.forEach(link => {
                link.style.animation = '';
            });
        });
    });
});

// Animação ao rolar
function animateOnScroll() {
    const elements = document.querySelectorAll('.about-content, .skills-content, .project-card, .contact-content, .section-header');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Animação das barras de habilidades
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
            }
        });
    }, { threshold: 0.1 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Filtro de projetos
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Atualizar botão ativo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtrar projetos
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Tabs de habilidades
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Atualizar botão ativo
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Mostrar conteúdo da tab
            const target = button.getAttribute('data-target');
            
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === target) {
                    pane.classList.add('active');
                }
            });
        });
    });
});

// Formulário de contato
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simular envio do formulário
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            
            // Mostrar mensagem de sucesso após 1 segundo
            formMessage.textContent = 'Enviando mensagem...';
            formMessage.className = 'form-message';
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                formMessage.textContent = `Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`;
                formMessage.className = 'form-message success';
                contactForm.reset();
            }, 1000);
        });
    }
});

// Animação de digitação para o nome
document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector('.name');
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            nameElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        }
    };
    
    setTimeout(typeWriter, 1500);
});

// Rolagem suave para links de âncora
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Adicionar classe CSS para animações
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});