// 3D Infinite Mehendi Gallery Logic

document.addEventListener('DOMContentLoaded', () => {
    const tunnelContainer = document.getElementById('tunnel-container');
    if (!tunnelContainer) return;

    // Configuration
    const images = [
        "../assets/mehendi-design/1.jpg",
        "../assets/mehendi-design/2.jpg",
        "../assets/mehendi-design/3.jpg",
        "../assets/mehendi-design/4.jpg",
        "../assets/mehendi-design/5.jpg",
        "../assets/mehendi-design/6.jpg"
    ];

    const alts = [
        "Royal Bridal Hands Design",
        "Intricate Feet Henna Art",
        "Contemporary Floral Vine",
        "Modern Arabic Layout",
        "Traditional Wedding Mandala",
        "Bespoke Bridal Portrait Close-up"
    ];

    const visibleCount = 12; // Number of floating planes
    const depthRange = 3600; // Total depth of the tunnel in pixels
    const maxZ = 600;        // Maximum z-coordinate before wrapping to the back
    const minZ = maxZ - depthRange; // Minimum z-coordinate
    
    let scrollVelocity = 0;
    let autoPlay = true;
    let lastInteraction = Date.now();
    let touchStartY = 0;

    // Array of plane data
    const planes = [];

    // Create plane elements
    for (let i = 0; i < visibleCount; i++) {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        
        const img = document.createElement('img');
        const imgIndex = i % images.length;
        img.src = images[imgIndex];
        img.alt = alts[imgIndex];
        
        const overlay = document.createElement('div');
        overlay.className = 'gallery-card-overlay';
        
        const title = document.createElement('h3');
        title.className = 'font-serif text-lg text-gold-light tracking-wide';
        title.innerText = alts[imgIndex];
        
        const desc = document.createElement('p');
        desc.className = 'font-sans text-[10px] text-white/50 uppercase tracking-widest mt-1';
        desc.innerText = `Collection Design ${imgIndex + 1}`;
        
        overlay.appendChild(title);
        overlay.appendChild(desc);
        card.appendChild(img);
        card.appendChild(overlay);
        tunnelContainer.appendChild(card);

        // Position coordinates
        // Helical/Golden distribution for realistic depth tunnel
        const angle = i * 2.39996; // Golden angle in radians
        const radius = (i % 3) * 120 + 160; // Spread radius from center
        const x = Math.sin(angle) * radius;
        const y = Math.cos(angle) * radius * 0.85;
        const initialZ = minZ + (depthRange / visibleCount) * i;

        planes.push({
            element: card,
            imgElement: img,
            titleElement: title,
            descElement: desc,
            x: x,
            y: y,
            z: initialZ,
            imageIndex: imgIndex
        });
    }

    // Handle scroll wheel
    window.addEventListener('wheel', (e) => {
        scrollVelocity += e.deltaY * 0.15;
        autoPlay = false;
        lastInteraction = Date.now();
    }, { passive: true });

    // Handle keypresses (Arrow keys)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            scrollVelocity -= 80;
            autoPlay = false;
            lastInteraction = Date.now();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            scrollVelocity += 80;
            autoPlay = false;
            lastInteraction = Date.now();
        }
    });

    // Touch support for mobile swipe
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        autoPlay = false;
        lastInteraction = Date.now();
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        const currentY = e.touches[0].clientY;
        const deltaY = touchStartY - currentY;
        scrollVelocity += deltaY * 0.4;
        touchStartY = currentY;
    }, { passive: true });

    // Render loop
    function update() {
        const now = Date.now();
        
        // Auto-play scroll resume logic
        if (now - lastInteraction > 3000) {
            autoPlay = true;
        }

        if (autoPlay) {
            // Smooth persistent autoplay scroll velocity
            scrollVelocity += (2.5 - scrollVelocity) * 0.05;
        }

        // Apply friction/damping to scroll velocity
        scrollVelocity *= 0.92;

        planes.forEach((plane) => {
            // Update Z coordinate based on velocity
            plane.z += scrollVelocity;

            // Wrapping logic
            if (plane.z > maxZ) {
                // Wrap to back of the tunnel
                plane.z -= depthRange;
                // Cycle the image index forward
                plane.imageIndex = (plane.imageIndex + visibleCount) % images.length;
                plane.imgElement.src = images[plane.imageIndex];
                plane.titleElement.innerText = alts[plane.imageIndex];
                plane.descElement.innerText = `Collection Design ${plane.imageIndex + 1}`;
            } else if (plane.z < minZ) {
                // Wrap to front of the tunnel
                plane.z += depthRange;
                // Cycle the image index backward
                plane.imageIndex = ((plane.imageIndex - visibleCount) % images.length + images.length) % images.length;
                plane.imgElement.src = images[plane.imageIndex];
                plane.titleElement.innerText = alts[plane.imageIndex];
                plane.descElement.innerText = `Collection Design ${plane.imageIndex + 1}`;
            }

            // Depth opacity fading calculations
            let opacity = 1;
            const fadeInStart = minZ;
            const fadeInEnd = minZ + 500;
            const fadeOutStart = maxZ - 600;
            const fadeOutEnd = maxZ;

            if (plane.z < fadeInEnd) {
                opacity = (plane.z - fadeInStart) / (fadeInEnd - fadeInStart);
            } else if (plane.z > fadeOutStart) {
                opacity = 1 - (plane.z - fadeOutStart) / (fadeOutEnd - fadeOutStart);
            }
            opacity = Math.max(0, Math.min(1, opacity));

            // Depth blur calculations
            let blur = 0;
            const maxBlur = 8;
            if (plane.z < minZ + 800) {
                const progress = (plane.z - minZ) / 800;
                blur = maxBlur * (1 - progress);
            } else if (plane.z > maxZ - 800) {
                const progress = (maxZ - plane.z) / 800;
                blur = maxBlur * (1 - progress);
            }
            blur = Math.max(0, Math.min(maxBlur, blur));

            // Apply style transforms
            // Z coordinate is used directly in translate3D for true hardware-accelerated 3D rendering
            plane.element.style.transform = `translate3d(${plane.x}px, ${plane.y}px, ${plane.z}px)`;
            plane.element.style.opacity = opacity;
            
            // Hide element fully when transparent to save render ticks
            if (opacity === 0) {
                plane.element.style.visibility = 'hidden';
            } else {
                plane.element.style.visibility = 'visible';
                plane.element.style.filter = blur > 0.5 ? `blur(${blur}px)` : 'none';
            }
        });

        requestAnimationFrame(update);
    }

    // Start rendering loop
    requestAnimationFrame(update);
});
