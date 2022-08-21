<script src="https://cdn.auth0.com/js/auth0/9.11/auth0.min.js"></script>


// Initialize application
var webAuth = new auth0.WebAuth({
    domain:       'YOUR_DOMAIN',
    clientID:     process.env.CLIENT_ID,
  });

  // Send a verification code using email
  webAuth.passwordlessStart({
      connection: 'email',
      send: 'code',
      email: 'USER_EMAIL'
    }, function (err,res) {
      // handle errors or continue
    }
  );