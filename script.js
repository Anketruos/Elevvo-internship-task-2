document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset errors
        document.querySelectorAll('.error').forEach(error => {
            error.style.display = 'none';
        });
        document.getElementById('successMessage').style.display = 'none';
        
        // Get form values
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Validate full name
        if (fullName === '') {
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            document.getElementById('emailError').textContent = 'Please enter your email address';
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }
        
        // Validate subject
        if (subject === '') {
            document.getElementById('subjectError').style.display = 'block';
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            document.getElementById('messageError').style.display = 'block';
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            document.getElementById('successMessage').style.display = 'block';
            contactForm.reset();
            
            // Scroll to success message
            document.getElementById('successMessage').scrollIntoView({
                behavior: 'smooth'
            });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 5000);
        }
    });
    
    // Add real-time validation for better UX
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    function validateField(field) {
        const errorElement = document.getElementById(field.id + 'Error');
        
        if (field.value.trim() === '') {
            errorElement.style.display = 'block';
            return false;
        }
        
        // Special validation for email
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                errorElement.textContent = 'Please enter a valid email address';
                errorElement.style.display = 'block';
                return false;
            }
        }
        
        errorElement.style.display = 'none';
        return true;
    }
});