// Script interno do SVG para criar o efeito magnético de expansão no Hover
        (function() {
          const initInteraction = () => {
            const svg = document.getElementById('hero-honeycomb-svg');
            if (!svg) return;
            
            const hexes = svg.querySelectorAll('.hex');
            const pt = svg.createSVGPoint();
            let frame = null;

            const updateHover = (clientX, clientY) => {
              pt.x = clientX;
              pt.y = clientY;
              // Converte a posição da tela para o sistema de coordenadas interno do SVG (viewBox)
              const cursor = pt.matrixTransform(svg.getScreenCTM().inverse());
              
              hexes.forEach(hex => {
                const tx = parseFloat(hex.style.getPropertyValue('--tx'));
                const ty = parseFloat(hex.style.getPropertyValue('--ty'));
                const useEl = hex.querySelector('use');
                
                const dx = cursor.x - tx;
                const dy = cursor.y - ty;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                const maxDist = 130; // Raio de atração ao redor do rato/mouse
                
                if (dist < maxDist) {
                  // Fator de escala: aproximação orgânica (vai de 1.0 até 1.6 no centro do cursor)
                  const scale = 1 + (0.60 * Math.pow(1 - dist / maxDist, 2));
                  useEl.style.transform = `scale(${scale})`;
                } else {
                  useEl.style.transform = `scale(1)`;
                }
              });
            };

            svg.addEventListener('mousemove', (e) => {
              if (frame) cancelAnimationFrame(frame);
              frame = requestAnimationFrame(() => updateHover(e.clientX, e.clientY));
            });

            svg.addEventListener('mouseleave', () => {
              if (frame) cancelAnimationFrame(frame);
              frame = requestAnimationFrame(() => {
                hexes.forEach(hex => {
                  hex.querySelector('use').style.transform = `scale(1)`;
                });
              });
            });
          };

          // Inicializa o script garantindo que o DOM está pronto
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initInteraction);
          } else {
            initInteraction();
          }
        })();

// Transição suave de avatares baseada no rolar da página
      document.addEventListener('DOMContentLoaded', () => {
        const primaryAvatar = document.getElementById('avatar-primary');
        const secondaryAvatar = document.getElementById('avatar-secondary');
        
        if (!primaryAvatar || !secondaryAvatar) return;

        window.addEventListener('scroll', () => {
          // Determina quantos pixels rolou
          const scrollY = window.scrollY;
          // Ponto onde a transição termina (em pixels rolados) - Reduzido para transição mais rápida
          const fadePoint = 100; 
          
          // Calcula a opacidade (entre 0 e 1)
          let progress = scrollY / fadePoint;
          progress = Math.min(Math.max(progress, 0), 1); // Clamp entre 0 e 1
          
          // Crossfade: a primária some, a secundária aparece
          primaryAvatar.style.opacity = 1 - progress;
          secondaryAvatar.style.opacity = progress;
        }, { passive: true });
      });

// Intersection Observer para revelar os cards sob demanda
    document.addEventListener("DOMContentLoaded", () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Optional: Unobserve if we only want it to happen once
            observer.unobserve(entry.target); 
          }
        });
      }, {
        threshold: 0.1, // Trigger when 10% of the item is in view
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
      });

      const revealElements = document.querySelectorAll('.reveal-on-scroll');
      revealElements.forEach((el) => observer.observe(el));

      // Header Scroll Animation (Pill to Horizontal Bar)
      const headerWrapper = document.getElementById('header-wrapper');
      const headerNav = document.getElementById('header-nav');
      
      if (headerWrapper && headerNav) {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 20) {
            // Transform to flat bar
            headerWrapper.classList.replace('top-6', 'top-0');
            headerWrapper.classList.replace('px-4', 'px-0');
            headerWrapper.classList.replace('md:px-6', 'md:px-0');
            
            headerNav.classList.replace('max-w-6xl', 'max-w-full');
            headerNav.classList.replace('rounded-full', 'rounded-none');
            headerNav.classList.replace('sm:bg-black/60', 'sm:bg-black/90');
            headerNav.classList.replace('md:bg-black/70', 'md:bg-black/90');
            
            // Adjust borders
            headerNav.classList.remove('border-transparent');
            headerNav.classList.add('border-b', 'border-white/5');
            headerNav.classList.replace('sm:border-white/10', 'sm:border-b-white/10');
          } else {
            // Revert back to pill
            headerWrapper.classList.replace('top-0', 'top-6');
            headerWrapper.classList.replace('px-0', 'px-4');
            headerWrapper.classList.replace('md:px-0', 'md:px-6');
            
            headerNav.classList.replace('max-w-full', 'max-w-6xl');
            headerNav.classList.replace('rounded-none', 'rounded-full');
            headerNav.classList.replace('sm:bg-black/90', 'sm:bg-black/60');
            headerNav.classList.replace('md:bg-black/90', 'md:bg-black/70');
            
            // Revert borders
            headerNav.classList.add('border-transparent');
            headerNav.classList.remove('border-b', 'border-white/5');
            headerNav.classList.replace('sm:border-b-white/10', 'sm:border-white/10');
          }
        });
      }

      // Authentication Modal Logic
      const authModal = document.getElementById('auth-modal');
      const authModalContent = document.getElementById('auth-modal-content');
      const authModalBackdrop = document.getElementById('auth-modal-backdrop');
      const openModalBtns = document.querySelectorAll('.open-auth-modal');
      const closeAuthModalBtn = document.getElementById('close-auth-modal');

      function openModal() {
        authModal.classList.remove('hidden');
        authModal.classList.add('flex');
        // trigger reflow
        void authModal.offsetWidth;
        // Fade in
        authModalBackdrop.classList.remove('opacity-0');
        authModalBackdrop.classList.add('opacity-100');
        // Scale in & Fade in content
        authModalContent.classList.remove('opacity-0', 'scale-95');
        authModalContent.classList.add('opacity-100', 'scale-100');
        document.body.style.overflow = 'hidden'; // prevent scrolling
      }

      function closeModal() {
        // Fade out
        authModalBackdrop.classList.remove('opacity-100');
        authModalBackdrop.classList.add('opacity-0');
        // Scale out & Fade out content
        authModalContent.classList.remove('opacity-100', 'scale-100');
        authModalContent.classList.add('opacity-0', 'scale-95');
        document.body.style.overflow = ''; // restore scrolling

        // Wait for transition to finish before hiding
        setTimeout(() => {
          authModal.classList.add('hidden');
          authModal.classList.remove('flex');
        }, 300);
      }

      openModalBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      }));

      closeAuthModalBtn.addEventListener('click', closeModal);
      
      // Close when clicking outside the modal content
      authModal.addEventListener('click', (e) => {
        if (e.target === authModal || e.target === authModalBackdrop) {
          closeModal();
        }
      });
      
      // Close on ESC key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !authModal.classList.contains('hidden')) {
          closeModal();
        }
      });
    });