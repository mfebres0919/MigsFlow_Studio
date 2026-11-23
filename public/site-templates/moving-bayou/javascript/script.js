/* ==========================================================================
   Bayou City Movers — Homepage Scripts
   Homepage-only behavior (hero, quote form, map, gallery) lives here.
   ========================================================================== */

/* ---------- Hero background slideshow ---------- */
(function () {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const slides = hero.querySelectorAll(".hero-slide");
    const bars = hero.querySelectorAll(".hero-indicators span");
    const pauseButton = document.getElementById("hero-pause");
    const duration = parseFloat(getComputedStyle(hero).getPropertyValue("--slide-duration")) * 1000 || 6000;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let current = 0;
    let timer = null;

    function restartBar(bar) {
        bar.classList.remove("is-active");
        void bar.offsetWidth; // force reflow so the progress animation restarts
        bar.classList.add("is-active");
    }

    function showSlide(index) {
        slides[current].classList.remove("is-active");
        bars[current].classList.remove("is-active");
        current = (index + slides.length) % slides.length;
        slides[current].classList.add("is-active");
        restartBar(bars[current]);
    }

    function play() {
        clearInterval(timer);
        hero.classList.remove("is-paused");
        pauseButton.setAttribute("aria-label", "Pause background slideshow");
        restartBar(bars[current]);
        timer = setInterval(() => showSlide(current + 1), duration);
    }

    function pause() {
        clearInterval(timer);
        timer = null;
        hero.classList.add("is-paused");
        pauseButton.setAttribute("aria-label", "Play background slideshow");
    }

    pauseButton.addEventListener("click", () => {
        if (timer) {
            pause();
        } else {
            play();
        }
    });

    // Respect visitors who prefer less motion: start paused
    if (reduceMotion || slides.length < 2) {
        pause();
    } else {
        play();
    }
})();

/* ---------- Quote form (multi-step) ---------- */
(function () {
    const form = document.getElementById("quote-form");
    if (!form) return;

    const card = form.closest(".quote-card");
    const steps = form.querySelectorAll(".quote-step");
    const markers = card.querySelectorAll(".quote-steps li");
    const progressText = document.getElementById("quote-progress-text");
    const progressFill = card.querySelector(".quote-progress-fill");
    const backButton = form.querySelector(".quote-back");
    const nextLabel = form.querySelector(".quote-next-label");
    const success = document.getElementById("quote-success");
    const successName = document.getElementById("quote-success-name");
    const dateInput = document.getElementById("quote-date");
    const lastStep = steps.length - 1;

    let current = 0;

    // Move date can't be in the past
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    dateInput.min = today.toISOString().split("T")[0];

    // ZIP fields accept digits only
    form.querySelectorAll("[pattern='[0-9]{5}']").forEach((input) => {
        input.addEventListener("input", () => {
            input.value = input.value.replace(/\D/g, "").slice(0, 5);
        });
    });

    function setProgress(completed) {
        progressFill.style.width = `${(completed / steps.length) * 100}%`;
    }

    function showStep(index) {
        steps[current].hidden = true;
        current = index;
        const step = steps[current];
        step.hidden = false;

        markers.forEach((marker, i) => {
            marker.classList.toggle("is-complete", i < current);
            marker.classList.toggle("is-active", i === current);
        });

        setProgress(current + 1);
        progressText.textContent = `Step ${current + 1} of ${steps.length}: ${step.dataset.title}`;
        backButton.hidden = current === 0;
        nextLabel.textContent = current === lastStep ? "Send My Quote Request" : "Next";

        // Keep the top of the card in view on small screens
        if (card.getBoundingClientRect().top < 0) {
            card.scrollIntoView({ block: "start" });
        }
        step.querySelector(".quote-step-title").focus({ preventScroll: true });
    }

    // Validate only the fields in the visible step
    function stepIsValid(step) {
        const fields = step.querySelectorAll("input, select, textarea");
        for (const field of fields) {
            if (!field.checkValidity()) {
                field.reportValidity();
                return false;
            }
        }
        return true;
    }

    backButton.addEventListener("click", () => showStep(current - 1));

    // Enter key and the main button both go through submit
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!stepIsValid(steps[current])) return;

        if (current < lastStep) {
            showStep(current + 1);
            return;
        }

        const firstName = document.getElementById("quote-name").value.trim().split(" ")[0];
        successName.textContent = firstName || "neighbor";

        markers.forEach((marker) => {
            marker.classList.remove("is-active");
            marker.classList.add("is-complete");
        });
        setProgress(steps.length);
        progressText.textContent = "All done!";
        form.hidden = true;
        success.hidden = false;
        success.focus();
    });
})();

