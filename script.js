// Global UI Sound Effect Generator (Web Audio API)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playHoverSound() {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, audioCtx.currentTime); // Lower, more professional pitch
    osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Cinematic Loader ---
    let progress = 0;
    const progressEl = document.getElementById('loader-progress');
    const loader = document.getElementById('loader');
    
    const loadingInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 1; // Slower, more deliberate progress
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            progressEl.textContent = "100%";
            setTimeout(() => {
                gsap.to(loader, {
                    opacity: 0,
                    duration: 1.5,
                    ease: "power4.inOut",
                    onComplete: () => {
                        loader.style.visibility = 'hidden';
                        if(typeof AOS !== 'undefined') AOS.init({ once: true, duration: 1000 });
                        
                        // Start Typewriter Effect
                        const typeTarget = document.querySelector('.type-writer');
                        if (typeTarget) {
                            const text = typeTarget.textContent;
                            typeTarget.textContent = '';
                            typeTarget.classList.add('typing-active');
                            let i = 0;
                            function type() {
                                if (i < text.length) {
                                    typeTarget.textContent += text.charAt(i);
                                    i++;
                                    setTimeout(type, 100); // Typing speed
                                }
                            }
                            type();
                        }
                    }
                });
            }, 500);
        } else {
            progressEl.textContent = progress + "%";
        }
    }, 50);

    // --- Custom Luxury Cursor ---
    const isTouchDevice = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
    
    if (!isTouchDevice) {
        const cursorDot = document.getElementById('cursor-dot');
        const cursorRing = document.getElementById('cursor-ring');
        
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        let dotX = 0, dotY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            // Smooth lagging effect
            dotX += (mouseX - dotX) * 0.3;
            dotY += (mouseY - dotY) * 0.3;
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
            cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // --- Magnetic 3D Tilt for Memory Cards ---
        const cards = document.querySelectorAll('.memory-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate rotation (max 15 degrees)
                const rotateX = ((y - centerY) / centerY) * -15;
                const rotateY = ((x - centerX) / centerX) * 15;
                
                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    scale: 1.05,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });

        const interactables = document.querySelectorAll('button, a, .memory-card, .tab-btn');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursorRing, { width: 80, height: 80, backgroundColor: 'rgba(197, 160, 89, 0.1)', borderColor: 'rgba(197, 160, 89, 0.8)', duration: 0.4 });
                playHoverSound();
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursorRing, { width: 35, height: 35, backgroundColor: 'transparent', borderColor: 'rgba(197, 160, 89, 0.15)', duration: 0.4 });
            });
        });
    }

    // --- Time Counter ---
    function updateCounter() {
        const startDate = new Date(2025, 4, 21).getTime(); // May 21st, 2025
        const now = new Date().getTime();
        const diff = now - startDate;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(mins).padStart(2, '0');
            document.getElementById('seconds').textContent = String(secs).padStart(2, '0');
        }
    }
    setInterval(updateCounter, 1000);
    updateCounter();

    // --- Smooth Scroll ---
    const scrollBtn = document.getElementById('scroll-btn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            document.getElementById('time-together').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- Gift Reveal ---
    const giftBox = document.getElementById('gift-box');
    const secretMessage = document.getElementById('secret-message');
    
    if (giftBox) {
        giftBox.addEventListener('click', () => {
            gsap.to(giftBox, { scale: 0, opacity: 0, duration: 0.5 });
            
            setTimeout(() => {
                secretMessage.classList.add('show');
                gsap.fromTo(secretMessage, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
            }, 500);
        });
    }

    // --- Particle System ---
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                color: { value: "#c5a059" },
                move: { enable: true, speed: 0.5 },
                number: { value: 50 },
                opacity: { value: 0.2 },
                size: { value: 1 }
            }
        });
    }
});
