// ===== DOM ELEMENTS =====

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// ===== NAVIGATION =====

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        updateActiveNav();
    });
});

window.addEventListener('scroll', updateActiveNav);

function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

// ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.tracker-card, .energy-card, .macro-card, .pcos-card, .impact-card, .sign-card, .toolkit-card, .medicine-card, .crisis-card, .resource-card, .day-card');
    elementsToObserve.forEach(el => observer.observe(el));
});

// ===== SECTION 1: DASHBOARD TRACKER =====

// Workout Dots
const workoutDots = document.getElementById('workout-dots');
if (workoutDots) {
    const dots = workoutDots.querySelectorAll('.dot');
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            dot.classList.toggle('active');
        });
    });
}

// Water Drops
function initWaterDrops() {
    const waterDropsContainer = document.getElementById('water-drops');
    if (!waterDropsContainer) return;

    waterDropsContainer.innerHTML = '';
    let waterCount = 0;

    for (let i = 0; i < 8; i++) {
        const drop = document.createElement('div');
        drop.className = 'water-drop';
        drop.addEventListener('click', () => {
            drop.classList.toggle('filled');
            updateWaterCount();
        });
        waterDropsContainer.appendChild(drop);
    }

    function updateWaterCount() {
        waterCount = waterDropsContainer.querySelectorAll('.water-drop.filled').length;
        document.getElementById('water-count').textContent = waterCount;
    }
}

initWaterDrops();

// Calorie Input
document.getElementById('calorie-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const value = parseInt(e.target.value);
        if (value) {
            const ring = document.querySelector('.ring-progress');
            const currentPercentage = parseInt(ring.style.getPropertyValue('--percentage')) || 0;
            const newPercentage = Math.min(100, currentPercentage + Math.floor((value / 2000) * 100));
            ring.style.setProperty('--percentage', newPercentage);
            e.target.value = '';
        }
    }
});

// Weight Input
document.getElementById('weight-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const weight = parseFloat(e.target.value);
        if (weight && !isNaN(weight)) {
            // Update sparkline (simple update)
            e.target.value = '';
        }
    }
});

// Workout Logger
const loggerForm = document.getElementById('logger-form');
const sessionLog = document.getElementById('session-log');
const clearSessionBtn = document.getElementById('clear-session');

loggerForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const exercise = document.getElementById('exercise-name').value;
    const sets = document.getElementById('exercise-sets').value;
    const reps = document.getElementById('exercise-reps').value;
    const weight = document.getElementById('exercise-weight').value || '-';
    const duration = document.getElementById('exercise-duration').value;

    if (exercise && sets && reps && duration) {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `<strong>${exercise}</strong> • ${sets}×${reps} @ ${weight}kg • ${duration}min`;
        sessionLog.appendChild(logEntry);

        loggerForm.reset();
    }
});

clearSessionBtn?.addEventListener('click', () => {
    sessionLog.innerHTML = '';
});

// BMI Calculator
document.getElementById('bmi-calculate')?.addEventListener('click', () => {
    const height = parseFloat(document.getElementById('bmi-height').value);
    const weight = parseFloat(document.getElementById('bmi-weight').value);
    const age = parseInt(document.getElementById('bmi-age').value);

    if (height && weight && age) {
        const bmi = weight / ((height / 100) ** 2);
        const bmiResult = document.getElementById('bmi-result');
        const bmiValue = document.getElementById('bmi-value');
        const bmiCategory = document.getElementById('bmi-category');

        let category = '';
        let categoryColor = '';

        if (bmi < 18.5) {
            category = 'Underweight';
            categoryColor = '#A8C5B5';
        } else if (bmi < 25) {
            category = 'Normal Weight';
            categoryColor = '#5C8C78';
        } else if (bmi < 30) {
            category = 'Overweight';
            categoryColor = '#F5A623';
        } else {
            category = 'Obese';
            categoryColor = '#FF6B6B';
        }

        bmiValue.textContent = bmi.toFixed(1);
        bmiCategory.textContent = category;
        bmiCategory.style.color = categoryColor;
        bmiResult.style.display = 'block';
    }
});

// ===== SECTION 2: FITNESS BASICS =====

