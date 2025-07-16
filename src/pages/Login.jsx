import React from "react";
import InputField from "../components/InputField";
import LoginButton from "../components/LoginButton";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  // logic

  const history = useNavigate();

  const handleInputChange = (inputValue, field) => {
    // TODO: 사용자 입력 기능 구현
  };

  const handleLogin = (event) => {
    // TODO: 로그인 기능 구현
  };

  const handleGoogleLogin = async () => {
    // TODO: 구글 로그인 구현
    // 구글Provider 가져오기
    const provider = new GoogleAuthProvider();
    try {
      //1. 팝업 띄워서 로그인처리
      await signInWithPopup(auth, provider);
      //2. 홈 화면으로 리다이렉트
      history("/");
    } catch (err) {
      console.log(err);
    }
  };

  // view
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="text-center px-6">
        <h1 className="flex justify-center">
          <img src="./images/logo.svg" alt="churead로고" />
        </h1>
        <h3 className="text-red font-bold text-base py-6">
          Chureads에서 소통해보세요
        </h3>
        {/* START: 폼 영역 */}
        <form
          id="login-form"
          className="text-center flex flex-col gap-2"
          onSubmit={handleLogin}
        >
          <InputField type="text" field="email" onChange={handleInputChange} />
          <InputField
            type="password"
            field="password"
            onChange={handleInputChange}
          />
          <LoginButton category="login" text="Login" />
        </form>
        {/* END: 폼 영역 */}
        <div className="flex justify-center gap-1 py-6">
          <p className="text-churead-gray-600">계정이 없으신가요?</p>
          <Link to="/sign-up" className="text-churead-blue">
            가입하기
          </Link>
        </div>
        <p className="text-gray-500 text-sm relative mb-4">
          {" "}
          <i className="block w-full h-[1px] bg-churead-gray-300 bg-opacity-15 absolute top-1/2 transform -translate-y-1/2" />{" "}
          <span className="bg-churead-black relative z-10 px-2"> or </span>{" "}
        </p>
        {/* START: 소셜 로그인 영역 */}
        <LoginButton
          category="socialLogin"
          text="Continue with Google"
          onClick={handleGoogleLogin}
        />
        {/* END: 소셜 로그인 영역 */}
      </div>
    </div>
  );
};

export default Login;