/* ---------- Services carousel ---------- */
(function () {
    const track = document.getElementById("services-track");
    if (!track) return;

    const section = track.closest(".services");
    const slides = track.querySelectorAll(".services-slide");
    const toggleButton = section.querySelector("[data-carousel='toggle']");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const DWELL = 3000;    // time each card rests before moving on
    const DURATION = 1200; // length of the spring animation

    let frame = null;
    let timer = null;
    let userPaused = reduceMotion;
    let hovering = false;
    let focused = false;
    let touching = false;
    let inView = false;
    let touchTimer = null;

    /* Damped spring: starts gently, overshoots a little, then settles */
    function spring(t) {
        const zeta = 0.65;
        const omega = 10;
        const omegaD = omega * Math.sqrt(1 - zeta * zeta);
        const decay = Math.exp(-zeta * omega * t);
        return 1 - decay * (Math.cos(omegaD * t) + (zeta * omega / omegaD) * Math.sin(omegaD * t));
    }

    function maxScroll() {
        return track.scrollWidth - track.clientWidth;
    }

    function offsetOf(index) {
        return Math.min(slides[index].offsetLeft - slides[0].offsetLeft, maxScroll());
    }

    function currentIndex() {
        let closest = 0;
        slides.forEach((slide, i) => {
            if (Math.abs(offsetOf(i) - track.scrollLeft) < Math.abs(offsetOf(closest) - track.scrollLeft)) {
                closest = i;
            }
        });
        return closest;
    }

    function stopAnimation() {
        if (frame) cancelAnimationFrame(frame);
        frame = null;
        track.classList.remove("is-animating");
    }

    function animateTo(target, onDone) {
        stopAnimation();
        const start = track.scrollLeft;
        const distance = target - start;
        if (Math.abs(distance) < 1) {
            if (onDone) onDone();
            return;
        }

        if (reduceMotion) {
            track.scrollLeft = target;
            if (onDone) onDone();
            return;
        }

        const startTime = performance.now();
        track.classList.add("is-animating");

        function step(now) {
            const t = Math.min((now - startTime) / DURATION, 1);
            track.scrollLeft = start + distance * spring(t);
            if (t < 1) {
                frame = requestAnimationFrame(step);
            } else {
                track.scrollLeft = target;
                stopAnimation();
                if (onDone) onDone();
            }
        }
        frame = requestAnimationFrame(step);
    }

    function goTo(index, onDone) {
        const count = slides.length;
        animateTo(offsetOf((index + count) % count), onDone);
    }

    function next(onDone) {
        // Wrap to the start once the last card is fully in view
        if (track.scrollLeft >= maxScroll() - 2) {
            goTo(0, onDone);
        } else {
            goTo(currentIndex() + 1, onDone);
        }
    }

    function prev() {
        if (track.scrollLeft <= 2) {
            animateTo(maxScroll());
        } else {
            goTo(currentIndex() - 1);
        }
    }

    /* ---------- Autoplay ---------- */
    function canPlay() {
        return !userPaused && !hovering && !focused && !touching && inView;
    }

    function schedule() {
        clearTimeout(timer);
        if (!canPlay()) return;
        timer = setTimeout(() => {
            if (canPlay()) next(schedule);
        }, DWELL);
    }

    function updateAutoplay() {
        if (canPlay()) {
            schedule();
        } else {
            clearTimeout(timer);
        }
    }

    /* ---------- Controls ---------- */
    section.querySelector("[data-carousel='next']").addEventListener("click", () => next());
    section.querySelector("[data-carousel='prev']").addEventListener("click", prev);

    function setToggleState() {
        toggleButton.classList.toggle("is-paused", userPaused);
        toggleButton.setAttribute("aria-label", userPaused ? "Play services carousel" : "Pause services carousel");
    }

    toggleButton.addEventListener("click", () => {
        userPaused = !userPaused;
        setToggleState();
        updateAutoplay();
    });

    // Pause while someone is reading or interacting with the cards
    track.addEventListener("mouseenter", () => { hovering = true; updateAutoplay(); });
    track.addEventListener("mouseleave", () => { hovering = false; updateAutoplay(); });
    track.addEventListener("focusin", () => { focused = true; updateAutoplay(); });
    track.addEventListener("focusout", () => { focused = false; updateAutoplay(); });

    // A swipe or wheel scroll takes over from the animation; resume after a short rest
    function userScroll() {
        stopAnimation();
        touching = true;
        updateAutoplay();
        clearTimeout(touchTimer);
        touchTimer = setTimeout(() => {
            touching = false;
            updateAutoplay();
        }, DWELL * 2);
    }
    track.addEventListener("pointerdown", userScroll);
    track.addEventListener("wheel", userScroll, { passive: true });
    track.addEventListener("touchstart", userScroll, { passive: true });

    // Only autoplay while the section is on screen
    new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        updateAutoplay();
    }, { threshold: 0.35 }).observe(track);

    setToggleState();
})();

