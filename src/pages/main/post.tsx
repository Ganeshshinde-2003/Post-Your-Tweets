import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { Post } from "./main";

interface Props {
  post: Post;
}
interface Like {
  likeId: string;
  userId: string;
}

export const Posts = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likeRef = collection(db, "likes");

  const likeDoc = query(likeRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likeDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };
  useEffect(() => {
    getLikes();
  }, []);
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likeRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const liketodeletequery = query(
        likeRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const liketodeletedata = await getDocs(liketodeletequery);
      const likeid = liketodeletedata.docs[0].id;
      const liketodelete = doc(db, "likes", liketodeletedata.docs[0].id);
      await deleteDoc(liketodelete);
      // await addDoc(likeRef, {
      //   userId: user?.uid,
      //   postId: post.id,
      // });
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeid)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasuserliked = likes?.find((like) => like.userId === user?.uid);

  return (
    <div className="postspace">
      <div>
        <div className="title">
          <h1>{post.title}</h1>
        </div>
        <div className="body">
          <p> {post.description}</p>
        </div>
        <div className="footer">
          <p>
            <img
              id="userphotoatmain"
              src={post.userPhoto || ""}
              width="100"
              height="100"
            />
            <span id="postusername">@{post.username}</span>
          </p>
          <button onClick={hasuserliked ? removeLike : addLike}>
            <span id="icons">
              {hasuserliked ? <> &#10084;</> : <>&#9825;</>}
            </span>
          </button>
          {likes && <h4 id="likes">Likes: {likes?.length}</h4>}
        </div>
      </div>
    </div>
  );
};
