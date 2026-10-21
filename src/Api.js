import axios from "axios";
import api from "./axiosInstance";

export async function login(formdata) {
  try {
    const response = await api.post("/auth/login", formdata, {});
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function getCourse() {
  try {
    const response = await api.get("/courses");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function createCourse(data) {
  try {
    const response = await api.post("/courses", data, {});

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateCourse({ data, courseId }) {
  try {
    const response = await api.put(`/courses/${courseId}`, data, {});

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function DeleteCourse(courseId) {
  try {
    const response = await api.delete(`/courses/${courseId}`, {});

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
