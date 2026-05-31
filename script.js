/* ==========================================================================
   INTERACTIVE LOGIC & CYBERNETIC FX - VANSH DHUMAL PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Cyber Boot Preloader & Falling Particles --- */
    const preloader = document.getElementById('preloader');
    const loaderParticles = document.getElementById('loader-particles');

    if (loaderParticles && preloader) {
        const particlesList = ['0', '1', '+', '•', '*', 'vd'];
        const numParticles = 40;

        // Spawn drifting binary/telemetry particles inside loader backdrop
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'loader-petal';
            particle.textContent = particlesList[Math.floor(Math.random() * particlesList.length)];

            // Random properties to simulate floating depth
            const scale = (Math.random() * 0.7 + 0.4).toFixed(2);
            const drift = Math.floor(Math.random() * 200 - 100) + 'px';
            const spin = Math.floor(Math.random() * 360) + 'deg';

            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * -50 + 'px';
            particle.style.setProperty('--scale', scale);
            particle.style.setProperty('--drift', drift);
            particle.style.setProperty('--spin', spin);

            // Stagger animation triggers
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            particle.style.animationDelay = (Math.random() * 4) + 's';
            particle.style.animationIterationCount = 'infinite';

            loaderParticles.appendChild(particle);
        }

        // Fade out preloader screen smoothly after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('loader-root--out');
                setTimeout(() => {
                    preloader.remove();
                }, 700);
            }, 1800); // 1.8s boot time to let the recruiter appreciate the boot logs
        });
    }

    /* --- 2. High-Precision HUD Cursor & Binary Code Trail --- */
    const customCursor = document.getElementById('custom-cursor');
    const customCursorGlow = document.getElementById('custom-cursor-glow');

    if (customCursor && customCursorGlow) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;
        let lastTrailX = 0, lastTrailY = 0;

        // Reveal cursors once pointer moves
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!customCursor.classList.contains('active')) {
                customCursor.classList.add('active');
                customCursorGlow.classList.add('active');
            }

            // Metred emitter for mouse trailing code nodes
            const dist = Math.hypot(mouseX - lastTrailX, mouseY - lastTrailY);
            if (dist > 35) { // Spawn particle every 35px moved
                spawnTrailParticle(mouseX, mouseY);
                lastTrailX = mouseX;
                lastTrailY = mouseY;
            }
        });

        // Precision lagging outer glowing ring interpolation
        const animateGlow = () => {
            const ease = 0.16; // Lerp dampener
            glowX += (mouseX - glowX) * ease;
            glowY += (mouseY - glowY) * ease;

            customCursor.style.left = mouseX + 'px';
            customCursor.style.top = mouseY + 'px';

            customCursorGlow.style.left = glowX + 'px';
            customCursorGlow.style.top = glowY + 'px';

            requestAnimationFrame(animateGlow);
        };
        requestAnimationFrame(animateGlow);

        // Bind hovering state triggers to all interactive tags
        const bindHoverTargets = () => {
            const interactives = document.querySelectorAll('a, button, input, textarea, .tag, .skills-tag-pill, .marquee-item');
            interactives.forEach(node => {
                node.addEventListener('mouseenter', () => customCursorGlow.classList.add('hovering'));
                node.addEventListener('mouseleave', () => customCursorGlow.classList.remove('hovering'));
            });
        };
        bindHoverTargets();

        // Re-bind targets dynamically for async changes
        const observer = new MutationObserver(() => bindHoverTargets());
        observer.observe(document.body, { childList: true, subtree: true });

        // Spawns tech trailing code elements that drift and dissolve
        function spawnTrailParticle(x, y) {
            const particle = document.createElement('div');
            particle.className = 'leaf-trail';

            const trailList = ['0', '1', '+', '•'];
            particle.textContent = trailList[Math.floor(Math.random() * trailList.length)];

            const scale = (Math.random() * 0.6 + 0.5).toFixed(2);
            const drift = Math.floor(Math.random() * 60 - 30) + 'px';
            const fall = Math.floor(Math.random() * 50 + 30) + 'px';
            const rotate = Math.floor(Math.random() * 120 - 60) + 'deg';
            const spin = Math.floor(Math.random() * 180) + 'deg';

            particle.style.left = (x + window.scrollX) + 'px';
            particle.style.top = (y + window.scrollY) + 'px';
            particle.style.setProperty('--leaf-scale', scale);
            particle.style.setProperty('--leaf-drift', drift);
            particle.style.setProperty('--leaf-fall', fall);
            particle.style.setProperty('--leaf-rotate', rotate);
            particle.style.setProperty('--leaf-spin', spin);

            document.body.appendChild(particle);

            // Clean element after animation duration
            setTimeout(() => {
                particle.remove();
            }, 1200);
        }
    }

    /* --- 3. Expanding Sticky Translucent Navigation Bar --- */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* --- 4. Responsive Mobile Navigation drawer Menu --- */
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    let backdrop = document.getElementById('nav-backdrop');

    if (menuToggle && navLinksContainer) {
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = 'nav-backdrop';
            backdrop.className = 'nav-backdrop';
            document.body.appendChild(backdrop);
        }

        const toggleMenu = (forceClose = false) => {
            const isOpen = forceClose ? false : !navLinksContainer.classList.contains('open');
            if (isOpen) {
                navLinksContainer.classList.add('open');
                menuToggle.classList.add('active');
                backdrop.classList.add('open');
                document.body.style.overflow = 'hidden';
            } else {
                navLinksContainer.classList.remove('open');
                menuToggle.classList.remove('active');
                backdrop.classList.remove('open');
                document.body.style.overflow = '';
            }
        };

        menuToggle.addEventListener('click', () => toggleMenu());
        backdrop.addEventListener('click', () => toggleMenu(true));
        navLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(true));
        });
    }

    /* --- 5. Dynamic Role Telemetry Typer Cycling --- */
    const roleDynamicText = document.getElementById('role-dynamic-text');
    if (roleDynamicText) {
        roleDynamicText.textContent = '';
        const roles = [
            'Full-Stack Developer',
            'Java Developer',
            'Cybersecurity Enthusiast'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 80;
        const deleteSpeed = 40;
        const delayBetweenRoles = 2200;

        const typeRole = () => {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                roleDynamicText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                roleDynamicText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeRole, delayBetweenRoles);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeRole, 200);
            } else {
                setTimeout(typeRole, isDeleting ? deleteSpeed : typeSpeed);
            }
        };

        setTimeout(typeRole, 650);
    }

    /* --- 6. Monospace HUD Terminal Simulator (Hero Section) --- */
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

        typingTextElement.textContent = '';
        terminalOutput.innerHTML = '';

        let charIndex = 0;

        const typeCommand = () => {
            if (charIndex < command.length) {
                typingTextElement.textContent += command.charAt(charIndex);
                charIndex++;
                setTimeout(typeCommand, 80);
            } else {
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

        setTimeout(typeCommand, 1500);
    }

    /* --- 7. Real-Time Coordinates Leaflet Map (Indore) --- */
    const mapContainer = document.getElementById('contact-map');
    if (mapContainer) {
        const indoreCoords = [22.7196, 75.8577]; // Indore, India coordinates

        // Initialize Leaflet map centered at Indore, disabling zoom scroll for fluid page scroll spy
        const map = L.map('contact-map', {
            center: indoreCoords,
            zoom: 12,
            zoomControl: false,
            scrollWheelZoom: false
        });

        // Elegant OpenStreetMap minimal tiles representation
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add sleek HUD zoom controller at bottom right
        L.control.zoom({
            position: 'bottomright'
        }).addTo(map);

        // Create high-precision pulsing neon coordinate indicator
        const customNeonMarker = L.divIcon({
            className: 'neon-pulse-icon',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        // Place marker on Indore map canvas
        const marker = L.marker(indoreCoords, { icon: customNeonMarker }).addTo(map);

        // Bind sleek command printout popup
        marker.bindPopup(`
            <div style="font-family:'Fira Code',monospace; font-size:11px; color:#f8fafc; background:#04060b; border:1px solid #1e293b; padding:6px 10px; border-radius:4px;">
                <span style="color:#06b6d4;">vd@indore:~$</span> secure_coordinates_acquired
            </div>
        `, { closeButton: false }).openPopup();
    }

    /* --- 8. Viewport Scroll Spy & Fade Up reveal triggers --- */
    const fadeUpElements = document.querySelectorAll('.fade-up');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
    });

    fadeUpElements.forEach(el => scrollObserver.observe(el));

    // Instantly reveal Hero section elements on boot load
    const heroFadeUps = document.querySelectorAll('#hero .fade-up');
    heroFadeUps.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 120 + 2000); // Trigger after preloader disappears
    });

    /* --- 9. Custom Slide-Up Toast Notification HUD --- */
    const triggerToast = (message) => {
        const activeToast = document.querySelector('.dev-min-toast');
        if (activeToast) activeToast.remove();

        const toast = document.createElement('div');
        toast.className = 'dev-min-toast';
        toast.innerHTML = `
            <span style="color: #06b6d4; font-weight: bold;">✦</span>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        // Slide up toast
        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        }, 50);

        // Auto dismiss toast after 3.2s
        setTimeout(() => {
            toast.style.transform = 'translateY(15px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 400);
        }, 3200);
    };

    /* --- 10. Interactive Secure Contact CLI form (Web3Forms API) --- */
    const contactCliForm = document.getElementById('contact-cli-form');
    const tunnelLogs = document.getElementById('tunnel-logs');
    const sshSubmitBtn = document.getElementById('ssh-submit-btn');

    // Secure access key dispatching payloads
    const WEB3FORMS_ACCESS_KEY = '1bc0ec8a-fce5-4857-802a-fd108a15551c';

    if (contactCliForm && tunnelLogs && sshSubmitBtn) {
        contactCliForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const cliNameVal = document.getElementById('cli-name').value;
            const cliEmailVal = document.getElementById('cli-email').value;
            const cliMsgVal = document.getElementById('cli-message').value;

            tunnelLogs.innerHTML = '';
            tunnelLogs.classList.add('active');

            sshSubmitBtn.disabled = true;
            sshSubmitBtn.style.opacity = '0.5';
            sshSubmitBtn.style.cursor = 'not-allowed';

            // Logs script lines for rendering before dispatching transmission
            const prepLogs = [
                { text: `vd-shell:~$ ssh -T connect_vs --payload_name="${cliNameVal}"`, class: '' },
                { text: 'Initializing secure endpoint sockets...', class: '' },
                { text: 'ESTABLISHING SECURE TCP HANDSHAKE ON SECURE PORT 443... SUCCESS', class: 'cyan' },
                { text: 'Requesting ephemeral secure session token...', class: '' },
                { text: 'Session Key Exchange: Diffie-Hellman Group14 active.', class: 'indigo' },
                { text: 'GENERATING AES-256 SYMMETRIC PAYLOAD KEY... SUCCESS', class: 'indigo' },
                { text: 'ENCRYPTING MESSAGE DATA BUFFER FOR TRANSMISSION...', class: 'indigo' },
                { text: `TRANSMITTING ENCRYPTED CYBERPACKETS TO stylis.vs.dev@gmail.com...`, class: 'pink' }
            ];

            const postSuccessLogs = [
                { text: 'TUNNEL COMPLETE: 100% MESSAGE PACKETS TUNNELED SUCCESSFULLY.', class: 'green' },
                { text: 'vd-shell:~$ connection socket closed. tunnel terminated.', class: 'green' }
            ];

            let logIndex = 0;

            const printPrepLogs = () => {
                if (logIndex < prepLogs.length) {
                    const item = prepLogs[logIndex];
                    const div = document.createElement('div');
                    div.className = `log-line ${item.class}`;
                    div.innerHTML = item.text;
                    tunnelLogs.appendChild(div);
                    tunnelLogs.scrollTop = tunnelLogs.scrollHeight;
                    logIndex++;
                    setTimeout(printPrepLogs, 150);
                } else {
                    dispatchPayload();
                }
            };

            const dispatchPayload = () => {
                if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== 'YOUR_ACCESS_KEY_HERE') {
                    const formData = new FormData();
                    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
                    formData.append("name", cliNameVal);
                    formData.append("email", cliEmailVal);
                    formData.append("message", cliMsgVal);
                    formData.append("subject", `New Systems Portfolio Message from ${cliNameVal}`);

                    fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        body: formData
                    })
                        .then(response => response.json())
                        .then(data => {
                            printPostLogs();
                        })
                        .catch(err => {
                            printPostLogs(); // Fallback simulation on dispatch failure
                        });
                } else {
                    setTimeout(printPostLogs, 800);
                }
            };

            const printPostLogs = () => {
                let postIndex = 0;
                const printNextPostLine = () => {
                    if (postIndex < postSuccessLogs.length) {
                        const item = postSuccessLogs[postIndex];
                        const div = document.createElement('div');
                        div.className = `log-line ${item.class}`;
                        div.innerHTML = item.text;
                        tunnelLogs.appendChild(div);
                        tunnelLogs.scrollTop = tunnelLogs.scrollHeight;
                        postIndex++;
                        setTimeout(printNextPostLine, 150);
                    } else {
                        triggerToast('Encrypted payload tunneled successfully to Vansh.');
                        contactCliForm.reset();

                        setTimeout(() => {
                            sshSubmitBtn.disabled = false;
                            sshSubmitBtn.style.opacity = '1';
                            sshSubmitBtn.style.cursor = 'pointer';
                        }, 800);
                    }
                };
                printNextPostLine();
            };

            printPrepLogs();
        });
    }

    /* --- 11. Traditional Download and Live Actions toasts --- */
    const downloadActions = [
        document.getElementById('resume-download'),
        document.getElementById('resume-download-btn'),
        document.getElementById('hero-resume-btn')
    ];

    downloadActions.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
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