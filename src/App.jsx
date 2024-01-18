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
import Alert from "./components/Alert"

function App() {
  return (
    <>
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
          <Route path='/profiles/:id/recommendation' element={<UserRecommendationPage></UserRecommendationPage>}></Route>

          <Route path='/recommendations' element={<RecommendationPage></RecommendationPage>}></Route>
        </Routes>
      </BrowserRouter>

      <Alert status={false} text={'Yakin ingin menghapus?'} 
        button={{ primary: 'Hapus', secondary: 'Batal' }} closeBtn={true}></Alert>

      <Footer></Footer>
    </>
  )
}

export default App
