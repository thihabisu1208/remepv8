// Log In Form
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get User Info
    const email = document.querySelector('.login_form_mail').value;
    const password = document.querySelector('.login_form_pass').value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
            loginForm.reset();
        })
        .catch(err => {
            alert(err.message);
        });
});