const createCommentHandler = async (post, commentText) => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  try {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user._id,
        postId: post._id,
        text: commentText,
      }),
    });
  } catch (error) {
    alert("An error occurred while creating the comment:", error);
  }
};

export default createCommentHandler;
