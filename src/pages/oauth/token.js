// Initialize application
var webAuth = new auth0.WebAuth({
    domain:       'YOUR_DOMAIN',
    clientID:     process.env.CLIENT_ID
  });

  // Verify code sent via email
  webAuth.passwordlessLogin({
      connection: 'email',
      email: 'USER_EMAIL',
      verificationCode: 'VERIFICATION_CODE_SENT'
    }, function (err,res) {
      // handle errors or continue
    }
  );