// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing components...');
    
    try {
        // Register service worker for PWA support
        registerServiceWorker();
        
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
        
        // Initialize weekly progress chart if it exists
        initializeWeeklyChart();
        
        console.log('All components initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
        // Show error toast to user
        if (typeof M !== 'undefined' && M.toast) {
            M.toast({html: 'Something went wrong. Try refreshing the page.', classes: 'red'});
        }
    }
});

// Register service worker for PWA functionality
function registerServiceWorker() {
    console.log('Registering service worker...');
    
    try {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js')
                    .then(registration => {
                        console.log('Service Worker registered with scope:', registration.scope);
                        
                        // Check for updates
                        registration.addEventListener('updatefound', () => {
                            const newWorker = registration.installing;
                            console.log('Service Worker update found!');
                            
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    // New content is available, show refresh notification
                                    if (typeof M !== 'undefined' && M.toast) {
                                        const toast = M.toast({
                                            html: '<span>New version available!</span><button class="btn-flat toast-action refresh-btn">Refresh</button>',
                                            displayLength: 0 // Infinite duration
                                        });
                                        
                                        // Add event listener to refresh button
                                        document.querySelector('.refresh-btn').addEventListener('click', () => {
                                            newWorker.postMessage({ action: 'skipWaiting' });
                                            window.location.reload();
                                        });
                                    }
                                }
                            });
                        });
                    })
                    .catch(error => {
                        console.error('Service Worker registration failed:', error);
                    });
                
                // Handle service worker updates
                let refreshing = false;
                navigator.serviceWorker.addEventListener('controllerchange', () => {
                    if (!refreshing) {
                        refreshing = true;
                        window.location.reload();
                    }
                });
            });
            
            // Handle offline/online status changes
            window.addEventListener('online', () => {
                console.log('App is online');
                if (typeof M !== 'undefined' && M.toast) {
                    M.toast({html: 'You are back online!', classes: 'green'});
                }
            });
            
            window.addEventListener('offline', () => {
                console.log('App is offline');
                if (typeof M !== 'undefined' && M.toast) {
                    M.toast({html: 'You are offline. Some features may be limited.', classes: 'orange'});
                }
            });
        } else {
            console.log('Service Workers not supported in this browser');
        }
    } catch (error) {
        console.error('Error registering service worker:', error);
        // Non-critical error, don't throw
    }
}

// Initialize all Materialize components
function initializeMaterializeComponents() {
    console.log('Initializing Materialize components...');
    
    try {
        // Check if Materialize is loaded
        if (typeof M === 'undefined') {
            console.error('Materialize is not loaded');
            return;
        }
        
        // Initialize modals with custom options
        const modals = document.querySelectorAll('.modal');
        if (modals.length > 0) {
            M.Modal.init(modals, {
                opacity: 0.7,
                inDuration: 300,
                outDuration: 200,
                dismissible: true,
                startingTop: '10%',
                endingTop: '10%'
            });
        }
        
        // Initialize selects
        const selects = document.querySelectorAll('select');
        if (selects.length > 0) {
            M.FormSelect.init(selects);
        }
        
        // Initialize sidenavs with custom options
        const sidenavs = document.querySelectorAll('.sidenav');
        if (sidenavs.length > 0) {
            M.Sidenav.init(sidenavs, {
                edge: 'right',
                draggable: true,
                inDuration: 250,
                outDuration: 200
            });
        }
        
        // Initialize dropdowns with custom options
        const dropdowns = document.querySelectorAll('.dropdown-trigger');
        if (dropdowns.length > 0) {
            M.Dropdown.init(dropdowns, {
                coverTrigger: false,
                constrainWidth: false,
                alignment: 'left',
                inDuration: 150,
                outDuration: 100
            });
        }
        
        // Initialize tooltips with custom options
        const tooltips = document.querySelectorAll('.tooltipped');
        if (tooltips.length > 0) {
            M.Tooltip.init(tooltips, {
                enterDelay: 200,
                exitDelay: 100,
                position: 'bottom',
                html: null
            });
        }
        
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
        
        console.log('Materialize components initialized');
    } catch (error) {
        console.error('Error initializing Materialize components:', error);
        throw error;
    }
    
    // Initialize CKEditor if it exists and CKEDITOR is defined
    try {
        if (typeof CKEDITOR !== 'undefined' && document.querySelector('#body')) {
            console.log('Initializing CKEditor...');
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
            console.log('CKEditor initialized');
        }
    } catch (error) {
        console.error('Error initializing CKEditor (non-critical):', error);
        // Don't throw error for CKEditor as it's not critical
    }
}

