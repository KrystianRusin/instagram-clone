async function updateSessionStorage() {
  const currUser = JSON.parse(sessionStorage.getItem("user"));
  if (!currUser || !currUser.username) {
    console.log("No user in session storage to update");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/users/${currUser.username}`
    );
    const updatedUser = await response.json();

    console.log("Updated user data:");

    // Update the session storage with the updated user data
    sessionStorage.setItem("user", JSON.stringify(updatedUser));

    // Return the updated user data
    return updatedUser;
  } catch (error) {
    console.log("An error occurred while updating session storage:", error);
  }
}

export default updateSessionStorage;
