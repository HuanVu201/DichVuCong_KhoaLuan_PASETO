import axios from "axios";
import { API_VERSION, HOST_PATH,BEARER_TOKEN } from "../../data/constant";
import { ICredential } from "../../models";
import {StoreType} from '../redux/Store'
import { RefreshToken } from "@/features/auth/redux/Actions";
import { resetData as resetAuth} from "@/features/auth/redux/Slice";
import { resetData as resetUser} from "@/features/user/redux/Slice";
import { toast } from "react-toastify";

let store: StoreType

export const injectStore = (_store: StoreType)=> {
  store = _store
}

const axiosInstance = axios.create({
    baseURL: HOST_PATH,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        accept: "application/json",
    },
})

export const getToken = () => {
  if(process.env.NODE_ENV !== "production" && BEARER_TOKEN){
    return  BEARER_TOKEN
  }
  const auth = localStorage.getItem("persist:root")
  const authKey = auth != null ? JSON.parse(auth) : null
  if(authKey) {
    return JSON.parse(authKey?.auth)?.data?.token
  }
  return null
}

axiosInstance.defaults.headers.common['Tenant'] = `root`;
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
axiosInstance.defaults.withCredentials = false

axiosInstance.interceptors.request.use((config) => {
  var token = getToken();//store.getState().auth.data?.token;
  if(token)
    config.headers['Authorization'] = `Bearer ${token}`;
  
  return config;
})

axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error?.config;
      
      if (error?.response?.status === 401 && !originalRequest.sent) {
        originalRequest.sent = true;
        try {
          // const response = await axios.post<ICredential>(HOST_PATH + "/api/tokens/refresh", {
          //   withCredentials: true,
          // });
          const credential = store.getState().auth.data
          if(credential){
            const response = await store.dispatch(RefreshToken({token: credential.token, refreshToken: credential.refreshToken})).unwrap()
            originalRequest.headers.Authorization = `Bearer ${response.token}`;
          }

          return axiosInstance(originalRequest);
        } catch (error) {
          toast.warning("Hết phiên đăng nhập, vui lòng đăng nhập lại")
          store.dispatch(resetAuth())
          store.dispatch(resetUser())
          return
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
export default axiosInstance;