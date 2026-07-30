import { createProjectEvent } from './nimo-core/federation/project-events.js';

(() => {
    const EVENT_NAME = 'nimo:project-event';

    const emit = (type, detail = {}) => {
        window.dispatchEvent(new CustomEvent(EVENT_NAME, {
            detail: createProjectEvent(type, { moduleId: 'toolverse', projectId: 'compress-image', detail })
        }));
    };

    const cloneApprovedWrench = () => {
        const source = document.querySelector('.premium-wrench-svg');
        if (!source) return null;
        const clone = source.cloneNode(true);
        clone.removeAttribute('role');
        clone.removeAttribute('aria-labelledby');
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelectorAll('title, desc').forEach(node => node.remove());
        const idMap = new Map();
        clone.querySelectorAll('[id]').forEach(node => {
            const previous = node.id;
            const next = `repair-${previous}`;
            idMap.set(previous, next);
            node.id = next;
        });
        clone.querySelectorAll('*').forEach(node => {
            for (const attribute of [...node.attributes]) {
                let value = attribute.value;
                idMap.forEach((next, previous) => { value = value.replaceAll(`url(#${previous})`, `url(#${next})`); });
                if (value !== attribute.value) node.setAttribute(attribute.name, value);
            }
        });
        return clone;
    };

    const initRepair = () => {
        const card = document.querySelector('[data-repair-utility="compress-image"]');
        if (!card || card.dataset.repairBound === 'true') return;
        card.dataset.repairBound = 'true';
        card.dataset.repairState = 'unstable';

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
        const controller = new AbortController();
        const status = document.createElement('span');
        status.className = 'utility-repair-status';
        status.setAttribute('aria-hidden', 'true');
        status.textContent = 'NIMO · Utility drift detected';
        card.appendChild(status);
        const live = document.createElement('p');
        live.className = 'visually-hidden utility-repair-live';
        live.setAttribute('aria-live', 'polite');
        live.setAttribute('aria-atomic', 'true');
        document.body.appendChild(live);

        let dodgeCount = 0;
        let dodgeFrame = 0;
        let lastDodge = 0;
        let repairing = false;
        let repaired = false;
        let pendingPoint = null;
        let repairAnimation = null;

        const resetOffset = () => {
            card.style.setProperty('--repair-x', '0px');
            card.style.setProperty('--repair-y', '0px');
        };

        const finishRepair = () => {
            repaired = true;
            repairing = false;
            resetOffset();
            card.dataset.repairState = 'stable';
            status.textContent = 'NIMO · Utility stabilized';
            live.textContent = 'Compress Image utility stabilized and ready.';
            emit('repairEventCompleted', { dodges: dodgeCount, status: 'stable' });
            controller.abort();
            if (dodgeFrame) cancelAnimationFrame(dodgeFrame);
        };

        const startRepair = (source) => {
            if (repairing || repaired) return;
            repairing = true;
            resetOffset();
            card.dataset.repairState = 'repairing';
            live.textContent = 'NIMO is stabilizing the Compress Image utility.';
            emit('repairEventStarted', { source, dodges: dodgeCount });

            const wrenchShell = document.createElement('span');
            wrenchShell.className = 'utility-repair-wrench';
            const wrench = cloneApprovedWrench();
            if (wrench) wrenchShell.appendChild(wrench);
            card.appendChild(wrenchShell);

            const stages = [
                ['NIMO · Tracking module', 0],
                ['NIMO · Wrench aligned', 180],
                ['NIMO · Utility stabilized', 440]
            ];
            stages.forEach(([text, delay]) => setTimeout(() => { if (card.isConnected) status.textContent = text; }, delay));
            if (wrenchShell.animate) {
                const frames = reducedMotion.matches
                    ? [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }]
                    : [
                        { opacity: 0, transform: 'translate3d(12px,-8px,0) rotate(-3deg)' },
                        { opacity: 1, transform: 'translate3d(0,0,0) rotate(1.5deg)', offset: .55 },
                        { opacity: 0, transform: 'translate3d(0,0,0) rotate(0deg)' }
                    ];
                repairAnimation = wrenchShell.animate(frames, { duration: reducedMotion.matches ? 260 : 640, easing: 'cubic-bezier(.2,.75,.25,1)', fill: 'forwards' });
            }
            setTimeout(() => { wrenchShell.remove(); finishRepair(); }, reducedMotion.matches ? 300 : 680);
        };

        const renderDodge = () => {
            dodgeFrame = 0;
            if (!pendingPoint || repaired || repairing || reducedMotion.matches || !finePointer.matches || document.hidden) return;
            const now = performance.now();
            if (dodgeCount >= 2 || now - lastDodge < 150) return;
            const rect = card.getBoundingClientRect();
            const direction = pendingPoint.x < rect.left + rect.width / 2 ? 1 : -1;
            const x = direction * (dodgeCount === 0 ? 7 : 5);
            const y = dodgeCount === 0 ? -3 : 3;
            card.style.setProperty('--repair-x', `${x}px`);
            card.style.setProperty('--repair-y', `${y}px`);
            dodgeCount += 1;
            lastDodge = now;
            if (dodgeCount >= 2) setTimeout(() => startRepair('pointer'), 170);
        };
        const queueDodge = event => {
            pendingPoint = { x: event.clientX, y: event.clientY };
            if (!dodgeFrame) dodgeFrame = requestAnimationFrame(renderDodge);
        };

        card.addEventListener('pointerenter', queueDodge, { signal: controller.signal });
        card.addEventListener('pointermove', queueDodge, { signal: controller.signal });
        card.addEventListener('focus', resetOffset, { signal: controller.signal });
        card.addEventListener('keydown', event => {
            if (!repaired && (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                startRepair('keyboard');
            }
        }, { signal: controller.signal });
        card.addEventListener('click', event => {
            if (!repaired) {
                event.preventDefault();
                startRepair('click');
            }
        }, { signal: controller.signal });
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && dodgeFrame) { cancelAnimationFrame(dodgeFrame); dodgeFrame = 0; }
            if (document.hidden) repairAnimation?.pause();
            else repairAnimation?.play();
        }, { signal: controller.signal });
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initRepair, { once: true });
    else initRepair();
})();
