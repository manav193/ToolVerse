// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    let savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        savedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    };
    
    applyTheme(savedTheme);
    
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // 2. Mobile Menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const closeMenu = document.getElementById('close-menu');
    
    if (mobileBtn && mobileNav && closeMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileNav.classList.add('active');
            mobileBtn.setAttribute('aria-expanded', 'true');
        });
        closeMenu.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileBtn.setAttribute('aria-expanded', 'false');
        });
        mobileNav.addEventListener('click', (e) => {
            if (e.target === mobileNav || e.target.tagName === 'A') {
                mobileNav.classList.remove('active');
                mobileBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 3. Search Functionality (Advanced)
    const searchInput = document.getElementById('hero-search');
    const searchResults = document.getElementById('hero-search-results');
    let currentFocus = -1;
    
    if (searchInput && searchResults && window.TOOLVERSE_TOOLS) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            currentFocus = -1;
            if (!val) {
                searchResults.style.display = 'none';
                return;
            }
            
            const matches = window.TOOLVERSE_TOOLS.filter(t => 
                t.name.toLowerCase().includes(val) || 
                t.category.toLowerCase().includes(val)
            ).slice(0, 5);
            
            if (matches.length > 0) {
                searchResults.innerHTML = matches.map((t, idx) => `
                    <a href="tools/${t.slug}.html" class="search-result-item" role="option" id="res-${idx}">
                        <span style="font-size:1.2rem; margin-right:0.5rem;">${t.icon}</span> 
                        <strong>${t.name.replace(new RegExp(val, 'gi'), match => `<mark>${match}</mark>`)}</strong> 
                        <span style="font-size:0.8rem; color:var(--text-secondary); float:right;">${t.category}</span>
                    </a>
                `).join('');
            } else {
                searchResults.innerHTML = '<div class="search-result-item" style="color:var(--text-secondary);" role="option">No tools found for your search.</div>';
            }
            searchResults.style.display = 'block';
        });
        
        searchInput.addEventListener('keydown', (e) => {
            const items = searchResults.querySelectorAll('.search-result-item');
            if (!items || items.length === 0) return;
            
            if (e.key === 'ArrowDown') {
                currentFocus++;
                addActive(items);
                e.preventDefault();
            } else if (e.key === 'ArrowUp') {
                currentFocus--;
                addActive(items);
                e.preventDefault();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (items[currentFocus]) items[currentFocus].click();
                } else if(items.length > 0 && items[0].tagName === 'A') {
                    items[0].click();
                }
            }
        });
        
        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add("active");
            x[currentFocus].scrollIntoView({ block: 'nearest' });
            searchInput.setAttribute('aria-activedescendant', x[currentFocus].id);
        }
        
        function removeActive(x) {
            for (let i = 0; i < x.length; i++) {
                x[i].classList.remove("active");
            }
        }
        
        document.addEventListener('click', (e) => {
            if (e.target !== searchInput && e.target !== searchResults) {
                searchResults.style.display = 'none';
            }
        });
    }

    // 4. FAQ Accordion
    const faqs = document.querySelectorAll('.faq-question');
    faqs.forEach(faq => {
        faq.addEventListener('click', () => {
            const parent = faq.parentElement;
            const isActive = parent.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
            
            if (!isActive) {
                parent.classList.add('active');
            }
        });
    });

    // 5. Tool Tabs (A11y improved)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = 'tab-' + btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
                b.setAttribute('tabindex', '-1');
            });
            tabContents.forEach(c => {
                c.classList.remove('active');
                c.style.display = 'none';
            });
            
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            btn.setAttribute('tabindex', '0');
            const target = document.getElementById(targetId);
            target.classList.add('active');
            target.style.display = 'block';
        });
        
        // Keyboard nav for tabs
        btn.addEventListener('keydown', (e) => {
            let index = Array.from(tabBtns).indexOf(btn);
            if(e.key === 'ArrowRight') {
                e.preventDefault();
                index = (index + 1) % tabBtns.length;
                tabBtns[index].focus();
                tabBtns[index].click();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                index = (index - 1 + tabBtns.length) % tabBtns.length;
                tabBtns[index].focus();
                tabBtns[index].click();
            }
        });
    });

    // 6. Global Toast & Copy
    window.showToast = function(msg, type = 'default') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            container.setAttribute('aria-live', 'polite');
            document.body.appendChild(container);
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = msg;
        if(type === 'error') toast.style.background = 'var(--error)';
        if(type === 'success') toast.style.background = 'var(--success)';
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            window.showToast('Copied to clipboard!', 'success');
        }).catch(err => {
            console.error('Copy failed', err);
            window.showToast('Failed to copy', 'error');
        });
    };

    // 7. Animated Stats
    const statVals = document.querySelectorAll('.stat-val[data-target]');
    if (statVals.length > 0) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        const originalText = el.textContent;
                        el.textContent = originalText.replace(/[0-9]+/, Math.floor(current));
                    }, 16);
                    statObserver.unobserve(el);
                }
            });
        });
        statVals.forEach(val => statObserver.observe(val));
    }
    
    // 8. Back to top
    const btt = document.getElementById('back-to-top');
    if (btt) {
        btt.style.position = 'fixed';
        btt.style.bottom = '20px';
        btt.style.right = '20px';
        btt.style.width = '40px';
        btt.style.height = '40px';
        btt.style.borderRadius = '50%';
        btt.style.border = 'none';
        btt.style.background = 'var(--accent)';
        btt.style.color = '#fff';
        btt.style.cursor = 'pointer';
        btt.style.display = 'none';
        btt.style.zIndex = '1000';
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) btt.style.display = 'block';
            else btt.style.display = 'none';
        });
        
        btt.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 9. Scroll Animations
    const animatedEls = document.querySelectorAll('.animate-on-scroll');
    if(animatedEls.length > 0) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        animatedEls.forEach(el => scrollObserver.observe(el));
    }

    // 10. Cookie Banner & Analytics Load
    const cookieBanner = document.getElementById('cookie-banner');
    const btnAccept = document.getElementById('cookie-accept');
    const btnDecline = document.getElementById('cookie-decline');
    
    if (cookieBanner) {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            cookieBanner.style.display = 'flex';
        } else if (consent === 'accepted') {
            loadAnalytics();
        }
        
        btnAccept.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'accepted');
            cookieBanner.style.display = 'none';
            loadAnalytics();
        });
        btnDecline.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'declined');
            cookieBanner.style.display = 'none';
        });
    }
    
    function loadAnalytics() {
        console.log("Analytics loading... (Placeholders active)");
        // Trigger GA4/GTM scripts injected in HTML
    }

    // 11. PWA Install Logic
    let deferredPrompt;
    const btnInstallHeader = document.getElementById('install-app-btn');
    const btnInstallFooter = document.getElementById('footer-install-btn');
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if(btnInstallHeader) btnInstallHeader.style.display = 'inline-block';
        if(btnInstallFooter) btnInstallFooter.style.display = 'inline-block';
    });
    
    const handleInstall = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                if(btnInstallHeader) btnInstallHeader.style.display = 'none';
                if(btnInstallFooter) btnInstallFooter.style.display = 'none';
            }
            deferredPrompt = null;
        }
    };
    
    if(btnInstallHeader) btnInstallHeader.addEventListener('click', handleInstall);
    if(btnInstallFooter) btnInstallFooter.addEventListener('click', handleInstall);

    // 12. Clean Hero Wrench Scroll
    const heroSection = document.getElementById('hero-section');
    const heroWrench = document.getElementById('hero-wrench-container');
    const heroContent = document.querySelector('.hero-content');

    if (heroSection && heroWrench && heroContent) {
        let currentScale = 1;
        let currentRot = 45;
        let targetScale = 1;
        let targetRot = 45;
        let currentOpacity = 1;
        let targetOpacity = 1;

        const lerp = (start, end, factor) => start + (end - start) * factor;

        // Init immediately
        heroWrench.style.transform = `scale(${currentScale}) rotate(${currentRot}deg)`;

        const renderHero = () => {
            const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!isReducedMotion) {
                const scrollY = window.scrollY;
                const heroHeight = heroSection.offsetHeight - window.innerHeight;
                
                let progress = 0;
                if (heroHeight > 0) {
                    progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
                }

                const maxScale = window.innerWidth < 768 ? 1.5 : 2.5;
                const maxRot = 4;
                
                targetScale = 1 + (progress * (maxScale - 1));
                targetRot = 45 + (progress * maxRot);
                targetOpacity = Math.max(1 - (progress * 1.5), 0);
                
                currentScale = lerp(currentScale, targetScale, 0.1);
                currentRot = lerp(currentRot, targetRot, 0.1);
                currentOpacity = lerp(currentOpacity, targetOpacity, 0.1);
                
                heroWrench.style.transform = `scale(${currentScale}) rotate(${currentRot}deg)`;
                heroContent.style.opacity = currentOpacity;
            } else {
                heroWrench.style.transform = `scale(1) rotate(45deg)`;
                heroContent.style.opacity = 1;
            }
            requestAnimationFrame(renderHero);
        };
        requestAnimationFrame(renderHero);
    }
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
