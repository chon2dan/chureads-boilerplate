import React from "react";
import { useState } from "react";

/**
 *
 * 사용자의 이름을 입력받아서 인사 문구와 함께 메세지를 보여주는 컴포넌트
 *
 */
const Greeting = ({ name, onButtonClick }) => {
  //로직
  const [userName, setUserName] = useState(name);

  const handleClick = () => {
    setUserName(userName.toUpperCase());
    console.log("userName", userName);

    onButtonClick();
  };

  //뷰
  return (
    <div>
      <p>{userName}님! 반갑습니당!</p>
      <p>오늘도 좋은 하루 되세용</p>
      <button onClick={handleClick}>버튼 클릭</button>
    </div>
  );
};

export default Greeting;
