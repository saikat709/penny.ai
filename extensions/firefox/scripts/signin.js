document.addEventListener('DOMContentLoaded', () => {
  const signinBtn = document.getElementById('signin');
  signinBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    // TODO: Handle sign in logic here
    browser.storage.local.set({ email, password })
    
    .then(() => {
        alert('Sign-in info saved!');
        setTimeout(() => {
            window.close();
        }, 2000); 
    })
    .catch(error => {
        console.error('Error saving sign-in info:', error)
        alert('Failed to save sign-in info.');
    });
  });
});
