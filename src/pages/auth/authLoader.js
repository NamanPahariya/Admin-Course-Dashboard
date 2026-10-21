import { redirect } from "react-router";

export const authLoader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }
  return null;
};
