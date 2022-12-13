import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { gapi } from 'gapi-script';

function AuthPage() {  
const clientId = "739140650399-hdlcrsphdb1eh83tgh95q5e9bop0nck6.apps.googleusercontent.com"

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);


  // **you can access the token like this**
  // const accessToken = gapi.auth.getToken().access_token;
  // console.log(accessToken);

  const onSuccess = response => {
    console.log('SUCCESS', response);
  };
  const onFailure = response => {
    console.log('FAILED', response);
  };
  const onLogoutSuccess = () => {
    console.log('SUCESS LOG OUT');
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}

export default AuthPage;