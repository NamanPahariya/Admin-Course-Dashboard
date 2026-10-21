import { redirect } from "react-router";

export const guestLoader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return redirect("/dashboard");
  }
  return null;
};
