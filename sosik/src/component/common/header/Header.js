import React, { useEffect, useState, createContext } from "react";
import logo from "../../../images/logo.png";
import "./header.css";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Recipeboardlist from "../../../page/Recipeboardlist.js";
import Feed from "../../feed/Feed.js";

import Mainpage from "../../../page/MainPage";
import Login from "../../member/loginform/Login.js";
import FoodSearch from "../../food/foodSearch/FoodSearch.js";
import Signup from "../../member/signupform/Signup.js";
import axios from "axios";
import RecdKcal from "../../intake/record/RecdKcal.js";
import RecdAnly from "../../intake/record/RecdAnly.js";
import UpdateInfo from "../../member/updatemyinfo/UpdateInfo.js";
import FoodDetail from "./../../food/foodDetail/FoodDetail";
import RedirectionKakao from "../../member/loginform/social/RedirectionKakao.js";
import FindPw from "../../member/loginform/FindPw.js";
import SnsInfo from "../../member/loginform/social/SnsInfo.js";
import MyPage from '../../member/mypage/Mypage';
import SearchBox from "../header/SearchBox.js";

export const HeaderContext = createContext();

const Header = () => {
  const [logout, setlogout] = useState(true);

  useEffect(() => {
    const access = window.localStorage.getItem("accesstoken");
    if (access === null) {
      setlogout(true);
    } else {
      setlogout(false);
    }
  }, [logout]);

  const handleLogout = async () => {
    try {
      console.log("들어왓어요");

      const accesstoken = JSON.parse(
        window.localStorage.getItem("accesstoken")
      );
      const refreshtoken = JSON.parse(
        window.localStorage.getItem("refreshtoken")
      );
      const member = JSON.parse(window.localStorage.getItem("member"));

      console.log(accesstoken);
      console.log(refreshtoken);
      console.log(member.result.email);

      await axios({
        method: "post",
        url: "/members/v1/sign-out",
        baseURL: "http://localhost:5056",
        headers: {
          authorization: accesstoken,
          refreshToken: refreshtoken,
          member: member.result.email,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ email: member.result.email}),
      });

      window.localStorage.removeItem("accesstoken");
      window.localStorage.removeItem("refreshtoken");
      window.localStorage.removeItem("member");

      // console.log(response);
      setlogout(true);
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  let loginview = "";

  if (logout === false) {
    loginview = (
      <>
        <li>
          <Link to="/mypage" style={{ marginRight: "30px" }}>
            마이페이지
          </Link>
          <Link to="/mainpage" onClick={handleLogout}>
            로그아웃
          </Link>
        </li>
      </>
    );
  } else {
    loginview = (
      <li>
        <Link to="/login">로그인</Link>
      </li>
    );
  }

  return (
    <BrowserRouter>
      <header id="header" className="nav-down">
        {/* <a className="logo" href="/"> */}
        <Link to="/mainpage" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
        {/* </a> */}
        <nav id="gnb">
        <SearchBox></SearchBox>
          {/* <ul className="depth-1">
            <li>
              <Link to="/foodsearch">칼로리</Link>
            </li>
            <li>
              <Link to="/feed">SNS</Link>
            </li>
            <li>
              <Link to="/recipeboardlist">커뮤니티</Link>
              <ul className="depth-2">
                <li>
                  <Link to="/recipeboardlist">요리해요</Link>
                </li>
                <li>
                  <a href="">고민있어요</a>
                </li>
                <li>
                  <a href="">성공했어요</a>
                </li>
              </ul>
            </li>
          </ul> */}
        </nav>
        <div className="utWrap">
          <ul className="logWrap">{loginview}</ul>
          <div className="searchWrap">
            <input type="text" placeholder="어떤 요리가 궁금하신가요?" />
            <button className="" type="button" id="topSearchBtn">
              검색
            </button>
          </div>
          {/* <div class="searchWrap">
            <input type="text" name="q"/>
              <button id="topSearchBtn" class="" type="button" onclick="topSearch()">검색</button>
          </div> */}

          <button
            type="button"
            class="ham"
            onclick="$(this).toggleClass('cross')"
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
        </div>
        {/* <div class="scrollindicator" style="visibility: visible;">
          <div class="scrollprogress" style="transform: translate3d(-100%, 0px, 0px);"></div>
              <Link to="/mypage">마이페이지</Link>
        </div> */}
      </header>

      <HeaderContext.Provider value={{ setlogout }}>
        <Routes>
          <Route path="/recipeboardlist" element={<Recipeboardlist />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mainpage" element={<Mainpage props={logout} />} />
          <Route path="/foodsearch" element={<FoodSearch />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/recdkcal" element={<RecdKcal />} />
          <Route path="/recdanly" element={<RecdAnly />} />
          <Route path="/updateinfo" element={<UpdateInfo />} />
          <Route path="/food/:id" element={<FoodDetail />} />
          <Route path="/redirection" element={<RedirectionKakao />} />
          <Route path="/findPw" element={<FindPw />} />
          <Route path="/snsInfo" element={<SnsInfo />} />

        </Routes>
        {/* <RecdButton /> */}
      </HeaderContext.Provider>
    </BrowserRouter>
  );
};

export default Header;