document.addEventListener('DOMContentLoaded', function () {
    // Initialize Materialize components
    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    
    const selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);
    
    const sidenavs = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavs);
    
    const dropdowns = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdowns);
    
    const tooltips = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltips);
    
    // Initialize CKEditor if the element exists
    if (document.querySelector('#body')) {
        CKEDITOR.replace('body', {
            plugins: 'wysiwygarea, toolbar, basicstyles, link'
        });
    }
    
    // Theme switcher functionality
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        // Check for saved theme preference or prefer-color-scheme
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
        }
        
        // Add event listener for theme toggle
        themeToggle.addEventListener('change', function(e) {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateThemeIcon(true);
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                updateThemeIcon(false);
            }
        });
        
        // Initialize theme icon
        updateThemeIcon(themeToggle.checked);
    }
    
    // Add animation to goal cards
    const goalCards = document.querySelectorAll('.goal-body-box');
    if (goalCards.length > 0) {
        animateGoalCards(goalCards);
    }
    
    // Add progress indicators to goals
    addProgressIndicators();
    
    // Initialize toast notifications for actions
    initializeToastNotifications();
});

// Function to update theme icon
function updateThemeIcon(isDark) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        if (isDark) {
            themeIcon.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            themeIcon.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
}

// Function to animate goal cards with staggered effect
function animateGoalCards(cards) {
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 100 * index);
    });
}

// Function to add progress indicators to goals
function addProgressIndicators() {
    const goals = document.querySelectorAll('.goal-item');
    goals.forEach(goal => {
        const status = goal.getAttribute('data-status');
        if (status) {
            const progressContainer = document.createElement('div');
            progressContainer.className = 'progress';
            
            const progressBar = document.createElement('div');
            progressBar.className = status === 'complete' ? 'determinate' : 'determinate';
            progressBar.style.width = status === 'complete' ? '100%' : '50%';
            
            progressContainer.appendChild(progressBar);
            goal.appendChild(progressContainer);
        }
    });
}

// Function to initialize toast notifications
function initializeToastNotifications() {
    // Show toast on goal creation/update/deletion
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    
    if (action === 'created') {
        M.toast({html: 'Goal created successfully!', classes: 'rounded'});
    } else if (action === 'updated') {
        M.toast({html: 'Goal updated successfully!', classes: 'rounded'});
    } else if (action === 'deleted') {
        M.toast({html: 'Goal deleted successfully!', classes: 'rounded'});
    }
    
    // Add event listeners for action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            if (action) {
                M.toast({html: `${action} action initiated`, classes: 'rounded'});
            }
        });
    });
}
