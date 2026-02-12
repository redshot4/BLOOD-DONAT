// Donor Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const donorForm = document.getElementById('donorForm');
    
    if (donorForm) {
        donorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                dob: document.getElementById('dob').value,
                gender: document.getElementById('gender').value,
                bloodType: document.getElementById('bloodType').value,
                weight: document.getElementById('weight').value,
                lastDonation: document.getElementById('lastDonation').value,
                location: document.getElementById('location').value,
                registrationDate: new Date().toISOString()
            };
            
            // Save to localStorage (for demonstration)
            let donors = JSON.parse(localStorage.getItem('bloodlifeDonors')) || [];
            donors.push(formData);
            localStorage.setItem('bloodlifeDonors', JSON.stringify(donors));
            
            // Show success message
            alert('Registration successful! Thank you for becoming a blood donor. You will hear from us soon.');
            donorForm.reset();
        });
    }

    // Collection Form Submission
    const collectionForm = document.querySelector('.collection-form');
    if (collectionForm) {
        collectionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const collectionData = {
                donorId: document.getElementById('donorId').value,
                bloodType: document.getElementById('bloodTypeCol').value,
                units: document.getElementById('units').value,
                collectionDate: document.getElementById('collectionDate').value,
                recordedDate: new Date().toISOString()
            };
            
            // Save to localStorage
            let collections = JSON.parse(localStorage.getItem('bloodlifeCollections')) || [];
            collections.push(collectionData);
            localStorage.setItem('bloodlifeCollections', JSON.stringify(collections));
            
            alert('Donation recorded successfully!');
            collectionForm.reset();
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Age validation in donor form
    const dob = document.getElementById('dob');
    if (dob) {
        dob.addEventListener('change', function() {
            const birthDate = new Date(this.value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            if (age < 18 || age > 65) {
                alert('You must be between 18 and 65 years old to donate blood.');
                this.value = '';
            }
        });
    }

    // Weight validation
    const weight = document.getElementById('weight');
    if (weight) {
        weight.addEventListener('change', function() {
            if (this.value < 50) {
                alert('Minimum weight required is 50 kg.');
                this.value = '';
            }
        });
    }

    // Add active class to current nav link
    const currentLocation = location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentLocation.split('/').pop() || 
            (currentLocation === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    console.log('BloodLife System Initialized');
});
