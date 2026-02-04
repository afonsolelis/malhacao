// Custom JavaScript for the gym tracker

document.addEventListener('DOMContentLoaded', function() {
    // Handle form submissions with PUT and DELETE methods
    const forms = document.querySelectorAll('form[method="POST"]');
    
    forms.forEach(form => {
        const hiddenMethodInput = form.querySelector('input[name="_method"]');
        if (hiddenMethodInput && (hiddenMethodInput.value === 'PUT' || hiddenMethodInput.value === 'DELETE')) {
            // Add a confirmation dialog for delete forms
            if (hiddenMethodInput.value === 'DELETE') {
                form.addEventListener('submit', function(e) {
                    const confirmed = confirm('Are you sure you want to delete this item?');
                    if (!confirmed) {
                        e.preventDefault();
                    }
                });
            }
        }
    });
    
    // Add any additional client-side functionality here
    console.log('Gym Tracker loaded');
});