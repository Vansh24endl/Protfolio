/* ==========================================================================
   INTERACTIVE LOGIC & ANIMATIONS - VS PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. Header Scroll Shadow & Glow --- */
    const header = document.querySelector('.header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init on load


    /* --- 2. Mobile Menu Toggle --- */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Toggle hamburger animation state
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('active');
            });
        });
    }


    /* --- 3. Scroll Spy for Active Navigation Link --- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const scrollSpy = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // Offset for sticky header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}` || 
                (currentSectionId === 'home' && link.getAttribute('href') === '#')) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', scrollSpy);
    scrollSpy();


    /* --- 4. Interactive Monospace Terminal Simulator --- */
    const terminalOutput = document.getElementById('terminal-output');
    const terminalBody = document.getElementById('terminal-body');
    
    if (terminalOutput) {
        // Core details structure
        const details = [
            { label: 'Name', val: 'Vansh' },
            { label: 'Role', val: 'Full-Stack Developer' },
            { label: 'Focus', val: 'AI Systems, Security, Image Processing' },
            { label: 'Experience', val: 'Building impactful solutions with modern technologies' },
            { label: 'Status', val: 'Available for Opportunities', accent: true }
        ];

        // Store the original HTML content as mock backup
        const finalHTML = terminalOutput.innerHTML;
        
        // Clear terminal output initially
        terminalOutput.innerHTML = '';
        
        // Let's create an elegant typewriter effect for the whoami shell command first
        const promptTextElement = document.querySelector('.typing-text');
        if (promptTextElement) {
            promptTextElement.textContent = '';
            const command = 'whoami';
            let charIndex = 0;
            
            const typeCommand = () => {
                if (charIndex < command.length) {
                    promptTextElement.textContent += command.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeCommand, 120);
                } else {
                    // Command typed! Now output system results after a short pause
                    setTimeout(renderDetails, 400);
                }
            };
            
            // Start the typewriter command after 500ms
            setTimeout(typeCommand, 600);
        }

        const renderDetails = () => {
            let detailIndex = 0;

            const printNextDetail = () => {
                if (detailIndex < details.length) {
                    const item = details[detailIndex];
                    const p = document.createElement('p');
                    
                    // Create sub structures for alignment
                    const labelSpan = document.createElement('span');
                    labelSpan.className = 'term-label';
                    labelSpan.textContent = item.label.padEnd(10, ' ');
                    
                    const sepSpan = document.createElement('span');
                    sepSpan.className = 'term-sep';
                    sepSpan.textContent = ' : ';
                    
                    const valSpan = document.createElement('span');
                    if (item.accent) {
                        valSpan.className = 'term-val neon-accent';
                    } else {
                        valSpan.className = 'term-val';
                    }
                    valSpan.textContent = item.val;
                    
                    p.appendChild(labelSpan);
                    p.appendChild(sepSpan);
                    p.appendChild(valSpan);
                    
                    terminalOutput.appendChild(p);
                    
                    // Scroll to bottom of terminal
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                    
                    detailIndex++;
                    setTimeout(printNextDetail, 250);
                }
            };
            
            printNextDetail();
        };
    }


    /* --- 5. Scroll-Triggered Progress Bars & Counters --- */
    const progressFills = document.querySelectorAll('.progress-fill');
    const statBoxes = document.querySelectorAll('.stat-box');
    
    // Store original statistical targets
    progressFills.forEach(fill => {
        fill.dataset.targetWidth = fill.style.width;
        fill.style.width = '0%'; // Reset for entry animation
    });

    const animateSkillsAndStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate programming progress bars
                const bars = entry.target.querySelectorAll('.progress-fill');
                bars.forEach(bar => {
                    bar.style.width = bar.dataset.targetWidth;
                });
                
                // Count up numbers for Hero Stats
                const numbers = document.querySelectorAll('.stat-num');
                numbers.forEach(num => {
                    const targetStr = num.textContent;
                    // Extract numbers
                    const hasPlus = targetStr.includes('+');
                    const hasPercent = targetStr.includes('%');
                    const hasK = targetStr.includes('K');
                    
                    let targetVal = parseFloat(targetStr.replace(/[^0-9]/g, ''));
                    let currentVal = 0;
                    const duration = 1500; // ms
                    const increment = targetVal / (duration / 16); // ~60fps
                    
                    const updateCount = () => {
                        currentVal += increment;
                        if (currentVal < targetVal) {
                            num.textContent = Math.floor(currentVal) + (hasPlus ? '+' : hasPercent ? '%' : hasK ? 'K+' : '');
                            requestAnimationFrame(updateCount);
                        } else {
                            num.textContent = targetStr; // Snap to target
                        }
                    };
                    
                    updateCount();
                });
                
                // Unobserve once triggered
                observer.unobserve(entry.target);
            }
        });
    };

    // Use Intersection Observer for trigger
    const options = { threshold: 0.15 };
    const observer = new IntersectionObserver(animateSkillsAndStats, options);
    
    const statsSection = document.querySelector('.experience-achievements-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }


    /* --- 6. Glassmorphic Notification Alerts (UI Feedback) --- */
    const createToast = (message) => {
        // Remove existing toast if present
        const oldToast = document.querySelector('.glass-toast');
        if (oldToast) oldToast.remove();

        const toast = document.createElement('div');
        toast.className = 'glass-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: rgba(13, 20, 35, 0.85);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 245, 212, 0.3);
            border-radius: 8px;
            padding: 1rem 1.75rem;
            color: #F3F4F6;
            font-family: 'Outfit', sans-serif;
            font-size: 0.88rem;
            font-weight: 600;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(0,245,212,0.15);
            z-index: 1000;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            transform: translateY(20px);
            opacity: 0;
            display: flex;
            align-items: center;
            gap: 0.65rem;
        `;
        
        toast.innerHTML = `
            <span style="color: #00F5D4; font-size: 1.1rem;">⚡</span>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // Trigger show animation
        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        }, 50);

        // Hide and remove toast
        setTimeout(() => {
            toast.style.transform = 'translateY(20px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 400);
        }, 3200);
    };

    // Action button listeners
    const downloadBtn = document.getElementById('download-resume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            createToast('Downloading VS Resume package (mock output)...');
        });
    }

    const demoLinks = document.querySelectorAll('.project-link');
    demoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projName = link.closest('.project-info').querySelector('.project-card-title').textContent;
            createToast(`Launching sandboxed environment for "${projName}"...`);
        });
    });

    const timelineLink = document.querySelector('.timeline-full-link');
    if (timelineLink) {
        timelineLink.addEventListener('click', (e) => {
            e.preventDefault();
            createToast('Redirecting to full interactive timeline system...');
        });
    }
    
    const viewCertificationsLink = document.querySelector('.card-bottom-link');
    if (viewCertificationsLink) {
        viewCertificationsLink.addEventListener('click', (e) => {
            e.preventDefault();
            createToast('Opening certified ledger verification archive...');
        });
    }

    const footerCta = document.querySelector('.btn-contact-footer');
    if (footerCta) {
        footerCta.addEventListener('click', (e) => {
            createToast('Redirecting down to contact system form...');
        });
    }

});
