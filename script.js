document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('message');
    const charCounter = document.querySelector('.char-counter');
    const phoneInput = document.getElementById('phone');
    
    // Character counter for message field
    function updateCharCounter() {
        const currentLength = messageTextarea.value.length;
        const maxLength = 300;
        charCounter.textContent = `${currentLength}/${maxLength}`;
        
        if (currentLength > maxLength) {
            charCounter.style.color = '#ef4444';
            messageTextarea.value = messageTextarea.value.substring(0, maxLength);
            charCounter.textContent = `${maxLength}/${maxLength}`;
        } else {
            charCounter.style.color = '#9ca3af';
        }
    }
    
    messageTextarea.addEventListener('input', updateCharCounter);
    
    // Phone number formatting
    function formatPhoneNumber(value) {
        // Remove all non-digits
        const phoneNumber = value.replace(/\D/g, '');
        
        // Format as +44 (000) 000-0000
        if (phoneNumber.length >= 10) {
            return `+44 (${phoneNumber.slice(2, 5)}) ${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8, 12)}`;
        } else if (phoneNumber.length >= 7) {
            return `+44 (${phoneNumber.slice(2, 5)}) ${phoneNumber.slice(5)}`;
        } else if (phoneNumber.length >= 4) {
            return `+44 (${phoneNumber.slice(2)}`;
        } else if (phoneNumber.length >= 2) {
            return `+44 ${phoneNumber.slice(2)}`;
        }
        return value;
    }
    
    phoneInput.addEventListener('input', function(e) {
        const formatted = formatPhoneNumber(e.target.value);
        e.target.value = formatted;
    });
    
    // Form validation and submission
    function validateForm() {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        const errors = [];
        
        if (!firstName) errors.push('First name is required');
        if (!lastName) errors.push('Last name is required');
        if (!email) errors.push('Email address is required');
        if (!isValidEmail(email)) errors.push('Please enter a valid email address');
        if (!phone) errors.push('Phone number is required');
        if (!message) errors.push('Message is required');
        
        return errors;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Add styles for the message
        messageDiv.style.cssText = `
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 16px;
            font-size: 14px;
            font-weight: 500;
            ${type === 'success' 
                ? 'background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;' 
                : 'background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;'
            }
        `;
        
        form.insertBefore(messageDiv, form.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const errors = validateForm();
        
        if (errors.length > 0) {
            showMessage(errors.join(', '), 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'Submitting...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            showMessage('Thank you! Your message has been sent successfully.');
            form.reset();
            updateCharCounter(); // Reset counter
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Add smooth focus transitions
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-1px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize character counter
    updateCharCounter();
});