// Quiz Section
function initQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;

    const questions = [
        {
            question: 'What is your primary fitness goal?',
            options: ['Build muscle', 'Lose weight', 'Improve endurance', 'General wellness']
        },
        {
            question: 'How active are you currently?',
            options: ['Sedentary', 'Lightly active', 'Moderately active', 'Very active']
        },
        {
            question: 'Any dietary preferences?',
            options: ['No restrictions', 'Vegetarian', 'High protein', 'Low carb']
        },
        {
            question: 'How many hours do you sleep per night?',
            options: ['Less than 6', '6-7 hours', '7-9 hours', 'More than 9']
        }
    ];

    const answers = {};

    questions.forEach((q, idx) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML = `<h4>${q.question}</h4><div class="quiz-options"></div>`;

        const optionsContainer = questionDiv.querySelector('.quiz-options');
        q.options.forEach((option, optIdx) => {
            const label = document.createElement('label');
            label.className = 'quiz-option';
            label.innerHTML = `<input type="radio" name="q${idx}" value="${option}"> ${option}`;
            label.addEventListener('change', () => {
                answers[`q${idx}`] = option;
            });
            optionsContainer.appendChild(label);
        });

        quizContainer.appendChild(questionDiv);
    });

    // Add Submit Button
    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn btn-primary';
    submitBtn.textContent = 'Get Personalized Recommendation';
    submitBtn.style.width = '100%';
    submitBtn.style.marginTop = '2rem';
    submitBtn.addEventListener('click', generateRecommendation);
    quizContainer.appendChild(submitBtn);

    function generateRecommendation() {
        if (Object.keys(answers).length < 4) {
            alert('Please answer all questions');
            return;
        }

        const recommendations = {
            'Build muscle': 'Focus on protein-rich meals and 3-4 strength sessions per week. Prioritize progressive overload.',
            'Lose weight': 'Create a modest calorie deficit with whole foods and combine cardio with strength training 4-5x weekly.',
            'Improve endurance': 'Gradually increase cardiovascular workouts to 150+ min/week. Include interval training 1-2x weekly.',
            'General wellness': 'Aim for 150 min moderate activity weekly, balanced macros, and consistent sleep. Rest days matter.',

            'Sedentary': 'Start with 30-min walks daily, then progress to mixed training.',
            'Lightly active': 'You\'re ready for structured workouts. Aim for 3-4 sessions weekly.',
            'Moderately active': 'Diversify your routine—mix strength, cardio, and flexibility.',
            'Very active': 'Focus on recovery, periodization, and preventing overtraining.',

            'No restrictions': 'You have flexibility—focus on whole, nutrient-dense foods.',
            'Vegetarian': 'Combine legumes, dairy, nuts, and seeds for complete protein.',
            'High protein': 'Excellent for muscle building. Aim for 1.6-2.2g per kg bodyweight.',
            'Low carb': 'Ensure adequate micronutrients and don\'t go too restrictive for performance.',

            'Less than 6': 'Prioritize sleep—it\'s as important as exercise. Aim for 7-9 hours nightly.',
            '6-7 hours': 'Good start, but try to consistently hit 7-9 hours for recovery.',
            '7-9 hours': 'Excellent! You\'re supporting your fitness gains with quality sleep.',
            'More than 9': 'Ensure you\'re not oversleeping; check energy levels throughout the day.'
        };

        const goal = answers.q0;
        const activity = answers.q1;
        const diet = answers.q2;
        const sleep = answers.q3;

        const customReco = `${recommendations[goal]} ${recommendations[activity]} ${recommendations[diet]} ${recommendations[sleep]}`;

        const resultDiv = document.getElementById('quiz-result');
        resultDiv.innerHTML = `
            <h4>Your Personalized Path</h4>
            <p>${customReco}</p>
        `;
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

initQuiz();

// Tab Switching
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabGroup = btn.closest('.tabs') || btn.parentElement;
            const allBtns = tabGroup.querySelectorAll('.tab-btn');
            const tabId = btn.getAttribute('data-tab');

            allBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Hide all content, show active
            const contentIds = Array.from(allBtns).map(b => b.getAttribute('data-tab'));
            contentIds.forEach(id => {
                const content = document.getElementById(id + '-content') || document.getElementById(id);
                if (content) content.style.display = 'none';
            });

            const activeContent = document.getElementById(tabId + '-content') || document.getElementById(tabId);
            if (activeContent) activeContent.style.display = 'block';
        });
    });
}

document.addEventListener('DOMContentLoaded', initTabs);

// ===== SECTION 4: STRESS & SUPPORT =====

// Box Breathing Animation
function initBoxBreathing() {
    const boxStep = document.querySelector('.box-step');
    if (!boxStep) return;

    const steps = ['Inhale', 'Hold', 'Exhale', 'Hold'];
    let stepIndex = 0;

    setInterval(() => {
        boxStep.textContent = steps[stepIndex % steps.length];
        stepIndex++;
    }, 4000);
}

initBoxBreathing();

// Journal Prompts
document.getElementById('more-prompts')?.addEventListener('click', (e) => {
    const extraPrompts = document.getElementById('extra-prompts');
    extraPrompts.style.display = extraPrompts.style.display === 'none' ? 'block' : 'none';
    e.target.textContent = e.target.textContent === 'See More Prompts' ? 'Show Less' : 'See More Prompts';
});

// PMR Accordion
function initPMRAccordion() {
    const pmrToggles = document.querySelectorAll('.pmr-toggle');
    pmrToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            toggle.classList.toggle('active');
            content.classList.toggle('show');
        });
    });
}

document.addEventListener('DOMContentLoaded', initPMRAccordion);

// ===== ACCESSIBILITY & ANIMATIONS =====

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Prevent layout shift on scroll
document.documentElement.style.scrollBehavior = 'smooth';

// Focus management
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Track page scroll for nav highlighting
window.addEventListener('load', updateActiveNav);
