document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.personal-gallery, .personal-moments').forEach((gallery) => {
        const controls = document.createElement('div');
        controls.className = 'personal-gallery-controls';

        const makeButton = (direction, label, icon) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.setAttribute('aria-label', label);
            button.innerHTML = icon;
            button.addEventListener('click', () => {
                gallery.scrollBy({ left: direction * gallery.clientWidth * 0.8, behavior: 'smooth' });
            });
            controls.appendChild(button);
            return button;
        };

        const previous = makeButton(-1, 'Previous photos', '&larr;');
        const next = makeButton(1, 'Next photos', '&rarr;');
        gallery.insertAdjacentElement('afterend', controls);

        const updateButtons = () => {
            previous.disabled = gallery.scrollLeft <= 1;
            next.disabled = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 1;
            controls.hidden = gallery.scrollWidth <= gallery.clientWidth + 1;
        };

        gallery.addEventListener('scroll', updateButtons, { passive: true });
        window.addEventListener('resize', updateButtons);
        gallery.querySelectorAll('img').forEach((img) => img.addEventListener('load', updateButtons));
        updateButtons();
    });
});