// Theme switcher functionality
function initializeThemeSwitcher() {
    console.log('Initializing theme switcher...');
    
    try {
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
            
            console.log('Theme switcher initialized');
        } else {
            console.log('Theme toggle not found, skipping theme switcher initialization');
        }
    } catch (error) {
        console.error('Error initializing theme switcher:', error);
        throw error;
    }
}

// Toggle theme function
function toggleTheme(isDark) {
    try {
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
        
        console.log('Theme toggled to:', isDark ? 'dark' : 'light');
    } catch (error) {
        console.error('Error toggling theme:', error);
    }
}

// Function to update theme icon
function updateThemeIcon(isDark) {
    try {
        const themeIcons = document.querySelectorAll('.theme-icon');
        themeIcons.forEach(icon => {
            if (isDark) {
                icon.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                icon.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    } catch (error) {
        console.error('Error updating theme icon:', error);
    }
}

// Initialize animations
function initializeAnimations() {
    console.log('Initializing animations...');
    
    try {
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
        
        console.log('Animations initialized');
    } catch (error) {
        console.error('Error initializing animations:', error);
        throw error;
    }
}

// Function to animate goal cards with staggered effect
function animateGoalCards(cards) {
    try {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, 100 * index);
        });
    } catch (error) {
        console.error('Error animating goal cards:', error);
    }
}

// Function to animate stat cards
function animateStatCards(cards) {
    try {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in-up');
            }, 150 * index);
        });
    } catch (error) {
        console.error('Error animating stat cards:', error);
    }
}

// Function to add progress indicators to goals
function addProgressIndicators() {
    console.log('Adding progress indicators...');
    
    try {
        const goals = document.querySelectorAll('.goal-item');
        if (goals.length === 0) {
            console.log('No goal items found, skipping progress indicators');
            return;
        }
        
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
        
        console.log('Progress indicators added');
    } catch (error) {
        console.error('Error adding progress indicators:', error);
        // Non-critical feature, don't throw
    }
}

// Initialize toast notifications
function initializeToastNotifications() {
    console.log('Initializing toast notifications...');
    
    try {
        // Check if Materialize is loaded
        if (typeof M === 'undefined' || !M.toast) {
            console.error('Materialize toast is not available');
            return;
        }
        
        // Show welcome toast if user just logged in
        const authSuccess = getCookie('auth_success');
        if (authSuccess) {
            setTimeout(() => {
                M.toast({
                    html: '<i class="fas fa-check-circle"></i> Successfully logged in!',
                    classes: 'green',
                    displayLength: 3000
                });
            }, 1000);
            
            // Clear the cookie
            document.cookie = 'auth_success=; Max-Age=0; path=/;';
        }
        
        // Add event listeners for action buttons
        const actionButtons = document.querySelectorAll('[data-action]');
        actionButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const action = this.getAttribute('data-action');
                
                if (action === 'delete') {
                    // Confirm before delete
                    if (!confirm('Are you sure you want to delete this item?')) {
                        e.preventDefault();
                        return;
                    }
                    
                    M.toast({
                        html: '<i class="fas fa-trash-alt"></i> Item deleted',
                        classes: 'red',
                        displayLength: 3000
                    });
                } else if (action === 'edit') {
                    // No confirmation needed for edit
                } else if (action === 'complete') {
                    M.toast({
                        html: '<i class="fas fa-check-circle"></i> Goal completed!',
                        classes: 'green',
                        displayLength: 3000
                    });
                }
            });
        });
        
        // Initialize refresh tip button
        const refreshTipBtn = document.querySelector('.refresh-tip');
        if (refreshTipBtn) {
            refreshTipBtn.addEventListener('click', function() {
                refreshHealthTip();
            });
        }
        
        console.log('Toast notifications initialized');
    } catch (error) {
        console.error('Error initializing toast notifications:', error);
        // Non-critical feature, don't throw
    }
}

// Function to get cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Initialize counters
function initializeCounters() {
    console.log('Initializing counters...');
    
    try {
        const counters = document.querySelectorAll('.counter');
        if (counters.length === 0) {
            console.log('No counters found, skipping counter initialization');
            return;
        }
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 1500; // ms
            const steps = 50;
            const stepValue = target / steps;
            let current = 0;
            
            const updateCounter = () => {
                current += stepValue;
                if (current > target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, duration / steps);
                }
            };
            
            // Start the counter animation when the element is in viewport
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
        
        console.log('Counters initialized');
    } catch (error) {
        console.error('Error initializing counters:', error);
        // Non-critical feature, don't throw
    }
}

