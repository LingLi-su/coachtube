import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadVideoPage from "./views/UploadVideoPage/UploadVideoPage";
import DetailVideoPage from './views/DetailVideoPage/DetailVideoPage';
import Chat from './views/Chat';
import QuestionsLanding from './views/LandingPage/QuestionsLanding';
import DetailProductPage from'./views/DetailProductPage/DetailProductPage.js';
import CartPage from './views/CartPage/CartPage';
import HistoryPage from './views/HistoryPage/HistoryPage';
import SubscriptionPage from './views/SubscriptionPage/SubscriptionPage';
import ForgotPassword from './views/ForgotPassword/ForgotPassword';
import UploadCoachPage from './views/UploadCoach/UploadCoach'
import CoachLandingPage from './views/CoachLandingPage/CoachLandingPage'
import ChatPage from './views/ChatPage/ChatPage'
import DetailCoachPage from './views/DetailCoachPage/DetailCoachPage'
function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(UploadVideoPage, true)} />
          <Route exact path="/video/:videoId" component={Auth(DetailVideoPage, true)} />
          <Route exact path="/chat" component={Auth(Chat, null)} />
          <Route exact path="/questions" component={Auth(QuestionsLanding, null)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
          <Route exact path="/user/cart" component={Auth(CartPage, null)} />
          <Route exact path="/history" component={Auth(HistoryPage, null)} />
          <Route exact path="/subscription" component={Auth(SubscriptionPage, true)} />
          <Route exact path="/forgot" component={Auth(ForgotPassword, null)} />
          <Route exact path="/coach/upload" component={Auth(UploadCoachPage, true)} />
          <Route exact path="/coaches" component={Auth(CoachLandingPage, null)} />
          <Route exact path="/room" component={Auth(ChatPage, null)} />
          <Route exact path="/coach/:coachId" component={Auth(DetailCoachPage, true)} />

        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
