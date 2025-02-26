document.addEventListener('DOMContentLoaded', function () {
    // Initialize Materialize components
    initializeMaterializeComponents();
    
    // Initialize theme switcher
    initializeThemeSwitcher();
    
    // Add animations to elements
    initializeAnimations();
    
    // Add progress indicators to goals
    addProgressIndicators();
    
    // Initialize toast notifications for actions
    initializeToastNotifications();
    
    // Initialize stats counters
    initializeCounters();
    
    // Initialize scroll effects
    initializeScrollEffects();
});

// Initialize all Materialize components
function initializeMaterializeComponents() {
    // Initialize modals with custom options
    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals, {
        opacity: 0.7,
        inDuration: 300,
        outDuration: 200,
        dismissible: true,
        startingTop: '10%',
        endingTop: '10%'
    });
    
    // Initialize selects
    const selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);
    
    // Initialize sidenavs with custom options
    const sidenavs = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavs, {
        edge: 'right',
        draggable: true,
        inDuration: 250,
        outDuration: 200
    });
    
    // Initialize dropdowns with custom options
    const dropdowns = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdowns, {
        coverTrigger: false,
        constrainWidth: false,
        alignment: 'left',
        inDuration: 150,
        outDuration: 100
    });
    
    // Initialize tooltips with custom options
    const tooltips = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltips, {
        enterDelay: 200,
        exitDelay: 100,
        position: 'bottom',
        html: null
    });
    
    // Initialize tabs if they exist
    const tabs = document.querySelectorAll('.tabs');
    if (tabs.length > 0) {
        M.Tabs.init(tabs, {
            swipeable: true,
            responsiveThreshold: Infinity
        });
    }
    
    // Initialize collapsibles if they exist
    const collapsibles = document.querySelectorAll('.collapsible');
    if (collapsibles.length > 0) {
        M.Collapsible.init(collapsibles);
    }
    
    // Initialize CKEditor if the element exists
    if (document.querySelector('#body')) {
        CKEDITOR.replace('body', {
            plugins: 'wysiwygarea, toolbar, basicstyles, link, list, format, table',
            toolbar: [
                { name: 'styles', items: ['Format'] },
                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
                { name: 'paragraph', items: ['NumberedList', 'BulletedList'] },
                { name: 'links', items: ['Link', 'Unlink'] },
                { name: 'insert', items: ['Table'] }
            ]
        });
    }
}

// Theme switcher functionality
function initializeThemeSwitcher() {
    const themeToggle = document.querySelector('#theme-toggle');
    const mobileThemeToggle = document.querySelector('#theme-toggle-mobile');
    
    if (themeToggle) {
        // Check for saved theme preference or prefer-color-scheme
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
            if (mobileThemeToggle) mobileThemeToggle.checked = true;
        }
        
        // Add event listener for theme toggle
        themeToggle.addEventListener('change', function(e) {
            toggleTheme(e.target.checked);
        });
        
        // Add event listener for system preference changes
        prefersDarkScheme.addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                toggleTheme(e.matches);
            }
        });
        
        // Initialize theme icon
        updateThemeIcon(themeToggle.checked);
    }
}

// Toggle theme function
function toggleTheme(isDark) {
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
    
    updateThemeIcon(isDark);
    
    // Sync mobile toggle if it exists
    const mobileToggle = document.querySelector('#theme-toggle-mobile');
    if (mobileToggle) {
        mobileToggle.checked = isDark;
    }
    
    // Add transition class to body for smooth theme change
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 1000);
}

// Function to update theme icon
function updateThemeIcon(isDark) {
    const themeIcons = document.querySelectorAll('.theme-icon');
    themeIcons.forEach(icon => {
        if (isDark) {
            icon.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            icon.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

// Initialize animations
function initializeAnimations() {
    // Animate goal cards with staggered effect
    const goalCards = document.querySelectorAll('.goal-body-box');
    if (goalCards.length > 0) {
        animateGoalCards(goalCards);
    }
    
    // Animate stat cards
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length > 0) {
        animateStatCards(statCards);
    }
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn, .btn-large, .btn-floating');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('scale-effect');
        });
        button.addEventListener('mouseleave', function() {
            this.classList.remove('scale-effect');
        });
    });
}