// Initialize scroll effects
function initializeScrollEffects() {
    console.log('Initializing scroll effects...');
    
    try {
        // Animate elements on scroll
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        if (animateElements.length === 0) {
            console.log('No animate-on-scroll elements found, skipping scroll effects');
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
        
        // Add scroll-to-top button
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'btn-floating btn-large scroll-top-btn';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollTopBtn);
        
        // Show/hide scroll-to-top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        console.log('Scroll effects initialized');
    } catch (error) {
        console.error('Error initializing scroll effects:', error);
        // Non-critical feature, don't throw
    }
}

// Initialize weekly progress chart
function initializeWeeklyChart() {
    console.log('Initializing weekly chart...');
    
    try {
        const chartCanvas = document.getElementById('weeklyProgressChart');
        if (!chartCanvas) {
            console.log('Chart canvas not found, skipping chart initialization');
            return;
        }
        
        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not loaded');
            
            // Create a placeholder for the chart
            const ctx = chartCanvas.getContext('2d');
            ctx.font = '16px Inter';
            ctx.fillStyle = '#666';
            ctx.textAlign = 'center';
            ctx.fillText('Chart could not be loaded', chartCanvas.width / 2, chartCanvas.height / 2);
            
            // Add a script tag to load Chart.js
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = function() {
                console.log('Chart.js loaded, retrying chart initialization');
                createWeeklyChart(chartCanvas);
            };
            document.head.appendChild(script);
            return;
        }
        
        createWeeklyChart(chartCanvas);
        console.log('Weekly chart initialized');
    } catch (error) {
        console.error('Error initializing weekly chart:', error);
        // Non-critical feature, don't throw
    }
}

// Create weekly progress chart
function createWeeklyChart(chartCanvas) {
    try {
        // Sample data for the chart
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const fitnessData = [65, 70, 68, 75, 72, 80, 78];
        const nutritionData = [70, 75, 72, 80, 85, 82, 88];
        
        // Get theme colors
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#4361ee';
        const successColor = getComputedStyle(document.documentElement).getPropertyValue('--success-color').trim() || '#2ecc71';
        
        // Create the chart
        new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: days,
                datasets: [
                    {
                        label: 'Fitness',
                        data: fitnessData,
                        borderColor: primaryColor,
                        backgroundColor: primaryColor + '20',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Nutrition',
                        data: nutritionData,
                        borderColor: successColor,
                        backgroundColor: successColor + '20',
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating weekly chart:', error);
        
        // Create a fallback message
        const ctx = chartCanvas.getContext('2d');
        ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
        ctx.font = '16px Inter';
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.fillText('Chart could not be loaded', chartCanvas.width / 2, chartCanvas.height / 2);
    }
}

// Function to refresh health tip
function refreshHealthTip() {
    try {
        const tipContent = document.querySelector('.tip-content p');
        if (!tipContent) return;
        
        const tips = [
            "Staying hydrated is crucial for overall health. Aim to drink at least 8 glasses of water daily to maintain energy levels and support bodily functions.",
            "Regular physical activity can boost your mood and reduce stress. Even a 30-minute walk each day can make a significant difference.",
            "Prioritize sleep for better health. Adults should aim for 7-9 hours of quality sleep each night.",
            "Include a variety of colorful fruits and vegetables in your diet to ensure you're getting a wide range of nutrients.",
            "Take short breaks during work to stretch and move around. This can improve circulation and reduce muscle tension.",
            "Practice mindfulness or meditation to reduce stress and improve mental clarity.",
            "Limit processed foods and focus on whole, nutrient-dense options for better health outcomes.",
            "Regular strength training helps maintain muscle mass and bone density as you age.",
            "Don't forget about flexibility exercises like yoga or simple stretching to maintain mobility.",
            "Social connections are important for mental health. Make time to connect with friends and family regularly."
        ];
        
        // Get a random tip that's different from the current one
        let currentTip = tipContent.textContent;
        let newTip;
        
        do {
            newTip = tips[Math.floor(Math.random() * tips.length)];
        } while (newTip === currentTip && tips.length > 1);
        
        // Animate the tip change
        tipContent.style.opacity = 0;
        
        setTimeout(() => {
            tipContent.textContent = newTip;
            tipContent.style.opacity = 1;
        }, 300);
        
        // Show a toast notification
        if (typeof M !== 'undefined' && M.toast) {
            M.toast({
                html: '<i class="fas fa-lightbulb"></i> New health tip loaded!',
                classes: 'blue',
                displayLength: 2000
            });
        }
    } catch (error) {
        console.error('Error refreshing health tip:', error);
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
