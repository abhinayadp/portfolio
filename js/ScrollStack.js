class ScrollStack {
    constructor(container, options = {}) {
        this.scroller = container;
        this.options = {
            itemDistance: options.itemDistance || 100,
            itemScale: options.itemScale || 0.03,
            itemStackDistance: options.itemStackDistance || 30,
            stackPosition: options.stackPosition || '20%',
            scaleEndPosition: options.scaleEndPosition || '10%',
            baseScale: options.baseScale || 0.85,
            rotationAmount: options.rotationAmount || 0,
            blurAmount: options.blurAmount || 0,
            useWindowScroll: options.useWindowScroll || false,
        };

        this.cards = [];
        this.cardData = [];
        this.lastScrollTop = -1;
        this.isUpdating = false;

        if (this.scroller) {
            this.init();
        }
    }

    // Pre-calculate positions to avoid layout thrashing during scroll
    cachePositions() {
        this.cards = Array.from(
            this.options.useWindowScroll
                ? document.querySelectorAll('.scroll-stack-card')
                : this.scroller.querySelectorAll('.scroll-stack-card')
        );

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Temporarily clear transforms to measure true positions
        this.cards.forEach(card => card.style.transform = 'none');

        this.cardData = this.cards.map((card, i) => {
            const rect = card.getBoundingClientRect();
            return {
                card: card,
                initialTop: rect.top + scrollTop,
                height: rect.height
            };
        });

        const endElement = this.options.useWindowScroll
            ? document.querySelector('.scroll-stack-end')
            : this.scroller.querySelector('.scroll-stack-end');

        if (endElement) {
            const endRect = endElement.getBoundingClientRect();
            this.endElementTop = endRect.top + scrollTop;
        } else {
            this.endElementTop = 0;
        }
    }

    parsePercentage(value, containerHeight) {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value);
    }

    updateCardTransforms(scrollTop) {
        const containerHeight = window.innerHeight;
        const stackPositionPx = this.parsePercentage(this.options.stackPosition, containerHeight);

        this.cardData.forEach((data, i) => {
            const pinStart = data.initialTop - stackPositionPx - this.options.itemStackDistance * i;
            const pinEnd = this.endElementTop - containerHeight / 2;

            let translateY = 0;
            let scale = 1;

            if (scrollTop >= pinStart) {
                if (scrollTop <= pinEnd) {
                    translateY = scrollTop - pinStart;
                } else {
                    translateY = pinEnd - pinStart;
                }

                const targetScale = this.options.baseScale + i * this.options.itemScale;
                // Simple linear scale for performance
                const scaleRange = 400; // px over which scaling happens
                const scaleProgress = Math.min(1, (scrollTop - pinStart) / scaleRange);
                scale = 1 - scaleProgress * (1 - targetScale);
            }

            data.card.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
        });
    }

    init() {
        this.cachePositions();

        // Setup global Lenis for the whole site
        if (!window.globalLenis) {
            window.globalLenis = new Lenis({
                duration: 1.0,
                lerp: 0.1, // Faster response
                smoothWheel: true,
                wheelMultiplier: 1.1,
            });

            const raf = (time) => {
                window.globalLenis.raf(time);
                requestAnimationFrame(raf);
            };
            requestAnimationFrame(raf);
        }

        window.globalLenis.on('scroll', (e) => {
            this.updateCardTransforms(e.animatedScroll || e.scroll);
        });

        // Handle resize
        window.addEventListener('resize', () => {
            this.cachePositions();
            this.updateCardTransforms(window.globalLenis.scroll);
        });

        // Run once
        this.updateCardTransforms(window.globalLenis.scroll);
    }
}
