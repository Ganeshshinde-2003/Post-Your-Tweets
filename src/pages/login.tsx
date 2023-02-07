import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../App.css";

export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    navigate("/");
  };
  return (
    <div className="userlogin">
      <h3>Sign in with Google To Continue</h3>
      <button onClick={signInWithGoogle}> Sign in with Google</button>
    </div>
  );
};
