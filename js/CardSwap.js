class CardSwap {
    constructor(container, options = {}) {
        this.container = container;
        this.cards = Array.from(container.querySelectorAll('.project-card'));
        this.total = this.cards.length;

        this.options = {
            width: options.width || 500,
            height: options.height || 400,
            cardDistance: options.cardDistance || 60,
            verticalDistance: options.verticalDistance || 70,
            delay: options.delay || 5000,
            pauseOnHover: options.pauseOnHover || false,
            skewAmount: options.skewAmount || 6,
            easing: options.easing || 'elastic'
        };

        this.config = this.options.easing === 'elastic'
            ? {
                ease: 'elastic.out(0.6,0.9)',
                durDrop: 2,
                durMove: 2,
                durReturn: 2,
                promoteOverlap: 0.9,
                returnDelay: 0.05
            }
            : {
                ease: 'power1.inOut',
                durDrop: 0.8,
                durMove: 0.8,
                durReturn: 0.8,
                promoteOverlap: 0.45,
                returnDelay: 0.2
            };

        this.order = Array.from({ length: this.total }, (_, i) => i);
        this.tl = null;
        this.interval = null;

        if (this.total > 0) {
            this.init();
        }
    }

    makeSlot(i) {
        const { cardDistance, verticalDistance } = this.options;
        return {
            x: i * cardDistance,
            y: -i * verticalDistance,
            z: -i * cardDistance * 1.5,
            zIndex: this.total - i
        };
    }

    placeNow(el, slot) {
        gsap.set(el, {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            xPercent: -50,
            yPercent: -50,
            skewY: this.options.skewAmount,
            transformOrigin: 'center center',
            zIndex: slot.zIndex,
            force3D: true
        });
    }

    init() {
        // Initial placement
        this.cards.forEach((card, i) => {
            this.placeNow(card, this.makeSlot(i));
        });

        // Start swap interval
        this.interval = setInterval(() => this.swap(), this.options.delay);

        if (this.options.pauseOnHover) {
            this.container.addEventListener('mouseenter', () => {
                if (this.tl) this.tl.pause();
                clearInterval(this.interval);
            });
            this.container.addEventListener('mouseleave', () => {
                if (this.tl) this.tl.play();
                this.interval = setInterval(() => this.swap(), this.options.delay);
            });
        }
    }

    swap() {
        if (this.order.length < 2) return;

        const [front, ...rest] = this.order;
        const elFront = this.cards[front];
        this.tl = gsap.timeline();

        // Move front card down
        this.tl.to(elFront, {
            y: '+=500',
            duration: this.config.durDrop,
            ease: this.config.ease
        });

        // Promote other cards forward
        this.tl.addLabel('promote', `-=${this.config.durDrop * this.config.promoteOverlap}`);

        rest.forEach((idx, i) => {
            const el = this.cards[idx];
            const slot = this.makeSlot(i);
            this.tl.set(el, { zIndex: slot.zIndex }, 'promote');
            this.tl.to(el, {
                x: slot.x,
                y: slot.y,
                z: slot.z,
                duration: this.config.durMove,
                ease: this.config.ease
            }, `promote+=${i * 0.15}`);
        });

        // Move old front card to the back
        const backSlot = this.makeSlot(this.total - 1);
        this.tl.addLabel('return', `promote+=${this.config.durMove * this.config.returnDelay}`);

        this.tl.call(() => {
            gsap.set(elFront, { zIndex: backSlot.zIndex });
        }, null, 'return');

        this.tl.to(elFront, {
            x: backSlot.x,
            y: backSlot.y,
            z: backSlot.z,
            duration: this.config.durReturn,
            ease: this.config.ease
        }, 'return');

        this.tl.call(() => {
            this.order = [...rest, front];
        });
    }
}
