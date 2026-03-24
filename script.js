// Sticky Navbar
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Chart.js Implementations
document.addEventListener('DOMContentLoaded', () => {
    
    // Bar Chart: User Awareness
    const ctxBar = document.getElementById('barChart').getContext('2d');
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Excellent', 'Good', 'Average', 'Poor'],
            datasets: [{
                label: '% of Users',
                data: [15, 35, 40, 10],
                backgroundColor: 'rgba(107, 142, 35, 0.7)',
                borderColor: 'rgba(107, 142, 35, 1)',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });

    // Pie Chart: Common Fraud Types
    const ctxPie = document.getElementById('pieChart').getContext('2d');
    new Chart(ctxPie, {
        type: 'doughnut',
        data: {
            labels: ['Phishing', 'OTP Fraud', 'Card Cloning', 'Fake Apps'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: [
                    '#556B2F', '#6B8E23', '#8A9A5B', '#BDB76B'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
});

// Browser-Based AI Fraud Prediction Logic (For GitHub Pages)
const fraudForm = document.getElementById('fraudForm');
const resultBox = document.getElementById('resultBox');

fraudForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Fetch values from the form
    const amount = parseFloat(document.getElementById('amount').value);
    const time = document.getElementById('time').value;
    const location = document.getElementById('location').value;
    const device = document.getElementById('device').value;

    // Show loading state
    resultBox.classList.remove('hidden', 'safe', 'fraud');
    resultBox.className = 'result-box';
    resultBox.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing transaction via in-browser model...';

    // Simulate network delay and AI processing
    setTimeout(() => {
        const hour = parseInt(time.split(':')[0]);
        let isFraud = false;
        let message = "Transaction Appears Safe.";

        // Rule 1: High amount, late night, unknown device
        if (amount > 50000 && (hour < 6 || hour > 22) && device === 'unknown') {
            isFraud = true;
            message = "Alert: High Probability of Fraud (High Amount, Unusual Hours, Unknown Device)!";
        } 
        // Rule 2: Unusually high amount
        else if (amount > 100000) {
            isFraud = true;
            message = "Alert: High Probability of Fraud (Unusually High Amount)!";
        } 
        // Rule 3: Random 15% chance to show fraud for demonstration purposes
        else if (Math.random() > 0.85) { 
            isFraud = true;
            message = "Alert: Suspicious Pattern Detected by Model.";
        }

        // Display results
        if (isFraud) {
            resultBox.className = 'result-box fraud';
            resultBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${message}`;
        } else {
            resultBox.className = 'result-box safe';
            resultBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
        }
    }, 1500); // 1.5 second delay
});
