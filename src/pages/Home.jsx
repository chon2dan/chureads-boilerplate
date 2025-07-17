import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import FeedItem from "../components/FeedItem";
import { initialFeedList, initialTags } from "../data/response";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Home = () => {
  // logic
  const history = useNavigate();

  const [feedList, setFeedList] = useState(initialFeedList);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleEdit = (data) => {
    history(`/edit/${data._id}`); // edit페이지로 이동
  };

  const handleDelete = (selectedItem) => {
    const filterList = feedList.filter((item) => item.id !== selectedItem.id);
    setFeedList(filterList);

    // TODO: 백엔드에 Delete 요청
  };

  const handleLike = (selectedId) => {
    console.log("🚀 ~ handleLike ~ selectedId:", selectedId);
  };

  const handlelogout = async () => {
    if (isLoggedIn) {
      const ok = window.confirm("로그아웃하시겠습니까?");
      ok && (await auth.signOut());
      setIsLoggedIn(false);
      history("/login");
    }
  };

  useEffect(() => {
    //로그인 되지 않은 사용자는 로그인 페이지로 이동
    if (!auth.currentUser) {
      history("/login");
    } else {
      setIsLoggedIn(true);
    }
    //
    // 페이지 진입시 딱 한번 실행
    // TODO: 백엔드에 Get 요청
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // view
  return (
    <div className="h-full pt-20 pb-[74px] overflow-hidden">
      {/* START: 헤더 영역 */}
      <Header isLoggedIn={true} onClick={handlelogout} />
      {/* END: 헤더 영역 */}
      <main className="h-full overflow-auto">
        {/* TODO */}

        <div>
          {/* START: 피드 영역 */}
          <ul>
            {feedList.map((feed) => (
              <FeedItem
                key={feed._id}
                data={feed}
                tags={initialTags}
                isAuthor={true}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onLike={handleLike}
              />
            ))}
          </ul>
          {/* END: 피드 영역 */}
        </div>
      </main>
      {/* START: 네비게이션 영역 */}
      <Nav />
      {/* END: 네비게이션 영역 */}
    </div>
  );
};

export default Home;
