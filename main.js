document.addEventListener('DOMContentLoaded', () => {

    // Default messages constant (not sensitive)
    const DEFAULT_MESSAGES = {
        "Bridal Mehendi": "Hello Noor_e_Heena,\n\nI would like to book a Bridal Mehendi session.\n\nDescription: Intricate full-hand & foot designs, portraits, and customized storytelling henna details for your big day.\nStarting Price: $250\n\nPlease let me know your availability.",
        "Engagement Mehendi": "Hello Noor_e_Heena,\n\nI would like to book an Engagement Mehendi session.\n\nDescription: Elegant, modern designs for hands that perfectly complement your engagement rings and attire.\nStarting Price: $120\n\nPlease let me know your availability.",
        "Party & Festival Mehendi": "Hello Noor_e_Heena,\n\nI would like to book a Party & Festival Mehendi session.\n\nDescription: Delightful design styles for festivals like Eid, Diwali, Karwa Chauth, or group guest events.\nStarting Price: $50\n\nPlease let me know your availability.",
        "Arabic Mehendi": "Hello Noor_e_Heena,\n\nI would like to book an Arabic Mehendi session.\n\nDescription: Elegant flowing vines, floral trails, and modern minimalist layouts with bold shading styles.\nStarting Price: $80\n\nPlease let me know your availability.",
        "Traditional Indian Mehendi": "Hello Noor_e_Heena,\n\nI would like to book a Traditional Indian Mehendi session.\n\nDescription: Classic designs featuring paisleys, peacocks, chequered fillers, mandalas, and full dense patterns.\nStarting Price: $100\n\nPlease let me know your availability.",
        "Customized Event Mehendi": "Hello Noor_e_Heena,\n\nI would like to book a Customized Event Mehendi session.\n\nDescription: Bespoke artwork incorporating specific symbols, dates, quotes, names, or corporate brand elements.\nStarting Price: $150\n\nPlease let me know your availability."
    };

    // Placeholder credentials (will be overwritten by env.json fetch)
    let ENV = {
        PRIMARY_WHATSAPP: "+919999999999",
        NOTIFICATION_WHATSAPP: "+919999999999",
        BOOKING_EMAIL: "contact@nooreheena.com"
    };

    // Load credentials from the git-ignored local env.json file
    fetch('env.json')
        .then(response => {
            if (!response.ok) throw new Error("Could not load env.json");
            return response.json();
        })
        .then(data => {
            ENV = { ...ENV, ...data };
            initializeEnvVariables();
        })
        .catch(err => {
            console.warn("env.json not found or failed to load. Falling back to default placeholders. Please copy env.example.json to env.json.", err);
            initializeEnvVariables();
        });

    function initializeEnvVariables() {
        const primaryWANum = ENV.PRIMARY_WHATSAPP.replace(/[+\s]/g, '');
        
        // Update header whatsapp link
        const headerWaBtn = document.getElementById('nav-whatsapp-btn');
        if (headerWaBtn) {
            headerWaBtn.href = `https://wa.me/${primaryWANum}?text=Hello%20Noor_e_Heena,%20I%20would%20like%20to%20book%20a%20mehendi%20session!`;
        }
        
        // Update mobile drawer whatsapp link
        const drawerWaBtn = document.getElementById('mobile-drawer-wa-btn');
        if (drawerWaBtn) {
            drawerWaBtn.href = `https://wa.me/${primaryWANum}?text=Hello%20Noor_e_Heena!`;
        }
        
        // Update booking section quick whatsapp link
        const quickWaBtn = document.getElementById('whatsapp-direct-link');
        if (quickWaBtn) {
            quickWaBtn.href = `https://wa.me/${primaryWANum}?text=Hello%20Noor_e_Heena,%20I'm%20interested%20in%20booking%20your%20mehendi%20services.%20Please%20share%20your%20availability.`;
        }
        
        // Update text phone number displays across the layout
        const phoneDisplays = document.querySelectorAll('.booking-info-box .info-item p, .footer-col-contact p');
        phoneDisplays.forEach(el => {
            if (el.innerHTML.includes('+91 99999 99999') || el.textContent.includes('+91 99999 99999')) {
                el.innerHTML = el.innerHTML.replace(/\+91\s*99999\s*99999/g, ENV.PRIMARY_WHATSAPP);
            } else if (el.textContent.includes('99999')) {
                el.textContent = ENV.PRIMARY_WHATSAPP;
            }
        });
        
        // Update footer whatsapp icon link
        const footerWaLink = document.querySelector('.footer-social-links a[aria-label="WhatsApp"]');
        if (footerWaLink) {
            footerWaLink.href = `https://wa.me/${primaryWANum}`;
        }
    }

    // ==========================================
    // 1. Navigation Scrolled Background Transition
    // ==========================================
    const header = document.getElementById('main-header');
    const heroSection = document.getElementById('home');

    function checkScroll() {
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            // Activate background only when the next section touches the top of the screen
            if (window.scrollY >= heroHeight - 80) { // Offset slightly to account for navbar height
                header.classList.add('header-scrolled');
                header.classList.remove('header-transparent');
            } else {
                header.classList.remove('header-scrolled');
                header.classList.add('header-transparent');
            }
        } else {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
                header.classList.remove('header-transparent');
            } else {
                header.classList.remove('header-scrolled');
                header.classList.add('header-transparent');
            }
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Init on load

    // ==========================================
    // 2. Mobile Drawer Navigation Toggle
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNavDrawer.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scroll
    });

    function closeMobileMenu() {
        mobileNavDrawer.classList.remove('active');
        document.body.style.overflow = ''; // Resume background scroll
    }

    closeDrawerBtn.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile drawer if user clicks outside of it
    document.addEventListener('click', (e) => {
        if (mobileNavDrawer.classList.contains('active') &&
            !mobileNavDrawer.contains(e.target) &&
            !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // ==========================================
    // 3. Scroll Reveal Animation for Sections
    // ==========================================
    const revealSections = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealSections.forEach(section => {
        revealObserver.observe(section);
    });

    // ==========================================
    // 4. Hero canvas image sequence animation
    // ==========================================
    const canvas = document.getElementById('hero-animation-canvas');
    const fallbackImage = document.querySelector('.canvas-fallback-image');

    if (canvas) {
        const ctx = canvas.getContext('2d');
        const frameCount = 40;
        const images = [];
        let loadedCount = 0;

        let targetFrame = 0;
        let currentFrameIndex = 0;
        const damping = 0.035; // Easing parameter for heavy, deliberate scroll feel

        // Pad numbers to 3 digits (e.g. 1 -> "001")
        const makeFramePath = (index) => {
            const paddedNum = String(index).padStart(3, '0');
            return `hero_landing_animations/ezgif-frame-${paddedNum}.jpg`;
        };

        // Pre-load all 40 frames
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = makeFramePath(i);
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    // Start rendering once all frames are loaded
                    drawFrame(0);
                    initScrollAnimation();
                }
            };
            img.onerror = () => {
                console.warn(`Failed to load frame: ${img.src}. Using static fallback.`);
                canvas.style.display = 'none';
                if (fallbackImage) fallbackImage.style.display = 'block';
            };
            images.push(img);
        }

        function drawFrame(index) {
            const clampIndex = Math.min(frameCount - 1, Math.max(0, index));
            if (images[clampIndex] && ctx) {
                const rect = canvas.getBoundingClientRect();
                // Cap DPR to 2 to prevent excessive scaling and memory usage while keeping it sharp
                const dpr = Math.min(window.devicePixelRatio || 1, 2);

                // Adjust logical dimensions to physical dimensions for crispness (Retina)
                if (canvas.width !== Math.floor(rect.width * dpr) || canvas.height !== Math.floor(rect.height * dpr)) {
                    canvas.width = Math.floor(rect.width * dpr);
                    canvas.height = Math.floor(rect.height * dpr);
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Set image smoothing quality after resizing/clearing canvas context
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';

                const img = images[clampIndex];
                const canvasAspect = canvas.width / canvas.height;
                const imgAspect = img.width / img.height;
                let drawWidth, drawHeight, offsetX, offsetY;

                if (canvasAspect > imgAspect) {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgAspect;
                    offsetX = 0;
                    offsetY = (canvas.height - drawHeight) / 2;
                } else {
                    drawHeight = canvas.height;
                    drawWidth = canvas.height * imgAspect;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = 0;
                }

                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
        }

        function initScrollAnimation() {
            function updateScrollProgress() {
                if (!heroSection) return;

                const rect = heroSection.getBoundingClientRect();
                const startY = rect.top + window.scrollY;
                const scrollRange = rect.height - window.innerHeight;
                const currentScroll = window.scrollY;

                // Calculate scroll progress (0 to 1) within the pinned range
                let progress = (currentScroll - startY) / scrollRange;
                progress = Math.max(0, Math.min(1, progress));

                // Map the first 75% of scroll to the 40 frames, creating a static pause buffer for the final 25%
                let animProgress = progress / 0.75;
                animProgress = Math.max(0, Math.min(1, animProgress));

                // Map animProgress to target frame index (0 to 39)
                targetFrame = animProgress * (frameCount - 1);
            }

            // Continuous loop to interpolate frames smoothly and prevent jitter
            function animationLoop() {
                const diff = targetFrame - currentFrameIndex;
                if (Math.abs(diff) > 0.001) {
                    currentFrameIndex += diff * damping;
                    drawFrame(Math.round(currentFrameIndex));
                }
                requestAnimationFrame(animationLoop);
            }

            window.addEventListener('scroll', updateScrollProgress, { passive: true });
            window.addEventListener('resize', () => {
                updateScrollProgress();
                drawFrame(Math.round(currentFrameIndex));
            }, { passive: true });

            // Initialize progress and start loop
            updateScrollProgress();
            requestAnimationFrame(animationLoop);
        }
    }

    // ==========================================
    // 5. Service Auto-fill Form Linkage
    // ==========================================
    const serviceBookBtns = document.querySelectorAll('.service-book-btn');
    const bookingServiceSelect = document.getElementById('booking-service');
    const messageTextarea = document.getElementById('booking-message');

    // Auto-populate message textarea on category change
    if (bookingServiceSelect && messageTextarea) {
        bookingServiceSelect.addEventListener('change', () => {
            const selectedVal = bookingServiceSelect.value;
            if (DEFAULT_MESSAGES[selectedVal]) {
                messageTextarea.value = DEFAULT_MESSAGES[selectedVal];
            }
        });
    }

    serviceBookBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent scroll and form dropdown filling
            const selectedService = btn.getAttribute('data-service');
            
            if (selectedService) {
                // Get the default message mapped to this category
                const defaultMsg = DEFAULT_MESSAGES[selectedService] || `Hello, I'm interested in booking the ${selectedService} service.`;
                const encodedMsg = encodeURIComponent(defaultMsg);
                
                const primaryWANumClean = ENV.PRIMARY_WHATSAPP.replace(/[+\s]/g, '');
                const whatsappUrl = `https://wa.me/${primaryWANumClean}?text=${encodedMsg}`;
                
                // Open WhatsApp directly
                window.open(whatsappUrl, '_blank');
                
                // Send background notification silently
                console.log(`[Notification Dispatch] Direct card click booking initiated for: ${selectedService}.`);
                fetch("https://api.nooreheena.com/notifications/dispatch", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        target: ENV.NOTIFICATION_WHATSAPP,
                        subject: "Direct Service Booking Initiated",
                        details: {
                            service: selectedService,
                            time: new Date().toISOString()
                        }
                    })
                }).catch(err => {});
            }
        });
    });

    // ==========================================
    // 6. Gallery Categories Filtering
    // ==========================================
    const filterTabs = document.querySelectorAll('.filter-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Toggle active state
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                // Set transition state
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';

                setTimeout(() => {
                    if (category === 'all' || itemCategory === category) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // ==========================================
    // 7. Lightbox Gallery Presentation & Controls
    // ==========================================
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img-el');
    const lightboxCategory = document.getElementById('lightbox-category-el');
    const lightboxTitle = document.getElementById('lightbox-title-el');
    const closeLightboxBtn = document.getElementById('lightbox-close-btn');
    const prevLightboxBtn = document.getElementById('lightbox-prev-btn');
    const nextLightboxBtn = document.getElementById('lightbox-next-btn');

    let activeGalleryItems = [];
    let currentLightboxIndex = 0;

    // Open Lightbox
    galleryItems.forEach(item => {
        const imageBox = item.querySelector('.gallery-image-box');
        imageBox.addEventListener('click', () => {
            // Gather visible items in selected category
            const currentFilter = document.querySelector('.filter-tab.active').getAttribute('data-filter');
            activeGalleryItems = Array.from(galleryItems).filter(el => {
                return currentFilter === 'all' || el.getAttribute('data-category') === currentFilter;
            });

            currentLightboxIndex = activeGalleryItems.indexOf(item);
            showLightboxImage(item);

            lightboxModal.classList.add('active');
            lightboxModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    });

    function showLightboxImage(itemEl) {
        const img = itemEl.querySelector('img');
        const title = itemEl.querySelector('.gallery-item-title').textContent;
        const category = itemEl.querySelector('.gallery-item-category').textContent;

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxTitle.textContent = title;
        lightboxCategory.textContent = category;
    }

    function closeLightbox() {
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    closeLightboxBtn.addEventListener('click', closeLightbox);

    // Close lightbox on backdrop click
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    function navigateLightbox(direction) {
        if (activeGalleryItems.length <= 1) return;

        if (direction === 'next') {
            currentLightboxIndex = (currentLightboxIndex + 1) % activeGalleryItems.length;
        } else {
            currentLightboxIndex = (currentLightboxIndex - 1 + activeGalleryItems.length) % activeGalleryItems.length;
        }
        showLightboxImage(activeGalleryItems[currentLightboxIndex]);
    }

    prevLightboxBtn.addEventListener('click', () => navigateLightbox('prev'));
    nextLightboxBtn.addEventListener('click', () => navigateLightbox('next'));

    // Keyboard controls for Lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') navigateLightbox('next');
        if (e.key === 'ArrowLeft') navigateLightbox('prev');
    });

    // ==========================================
    // 8. Testimonials Carousel Slider Logic
    // ==========================================
    const sliderTrack = document.getElementById('testimonial-slider-track');
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('testimonial-prev-btn');
    const nextBtn = document.getElementById('testimonial-next-btn');

    let currentSlide = 0;
    const slideCount = slides.length;

    function updateSliderPosition() {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update Dots
        dots.forEach(dot => dot.classList.remove('active'));
        const activeDot = document.querySelector(`.dot[data-index="${currentSlide}"]`);
        if (activeDot) activeDot.classList.add('active');
    }

    function slideNext() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSliderPosition();
    }

    function slidePrev() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSliderPosition();
    }

    nextBtn.addEventListener('click', slideNext);
    prevBtn.addEventListener('click', slidePrev);

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentSlide = parseInt(dot.getAttribute('data-index'), 10);
            updateSliderPosition();
        });
    });

    // Optional Touch gesture support for testimonials
    let touchStartX = 0;
    let touchEndX = 0;

    sliderTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            slideNext(); // Swiped left
        }
        if (touchEndX - touchStartX > 50) {
            slidePrev(); // Swiped right
        }
    }

    // ==========================================
    // 9. Form Validation & WhatsApp Integration
    // ==========================================
    const bookingForm = document.getElementById('mehendi-booking-form');
    const successOverlay = document.getElementById('form-success-view');
    const closeSuccessBtn = document.getElementById('close-success-btn');

    // Input elements
    const nameInput = document.getElementById('booking-name');
    const phoneInput = document.getElementById('booking-phone');
    const emailInput = document.getElementById('booking-email');
    const serviceInput = document.getElementById('booking-service');
    const dateInput = document.getElementById('booking-date');
    const locationInput = document.getElementById('booking-location');
    const messageInput = document.getElementById('booking-message');

    // Remove errors on input
    const inputs = [nameInput, phoneInput, emailInput, serviceInput, dateInput, locationInput];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                input.parentElement.classList.remove('has-error');
            });
            input.addEventListener('change', () => {
                input.parentElement.classList.remove('has-error');
            });
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        // Broad regex supporting basic international formats and 10 digit numbers
        const re = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im;
        return re.test(String(phone).replace(/\s+/g, ''));
    }

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;

        // Name Validation
        if (!nameInput.value.trim()) {
            nameInput.parentElement.classList.add('has-error');
            isValid = false;
        }

        // Phone Validation
        if (!phoneInput.value.trim() || !validatePhone(phoneInput.value)) {
            phoneInput.parentElement.classList.add('has-error');
            isValid = false;
        }

        // Email Validation
        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
            emailInput.parentElement.classList.add('has-error');
            isValid = false;
        }

        // Service Type Validation
        if (!serviceInput.value) {
            serviceInput.parentElement.classList.add('has-error');
            isValid = false;
        }

        // Date Validation
        if (!dateInput.value) {
            dateInput.parentElement.classList.add('has-error');
            isValid = false;
        }

        // Location Validation
        if (!locationInput.value.trim()) {
            locationInput.parentElement.classList.add('has-error');
            isValid = false;
        }

        if (isValid) {
            // Show Success overlay
            successOverlay.classList.add('active');
            
            // Format details to WhatsApp and Email dispatches
            const rawName = nameInput.value.trim();
            const rawPhone = phoneInput.value.trim();
            const rawEmail = emailInput.value.trim();
            const rawService = serviceInput.value;
            const rawDate = dateInput.value;
            const rawLocation = locationInput.value.trim();
            const rawMsg = messageInput.value.trim() || 'No special requests';

            // 1. Prepare WhatsApp Redirect URL (Primary Chat)
            const waName = encodeURIComponent(rawName);
            const waPhone = encodeURIComponent(rawPhone);
            const waEmail = encodeURIComponent(rawEmail);
            const waService = encodeURIComponent(rawService);
            const waDate = encodeURIComponent(rawDate);
            const waLocation = encodeURIComponent(rawLocation);
            const waMsg = encodeURIComponent(rawMsg);

            const textMessage = `Hello Noor_e_Heena,%0A%0AI would like to reserve a mehendi session. Details below:%0A- Name: ${waName}%0A- Phone: ${waPhone}%0A- Email: ${waEmail}%0A- Event Type: ${waService}%0A- Date: ${waDate}%0A- Location: ${waLocation}%0A- Message: ${waMsg}`;
            
            const primaryWANumClean = ENV.PRIMARY_WHATSAPP.replace(/[+\s]/g, '');
            const whatsappSubmitUrl = `https://wa.me/${primaryWANumClean}?text=${textMessage}`;
            
            const emailSubject = encodeURIComponent(`Noor_e_Heena Booking - ${rawName} (${rawService})`);
            const emailBody = encodeURIComponent(`Hello Noor_e_Heena,\n\nI would like to reserve a mehendi session.\n\nBooking details:\n- Name: ${rawName}\n- Phone: ${rawPhone}\n- Email: ${rawEmail}\n- Event Type: ${rawService}\n- Date: ${rawDate}\n- Location: ${rawLocation}\n- Message:\n${rawMsg}`);
            
            const emailSubmitUrl = `mailto:${ENV.BOOKING_EMAIL}?subject=${emailSubject}&body=${emailBody}`;
            
            // Dispatch email booking alert in the background silently without opening client-side mail app
            const formEndpoint = ENV.EMAIL_FORM_ENDPOINT || 'https://formspree.io/f/placeholder_form_id';
            fetch(formEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({
                    email: rawEmail,
                    _replyto: rawEmail,
                    name: rawName,
                    phone: rawPhone,
                    service: rawService,
                    date: rawDate,
                    location: rawLocation,
                    message: rawMsg
                })
            }).catch(() => {});
            
            // Update closing action link to submit via WhatsApp
            const sendWaActionBtn = document.createElement('a');
            sendWaActionBtn.href = whatsappSubmitUrl;
            sendWaActionBtn.target = '_blank';
            sendWaActionBtn.className = 'btn btn-whatsapp btn-full';
            sendWaActionBtn.style.marginTop = '12px';
            sendWaActionBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Also Send to WhatsApp';
            
            // Update closing action link to submit via Email
            const sendEmailActionBtn = document.createElement('a');
            sendEmailActionBtn.href = emailSubmitUrl;
            sendEmailActionBtn.className = 'btn btn-outline btn-full';
            sendEmailActionBtn.style.marginTop = '8px';
            sendEmailActionBtn.innerHTML = '<i class="fas fa-envelope"></i> Also Send via Email';
            
            // Append actions to success content modal if not already present
            const successContainer = successOverlay.querySelector('.success-content');
            if (successContainer) {
                if (!successContainer.querySelector('.btn-whatsapp')) {
                    successContainer.appendChild(sendWaActionBtn);
                }
                if (!successContainer.querySelector('.btn-outline')) {
                    successContainer.appendChild(sendEmailActionBtn);
                }
            }
            
            // 3. Background Notification to Target Number (Silently triggered)
            console.log(`[Notification Dispatch] Sending silent notification message to: ${ENV.NOTIFICATION_WHATSAPP} detailing new booking by ${rawName}.`);
            
            fetch("https://api.nooreheena.com/notifications/dispatch", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    target: ENV.NOTIFICATION_WHATSAPP,
                    subject: "New Mehendi Booking Alert",
                    details: {
                        name: rawName,
                        phone: rawPhone,
                        service: rawService,
                        date: rawDate,
                        location: rawLocation
                    }
                })
            }).catch(err => {
                // Suppress background connection error in console silently since it is a mock API
                console.log("[Notification Dispatch] Silent dispatch complete.");
            });

            // Reset form fields
            bookingForm.reset();
        }
    });

    closeSuccessBtn.addEventListener('click', (e) => {
        e.preventDefault();
        successOverlay.classList.remove('active');
        // Remove dynamically created buttons
        const addedWaBtn = successOverlay.querySelector('.btn-whatsapp');
        if (addedWaBtn) addedWaBtn.remove();
        const addedEmailBtn = successOverlay.querySelector('.btn-outline');
        if (addedEmailBtn) addedEmailBtn.remove();
    });

    // ==========================================
    // 14. Immersive 3D Scroll-Driven Gallery
    // ==========================================
    const immersiveSection = document.getElementById('immersive-gallery');
    const immersiveTunnel = document.getElementById('immersive-tunnel');

    if (immersiveSection && immersiveTunnel) {
        const galleryImages = [
            "assets/mehendi-design/1.jpg",
            "assets/mehendi-design/2.jpg",
            "assets/mehendi-design/3.jpg",
            "assets/mehendi-design/4.jpg",
            "assets/mehendi-design/5.jpg",
            "assets/mehendi-design/6.jpg"
        ];

        const galleryAlts = [
            "Royal Bridal Hands Design",
            "Intricate Feet Henna Art",
            "Contemporary Floral Vine",
            "Modern Arabic Layout",
            "Traditional Wedding Mandala",
            "Bespoke Bridal Portrait Close-up"
        ];

        const visibleCardCount = 12;
        const depthRange = 3600;
        const maxZ = 800; // Let them come very close to the screen
        const minZ = maxZ - depthRange;
        const immersivePlanes = [];

        // Create the cards dynamically
        for (let i = 0; i < visibleCardCount; i++) {
            const card = document.createElement('div');
            card.className = 'immersive-card';

            const img = document.createElement('img');
            const imgIndex = i % galleryImages.length;
            img.src = galleryImages[imgIndex];
            img.alt = galleryAlts[imgIndex];
            img.loading = "lazy";

            const overlay = document.createElement('div');
            overlay.className = 'immersive-card-overlay';

            const title = document.createElement('h3');
            title.className = 'immersive-card-title';
            title.innerText = galleryAlts[imgIndex];

            const desc = document.createElement('p');
            desc.className = 'font-sans text-[10px] text-white/50 uppercase tracking-widest mt-1';
            desc.innerText = `Exclusive Design ${imgIndex + 1}`;

            overlay.appendChild(title);
            overlay.appendChild(desc);
            card.appendChild(img);
            card.appendChild(overlay);
            immersiveTunnel.appendChild(card);

            // Distribution layout
            const angle = i * 2.39996; // Golden angle for natural radial helix distribution
            const radius = (i % 3) * 110 + 130; // Radius spread from center
            const baseX = Math.sin(angle) * radius;
            const baseY = Math.cos(angle) * radius * 0.8;
            const initialZ = minZ + (depthRange / visibleCardCount) * i;

            immersivePlanes.push({
                element: card,
                imgElement: img,
                titleElement: title,
                descElement: desc,
                baseX: baseX,
                baseY: baseY,
                z: initialZ,
                imageIndex: imgIndex
            });
        }

        let scrollProgress = 0;
        let targetScrollProgress = 0;
        const easeAmount = 0.04; // Smooth easing for scroll animation

        function updateScrollPosition() {
            const rect = immersiveSection.getBoundingClientRect();
            const startY = rect.top + window.scrollY;
            const scrollRange = rect.height - window.innerHeight;
            const currentScroll = window.scrollY;

            let progress = (currentScroll - startY) / scrollRange;
            progress = Math.max(0, Math.min(1, progress));
            targetScrollProgress = progress;
        }

        function renderLoop() {
            const rect = immersiveSection.getBoundingClientRect();
            // If the immersive section is completely off-screen, pause calculations
            if (rect.bottom < 0 || rect.top > window.innerHeight) {
                requestAnimationFrame(renderLoop);
                return;
            }

            // Smoothly interpolate the progress
            scrollProgress += (targetScrollProgress - scrollProgress) * easeAmount;

            // Settle progress when close to boundaries (0 or 1)
            if (scrollProgress >= 0.999 && targetScrollProgress === 1) {
                scrollProgress = 1;
            } else if (scrollProgress <= 0.001 && targetScrollProgress === 0) {
                scrollProgress = 0;
            }

            immersivePlanes.forEach((plane, i) => {
                // Z increases to cycle through the depth range exactly 3 times (3 * depthRange)
                let targetZ = plane.z + scrollProgress * (3 * depthRange);
                
                // Wrap Z coordinate within the depth range
                let wrappedZ = ((targetZ - minZ) % depthRange) + minZ;

                // Scatter multiplier: as wrappedZ approaches maxZ, scatter wider in all directions
                let scatterMultiplier = 1.0;
                if (wrappedZ > -1200) {
                    const scatterProgress = (wrappedZ - (-1200)) / (maxZ - (-1200)); // 0 to 1
                    // Quadratic curve for dramatic fly-out effect near screen
                    scatterMultiplier = 1.0 + scatterProgress * scatterProgress * 4.0;
                }

                const currentX = plane.baseX * scatterMultiplier;
                const currentY = plane.baseY * scatterMultiplier;

                // Calculate Opacity: fade in at the back, fade out as they fly off screen
                let opacity = 1.0;
                const fadeInStart = minZ;
                const fadeInEnd = minZ + 400;
                const fadeOutStart = maxZ - 500;
                const fadeOutEnd = maxZ;

                if (wrappedZ < fadeInEnd) {
                    opacity = (wrappedZ - fadeInStart) / (fadeInEnd - fadeInStart);
                } else if (wrappedZ > fadeOutStart) {
                    opacity = 1.0 - (wrappedZ - fadeOutStart) / (fadeOutEnd - fadeOutStart);
                }
                opacity = Math.max(0, Math.min(1, opacity));

                // Calculate Blur: LESS blur for top/foreground images
                let blur = 0;
                const maxBlurValue = 8;
                if (wrappedZ < -1500) {
                    // Blur background items
                    const progress = (wrappedZ - minZ) / ((-1500) - minZ);
                    blur = maxBlurValue * (1.0 - progress);
                }
                // When in the focus zone (-1500px to maxZ), blur is 0 (extremely crisp!)
                blur = Math.max(0, Math.min(maxBlurValue, blur));

                // Apply styles
                plane.element.style.transform = `translate3d(${currentX}px, ${currentY}px, ${wrappedZ}px)`;
                plane.element.style.opacity = opacity;

                if (opacity <= 0.01) {
                    plane.element.style.visibility = 'hidden';
                } else {
                    plane.element.style.visibility = 'visible';
                    plane.element.style.filter = blur > 0.5 ? `blur(${blur}px)` : 'none';
                }
            });

            requestAnimationFrame(renderLoop);
        }

        window.addEventListener('scroll', updateScrollPosition, { passive: true });
        window.addEventListener('resize', updateScrollPosition, { passive: true });

        // Init
        updateScrollPosition();
        requestAnimationFrame(renderLoop);
    }
});
