// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // Shared premium interaction system. Pointer work is delegated and frame-throttled.
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionEnabled = () => !reducedMotionQuery.matches;
    const pointerMotionEnabled = () => motionEnabled() && finePointerQuery.matches;
    const lightSurfaceSelector = '.btn, .arcade-tool-card, .tool-card, .related-tool-link, .sidebar-widget, .tool-workspace, .tool-support';
    let activeSurface = null;
    let activeMagnet = null;
    let pendingPointer = null;
    let pointerFrame = 0;

    document.body.classList.add('motion-system', 'motion-boot');
    if (motionEnabled()) {
        requestAnimationFrame(() => document.body.classList.add('motion-entered'));
    } else {
        document.body.classList.add('motion-entered');
    }

    const resetPointerSurface = (surface) => {
        if (!surface) return;
        surface.style.removeProperty('--pointer-x');
        surface.style.removeProperty('--pointer-y');
        surface.style.removeProperty('--magnet-x');
        surface.style.removeProperty('--magnet-y');
        surface.classList.remove('is-pointer-active');
    };

    const renderPointerResponse = () => {
        pointerFrame = 0;
        if (!pendingPointer || !activeSurface || !pointerMotionEnabled()) return;
        const rect = activeSurface.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const localX = Math.min(Math.max(pendingPointer.x - rect.left, 0), rect.width);
        const localY = Math.min(Math.max(pendingPointer.y - rect.top, 0), rect.height);
        const normalizedX = (localX / rect.width) - 0.5;
        const normalizedY = (localY / rect.height) - 0.5;
        activeSurface.style.setProperty('--pointer-x', `${(localX / rect.width) * 100}%`);
        activeSurface.style.setProperty('--pointer-y', `${(localY / rect.height) * 100}%`);
        if (activeMagnet === activeSurface) {
            activeSurface.style.setProperty('--magnet-x', `${(normalizedX * 4.5).toFixed(2)}px`);
            activeSurface.style.setProperty('--magnet-y', `${(normalizedY * 3.5).toFixed(2)}px`);
        }
    };

    document.addEventListener('pointerover', event => {
        if (!pointerMotionEnabled()) return;
        const surface = event.target.closest(lightSurfaceSelector);
        if (!surface || surface === activeSurface) return;
        resetPointerSurface(activeSurface);
        activeSurface = surface;
        activeMagnet = surface.matches('.btn:not(:disabled):not([aria-disabled="true"])') ? surface : null;
        surface.classList.add('is-pointer-active');
    }, { passive: true });

    document.addEventListener('pointermove', event => {
        if (!activeSurface || !pointerMotionEnabled()) return;
        pendingPointer = { x: event.clientX, y: event.clientY };
        if (!pointerFrame) pointerFrame = requestAnimationFrame(renderPointerResponse);
    }, { passive: true });

    document.addEventListener('pointerout', event => {
        if (!activeSurface || activeSurface.contains(event.relatedTarget)) return;
        resetPointerSurface(activeSurface);
        activeSurface = null;
        activeMagnet = null;
        pendingPointer = null;
    }, { passive: true });

    const clearPointerMotion = () => {
        resetPointerSurface(activeSurface);
        activeSurface = null;
        activeMagnet = null;
        pendingPointer = null;
        if (pointerFrame) cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        document.body.classList.toggle('motion-reduced', reducedMotionQuery.matches);
        document.body.classList.add('motion-entered');
    };
    reducedMotionQuery.addEventListener('change', clearPointerMotion);
    finePointerQuery.addEventListener('change', clearPointerMotion);

    const pulseControl = (control, className, duration = 650) => {
        if (!control || !motionEnabled()) return;
        control.classList.remove(className);
        requestAnimationFrame(() => control.classList.add(className));
        window.setTimeout(() => control.classList.remove(className), duration);
    };

    document.addEventListener('click', event => {
        const control = event.target.closest('button, .btn');
        if (!control) return;
        const actionText = `${control.id || ''} ${control.textContent || ''}`.toLowerCase();
        if (/download|convert/.test(actionText)) pulseControl(control, 'is-activated');
        if (/reset|clear/.test(actionText)) {
            const workspace = control.closest('.tool-interface-body, .tool-workspace');
            if (workspace && motionEnabled()) {
                workspace.classList.add('is-resetting');
                window.setTimeout(() => workspace.classList.remove('is-resetting'), 220);
            }
        }
    });

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
            searchInput.removeAttribute('aria-activedescendant');
            if (!val) {
                searchResults.style.display = 'none';
                searchInput.setAttribute('aria-expanded', 'false');
                return;
            }
            
            const matches = window.TOOLVERSE_TOOLS.filter(t =>
                String(t.name || '').toLowerCase().includes(val) ||
                String(t.category || '').toLowerCase().includes(val)
            ).slice(0, 5);
            const escapedVal = val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            
            if (matches.length > 0) {
                searchResults.innerHTML = matches.map((t, idx) => `
                    <a href="tools/${t.slug}.html" class="search-result-item" role="option" id="res-${idx}">
                        <span class="search-result-icon">${t.icon}</span>
                        <strong>${t.name.replace(new RegExp(escapedVal, 'gi'), match => `<mark>${match}</mark>`)}</strong>
                        <span class="search-result-category">${t.category || 'Tool'}</span>
                    </a>
                `).join('');
            } else {
                searchResults.innerHTML = '<div class="search-result-item search-result-empty" role="option">No tools found for your search.</div>';
            }
            searchResults.style.display = 'block';
            searchInput.setAttribute('aria-expanded', 'true');
        });
        
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchResults.style.display = 'none';
                searchInput.setAttribute('aria-expanded', 'false');
                searchInput.removeAttribute('aria-activedescendant');
                currentFocus = -1;
                return;
            }

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
            x[currentFocus].setAttribute('aria-selected', 'true');
            x[currentFocus].scrollIntoView({ block: 'nearest' });
            searchInput.setAttribute('aria-activedescendant', x[currentFocus].id);
        }
        
        function removeActive(x) {
            for (let i = 0; i < x.length; i++) {
                x[i].classList.remove("active");
                x[i].setAttribute('aria-selected', 'false');
            }
        }
        
        document.addEventListener('click', (e) => {
            if (e.target !== searchInput && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
                searchInput.setAttribute('aria-expanded', 'false');
                searchInput.removeAttribute('aria-activedescendant');
            }
        });
    }

    // 4. Tools Arcade category filtering
    const arcadeFilters = Array.from(document.querySelectorAll('.arcade-filter'));
    const arcadeCards = Array.from(document.querySelectorAll('.arcade-tool-card'));
    const arcadeStatus = document.getElementById('arcade-filter-status');

    if (arcadeFilters.length > 0 && arcadeCards.length > 0) {
        const applyArcadeFilter = (filterValue) => {
            const selectedFilter = arcadeFilters.some(button => button.dataset.filter === filterValue) ? filterValue : 'all';
            let visibleCount = 0;

            arcadeFilters.forEach(button => {
                const isActive = button.dataset.filter === selectedFilter;
                button.classList.toggle('active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });

            arcadeCards.forEach(card => {
                const isVisible = selectedFilter === 'all' || card.dataset.category === selectedFilter;
                card.hidden = !isVisible;
                card.classList.remove('is-filter-entering');
                if (isVisible) {
                    card.style.setProperty('--filter-order', String(Math.min(visibleCount, 8)));
                    visibleCount++;
                    if (motionEnabled()) requestAnimationFrame(() => card.classList.add('is-filter-entering'));
                }
            });

            if (arcadeStatus) {
                const activeButton = arcadeFilters.find(button => button.dataset.filter === selectedFilter);
                const filterLabel = activeButton ? activeButton.querySelector('span').textContent : 'All tools';
                arcadeStatus.textContent = selectedFilter === 'all'
                    ? `Showing all ${visibleCount} tools`
                    : `Showing ${visibleCount} ${filterLabel.toLowerCase()}`;
            }
        };

        arcadeFilters.forEach((button, index) => {
            button.addEventListener('click', () => applyArcadeFilter(button.dataset.filter));
            button.addEventListener('keydown', event => {
                let nextIndex = null;
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % arcadeFilters.length;
                if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + arcadeFilters.length) % arcadeFilters.length;
                if (event.key === 'Home') nextIndex = 0;
                if (event.key === 'End') nextIndex = arcadeFilters.length - 1;
                if (nextIndex !== null) {
                    event.preventDefault();
                    arcadeFilters[nextIndex].focus();
                    arcadeFilters[nextIndex].click();
                }
            });
        });

        const applyHashFilter = () => {
            const hashFilter = window.location.hash.slice(1);
            if (arcadeFilters.some(button => button.dataset.filter === hashFilter)) applyArcadeFilter(hashFilter);
        };

        window.addEventListener('hashchange', applyHashFilter);
        applyHashFilter();
    }

    // 5. FAQ Accordion
    const faqs = document.querySelectorAll('.faq-question');
    faqs.forEach(faq => {
        faq.addEventListener('click', () => {
            const parent = faq.closest('.faq-item');
            if (!parent) return;
            const isActive = parent.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const button = item.querySelector('button.faq-question');
                if (button) button.setAttribute('aria-expanded', 'false');
            });
            
            if (!isActive) {
                parent.classList.add('active');
                if (faq.matches('button')) faq.setAttribute('aria-expanded', 'true');
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
                c.hidden = true;
            });
            
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            btn.setAttribute('tabindex', '0');
            const target = document.getElementById(targetId);
            if (target) {
                target.classList.add('active');
                target.hidden = false;
            }
        });
        
        // Keyboard nav for tabs
        btn.addEventListener('keydown', (e) => {
            let index = Array.from(tabBtns).indexOf(btn);
            if(e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                index = (index + 1) % tabBtns.length;
                tabBtns[index].focus();
                tabBtns[index].click();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                index = (index - 1 + tabBtns.length) % tabBtns.length;
                tabBtns[index].focus();
                tabBtns[index].click();
            } else if (e.key === 'Home' || e.key === 'End') {
                e.preventDefault();
                index = e.key === 'Home' ? 0 : tabBtns.length - 1;
                tabBtns[index].focus();
                tabBtns[index].click();
            }
        });
    });

    // Keyboard fallback for legacy upload zones that do not include a visible browse control.
    document.querySelectorAll('.tool-page .drop-zone').forEach(dropZone => {
        const fileInput = dropZone.querySelector('input[type="file"]');
        const hasInteractiveControl = dropZone.querySelector('button, a, input:not([type="file"]), select, textarea');
        if (!fileInput || hasInteractiveControl) return;

        dropZone.setAttribute('role', 'button');
        dropZone.setAttribute('tabindex', '0');
        dropZone.setAttribute('aria-label', 'Choose a file or drop it here');
        dropZone.addEventListener('keydown', event => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            fileInput.click();
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
        toast.dataset.tone = type;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    window.copyToClipboard = function(text) {
        const sourceControl = document.activeElement && document.activeElement.closest
            ? document.activeElement.closest('button, .btn')
            : null;
        navigator.clipboard.writeText(text).then(() => {
            pulseControl(sourceControl, 'is-confirmed');
            window.showToast('Copied to clipboard!', 'success');
        }).catch(err => {
            console.error('Copy failed', err);
            window.showToast('Failed to copy', 'error');
        });
    };

    // Legacy tools receive the same non-blocking feedback without changing their logic.
    window.alert = function(message) {
        window.showToast(String(message), 'default');
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
        animatedEls.forEach(element => element.classList.add('motion-reveal-group'));
        if (!motionEnabled()) {
            animatedEls.forEach(element => element.classList.add('visible'));
        }
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        if (motionEnabled()) animatedEls.forEach(el => scrollObserver.observe(el));
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

    // 12. Restrained, scroll-linked hero motion
    const heroSection = document.getElementById('hero-section');
    const heroWrench = document.getElementById('hero-wrench-container');
    const heroContent = document.querySelector('.hero-content');

    if (heroSection && heroWrench && heroContent) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const mobileLayout = window.matchMedia('(max-width: 768px)');
        let frameRequested = false;
        let metricsDirty = true;
        let heroStart = 0;
        let heroTravel = 1;
        let previousProgress = -1;

        const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
        const measureHero = () => {
            const heroRect = heroSection.getBoundingClientRect();
            heroStart = heroRect.top + window.scrollY;
            heroTravel = Math.max(heroSection.offsetHeight - window.innerHeight, 1);
            metricsDirty = false;
        };

        const resetHeroMotion = () => {
            heroWrench.style.removeProperty('transform');
            heroContent.style.removeProperty('transform');
            heroContent.style.removeProperty('opacity');
            heroSection.style.removeProperty('--hero-ambient-x');
            heroSection.style.removeProperty('--hero-ambient-y');
            heroSection.style.removeProperty('--hero-ambient-opacity');
            previousProgress = -1;
        };

        const renderHero = () => {
            frameRequested = false;
            if (reducedMotion.matches || mobileLayout.matches) {
                resetHeroMotion();
                return;
            }

            if (metricsDirty) measureHero();
            const progress = clamp((window.scrollY - heroStart) / heroTravel, 0, 1);
            if (Math.abs(progress - previousProgress) < 0.001) return;

            const scale = 1 + (progress * 0.12);
            const rotation = -12 + (progress * 3);
            const translateX = -28 + (progress * -26);
            const translateY = -24 + (progress * -7);

            heroWrench.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotation}deg) scale(${scale})`;
            heroContent.style.transform = `translate3d(0, ${progress * -24}px, 0)`;
            heroContent.style.opacity = String(1 - (progress * 0.34));
            heroSection.style.setProperty('--hero-ambient-x', `${progress * -3}%`);
            heroSection.style.setProperty('--hero-ambient-y', `${progress * -1.25}%`);
            heroSection.style.setProperty('--hero-ambient-opacity', String(progress * 0.28));
            previousProgress = progress;
        };

        const requestHeroFrame = () => {
            if (!frameRequested) {
                frameRequested = true;
                requestAnimationFrame(renderHero);
            }
        };

        const refreshHeroMetrics = () => {
            metricsDirty = true;
            requestHeroFrame();
        };

        window.addEventListener('scroll', requestHeroFrame, { passive: true });
        window.addEventListener('resize', refreshHeroMetrics, { passive: true });
        window.addEventListener('load', refreshHeroMetrics, { once: true });
        reducedMotion.addEventListener('change', refreshHeroMetrics);
        mobileLayout.addEventListener('change', refreshHeroMetrics);
        requestHeroFrame();
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
