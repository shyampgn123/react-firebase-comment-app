import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

function App() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const commentsRef = collection(db, "comments");

  // ✅ Fetch and listen for comments on page load
  useEffect(() => {
    const q = query(commentsRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    await addDoc(commentsRef, {
      text: comment,
      createdAt: serverTimestamp(),
    });

    setComment("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>📝 Public Comments Board</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          style={{ width: "80%", padding: 8 }}
        />
        <button onClick={handleSubmit} style={{ padding: 8, marginLeft: 8 }}>
          Add Comment
        </button>
      </div>

      <div>
        <h3>All Comments:</h3>
        {comments.map((c) => (
          <div
            key={c.id}
            style={{
              background: "#f1f1f1",
              marginBottom: 8,
              padding: 10,
              borderRadius: 4,
            }}
          >
            {c.text || <i>(empty)</i>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;