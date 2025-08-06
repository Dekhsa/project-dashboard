// Project Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Project Dashboard loaded successfully!');
    
    // Test API connection
    fetch('/api/health')
        .then(response => response.json())
        .then(data => {
            console.log('API Status:', data);
        })
        .catch(error => {
            console.error('API connection failed:', error);
        });
    
    // Add some interactivity to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Card clicked:', this.querySelector('h2').textContent);
        });
    });
});
