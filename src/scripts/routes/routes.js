import HomePage from "../pages/home/home-page";
import PencarianPage from "../pages/pencarian/pencarian-page";
import LoginPage from "../pages/login/login-page";
import RegisterPage from "../pages/register/register-page";
import OtpPage from "../pages/otp/otp-page";

const routes = {
  "/": new HomePage(),
  "/pencarian": new PencarianPage(),
  "/login": new LoginPage(),
  "/register": new RegisterPage(),
  "/verify-otp/:id": new OtpPage(),
};

export default routes;
