import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';

const UserContext = createContext({
  input: [],
  setInput: () => Promise,
  handleSignup: () => null,
  handleLogin: () => null,
  handleMail: () => null,
  loaded: "",
  setLoaded: () => Promise,
  signinUser: "",
  setSigninUser: () => Promise,
  handleLogout: () => null,
  isLoggedin: Boolean,
  setIsLoggedin: () => Promise,
  products: null,
  setProducts: () => Promise,
  user: [],
  setUser: () => Promise,
  setSelectedPhoto: () => Promise,
  selectedPhoto: null,
})

export const useUser = () => useContext(UserContext);

export default function UsersContextProvider({ children }) {
  const [input, setInput] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loaded, setLoaded] = useState("");
  const [signinUser, setSigninUser] = useState("");
  const [products, setProducts] = useState(null);
  const [user, setUser] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/users/${signinUser}` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/users/${signinUser}`;
    axios.get(URL)
      .then(res => {
        // console.log(res.data.result);
        setUser(res.data.result);
      })
      .catch(err => {
        console.log(err);
      })
  }, [signinUser])

  // fetch products
  useEffect(() => {
    const URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/Books/get` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/Books/get`;
    axios.get(URL)
      .then(res => {
        setProducts(res.data.result)
      })
      .catch(err => {
        console.log(err)
      })
  });

  const navigat = useNavigate();
  const handleSignup = (event) => {
    event.preventDefault();
    const SIGNUP_URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/signup/createUser` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/signup/createUser`;
    axios.post(SIGNUP_URL, input)
      .then(res => {
        navigat('/login')
      })
      .catch(err => {
        alert("Something Went Wrong")
        console.log("Account Created Failed", err);
      })
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const axiosConfig = {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      },
    };
    const LOGIN_URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/login` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/login`;
    axios.post(LOGIN_URL, input, axiosConfig)
      .then(res => {
        if (res.data.success) {
          if (res.data.message === "Login Successful!!") {
            sessionStorage.setItem("Authorization", res.data.token);
            var decoded = jwtDecode(res.data.token);
            // sessionStorage.setItem("Token", JSON.stringify(decoded))
            setSigninUser(decoded.name);
            setIsLoggedin(true);
            navigat('/', { replace: true });
          }
          else {
            alert("Password is wrong, Try Again!!");
          }
        }
        else {
          alert("Account Does not Exists, Please create your account to continue!!");
        }
      })
      .catch(err => {
        alert("Something Went Wrong");
        console.log(err);
      })
  }


  const handleMail = (event) => {
    event.preventDefault();
    // toast("Email Sending.....",{autoClose: 2000,pauseOnHover: false});
    setLoaded("true");
    const FORGOT_URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/forgot` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/forgot`;
    axios.put(FORGOT_URL, input)
      .then(response => {
        if (response.data.success) {
          setLoaded("false");
          toast("Email Sending Successfully");
          // alert(`${response.data.message} => Go to Mail`)
        }
      })
      .catch(err => {
        setLoaded("false");
        toast("Enter Valid Email");
      })
  }

  const handleLogout = async (event) => {
    const axiosConfigs = {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      },
    };
    const LOGOUT_URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/login/logout` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/login/logout`;
    await axios.post(LOGOUT_URL, axiosConfigs)
      .then(res => {
        if (res.data === "Logged out successfully") {
          setIsLoggedin(false);
          sessionStorage.removeItem('Authorization');
          navigat('/', { replace: true });
          window.location.reload();
        }
      })
      .catch(err => console.log(err))
  }

  const handleUpdateUser = (event) => {
    event.preventDefault();
    setUser({ ...user, ...input })
    const URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/updateUser/${signinUser}` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/updateUser/${signinUser}`;
    axios.patch(URL, input)
      .then(response => {
        if (response.data.success) {
          toast("Updated Successfully", { className: "update-toast-message" });
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  // useEffect(() => {
  //   const URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/Books` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/Books`;
  //   axios.post(URL)
  //     .then(res => {
  //       console.log("Successsssss??")
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }, [signinUser])


  const value = {
    input,
    setInput,
    handleSignup,
    handleLogin,
    handleMail,
    loaded,
    signinUser,
    setSigninUser,
    isLoggedin,
    handleLogout,
    setIsLoggedin,
    products,
    setProducts,
    user,
    setUser,
    selectedPhoto,
    setSelectedPhoto,
    handleUpdateUser,
  }

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
};
