import axios from "axios";
import { API_VERSION, HOST_PATH, BEARER_TOKEN, HOST_PATH_FILE, UPLOADFILE_ENDPOINT } from "../../data/constant";
import { ICredential, IResult } from "../../models";
import { StoreType } from '../redux/Store';
import { RefreshToken } from "@/features/auth/redux/Actions";
import { resetData as resetAuth } from "@/features/auth/redux/Slice";
import { resetData as resetUser } from "@/features/user/redux/Slice";
import { toast } from "react-toastify";
import { RcFile } from "antd/es/upload";

let store: StoreType;

export const injectStoreFile = (_store: StoreType) => {
  store = _store;
}

const axiosInstanceFile = axios.create({
  baseURL: HOST_PATH_FILE,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    accept: "application/json",
  },
});

export const getToken = () => {
  if (process.env.NODE_ENV !== "production" && BEARER_TOKEN) {
    return BEARER_TOKEN;
  }
  const auth = localStorage.getItem("persist:root");
  const authKey = auth != null ? JSON.parse(auth) : null;
  if (authKey) {
    return JSON.parse(authKey?.auth)?.data?.token;
  }
  return null;
}

axiosInstanceFile.defaults.headers.common['Tenant'] = `root`;
axiosInstanceFile.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
axiosInstanceFile.defaults.withCredentials = false;

// Add a flag to track whether a refresh token request is ongoing
let isRefreshing = false;

// Array to hold requests waiting for the token to be refreshed
let refreshSubscribers: ((token: string) => void)[] = [];

// Function to handle the subscribers (pending requests)
const onRrefreshed = (newToken: string) => {
  refreshSubscribers.map((callback) => callback(newToken));
  refreshSubscribers = []; // Clear the subscribers once token is refreshed
}

// Subscribe to refresh token process
const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
}

axiosInstanceFile.interceptors.request.use((config) => {
  const token = store.getState().auth.data?.token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosInstanceFile.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If a refresh token request is already ongoing, queue the requests
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken: string) => {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            resolve(axiosInstanceFile(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const credential = store.getState().auth.data;
        if (credential) {
          // Call refresh token API
          const response = await store.dispatch(RefreshToken({
            token: credential.token,
            refreshToken: credential.refreshToken
          })).unwrap();

          // Update token in the original request and retry
          originalRequest.headers['Authorization'] = `Bearer ${response.token}`;
          // Notify all the subscribers (queued requests) with the new token
          onRrefreshed(response.token);
          isRefreshing = false;

          return axiosInstanceFile(originalRequest);
        }
      } catch (error) {
        // In case of error during token refresh, log out user
        isRefreshing = false;
        toast.warning("Hết phiên đăng nhập, vui lòng đăng nhập lại");
        store.dispatch(resetAuth());
        store.dispatch(resetUser());
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const parseParams = (params: any):string=>{
  let options:string = "";
  let k: keyof typeof params;
  for(k in params){
    
    const isParamTypeObject = typeof params[k] === 'object';
   
    const isParamTypeArray = isParamTypeObject && (params[k]?.length >=0);
    if (!isParamTypeObject && params[k]) {
      options += `${k}=${params[k]}&`;
    }

    if (isParamTypeObject && isParamTypeArray && params[k]) {    
      // let arr = params[k] as string[];  
      params[k].forEach((element: string, index: number) => {
        let key = k as string;
        options += `${key}[${index}]=${element}&`;
      });
    }
  }

  return  options ? options.slice(0, -1) : options;
}
export const uploadFile = async (file: RcFile, folderName: string | undefined, onSuccess: any, onError: any, endpoint: string = UPLOADFILE_ENDPOINT) => {
  const formData = new FormData();
  formData.append('Files', file);
  formData.append('FolderName', folderName || "File");

  try {
    const response = await axiosInstanceFile.post(API_VERSION + endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    onSuccess(response.data);
  } catch (error) {
    onError(error);
  }
};
export default axiosInstanceFile;