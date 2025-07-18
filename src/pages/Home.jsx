import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import FeedItem from "../components/FeedItem";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Home = () => {
  // logic
  const history = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [feedList, setFeedList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleEdit = (data) => {
    history(`/edit/${data._id}`); // edit페이지로 이동
  };

  // DELETE /posts/:id - 특정 게시물 삭제
  const deletePost = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("게시물 삭제 실패:", error);
    }
  };

  const handleDelete = async (selectedItem) => {
    // TODO: 백엔드에 Delete 요청
    const result = await deletePost(selectedItem._id);
    console.log("🚀 ~ handleDelete ~ result:", result);

    // UI 업데이트
    const filterList = feedList.filter((item) => item._id !== selectedItem._id);
    setFeedList(filterList);
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

    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok)
          throw new Error(`http error: status : ${response.status}`);
        const result = await response.json();
        console.log(result);
        setFeedList(result);
      } catch (error) {}
    };
    fetchPosts();
    console.log(auth.currentUser.uid);
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
          {feedList.length ? (
            <ul>
              {feedList.map((feed) => (
                <FeedItem
                  key={feed._id}
                  data={feed}
                  tags={feed.tags}
                  isAuthor={feed.userId === auth.currentUser.uid}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onLike={handleLike}
                />
              ))}
            </ul>
          ) : (
            <p>no Data</p>
          )}
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