// Function to animate goal cards with staggered effect
function animateGoalCards(cards) {
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 100 * index);
    });
}

// Function to animate stat cards
function animateStatCards(cards) {
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in-up');
        }, 150 * index);
    });
}

// Function to add progress indicators to goals
function addProgressIndicators() {
    const goals = document.querySelectorAll('.goal-item');
    goals.forEach(goal => {
        const status = goal.getAttribute('data-status');
        const category = goal.getAttribute('data-category') || 'default';
        
        if (status) {
            const progressContainer = document.createElement('div');
            progressContainer.className = `progress ${category}`;
            
            const progressBar = document.createElement('div');
            
            let progressValue = 0;
            switch(status) {
                case 'complete':
                    progressValue = 100;
                    break;
                case 'in-progress':
                    progressValue = goal.getAttribute('data-progress') || 50;
                    break;
                case 'not-started':
                    progressValue = 0;
                    break;
                default:
                    progressValue = 0;
            }
            
            progressBar.className = 'determinate';
            progressBar.style.width = `${progressValue}%`;
            
            progressContainer.appendChild(progressBar);
            goal.appendChild(progressContainer);
            
            // Add progress text
            const progressText = document.createElement('span');
            progressText.className = 'progress-text';
            progressText.textContent = `${progressValue}%`;
            goal.appendChild(progressText);
        }
    });
}

// Function to initialize toast notifications
function initializeToastNotifications() {
    // Show toast on goal creation/update/deletion
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    
    if (action) {
        let toastMessage = '';
        let toastClass = '';
        let icon = '';
        
        switch(action) {
            case 'created':
                toastMessage = 'Goal created successfully!';
                toastClass = 'success';
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'updated':
                toastMessage = 'Goal updated successfully!';
                toastClass = 'success';
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'deleted':
                toastMessage = 'Goal deleted successfully!';
                toastClass = 'info';
                icon = '<i class="fas fa-info-circle"></i>';
                break;
            case 'error':
                toastMessage = 'An error occurred. Please try again.';
                toastClass = 'error';
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
        }
        
        if (toastMessage) {
            M.toast({
                html: `${icon} ${toastMessage}`,
                classes: `rounded ${toastClass}`,
                displayLength: 3000
            });
        }
    }
    
    // Add event listeners for action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            if (action) {
                let toastMessage = '';
                let toastClass = '';
                let icon = '';
                
                switch(action) {
                    case 'edit':
                        toastMessage = 'Editing goal...';
                        toastClass = 'info';
                        icon = '<i class="fas fa-edit"></i>';
                        break;
                    case 'delete':
                        toastMessage = 'Deleting goal...';
                        toastClass = 'warning';
                        icon = '<i class="fas fa-trash-alt"></i>';
                        break;
                    case 'complete':
                        toastMessage = 'Marking goal as complete...';
                        toastClass = 'success';
                        icon = '<i class="fas fa-check-circle"></i>';
                        break;
                    default:
                        toastMessage = `${action} action initiated`;
                        toastClass = 'info';
                        icon = '<i class="fas fa-info-circle"></i>';
                }
                
                M.toast({
                    html: `${icon} ${toastMessage}`,
                    classes: `rounded ${toastClass}`,
                    displayLength: 2000
                });
            }
        });
    });
}

// Function to initialize counters
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Start counter when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
}

// Function to initialize scroll effects
function initializeScrollEffects() {
    // Add scroll-triggered animations to elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Add parallax effect to header images
    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length > 0) {
        M.Parallax.init(parallaxElements);
    }
    
    // Add scroll-to-top button functionality
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Add CSS for new animations and effects
document.head.insertAdjacentHTML('beforeend', `
<style>
    .theme-transition {
        transition: background-color 0.5s ease, color 0.5s ease;
    }
    
    .scale-effect {
        transform: scale(1.05);
    }
    
    .fade-in-up {
        animation: fadeInUp 0.5s forwards;
    }
    
    .progress-text {
        display: block;
        text-align: right;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        color: var(--text-light-color);
    }
    
    .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s, transform 0.3s;
        z-index: 900;
    }
    
    .scroll-top-btn.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
`);

// Add scroll-to-top button to the page
document.body.insertAdjacentHTML('beforeend', `
<div class="scroll-top-btn">
    <i class="fas fa-arrow-up"></i>
</div>
`);
