import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logoutUserAction } from "../state/action-creators/authActions";
import { AuthActionType } from "../state/actions/auth";
import { RootState, removeStoreData } from "../state/store";
import { useAppSelector } from "../hooks/useAppSelector";
import { UserInfoType } from "../types/UserTypes";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userInfo } = useAppSelector(
    (state: RootState) => state.loginUser as UserInfoType
  );

  const handleLogoutUser = () => {
    if (!userInfo) {
      toast.error("You are not logged in!");
    }
    dispatch(logoutUserAction() as unknown as AuthActionType);
    removeStoreData();
    navigate("/");
  };

  return (
    <header>
      <div className="header__title">
        <h2>User Authentication</h2>
        <nav>
          <ul className="nav__items">
            <li className="nav__item">
              <Link to="/">Login</Link>
            </li>
            <li className="nav__item">
              <Link to="/register">Register</Link>
            </li>
            <li className="nav__item" onClick={handleLogoutUser}>
              <Link to="#">Logout</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
