/* ==========================================================================
   INTERACTIVE LOGIC & ANIMATIONS - VANSH DHUMAL PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Responsive Mobile Navigation Toggle --- */
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
            menuToggle.classList.toggle('active');
        });

        // Close mobile panel on click of link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('open');
                menuToggle.classList.remove('active');
            });
        });
    }

    /* --- 2. Monospace HUD Terminal Simulator (Hero Section) --- */
    const terminalOutput = document.getElementById('terminal-output');
    const typingTextElement = document.querySelector('.typing-text');
    
    if (typingTextElement && terminalOutput) {
        const command = 'npm run init-portfolio';
        const outputLines = [
            '&gt; vd-portfolio@3.0.0 init',
            '&gt; loading secure environment variables...',
            '&gt; status: <span class="term-highlight">active_workspace</span>',
            '&gt; initialising Vansh Dhumal specs... success'
        ];

        // Clear initial text for dynamic load
        typingTextElement.textContent = '';
        terminalOutput.innerHTML = '';
        
        let charIndex = 0;
        
        const typeCommand = () => {
            if (charIndex < command.length) {
                typingTextElement.textContent += command.charAt(charIndex);
                charIndex++;
                setTimeout(typeCommand, 80);
            } else {
                // Command fully typed! Wait and print build outputs
                setTimeout(renderBuildLines, 300);
            }
        };

        const renderBuildLines = () => {
            let lineIndex = 0;
            
            const printNextLine = () => {
                if (lineIndex < outputLines.length) {
                    const p = document.createElement('p');
                    p.innerHTML = outputLines[lineIndex];
                    terminalOutput.appendChild(p);
                    lineIndex++;
                    setTimeout(printNextLine, 200);
                }
            };
            
            printNextLine();
        };

        // Start console simulation sequence after 800ms
        setTimeout(typeCommand, 800);
    }

    /* --- 3. Viewport Scroll Spy & Fade Up Triggers --- */
    const fadeUpElements = document.querySelectorAll('.fade-up');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it is a stat number inside, trigger rolling count
                const statNums = entry.target.querySelectorAll('.stat-number');
                statNums.forEach(num => {
                    if (!num.classList.contains('counted')) {
                        animateCounter(num);
                    }
                });
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
    });

    fadeUpElements.forEach(el => scrollObserver.observe(el));

    // Fast-trigger sequential load of Hero elements instantly on page open
    const heroFadeUps = document.querySelectorAll('#hero .fade-up');
    heroFadeUps.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
            const statNums = el.querySelectorAll('.stat-number');
            statNums.forEach(num => animateCounter(num));
        }, index * 120);
    });

    /* --- 4. Ease-Out Quadratic Stat Counters --- */
    function animateCounter(numElement) {
        numElement.classList.add('counted');
        const targetStr = numElement.getAttribute('data-target');
        const isDecimal = targetStr.includes('.');
        const targetVal = parseFloat(targetStr);
        
        let startVal = 0;
        const duration = 1500; // roll up duration
        const frameRate = 1000 / 60; // 60fps standard
        const totalFrames = Math.round(duration / frameRate);
        let currentFrame = 0;

        const counterInterval = setInterval(() => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            const easeProgress = progress * (2 - progress); // ease-out quad curve
            const currentVal = startVal + (targetVal - startVal) * easeProgress;

            if (isDecimal) {
                numElement.textContent = currentVal.toFixed(1);
            } else {
                numElement.textContent = Math.floor(currentVal) + (targetVal === 100 ? '+' : '');
            }

            if (currentFrame >= totalFrames) {
                clearInterval(counterInterval);
                numElement.textContent = targetStr + (targetVal === 100 ? '+' : '');
            }
        }, frameRate);
    }

    /* --- 5. Custom Slide-Up Toast Notifications (Action Feedback HUD) --- */
    const triggerToast = (message) => {
        const activeToast = document.querySelector('.dev-min-toast');
        if (activeToast) activeToast.remove();

        const toast = document.createElement('div');
        toast.className = 'dev-min-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 2.2rem;
            right: 2.2rem;
            background: rgba(17, 24, 39, 0.85);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-left: 3px solid #6366f1;
            border-radius: 8px;
            padding: 0.9rem 1.6rem;
            color: #f8fafc;
            font-family: 'Inter', sans-serif;
            font-size: 0.85rem;
            font-weight: 500;
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
            z-index: 1000;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            transform: translateY(15px);
            opacity: 0;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        `;
        
        toast.innerHTML = `
            <span style="color: #06b6d4; font-weight: bold;">✦</span>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // Trigger reveal
        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        }, 50);

        // Auto dismiss
        setTimeout(() => {
            toast.style.transform = 'translateY(15px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 400);
        }, 3200);
    };

    /* --- 6. Fully Original Secure Contact CLI Shell Interactive Form --- */
    const contactCliForm = document.getElementById('contact-cli-form');
    const tunnelLogs = document.getElementById('tunnel-logs');
    const sshSubmitBtn = document.getElementById('ssh-submit-btn');

    if (contactCliForm && tunnelLogs && sshSubmitBtn) {
        contactCliForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Fetch input parameters
            const cliNameVal = document.getElementById('cli-name').value;
            const cliEmailVal = document.getElementById('cli-email').value;
            const cliMsgVal = document.getElementById('cli-message').value;

            // Clear previous shell logs and reveal logs box
            tunnelLogs.innerHTML = '';
            tunnelLogs.classList.add('active');
            
            // Disable submit to prevent secondary spamming during script loop
            sshSubmitBtn.disabled = true;
            sshSubmitBtn.style.opacity = '0.5';
            sshSubmitBtn.style.cursor = 'not-allowed';

            // Logs script lines for rendering
            const secureTunnelLogs = [
                { text: `vd-shell:~$ ssh -T connect_vs --payload_name="${cliNameVal}"`, class: '' },
                { text: 'Initializing secure endpoint sockets...', class: '' },
                { text: 'ESTABLISHING SECURE TCP HANDSHAKE ON SECURE PORT 443... SUCCESS', class: 'cyan' },
                { text: 'Requesting ephemeral secure session token...', class: '' },
                { text: 'Session Key Exchange: Diffie-Hellman Group14 active.', class: 'indigo' },
                { text: 'GENERATING AES-256 SYMMETRIC PAYLOAD KEY... SUCCESS', class: 'indigo' },
                { text: 'ENCRYPTING MESSAGE DATA BUFFER FOR TRANSMISSION...', class: 'indigo' },
                { text: `TRANSMITTING ENCRYPTED CYBERPACKETS TO stylis.vs.dev@gmail.com...`, class: 'pink' },
                { text: 'TUNNEL COMPLETE: 100% MESSAGE PACKETS TUNNELED SUCCESSFULLY.', class: 'green' },
                { text: 'vd-shell:~$ connection socket closed. tunnel terminated.', class: 'green' }
            ];

            let logIndex = 0;

            const printNextLogLine = () => {
                if (logIndex < secureTunnelLogs.length) {
                    const item = secureTunnelLogs[logIndex];
                    const div = document.createElement('div');
                    div.className = `log-line ${item.class}`;
                    div.innerHTML = item.text;
                    tunnelLogs.appendChild(div);

                    // Auto scroll to bottom of shell box
                    tunnelLogs.scrollTop = tunnelLogs.scrollHeight;

                    logIndex++;
                    setTimeout(printNextLogLine, 180);
                } else {
                    // Fully tunneled! Show success toast and clear prompts
                    triggerToast('Encrypted payload tunneled successfully to Vansh.');
                    contactCliForm.reset();

                    // Re-enable form fields
                    setTimeout(() => {
                        sshSubmitBtn.disabled = false;
                        sshSubmitBtn.style.opacity = '1';
                        sshSubmitBtn.style.cursor = 'pointer';
                    }, 800);
                }
            };

            printNextLogLine();
        });
    }

    /* --- 7. Traditional Actions & Mock Downloads --- */
    const downloadActions = [
        document.getElementById('resume-download'),
        document.getElementById('resume-download-btn')
    ];

    downloadActions.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                triggerToast('Packaging Vansh Dhumal\'s secure resume profile...');
                
                setTimeout(() => {
                    triggerToast('Secure PDF package downloaded.');
                }, 1400);
            });
        }
    });

    const liveDemos = document.querySelectorAll('.live-demo-trigger');
    liveDemos.forEach(demo => {
        demo.addEventListener('click', (e) => {
            e.preventDefault();
            const projectCard = demo.closest('.project-card');
            const projectTitle = projectCard ? projectCard.querySelector('.project-title').textContent : 'System';
            triggerToast(`Initializing sandbox tunnel for "${projectTitle}" deployment...`);
        });
    });

});
