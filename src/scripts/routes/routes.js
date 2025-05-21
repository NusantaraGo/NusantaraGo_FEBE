import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import LoginPage from "../pages/login/login-page";
import RegisterPage from "../pages/register/register-page";
import ProfilePage from "../pages/profile/profile-page";

const routes = {
  "/": new HomePage(),
  "/about": new AboutPage(),
  "/login": new LoginPage(),
  "/register": new RegisterPage(),
  "/profile": new ProfilePage(),
};

export default routes;
