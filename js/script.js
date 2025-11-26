document.addEventListener('DOMContentLoaded', () => {
    //nastavi avtomatsko datum v
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'];
    
    const daySelect = document.querySelector('select[name="day"]');
    const monthSelect = document.querySelector('select[name="month"]');
    const yearSelect = document.querySelector('select[name="year"]');
    
    if (daySelect) {
        daySelect.value = currentDay;
    }
    
    if (monthSelect) {
        monthSelect.value = monthNames[currentMonth];
    }
    
    if (yearSelect) {
        yearSelect.value = currentYear;
    }

    const signupForm = document.getElementById('signupForm');
    const customGender = document.querySelector('.custom-gender');
    
    const pronounSelect = document.querySelector('.pronoun-select');
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    
    genderRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            customGender.style.display = e.target.value === 'custom' ? 'block' : 'none'; // če je izbran "po meri" se display spremeni v block. Drugače je none
            
            if (e.target.value === 'custom') {
                pronounSelect.setAttribute('required', '');//nastavi required če je izbran "po meri"
            } else {
                pronounSelect.removeAttribute('required');
            }
        });
    });

    const emailInput = document.querySelector('input[name="contact"]');
    const passwordInput = document.getElementById('password');
    
    //po napaki ko začne uporabnik nazaj pisati se bo le ta odstranila.
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            emailInput.setCustomValidity('');
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            passwordInput.setCustomValidity('');
        });
    }

    if (signupForm) {//preveri če obstaja signup form na strani
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            

            const emailInput = document.querySelector('input[name="contact"]');
            const contactValue = emailInput.value.trim();
            
            const isPhoneNumber = /^[\d\s\+\-\(\)]+$/.test(contactValue);
            
            if (isPhoneNumber) {
                emailInput.setCustomValidity('');
            } else {
                const hasSpace = /\s/.test(contactValue);
                const hasAt = contactValue.includes('@');
                const atIndex = contactValue.indexOf('@');
                const hasDotAfterAt = atIndex !== -1 && contactValue.indexOf('.', atIndex) > atIndex;
                
                if (hasSpace || !hasAt || !hasDotAfterAt) {
                    Swal.fire({
                        title: 'Napaka!',
                        text: 'Vnesi veljavno številko mobilnega telefona ali e-poštni naslov.',
                        icon: 'error',
                        confirmButtonText: 'V redu',
                        confirmButtonColor: '#1877f2'
                    });
                    return;
                } else {
                    emailInput.setCustomValidity('');
                }
            }

            const passwordInput = document.getElementById('password');
            const password = passwordInput.value;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const isLongEnough = password.length >= 8;

            if (!isLongEnough || !hasUpperCase || !hasLowerCase || !hasNumber) {
                let errorMsg = 'Geslo mora vsebovati: ';
                let errors = [];
                if (!isLongEnough) errors.push('najmanj 8 znakov');
                if (!hasUpperCase) errors.push('veliko črko');
                if (!hasLowerCase) errors.push('malo črko');
                if (!hasNumber) errors.push('številko');
                
                Swal.fire({
                    title: 'Šibko geslo!',
                    text: errorMsg + errors.join(', '),
                    icon: 'error',
                    confirmButtonText: 'V redu',
                    confirmButtonColor: '#1877f2'
                });
                return;
            } else {
                passwordInput.setCustomValidity('');
            }

            //dobi gumb in prejšni napis gumba
            const submitBtn = signupForm.querySelector('.signup-button');
            const originalText = submitBtn.textContent;
            
            //spremeni napis gumba in onemogoči gumb da se ga neda kliknit med animacijo
            submitBtn.textContent = 'Ustvarjam račun...';
            submitBtn.disabled = true;

            //če dobi napako pri registraciji jo javi in spremeni gumb na prejšne stanje
            if (!signupForm.checkValidity()) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                signupForm.reportValidity();
                return;
            }

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Uspešno!',
                        text: 'Račun je bil uspešno ustvarjen!',
                        icon: 'success',
                        confirmButtonText: 'V redu',
                        confirmButtonColor: '#1877f2'
                    }).then(() => {
                        window.location.href = 'login.html';
                    });
                } else {
                    alert('Račun je bil uspešno ustvarjen!');
                    window.location.href = 'login.html';
                }
            }, 800);
        });
    }

    const createBtn = document.getElementById('createBtn');
    if (createBtn) {
        createBtn.addEventListener('click', () => {
            window.location.href = 'signup.html';
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm && !signupForm) {//preveri če obstaja login form na strani in hkrati ne obstaja signup form
        const loginEmailInput = loginForm.querySelector('input[name="email"], input[name="contact"]');
        const loginPasswordInput = loginForm.querySelector('input[name="password"]');
        
        //po napaki ko začne uporabnik nazaj pisati se bo le ta odstranila.
        if (loginEmailInput) {
            loginEmailInput.addEventListener('input', () => {
                loginEmailInput.setCustomValidity('');
            });
        }
        
        if (loginPasswordInput) {
            loginPasswordInput.addEventListener('input', () => {
                loginPasswordInput.setCustomValidity('');
            });
        }
        
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const contactValue = loginEmailInput.value.trim();
            
            const isPhoneNumber = /^[\d\s\+\-\(\)]+$/.test(contactValue);
            
            if (isPhoneNumber) {
                loginEmailInput.setCustomValidity('');
            } else {
                const hasSpace = /\s/.test(contactValue);
                const hasAt = contactValue.includes('@');
                const atIndex = contactValue.indexOf('@');
                const hasDotAfterAt = atIndex !== -1 && contactValue.indexOf('.', atIndex) > atIndex;
                
                if (hasSpace || !hasAt || !hasDotAfterAt) {
                    Swal.fire({
                        title: 'Napaka!',
                        text: 'Vnesi veljavno številko mobilnega telefona ali e-poštni naslov.',
                        icon: 'error',
                        confirmButtonText: 'V redu',
                        confirmButtonColor: '#1877f2'
                    });
                    return;
                } else {
                    loginEmailInput.setCustomValidity('');
                }
            }
            
            const password = loginPasswordInput.value;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const isLongEnough = password.length >= 8;

            if (!isLongEnough || !hasUpperCase || !hasLowerCase || !hasNumber) {
                let errorMsg = 'Geslo mora vsebovati: ';
                let errors = [];
                if (!isLongEnough) errors.push('najmanj 8 znakov');
                if (!hasUpperCase) errors.push('veliko črko');
                if (!hasLowerCase) errors.push('malo črko');
                if (!hasNumber) errors.push('številko');
                
                Swal.fire({
                    title: 'Šibko geslo!',
                    text: errorMsg + errors.join(', '),
                    icon: 'error',
                    confirmButtonText: 'V redu',
                    confirmButtonColor: '#1877f2'
                });
                return;
            } else {
                loginPasswordInput.setCustomValidity('');
            }
            
            if (!loginForm.checkValidity()) {
                loginForm.reportValidity();
                return;
            }

            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Prijava uspešna!',
                    text: 'Dobrodošli nazaj!',
                    icon: 'success',
                    confirmButtonText: 'V redu',
                    confirmButtonColor: '#1877f2'
                });
            } else {
                alert('Prijava uspešna!');
            }
        });
    }

    //kredit
    const facebookCredit = document.getElementById('facebook-credit');
    if (facebookCredit) {
        facebookCredit.addEventListener('click', (e) => {
            e.preventDefault();
            Swal.fire({
                title: 'KREDITI',
                text: 'avtor: Leon Ilc',
                icon: 'info',
                confirmButtonText: 'V redu',
                confirmButtonColor: '#1877f2'
            });
        });
    }

});