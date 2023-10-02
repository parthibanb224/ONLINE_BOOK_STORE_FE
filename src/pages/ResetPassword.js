import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import showPwdImg from '../Assets/Show-password.svg';
import hidePwdImg from '../Assets/Hide-password.svg';
import axios from 'axios';
import { TEInput, TERipple } from "tw-elements-react";

export default function ResetPassword() {

    const [passwordMode, setPasswordMode] = useState(false);
    const { token } = useParams();
    const [passwordCheck, setPasswordCheck] = useState([]);


    const Navigate = useNavigate();
    const handleResetPassword = (event) => {
        event.preventDefault();
        if (passwordCheck.newPassword === passwordCheck.confirmPassword) {
            const RESET_URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/reset/${token}` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/reset/${token}`;
            axios.patch(RESET_URL, { password: passwordCheck.newPassword })
                .then(response => {
                    if (response.data.success) {
                        Navigate('/login');
                    }
                })
                .catch(err => {
                    alert("Something Went Wrong", err);
                });
        }
        else {
            alert("password doesn't match pls check");
        }
    }


    return (
        <section className="h-screen">
            <div className="h-full">
                {/* <!-- Left column container with background--> */}
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="w-full"
                            alt="user"
                        />
                    </div>

                    {/* <!-- Right column container --> */}
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                        <form onSubmit={handleResetPassword}>

                            {/* <!-- Password input --> */}
                            <div className="relative">
                                <TEInput
                                    type={passwordMode ? "text" : "password"}
                                    label="Password"
                                    size="lg"
                                    className="mb-6"
                                    onChange={e => setPasswordCheck({ ...passwordCheck, newPassword: e.target.value })}
                                >
                                    <img
                                        className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
                                        title={passwordMode ? "Hide password" : "Show password"}
                                        src={passwordMode ? showPwdImg : hidePwdImg}
                                        onClick={() => setPasswordMode(prevState => !prevState)}
                                        alt='password gif'
                                    />
                                </TEInput>
                            </div>

                            {/* <!--Password input--> */}
                            <div className="relative">
                                <TEInput
                                    type={passwordMode ? "text" : "password"}
                                    label="Password"
                                    className="mb-6"
                                    size="lg"
                                    onChange={e => setPasswordCheck({ ...passwordCheck, confirmPassword: e.target.value })}
                                />
                                <img
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
                                    title={passwordMode ? "Hide password" : "Show password"}
                                    src={passwordMode ? showPwdImg : hidePwdImg}
                                    onClick={() => setPasswordMode((prevState) => !prevState)}
                                    alt="password gif"
                                />
                            </div>


                            {/* <!-- Login button --> */}
                            <div className="text-center lg:text-left">
                                <TERipple rippleColor="light">
                                    <button
                                        type="submit"
                                        className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    >
                                        Reset Password
                                    </button>
                                </TERipple>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
