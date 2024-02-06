import React, { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import JobPage from "./pages/JobPage"
import AboutPage from "./pages/AboutPage"
import FaqPage from "./pages/FaqPage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import RenewPasswordPage from "./pages/RenewPasswordPage"
import JobDetailPage from "./pages/JobDetailPage"
import UserProfilePage from "./pages/UserProfilePage"
import UserPasswordPage from "./pages/UserPasswordPage"
import UserRecommendationPage from "./pages/UserRecommendationPage"
import RecommendationPage from "./pages/RecommendationPage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { CookiesProvider, useCookies } from "react-cookie"
import { useSelector } from "react-redux"

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      const today = new Date();
      today.setDate(today.getDate() + 2);
  
      setCookie('token', token, [{
        path: '/',
        expires: today,
        secure: true,
        httpOnly: true
      }]);
    } else if (!token && cookies.token) {
      removeCookie('token', [{
        path: '/',
        secure: true,
        httpOnly: true
      }]);
    };
  }, [token]);

  return (
    <>
      <CookiesProvider>
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<LandingPage></LandingPage>}></Route>
            <Route path='/about' element={<AboutPage></AboutPage>}></Route>
            <Route path='/faq' element={<FaqPage></FaqPage>}></Route>

            <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
            <Route path='/login' element={<LoginPage></LoginPage>}></Route>
            <Route path='/password/email' element={<ForgotPasswordPage></ForgotPasswordPage>}></Route>
            <Route path='/password/reset' element={<RenewPasswordPage></RenewPasswordPage>}></Route>

            <Route path='/jobs' element={<JobPage></JobPage>}></Route>
            <Route path='/jobs/:id' element={<JobDetailPage></JobDetailPage>}></Route>

            <Route path='/profiles/:id' element={<UserProfilePage></UserProfilePage>}></Route>
            <Route path='/profiles/:id/password' element={<UserPasswordPage></UserPasswordPage>}></Route>
            <Route path='/profiles/:id/recommendations' element={<UserRecommendationPage></UserRecommendationPage>}></Route>

            <Route path='/recommendations' element={<RecommendationPage></RecommendationPage>}></Route>
          </Routes>
        </BrowserRouter>

        <Footer></Footer>
      </CookiesProvider>
    </>
  )
}

export default App