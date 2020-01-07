new Vue({
  el: "#top",
  data: {
    inUp: true,
    roading: false,
    time: null,
    now: null,
    mn: null,
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
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(cred => {
        window.location = 'memo/index.html';
      })
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
  created() {
    this.time = new Date().getTime()
    window.addEventListener("load", () => {
      this.now = new Date().getTime()
      this.mn = this.now - this.time
      if (this.mn <= 1000) {
        setTimeout(() => {
          this.roading = !this.roading
        }, 2000 - (this.mn));
        return;
      } else {
        this.roading = !this.roading
      }
    })
  }
})

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});