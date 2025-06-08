import HomePage from "../pages/home/home-page";
import PencarianPage from "../pages/pencarian/pencarian-page";
import LoginPage from "../pages/login/login-page";
import RegisterPage from "../pages/register/register-page";
import my_profile_page from "../pages/my_profile/my-profile-page";

const routes = {
  "/": new HomePage(),
  "/pencarian": new PencarianPage(),
  "/login": new LoginPage(),
  "/register": new RegisterPage(),
  "/profile": new my_profile_page(),
};

export default routes;
