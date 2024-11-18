import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import {Card} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'


function App(){
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');

  const responseFacebook = (response) => {
    console.log(response);
    setData(response); 
    if (response.picture && response.picture.data) {
      setPicture(response.picture.data.url);
    }
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <div class='container'>
      <Card style={{width: '800px'}} className="mx-auto mt-5">
        <Card.Header className="pb-4">
          <h1>My React App</h1>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {!login &&
              <React.Fragment>
                <h3>Please login using one of the following:</h3>
                {/* Login Form */}
                <LoginForm />
                {/* FB Login Button */}
                <FacebookLogin
                  appId="8719782111403218"
                  autoLoad={false}
                  fields="name,email,picture"
                  scope="public_profile,user_friends"
                  callback={responseFacebook}
                  icon="fa-facebook"
                />
              </React.Fragment>
            }

            {login &&
              <Home fbpic={picture} fbdata={data} />
            }
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}


function LoginForm(){
  return(
    <form className="border mt-3 mb-5 p-3 bg-white">
      <label className="m-2">Name:</label>
      <input type="text" name="name" placeholder="Your name" />
      <label className="m-2">Email:</label>
      <input type="email" name="email" placeholder="Your Email" />
      <input type="submit" name="Login" className="btn bg-success text-white my-3"/>
    </form>
  )
}

// const responseFacebook = (response) =>{
//   console.log(response);
//   setData(response);
//   setPicture(response.picture.data.url);
//   if (response.accessToken) {
//     setLogin(true);
//   } else {
//     setLogin(false);
//   }
// }

function Home({fbpic,fbdata}) {
  return(
    <React.Fragment>
      <img src={fbpic} alt={fbdata.name} />
      <h3 className="d-inline text-success mx-2">
        Welcome back{fbdata.name}!
      </h3>
      <p className="my-5">This is the home page of the app.</p>
    </React.Fragment>
  )
}

export default App;


// import React, {useState, useEffect} from 'react';
// import FacebookLogin from 'react-facebook-login';
// import {Card} from 'react-bootstrap';
// import "bootstrap/dist/css/bootstrap.min.css"
// import './App.css'

// function App(){
//   const [login, setLogin] = useState(false);
//   const [data, setData] = useState({});
//   const [picture, setPicture] = useState('');

//   useEffect(() => {
//     // 检查登录状态
//     if (window.FB) {
//       window.FB.getLoginStatus(function(response) {
//         statusChangeCallback(response);
//       });
//     }
//   }, []);

//   const statusChangeCallback = (response) => {
//     console.log('statusChangeCallback');
//     console.log(response);
//     if (response.status === 'connected') {
//       setLogin(true);
//       // 获取用户信息
//       fetchUserInfo();
//     } else {
//       setLogin(false);
//     }
//   }

//   const fetchUserInfo = () => {
//     window.FB.api('/me', {fields: 'name,email,picture'}, function(response) {
//       setData(response);
//       if (response.picture && response.picture.data) {
//         setPicture(response.picture.data.url);
//       }
//     });
//   }

//   const responseFacebook = (response) => {
//     console.log('Login response:', response);
//     if (response.accessToken) {
//       setLogin(true);
//       setData(response);
//       if (response.picture && response.picture.data) {
//         setPicture(response.picture.data.url);
//       }
//     }
//   }

//   const handleFBLogin = () => {
//     window.FB.login(function(response) {
//       statusChangeCallback(response);
//     }, {scope: 'public_profile,email'});
//   }

//   return (
//     <div className='container'>
//       <Card style={{width: '800px'}} className="mx-auto mt-5">
//         <Card.Header className="pb-4">
//           <h1>My React App</h1>
//         </Card.Header>
//         <Card.Body>
//           <Card.Text>
//             {!login &&
//               <React.Fragment>
//                 <h3>Please login using one of the following:</h3>
//                 <LoginForm />
//                 <FacebookLogin
//                   appId="8719782111403218"
//                   autoLoad={false}
//                   fields="name,email,picture"
//                   scope="public_profile,email"
//                   callback={responseFacebook}
//                   onClick={handleFBLogin}
//                   icon="fa-facebook"
//                 />
//               </React.Fragment>
//             }

//             {login &&
//               <Home fbpic={picture} fbdata={data} />
//             }
//           </Card.Text>
//         </Card.Body>
//       </Card>
//     </div>
//   )
// }

// function LoginForm(){
//   return(
//     <form className="border mt-3 mb-5 p-3 bg-white">
//       <label className="m-2">Name:</label>
//       <input type="text" name="name" placeholder="Your name" />
//       <label className="m-2">Email:</label>
//       <input type="email" name="email" placeholder="Your Email" />
//       <input type="submit" value="Login" className="btn btn-success text-white my-3"/>
//     </form>
//   )
// }

// function Home({fbpic, fbdata}) {
//   return(
//     <React.Fragment>
//       <img src={fbpic} alt={fbdata.name} />
//       <h3 className="d-inline text-success mx-2">
//         Welcome back {fbdata.name}!
//       </h3>
//       <p className="my-5">This is the home page of the app.</p>
//     </React.Fragment>
//   )
// }

// export default App;