/* ---------- Service card hover float ---------- */
(function () {
    const canHover = window.matchMedia("(hover: hover)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduceMotion) return;

    document.querySelectorAll(".service-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.classList.remove("is-settling");
            card.style.transform = "";
            card.classList.add("is-floating");
        });

        // Freeze the card where the float left it, then ease it back down
        card.addEventListener("mouseleave", () => {
            card.style.transform = getComputedStyle(card).transform;
            card.classList.remove("is-floating");
            card.classList.add("is-settling");
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    card.style.transform = "";
                });
            });
        });

        card.addEventListener("transitionend", (event) => {
            if (event.propertyName === "transform") card.classList.remove("is-settling");
        });
    });
})();

/* ---------- Service areas ----------
   Studio version: the map, region buttons, neighbourhood cards and ZIP check were
   removed along with their section. The areas list is plain HTML and needs no script. */

/* ---------- Process: 3D revolving cards ---------- */
(function () {
    const section = document.getElementById("process");
    if (!section) return;

    const stage = document.getElementById("process-stage");
    const cards = [...section.querySelectorAll(".process-card")];
    const dots = [...section.querySelectorAll(".process-dot")];
    const details = [...section.querySelectorAll(".process-detail-item")];
    const toggleButton = section.querySelector("[data-process='toggle']");
    const count = cards.length;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const INTERVAL = 3500; // time each card stays in front

    let current = 0;  // position drawn on screen (eases toward target)
    let target = 0;   // where the ring is turning to; keeps counting up so it can loop forever
    let frame = null;

    function wrap(index) {
        return ((index % count) + count) % count;
    }

    /* ---------- Drawing ---------- */
    function layout(position) {
        const width = cards[0].offsetWidth;
        const spreadX = width * 0.78;
        const depth = width * 0.65;

        cards.forEach((card, i) => {
            // Distance from the front, wrapped so the ring reads as a loop
            let offset = wrap(i - position);
            if (offset > count / 2) offset -= count;

            const angle = offset * (Math.PI * 2 / count);
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);

            card.style.setProperty("--x", `${sin * spreadX}px`);
            card.style.setProperty("--z", `${(cos - 1) * depth}px`);
            card.style.setProperty("--ry", `${-sin * 30}deg`);
            card.style.setProperty("--shade", ((1 - cos) / 2 * 0.55).toFixed(3));
            card.style.zIndex = String(Math.round((cos + 1) * 100));
            card.style.opacity = String(Math.min(1, 1.35 + cos));
        });
    }

    function animate() {
        current += (target - current) * (reduceMotion ? 1 : 0.1);
        if (Math.abs(target - current) < 0.001) current = target;
        layout(current);
        frame = current === target ? null : requestAnimationFrame(animate);
    }

    /* Update dots and the detail panel for the card now in front */
    function showActive() {
        const active = wrap(Math.round(target));
        dots.forEach((dot, i) => {
            dot.classList.toggle("is-active", i === active);
            if (i === active) {
                dot.setAttribute("aria-current", "step");
            } else {
                dot.removeAttribute("aria-current");
            }
        });
        details.forEach((detail, i) => {
            detail.classList.toggle("is-active", i === active);
            detail.setAttribute("aria-hidden", String(i !== active));
        });
    }

    function turnTo(value) {
        target = value;
        showActive();
        if (!frame) frame = requestAnimationFrame(animate);
    }

    // Go to a card index by the shortest way around the ring
    function goTo(index) {
        let diff = wrap(index - Math.round(target));
        if (diff > count / 2) diff -= count;
        turnTo(Math.round(target) + diff);
    }

    /* ---------- Autoplay ---------- */
    let timer = null;
    let userPaused = reduceMotion;
    let hovering = false;
    let inView = false;

    function canPlay() {
        return !userPaused && !hovering && inView;
    }

    function restartTimer() {
        clearInterval(timer);
        if (canPlay()) timer = setInterval(() => turnTo(Math.round(target) + 1), INTERVAL);
    }

    function setToggleState() {
        toggleButton.classList.toggle("is-paused", userPaused);
        toggleButton.setAttribute("aria-label", userPaused ? "Play process steps" : "Pause process steps");
    }

    toggleButton.addEventListener("click", () => {
        userPaused = !userPaused;
        setToggleState();
        restartTimer();
    });

    stage.addEventListener("mouseenter", () => { hovering = true; restartTimer(); });
    stage.addEventListener("mouseleave", () => { hovering = false; restartTimer(); });

    new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        restartTimer();
    }, { threshold: 0.3 }).observe(stage);

    /* ---------- Manual controls (any screen size); each one resets the timer ---------- */
    function manual(action) {
        action();
        restartTimer();
    }

    section.querySelector("[data-process='next']").addEventListener("click", () => manual(() => turnTo(Math.round(target) + 1)));
    section.querySelector("[data-process='prev']").addEventListener("click", () => manual(() => turnTo(Math.round(target) - 1)));
    dots.forEach((dot, i) => dot.addEventListener("click", () => manual(() => goTo(i))));

    // Swipe on touch screens or drag with a mouse; a plain click on a side card brings it forward
    let dragStartX = null;
    let dragStartY = null;
    let dragged = false;

    stage.addEventListener("pointerdown", (event) => {
        dragStartX = event.clientX;
        dragStartY = event.clientY;
        dragged = false;
    });

    stage.addEventListener("pointerup", (event) => {
        if (dragStartX === null) return;
        const dx = event.clientX - dragStartX;
        const dy = event.clientY - dragStartY;
        dragStartX = null;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
            dragged = true;
            manual(() => turnTo(Math.round(target) + (dx < 0 ? 1 : -1)));
        }
    });

    stage.addEventListener("pointercancel", () => { dragStartX = null; });

    cards.forEach((card, i) => card.addEventListener("click", () => {
        if (!dragged) manual(() => goTo(i));
    }));

    window.addEventListener("resize", () => layout(current));
    setToggleState();
    showActive();
    layout(0);
})();

/* ---------- Contact form (general questions) ---------- */
(function () {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const success = document.getElementById("contact-success");
    const successName = document.getElementById("contact-success-name");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Show the browser's message on the first field that needs attention
        const invalid = [...form.elements].find((field) => field.willValidate && !field.checkValidity());
        if (invalid) {
            invalid.reportValidity();
            return;
        }

        successName.textContent = document.getElementById("contact-first").value.trim() || "neighbor";
        form.hidden = true;
        success.hidden = false;
        success.focus();
    });
})();
