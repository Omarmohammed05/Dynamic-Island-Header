
document.addEventListener('DOMContentLoaded', () => {

    // --- Clock Functionality ---
    const clockElement = document.getElementById('clock');

    function updateClock() {
        if (!clockElement) return; // Don't run if the clock element isn't on the page
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;

        clockElement.textContent = `${hours}:${minutesStr} ${ampm}`;
    }

    // Update the clock immediately and then every second
    updateClock();
    setInterval(updateClock, 1000);

    // --- Scroll Indicator Functionality ---
    const scrollCircle = document.querySelector('.scroll-indicator-circle');
    
    // Don't run if the scroll indicator isn't on the page
    if (scrollCircle) {
        // The radius is 10, so the circumference is 2 * Math.PI * 10
        const circumference = 2 * Math.PI * 10; 

        window.addEventListener('scroll', () => {
            // How far the user has scrolled
            const scrollTop = window.scrollY;
            // The total scrollable height (prevent division by zero)
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            
            if (docHeight > 0) {
                // The percentage scrolled (0 to 1)
                const scrollPercent = scrollTop / docHeight;
                
                // The length of the stroke to draw
                const drawLength = scrollPercent * circumference;
                
                // Update the SVG circle's dash offset
                // The offset starts at max (circumference) and goes to 0
                scrollCircle.style.strokeDashoffset = circumference - drawLength;
            }
        });
    }
});
