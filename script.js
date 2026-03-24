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

// AI Fraud Prediction Dummy Logic (Ready for Flask backend)
const fraudForm = document.getElementById('fraudForm');
const resultBox = document.getElementById('resultBox');

fraudForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Fetch values
    const amount = document.getElementById('amount').value;
    const time = document.getElementById('time').value;
    const location = document.getElementById('location').value;
    const device = document.getElementById('device').value;

    /* Note for Backend Integration:
       Replace this setTimeout dummy logic with an actual fetch() call to your Flask API.
       Example:
       fetch('/api/predict', { method: 'POST', body: JSON.stringify({amount, time, location, device}) })
    */

    resultBox.classList.remove('hidden', 'safe', 'fraud');
    resultBox.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing via AI Model...';

    setTimeout(() => {
        // Dummy logic: Transactions over 100,000 late at night are flagged
        const hour = parseInt(time.split(':')[0]);
        let isFraud = false;

        if (amount > 50000 && (hour < 6 || hour > 22) && device === 'unknown') {
            isFraud = true;
        } else if (Math.random() > 0.8) { // 20% random chance to show fraud for demo
            isFraud = true;
        }

        if (isFraud) {
            resultBox.className = 'result-box fraud';
            resultBox.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Alert: High Probability of Fraud Detected!';
        } else {
            resultBox.className = 'result-box safe';
            resultBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> Transaction Appears Safe.';
        }
    }, 1500); // 1.5 second artificial delay for effect
});
