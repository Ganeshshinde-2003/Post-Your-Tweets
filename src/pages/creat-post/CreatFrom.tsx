import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreatFormData {
  title: string;
  description: string;
}

export const CreatForm = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const schema = yup.object().shape({
    title: yup.string().required("You Must Add A Title."),
    description: yup
      .string()
      .required("You Must Add A Description About Your Post"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatFormData>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const onCreatPost = async (data: CreatFormData) => {
    await addDoc(postRef, {
      title: data.title,
      description: data.description, //or using these two lines just ...user
      username: user?.displayName,
      userId: user?.uid,
      userPhoto: user?.photoURL,
    });
    navigate("/");
  };
  return (
    <div className="formpost">
      <form id="formcreate" onSubmit={handleSubmit(onCreatPost)}>
        <h1 className="creat"> Creat Some Creativity </h1>
        <input id="titlename" placeholder="Title...." {...register("title")} />
        <p>{errors.title?.message}</p>
        <textarea
          id="textareadis"
          placeholder="Description..."
          cols={40}
          rows={10}
          draggable="false"
          {...register("description")}
        />
        <p>{errors.description?.message}</p>

        <input id="submit" type="submit" />
      </form>
    </div>
  );
};
