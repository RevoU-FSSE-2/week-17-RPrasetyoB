import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ApiUrl } from "./api";

interface loginValue {
  username: string;
  password: string;
}

const useFetchApi = () => {
  const navigate = useNavigate();

  const loginUser = async (values : loginValue) => {
    try {
      const Url = ApiUrl + '/v1/auth/login';
      const response = await fetch(Url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include", 
      })
      return response
    } catch (error) {
      console.error("An error occurred:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "An error occurred while processing your request. Please try again later.",
      });
    }
  }  

  const fetchList = async () => {
    try {
      const Url = ApiUrl + '/v1/tasks';
      const response = await fetch(Url, {
        method: "GET",
        credentials: "include",
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const Url = ApiUrl + `/v1/tasks/${id}`;
      const response = await fetch(Url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      return response;
    } catch (error) {
      console.error("Error while deleting category:", error);
    }
  };

  const handleLogout = () => {
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    navigate("/login");
    Swal.fire("Logged Out");
  };

  return {
    loginUser,
    fetchList,
    deleteTask,
    handleLogout,
  };
};

export default useFetchApi;
