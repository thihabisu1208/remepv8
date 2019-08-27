new Vue({
  el: "#top",
  data: {
    inUp: true
  },
  methods: {
    change() {
      this.inUp = !this.inUp
    },
    toHome() {
      // location.href = 'memo/index.html'
    },
    // Login the User
    login() {
      const email = document.querySelector('.login_form_mail').value;
      const password = document.querySelector('.login_form_pass').value;
      auth.signInWithEmailAndPassword(email, password).then(cred => {
          loginForm.reset();
          window.location = 'memo/index.html';
        })
        .catch(err => {
          alert(err.message);
        });
    },
    // Sign up the User
    signUp() {
      const email = document.querySelector('.signup_form_mail').value;
      const password = document.querySelector('.signup_form_pass').value;
      auth.createUserWithEmailAndPassword(email, password).then(cred => {
          signupForm.reset();
          document.location.reload(true);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  },
  mounted() {

  }
})