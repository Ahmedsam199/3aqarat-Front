import React, { Suspense } from 'react'
import toast from "react-hot-toast";
// ** Router Import
import Router from './router/Router'

const ToastContent = ({ t, name, role }) => {
  return (
    <div>
      <div>
        <h4>Welcome to Al-Jazary Real Estate</h4>
      </div>
      <br></br>
      <div className="text-center">
        <img
          className="brand-logo"
          width={36}
          height={30}
          src={themeConfig.app.appLogoImage}
        ></img>
      </div>
    </div>
  );
};

Pusher.logToConsole = true;

    var pusher = new Pusher('902a182571ab0eaf222f', {
      cluster: 'ap2'
    });


    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      toast.success(data.message)
      console.log(data)});

const App = () => {
  return (
    <Suspense fallback={null}>
      <Router />
      
    </Suspense>
  )
}

export default App
