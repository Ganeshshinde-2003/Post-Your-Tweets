import { Link } from "react-router-dom";
import "../App.css";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const signuserOut = async () => {
    await signOut(auth);
  };
  return (
    <div className="header">
      <div className="photo">
        {user && (
          <>
            <h3 id="username">{user?.displayName}</h3>
            <img
              id="userphoto"
              src={user?.photoURL || ""}
              width="100"
              height="100"
            />
            <button id="logout" onClick={signuserOut}>
              Log Out
            </button>
          </>
        )}
      </div>
      <div className="links">
        <Link className="link1" to="/">
          HOME
        </Link>
        {!user ? (
          <Link className="link1" to="/login">
            LOGIN
          </Link>
        ) : (
          <Link className="link1" to="/creatpost">
            CREAT POST
          </Link>
        )}
      </div>
    </div>
  );
};

export default auth;
