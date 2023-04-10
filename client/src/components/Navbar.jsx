import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  //gets the jwt token from the cookies and sets it's name to access_token
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    //set the access_token cookie to be empty
    setCookies("access_token", "");
    //clear userID from local storage
    window.localStorage.removeItem("userID");
    //nav to login page
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create-recipe">create recipes</Link>
      {/* if not signed in/no cookies with access token show login/signup buttons */}
      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <>
          {/* if you are logged in show saved recipes and logout button */}
          <Link to="/saved-recipes">saved recipes</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};
