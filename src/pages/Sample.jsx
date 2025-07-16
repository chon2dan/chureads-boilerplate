import React, { useEffect } from "react";
import { useState } from "react";
import Greeting from "../components/sample/Greeting";

const Sample = () => {
  const handleButtonClick = () => {
    console.log("click");
  };

  const [userNames, setUserNames] = useState([]);

  useEffect(() => {
    const nameDatas = ["김철수", "하선영", "솔의눈"];
    setUserNames(nameDatas);
  }, []);

  return (
    <div>
      Sample
      {userNames.map((userName) => (
        <Greeting name={userName} onButtonClick={handleButtonClick} />
      ))}
      {/* <Greeting name="항처리" onButtonClick={handleButtonClick} />
      <Greeting name="룡룡이" onButtonClick={handleButtonClick} /> */}
    </div>
  );
};

export default Sample;
