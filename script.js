/* ==========================================================================
   INTERACTIVE LOGIC & CYBERNETIC FX - VANSH DHUMAL PORTFOLIO
   ========================================================================== */

async function loadComponent(placeholderId, filePath) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;
    try {
        const response = await fetch(filePath);
        const html = await response.text();
        placeholder.outerHTML = html;
    } catch (err) {
        console.error(`Error loading component: ${filePath}`, err);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Start loading templates immediately
    await Promise.all([
        loadComponent('about-placeholder', 'about.html')
    ]);
    initPortfolio();
});

function initPortfolio() {

    /* --- Cyber Theme Switcher Logic --- */
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        const themes = ['dark', 'light', 'system'];
        const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
        const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
        const monitorIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`;

        const getSavedTheme = () => localStorage.getItem('theme') || 'system';

        const updateThemeUI = (theme) => {
            if (theme === 'dark') {
                themeToggleBtn.innerHTML = moonIcon;
                themeToggleBtn.title = "Theme: Dark Mode";
            } else if (theme === 'light') {
                themeToggleBtn.innerHTML = sunIcon;
                themeToggleBtn.title = "Theme: Light Mode";
            } else {
                themeToggleBtn.innerHTML = monitorIcon;
                themeToggleBtn.title = "Theme: System Preference";
            }
        };

        const applyTheme = (theme) => {
            let themeToApply = theme;
            if (theme === 'system') {
                themeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            document.documentElement.setAttribute('data-theme', themeToApply);
            updateThemeUI(theme);
        };

        const currentTheme = getSavedTheme();
        applyTheme(currentTheme);

        themeToggleBtn.addEventListener('click', () => {
            const current = getSavedTheme();
            const nextIndex = (themes.indexOf(current) + 1) % themes.length;
            const nextTheme = themes[nextIndex];

            localStorage.setItem('theme', nextTheme);
            applyTheme(nextTheme);

            let toastMessage = 'Theme set to ';
            if (nextTheme === 'dark') toastMessage += 'Dark Mode 🌙';
            else if (nextTheme === 'light') toastMessage += 'Light Mode ☀️';
            else toastMessage += 'System Default 💻';

            if (typeof triggerToast === 'function') {
                triggerToast(toastMessage);
            }
        });

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (getSavedTheme() === 'system') {
                applyTheme('system');
            }
        });
    }

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
        const fadeOutPreloader = () => {
            setTimeout(() => {
                preloader.classList.add('loader-root--out');
                setTimeout(() => {
                    preloader.remove();
                }, 700);
            }, 1800); // 1.8s boot time to let the recruiter appreciate the boot logs
        };

        if (document.readyState === 'complete') {
            fadeOutPreloader();
        } else {
            window.addEventListener('load', fadeOutPreloader);
        }
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

            // Immediately position the main cursor using hardware-accelerated transform
            customCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

            // Metred emitter for mouse trailing code nodes
            const dist = Math.hypot(mouseX - lastTrailX, mouseY - lastTrailY);
            if (dist > 50) { // Spawn particle every 50px moved (optimized from 35px)
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

            customCursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;

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

    /* --- 12. Dynamic Case Study Modals Engine --- */
    const caseStudiesData = {
        'apk-shield': {
            badge: 'SECURITY AUDITING ENGINE',
            title: 'APK Shield',
            tagline: 'Android Static Binary Security Auditor & Malware Scanning Engine',
            overview: `
                <div class="case-study-grid">
                    <div class="cs-col">
                        <h4 class="cs-section-title">The Problem</h4>
                        <p class="cs-text">Android developers and security auditors frequently struggle to scan compiled binaries (.apk) for accidental credential exposure, insecure manifest properties, and malicious signature patterns. Performing manual de-compilation and audit takes hours, creating bottlenecks in DevOps and security validation.</p>
                        
                        <h4 class="cs-section-title">The Engineered Solution</h4>
                        <p class="cs-text">APK Shield automates Android binary inspection. It uploads the target APK, triggers a JADX-powered decompilation parser, analyzes DEX bytecodes, scans manifest permissions for vulnerability surface areas, and maps findings against a regex credential rules registry. Results are aggregated into a visual security index report.</p>
                    </div>
                    <div class="cs-col">
                        <h4 class="cs-section-title">High-Impact Metrics</h4>
                        <div class="cs-metrics-box">
                            <div class="cs-metric">
                                <span class="cs-metric-val">500+</span>
                                <span class="cs-metric-lbl">APKs Static Analyzed</span>
                            </div>
                            <div class="cs-metric">
                                <span class="cs-metric-val">15+</span>
                                <span class="cs-metric-lbl">Exploits & Malware Flagged</span>
                            </div>
                            <div class="cs-metric">
                                <span class="cs-metric-val">75%</span>
                                <span class="cs-metric-lbl">Auditing Review Time Saved</span>
                            </div>
                            <div class="cs-metric">
                                <span class="cs-metric-val">100%</span>
                                <span class="cs-metric-lbl">Automated Manifest Scan</span>
                            </div>
                        </div>
                        <h4 class="cs-section-title">Core Technology Stack</h4>
                        <p class="cs-text"><strong>Frontend:</strong> React, Next.js, Framer Motion, Tailwind CSS<br><strong>Backend:</strong> Node.js, Express APIs, JADX Java wrappers<br><strong>Persistence:</strong> MongoDB Cluster for report logs</p>
                    </div>
                </div>
            `,
            architecture: `
                <h4 class="cs-section-title">Data-Flow Architecture Flowchart</h4>
                <p class="cs-text" style="margin-bottom: 1.5rem;">Below is the secure pipeline showing how an Android binary is scanned and rated.</p>
                <div class="flowchart-container">
                    <div class="flowchart-row">
                        <div class="flowchart-node highlight">
                            <div class="flowchart-node-title">Client Web UI</div>
                            <div class="flowchart-node-desc">React / Next.js</div>
                        </div>
                        <div class="flowchart-arrow active">
                            <div class="flowchart-arrow-line"></div>
                            <div class="flowchart-pulse-dot"></div>
                            <div class="flowchart-arrow-head"></div>
                        </div>
                        <div class="flowchart-node">
                            <div class="flowchart-node-title">Express API</div>
                            <div class="flowchart-node-desc">File Upload Handlers</div>
                        </div>
                        <div class="flowchart-arrow active">
                            <div class="flowchart-arrow-line"></div>
                            <div class="flowchart-pulse-dot" style="animation-delay: 0.6s;"></div>
                            <div class="flowchart-arrow-head"></div>
                        </div>
                        <div class="flowchart-node highlight-indigo">
                            <div class="flowchart-node-title">Decompiler</div>
                            <div class="flowchart-node-desc">JADX / Zip Extractor</div>
                        </div>
                    </div>
                    
                    <div style="height: 1.5rem;"></div>
                    
                    <div class="flowchart-row">
                        <div class="flowchart-node highlight-indigo">
                            <div class="flowchart-node-title">Security Scanner</div>
                            <div class="flowchart-node-desc">Regex Rules Matcher</div>
                        </div>
                        <div class="flowchart-arrow active">
                            <div class="flowchart-arrow-line"></div>
                            <div class="flowchart-pulse-dot" style="animation-delay: 1.2s;"></div>
                            <div class="flowchart-arrow-head"></div>
                        </div>
                        <div class="flowchart-node">
                            <div class="flowchart-node-title">MongoDB Store</div>
                            <div class="flowchart-node-desc">Audit Report JSON</div>
                        </div>
                        <div class="flowchart-arrow active">
                            <div class="flowchart-arrow-line"></div>
                            <div class="flowchart-pulse-dot" style="animation-delay: 1.8s;"></div>
                            <div class="flowchart-arrow-head"></div>
                        </div>
                        <div class="flowchart-node highlight">
                            <div class="flowchart-node-title">Report Dashboard</div>
                            <div class="flowchart-node-desc">Vulnerability Ratings</div>
                        </div>
                    </div>
                </div>
            `,
            challenges: `
                <div class="case-study-grid">
                    <div class="cs-col">
                        <h4 class="cs-section-title">Engineering Challenge #1</h4>
                        <p class="cs-text"><strong>Memory Exhaustion on Large DEX Files:</strong> Running de-compilation on larger applications caused CPU spikes and Out-Of-Memory exceptions on server instances.</p>
                        <p class="cs-text"><strong>System Resolution:</strong> Structured static streaming unzip libraries to read <code>AndroidManifest.xml</code> instantly and stream DEX files to worker threads, bypassing full source reconstitution.</p>
                    </div>
                    <div class="cs-col">
                        <h4 class="cs-section-title">Engineering Challenge #2</h4>
                        <p class="cs-text"><strong>High False Positive Rate in API Scanning:</strong> Matching generic credential patterns resulted in false flags on sample strings, weakening trust in results.</p>
                        <p class="cs-text"><strong>System Resolution:</strong> Integrated Shannon Entropy analysis filters. Hardcoded tokens are evaluated for algorithmic randomness before triggering alert levels.</p>
                    </div>
                </div>
            `,
            schema: `
                <h4 class="cs-section-title">MongoDB Registry Collection: apk_audits</h4>
                <table class="schema-table">
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>_id</td>
                            <td><span class="schema-badge badge-pk">ObjectId</span></td>
                            <td>Primary key identifying audit session record</td>
                        </tr>
                        <tr>
                            <td>fileName</td>
                            <td><span class="schema-badge badge-varchar">String</span></td>
                            <td>Original Android binary package filename</td>
                        </tr>
                        <tr>
                            <td>securityScore</td>
                            <td><span class="schema-badge badge-fk">Number</span></td>
                            <td>Calculated risk score (0.0 to 10.0 based on weights)</td>
                        </tr>
                        <tr>
                            <td>findings</td>
                            <td><span class="schema-badge badge-varchar">Array[Object]</span></td>
                            <td>List of flagged manifest issues & signature match items</td>
                        </tr>
                        <tr>
                            <td>createdAt</td>
                            <td><span class="schema-badge badge-pk">Date</span></td>
                            <td>Timestamp record creation for telemetry history</td>
                        </tr>
                    </tbody>
                </table>
                
                <h4 class="cs-section-title">Rest API Endpoints</h4>
                <table class="schema-table">
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th>Endpoint</th>
                            <th>Payload / Query</th>
                            <th>Response</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span class="schema-badge badge-post">POST</span></td>
                            <td>/api/v1/scan/upload</td>
                            <td>Multipart FormData (APK File)</td>
                            <td>202 Accepted { taskId }</td>
                        </tr>
                        <tr>
                            <td><span class="schema-badge badge-get">GET</span></td>
                            <td>/api/v1/scan/report/:taskId</td>
                            <td>-</td>
                            <td>200 OK { reportDetails, score }</td>
                        </tr>
                    </tbody>
                </table>
            `
        },
        'secure-file-share': {
            badge: 'CRYPTOGRAPHIC CHANNEL',
            title: 'Secure File Share',
            tagline: 'End-to-End Encrypted Browser-Based Document Transfer System',
            overview: `
                <div class="case-study-grid">
                    <div class="cs-col">
                        <h4 class="cs-section-title">The Problem</h4>
                        <p class="cs-text">Files sent through public messaging apps are stored in plaintext on company databases, making them vulnerable to backend credential leaks, server security failures, and active network sniffing attacks.</p>
                        
                        <h4 class="cs-section-title">The Engineered Solution</h4>
                        <p class="cs-text">Secure File Share handles cryptographic payloads before they leave the browser. Utilizing the Web Crypto API, files are partitioned and encrypted client-side using a symmetric AES-256-GCM session key. This session key is wrapped in the recipient's RSA-2048 public key, making it mathematically impossible for the host database to inspect raw file contents.</p>
                    </div>
                    <div class="cs-col">
                        <h4 class="cs-section-title">High-Impact Metrics</h4>
                        <div class="cs-metrics-box">
                            <div class="cs-metric">
                                <span class="cs-metric-val">30+</span>
                                <span class="cs-metric-lbl">Active Users (Classmates)</span>
                            </div>
                            <div class="cs-metric">
                                <span class="cs-metric-val">AES-256</span>
                                <span class="cs-metric-lbl">Symmetric Encryption</span>
                            </div>
                            <div class="cs-metric">
                                <span class="cs-metric-val">90%</span>
                                <span class="cs-metric-lbl">Transfer Leak Reduction</span>
                            </div>
                            <div class="cs-metric">
                                <span class="cs-metric-val">0</span>
                                <span class="cs-metric-lbl">Plaintext File Storage Logs</span>
                            </div>
                        </div>
                        <h4 class="cs-section-title">Core Technology Stack</h4>
                        <p class="cs-text"><strong>Crypto:</strong> Web Crypto API (SubtleCrypto)<br><strong>Web Stack:</strong> React, Express Node.js Servers, Tailwind CSS<br><strong>Persistence:</strong> MongoDB Atlas storage registry</p>
                    </div>
                </div>
            `,
            architecture: `
                <h4 class="cs-section-title">Cryptographic Pipeline Flow</h4>
                <p class="cs-text" style="margin-bottom: 1.5rem;">Data encrypts at the sender terminal and decrypts only at the authorized recipient terminal.</p>
                <div class="flowchart-container">
                    <div class="flowchart-row">
                        <div class="flowchart-node highlight">
                            <div class="flowchart-node-title">File Input</div>
                            <div class="flowchart-node-desc">Sender Browser</div>
                        </div>
                        <div class="flowchart-arrow active">
                            <div class="flowchart-arrow-line"></div>
                            <div class="flowchart-pulse-dot"></div>
                            <div class="flowchart-arrow-head"></div>
                        </div>
                        <div class="flowchart-node highlight-indigo">
                            <div class="flowchart-node-title">AES-GCM Encryption</div>
                            <div class="flowchart-node-desc">Generate AES-256 Key</div>
                        </div>
                        <div class="flowchart-arrow active">
                            <div class="flowchart-arrow-line"></div>
                            <div class="flowchart-pulse-dot" style="animation-delay: 0.6s;"></div>
                            <div class="flowchart-arrow-head"></div>
                        </div>
                        <div class="flowchart-node">
                            <div class="flowchart-node-title">Encrypted Upload</div>
                            <div class="flowchart-node-desc">Send to Node API</div>
                        </div>
                    </div>
                    
                    <div style="height: 1.5rem;"></div>
                    
                    <div class="flowchart-row">
                        <div class="flowchart-node">
                            <div class="flowchart-node-title">MongoDB Bucket</div>
                            <div class="flowchart-node-desc">Encrypted Payload Storage</div>
                        </div>
                        <div class="flowchart-arrow active">
                            <div class="flowchart-arrow-line"></div>
                            <div class="flowchart-pulse-dot" style="animation-delay: 1.2s;"></div>
                            <div class="flowchart-arrow-head"></div>
                        </div>
                        <div class="flowchart-node highlight-indigo">
                            <div class="flowchart-node-title">RSA Key Wrap</div>
                            <div class="flowchart-node-desc">Encrypt AES Key with Recipient RSA</div>
                        </div>
                        <div class="flowchart-arrow active">
                            <div class="flowchart-arrow-line"></div>
                            <div class="flowchart-pulse-dot" style="animation-delay: 1.8s;"></div>
                            <div class="flowchart-arrow-head"></div>
                        </div>
                        <div class="flowchart-node highlight">
                            <div class="flowchart-node-title">Recipient Device</div>
                            <div class="flowchart-node-desc">Decrypt client-side</div>
                        </div>
                    </div>
                </div>
            `,
            challenges: `
                <div class="case-study-grid">
                    <div class="cs-col">
                        <h4 class="cs-section-title">Engineering Challenge #1</h4>
                        <p class="cs-text"><strong>Memory Crashes on Large Files:</strong> Loading files larger than 120MB directly into RAM memory arrays during encryption caused the browser tabs to run out of heap memory and crash.</p>
                        <p class="cs-text"><strong>System Resolution:</strong> Structured chunk-by-chunk binary stream reading. Encrypted files in 1MB pieces and merged them into a binary array buffer before pipeline streaming.</p>
                    </div>
                    <div class="cs-col">
                        <h4 class="cs-section-title">Engineering Challenge #2</h4>
                        <p class="cs-text"><strong>Asymmetric Key Distribution:</strong> Sharing public keys for encryption was complex when recipient profiles were offline during file uploads.</p>
                        <p class="cs-text"><strong>System Resolution:</strong> Registered user RSA public keys to database records upon profile creation, allowing immediate retrieval and key wrapping.</p>
                    </div>
                </div>
            `,
            schema: `
                <h4 class="cs-section-title">MongoDB Schema: encrypted_files</h4>
                <table class="schema-table">
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>_id</td>
                            <td><span class="schema-badge badge-pk">ObjectId</span></td>
                            <td>Unique record identifier</td>
                        </tr>
                        <tr>
                            <td>encryptedBuffer</td>
                            <td><span class="schema-badge badge-varchar">Binary</span></td>
                            <td>Ciphertext buffer representation of the payload file</td>
                        </tr>
                        <tr>
                            <td>iv</td>
                            <td><span class="schema-badge badge-varchar">String</span></td>
                            <td>Initialization Vector required for AES-GCM decryption</td>
                        </tr>
                        <tr>
                            <td>wrappedKey</td>
                            <td><span class="schema-badge badge-fk">String</span></td>
                            <td>AES key wrapped with the recipient's RSA public key</td>
                        </tr>
                        <tr>
                            <td>expiryTimestamp</td>
                            <td><span class="schema-badge badge-pk">Date</span></td>
                            <td>Automatic deletion marker to limit retention period</td>
                        </tr>
                    </tbody>
                </table>
            `
        },
        'springboot-banking': {
            badge: 'BACKEND SYSTEM ENGINE',
            title: 'Java Spring Boot Banking',
            tagline: 'High-Concurrency Secure Transactional API Platform',
            overview: `
                <div class="case-study-grid">
                    <div class="cs-col">
                        <h4 class="cs-section-title">The Problem</h4>
                        <p class="cs-text">Financial applications must run with strict ACID transaction guarantees. Concurrent transfer requests can result in duplicate withdrawals or balance mismatch anomalies (race conditions) if the system fails to lock resources atomically.</p>
                        
                        <h4 class="cs-section-title">The Engineered Solution</h4>
                        <p class="cs-text">This banking application utilizes Spring Boot and Spring Security with stateless JWT filters. Database interactions are handled via JPA Hibernate. To prevent balance anomalies under load, database rows are protected during transaction writes using pessimistic database locking.</p>
                    </div>
                    <div class="cs-col">
                        <h4 class="cs-section-title">High-Impact Metrics</h4>
                        <div class="cs-metrics-box">
                            <div class="cs-metric">
                                <span class="cs-metric-val">1,000+</span>
                                <span class="cs-metric-lbl">Concurrent Requests / Sec</span>
                            </div>
                            <div class="cs-metric">
                                <span class="cs-metric-val">10+</span>
                                <span class="cs-metric-lbl">Relational Database Tables</span>
                            </div>
                            <div class="cs-metric">
                                <span class="cs-metric-val">100%</span>
                                <span class="cs-metric-lbl">ACID Safe Ledger Logs</span>
                            </div>
                            <div class="cs-metric">
                                <span class="cs-metric-val">AWS EC2</span>
                                <span class="cs-metric-lbl">Docker Deployment Container</span>
                            </div>
                        </div>
                        <h4 class="cs-section-title">Core Technology Stack</h4>
                        <p class="cs-text"><strong>Language:</strong> Java 17, Spring Boot, Spring Security<br><strong>Persistence:</strong> MySQL Database Engine, JPA / Hibernate ORM<br><strong>Environment:</strong> Docker container packaging, AWS EC2</p>
                    </div>
                </div>
            `,
            architecture: `
                <h4 class="cs-section-title">Backend Architecture Schema</h4>
                <p class="cs-text" style="margin-bottom: 1.5rem;">Secure request filtering and locking mechanism implementation.</p>
                <div class="flowchart-container">
                    <div class="flowchart-row">
                        <div class="flowchart-node highlight">
                            <div class="flowchart-node-title">REST Client</div>
                            <div class="flowchart-node-desc">React UI or Postman</div>
                        </div>
                        <div class="flowchart-arrow active">
                            <div class="flowchart-arrow-line"></div>
                            <div class="flowchart-pulse-dot"></div>
                            <div class="flowchart-arrow-head"></div>
                        </div>
                        <div class="flowchart-node highlight-indigo">
                            <div class="flowchart-node-title">Security Filter</div>
                            <div class="flowchart-node-desc">Stateless JWT Auth</div>
                        </div>
                        <div class="flowchart-arrow active">
                            <div class="flowchart-arrow-line"></div>
                            <div class="flowchart-pulse-dot" style="animation-delay: 0.6s;"></div>
                            <div class="flowchart-arrow-head"></div>
                        </div>
                        <div class="flowchart-node">
                            <div class="flowchart-node-title">Spring Controller</div>
                            <div class="flowchart-node-desc">REST API Endpoints</div>
                        </div>
                    </div>
                    
                    <div style="height: 1.5rem;"></div>
                    
                    <div class="flowchart-row">
                        <div class="flowchart-node">
                            <div class="flowchart-node-title">Service Layer</div>
                            <div class="flowchart-node-desc">Transfer Validations</div>
                        </div>
                        <div class="flowchart-arrow active">
                            <div class="flowchart-arrow-line"></div>
                            <div class="flowchart-pulse-dot" style="animation-delay: 1.2s;"></div>
                            <div class="flowchart-arrow-head"></div>
                        </div>
                        <div class="flowchart-node highlight-indigo">
                            <div class="flowchart-node-title">JPA Repository</div>
                            <div class="flowchart-node-desc">Pessimistic Write Lock</div>
                        </div>
                        <div class="flowchart-arrow active">
                            <div class="flowchart-arrow-line"></div>
                            <div class="flowchart-pulse-dot" style="animation-delay: 1.8s;"></div>
                            <div class="flowchart-arrow-head"></div>
                        </div>
                        <div class="flowchart-node highlight">
                            <div class="flowchart-node-title">MySQL DB</div>
                            <div class="flowchart-node-desc">10+ Schema Tables</div>
                        </div>
                    </div>
                </div>
            `,
            challenges: `
                <div class="case-study-grid">
                    <div class="cs-col">
                        <h4 class="cs-section-title">Engineering Challenge #1</h4>
                        <p class="cs-text"><strong>Race Conditions on Balance Deductions:</strong> Simultaneous requests targeting a single account triggered transfer operations twice, resulting in negative balance records.</p>
                        <p class="cs-text"><strong>System Resolution:</strong> Applied Pessimistic Write locks (<code>@Lock(LockModeType.PESSIMISTIC_WRITE)</code>) to select balance queries, forcing subsequent requests to queue until commit.</p>
                    </div>
                    <div class="cs-col">
                        <h4 class="cs-section-title">Engineering Challenge #2</h4>
                        <p class="cs-text"><strong>JWT Session Invalidation:</strong> Tracking logged-out users in a stateless token setup without database lookup latency.</p>
                        <p class="cs-text"><strong>System Resolution:</strong> Implemented a high-speed Redis database cache registry for temporarily blacklisting active keys until their natural token expiration.</p>
                    </div>
                </div>
            `,
            schema: `
                <h4 class="cs-section-title">Relational Tables: Accounts & Transactions</h4>
                <table class="schema-table">
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>Constraint</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>account_id</td>
                            <td>BIGINT</td>
                            <td><span class="schema-badge badge-pk">PRIMARY KEY</span></td>
                            <td>Unique account identifier</td>
                        </tr>
                        <tr>
                            <td>user_id</td>
                            <td>BIGINT</td>
                            <td><span class="schema-badge badge-fk">FOREIGN KEY</span></td>
                            <td>Link to corresponding User entity record</td>
                        </tr>
                        <tr>
                            <td>balance</td>
                            <td>DECIMAL(15,2)</td>
                            <td>-</td>
                            <td>Precision decimal balance record</td>
                        </tr>
                        <tr>
                            <td>account_type</td>
                            <td>VARCHAR(20)</td>
                            <td>-</td>
                            <td>Account constraint category enum</td>
                        </tr>
                    </tbody>
                </table>
                
                <h4 class="cs-section-title">Rest API Endpoint Specs</h4>
                <table class="schema-table">
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th>Endpoint</th>
                            <th>Headers</th>
                            <th>Payload Body</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span class="schema-badge badge-post">POST</span></td>
                            <td>/api/v1/auth/login</td>
                            <td>-</td>
                            <td>{ username, password }</td>
                        </tr>
                        <tr>
                            <td><span class="schema-badge badge-post">POST</span></td>
                            <td>/api/v1/transfers</td>
                            <td>Authorization Bearer &lt;JWT&gt;</td>
                            <td>{ sourceAccount, destAccount, amount }</td>
                        </tr>
                    </tbody>
                </table>
            `
        }
    };

    const caseStudyModal = document.getElementById('case-study-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const caseStudyTriggers = document.querySelectorAll('.case-study-btn');
    const modalTabs = document.querySelectorAll('.modal-tab');

    let currentProjectKey = '';

    // Load case study data into DOM based on project key
    const populateCaseStudyModal = (key) => {
        const data = caseStudiesData[key];
        if (!data) return;

        currentProjectKey = key;
        
        // Header
        document.getElementById('modal-project-badge').textContent = data.badge;
        document.getElementById('modal-project-title').textContent = data.title;
        document.getElementById('modal-project-tagline').textContent = data.tagline;

        // Content panes
        document.getElementById('pane-overview').innerHTML = data.overview;
        document.getElementById('pane-architecture').innerHTML = data.architecture;
        document.getElementById('pane-challenges').innerHTML = data.challenges;
        document.getElementById('pane-schema').innerHTML = data.schema;

        // Reset to first tab
        switchModalTab('overview');
    };

    const switchModalTab = (tabName) => {
        modalTabs.forEach(tab => {
            if (tab.getAttribute('data-tab') === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        const panes = document.querySelectorAll('.modal-tab-pane');
        panes.forEach(pane => {
            if (pane.id === `pane-${tabName}`) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    };

    const openCaseStudyModal = (key) => {
        populateCaseStudyModal(key);
        caseStudyModal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Lock scrolling
    };

    const closeCaseStudyModal = () => {
        caseStudyModal.classList.remove('open');
        document.body.style.overflow = ''; // Unlock scrolling
    };

    // Event listeners for triggers
    caseStudyTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-project');
            openCaseStudyModal(key);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeCaseStudyModal);
    }

    if (caseStudyModal) {
        // Close on backdrop click
        caseStudyModal.addEventListener('click', (e) => {
            if (e.target === caseStudyModal) {
                closeCaseStudyModal();
            }
        });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && caseStudyModal && caseStudyModal.classList.contains('open')) {
            closeCaseStudyModal();
        }
    });

    // Tab button click handlers
    modalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchModalTab(tabName);
        });
    });

    /* --- 13. About Section Dossier Progress Card Scroll Observer --- */
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        let progressAnimated = false;
        
        const triggerProgressAnimations = () => {
            if (progressAnimated) return;
            progressAnimated = true;

            const progressBars = aboutSection.querySelectorAll('.op-bar-inner');
            progressBars.forEach(bar => {
                const targetWidth = bar.style.width || '100%';
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
            });
        };

        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    triggerProgressAnimations();
                }
            });
        }, {
            threshold: 0.15
        });

        aboutObserver.observe(aboutSection);
    }

    /* --- 14. Repeating APK Decompiler Terminal Scan Loop --- */
    const decompilerScreen = document.getElementById('decompiler-log-screen');
    if (decompilerScreen) {
        const scanCommandsList = [
            'scan --file="insecure-messenger.apk"',
            'scan --file="apkshield-daemon.apk"',
            'scan --file="spring-ledger-release.apk"',
            'scan --file="android-vulnerable-tracker.apk"'
        ];
        
        const manifestAlerts = [
            { perm: 'android.permission.READ_SMS', score: 3.5, rating: '5.2/10 (MODERATE RISK)' },
            { perm: 'android.permission.ACCESS_FINE_LOCATION', score: 2.1, rating: '4.8/10 (LOW-MODERATE RISK)' },
            { perm: 'android.permission.SYSTEM_ALERT_WINDOW', score: 4.8, rating: '2.8/10 (CRITICAL FLAWS DETECTED)' }
        ];

        const keyAlerts = [
            'ALERT: exposed AWS access secret inside Lcom/cloud/Credentials; (RSA-1024)',
            'ALERT: found hardcoded Stripe API token inside Lcom/billing/PaymentGate; (Stripe-SK)',
            'ALERT: AES symmetric key hardcoded inside Lcom/sec/CryptoRegistry; (AES-256)'
        ];

        let scanLoopIndex = 0;

        const executeTerminalScan = () => {
            const currentCmd = scanCommandsList[scanLoopIndex % scanCommandsList.length];
            const currentManifest = manifestAlerts[scanLoopIndex % manifestAlerts.length];
            const currentKey = keyAlerts[scanLoopIndex % keyAlerts.length];
            
            decompilerScreen.innerHTML = '';
            
            const scanLines = [
                { text: `<span class="prompt-text">vd$</span> ${currentCmd}`, class: 'screen-line' },
                { text: '&gt; Initializing static file scanner...', class: 'screen-line info-line' },
                { text: '&gt; Unzipping Android archive files... [OK]', class: 'screen-line info-line' },
                { text: '&gt; Extracting resource tables & layouts... [OK]', class: 'screen-line info-line' },
                { text: `&gt; Checking manifest permissions... [WARN]`, class: 'screen-line warn-line' },
                { text: `&gt; Flagged: ${currentManifest.perm}`, class: 'screen-line warn-detail' },
                { text: '&gt; Running signature match algorithms on DEX... [OK]', class: 'screen-line info-line' },
                { text: `&gt; ${currentKey}`, class: 'screen-line-alert' },
                { text: `&gt; SECURITY RATING: ${currentManifest.rating}`, class: 'error-line' }
            ];

            let lineIndex = 0;
            const printNextLogLine = () => {
                if (lineIndex < scanLines.length) {
                    const lineData = scanLines[lineIndex];
                    const div = document.createElement('div');
                    div.className = lineData.class;
                    div.innerHTML = lineData.text;
                    decompilerScreen.appendChild(div);
                    decompilerScreen.scrollTop = decompilerScreen.scrollHeight;
                    lineIndex++;
                    setTimeout(printNextLogLine, 350);
                } else {
                    // Update visual progress bars dynamically
                    const redFill = document.querySelector('.fill-red');
                    const yellowFill = document.querySelector('.fill-yellow');
                    if (redFill && yellowFill) {
                        const randomRed = Math.floor(Math.random() * 40) + 50; // 50% to 90%
                        const randomYellow = Math.floor(Math.random() * 30) + 30; // 30% to 60%
                        redFill.style.width = `${randomRed}%`;
                        yellowFill.style.width = `${randomYellow}%`;
                    }
                    
                    // Next scan iteration trigger
                    scanLoopIndex++;
                    setTimeout(executeTerminalScan, 5000);
                }
            };

            printNextLogLine();
        };

        // Start repeating scanning loop after 2.5 seconds (post-preloader reveal)
        setTimeout(executeTerminalScan, 4500);
    }
}