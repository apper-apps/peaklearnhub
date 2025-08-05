import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { initializeAuth } from "@/store/slices/authSlice";
import { initializeTheme } from "@/store/slices/themeSlice";
import Layout from "@/components/organisms/Layout";

// Pages
import Home from "@/components/pages/Home";
import ProgramLanding from "@/components/pages/ProgramLanding";
import TextInfluencer from "@/components/pages/TextInfluencer";
import Only3 from "@/components/pages/Only3";
import GangjeomSeungbu from "@/components/pages/GangjeomSeungbu";
import DaeuneuiBeobchik from "@/components/pages/DaeuneuiBeobchik";
import TextInfluencerMembership from "@/components/pages/TextInfluencerMembership";
import TextInfluencerMaster from "@/components/pages/TextInfluencerMaster";
import Only3Master from "@/components/pages/Only3Master";
import GangjeomSeungbuMaster from "@/components/pages/GangjeomSeungbuMaster";
import DaeuneuiBeobchikMaster from "@/components/pages/DaeuneuiBeobchikMaster";
import MoneyInsight from "@/components/pages/MoneyInsight";
import Reviews from "@/components/pages/Reviews";
import Profile from "@/components/pages/Profile";
import AdminUsers from "@/components/pages/AdminUsers";
import AdminLectures from "@/components/pages/AdminLectures";
import AdminPosts from "@/components/pages/AdminPosts";

function App() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(initializeAuth());
    dispatch(initializeTheme());
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="program" element={<ProgramLanding />} />
            <Route path="program/text-influencer" element={<TextInfluencer />} />
            <Route path="program/only3" element={<Only3 />} />
            <Route path="program/강점승부" element={<GangjeomSeungbu />} />
            <Route path="program/대운의법칙" element={<DaeuneuiBeobchik />} />
            <Route path="program/text-influencer/membership" element={<TextInfluencerMembership />} />
            <Route path="program/text-influencer/master" element={<TextInfluencerMaster />} />
            <Route path="program/only3/master" element={<Only3Master />} />
            <Route path="program/강점승부/master" element={<GangjeomSeungbuMaster />} />
            <Route path="program/대운의법칙/master" element={<DaeuneuiBeobchikMaster />} />
            <Route path="money-insight" element={<MoneyInsight />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin/users" element={<AdminUsers />} />
            <Route path="admin/lectures" element={<AdminLectures />} />
            <Route path="admin/posts" element={<AdminPosts />} />
          </Route>
        </Routes>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="toast-container"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;