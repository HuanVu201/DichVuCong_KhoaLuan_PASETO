import { IHoSo } from "@/features/hoso/models";
import { IWithChildren } from "@/types";
import { createContext, useContext, useState } from "react";
import { NavigateOptions, SetURLSearchParams, useSearchParams } from "react-router-dom";


const TraCuuContext = createContext<ITraCuuContext | null>(null)

export interface ITraCuuContext {
    hoSo: IHoSo | undefined;
    setHoSo: React.Dispatch<React.SetStateAction<IHoSo | undefined>>;
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
    handleUrlQueryStringChange: (formData: Record<string, string>, navOpts?: NavigateOptions ) => void;

} 

export const useTraCuuContext = () => {
    const context = useContext(TraCuuContext)
    if(!context)
        throw new Error("TraCuuContext must be used inside TraCuuContext.Provider")
    return context
}

export const TraCuuProvider = (props: IWithChildren) => {
    const [hoSo, setHoSo] = useState<IHoSo>()
    const [searchParams, setSearchParams] = useSearchParams()
    const handleUrlQueryStringChange = (formData: Record<string, string>, navOpts?: NavigateOptions) => {
        setSearchParams((curr) => {
          const urlQuery: Record<string, string> = {}
          curr.forEach((value, key) => {
            if(value !== undefined){
              urlQuery[key] = value
            }
          });
    
          Object.keys(formData).map((key) => {
            if(formData[key]){
              if(["maTinh", "maHuyen", "maXa"].includes(key)){
                urlQuery["donVi"] = formData[key] 
              } else {
                urlQuery[key] = formData[key] 
              }
            } else {
              delete urlQuery[key]
            }
          })
          return {...urlQuery}
        }, navOpts)
      }
    return <TraCuuContext.Provider value={{
        hoSo,
        setHoSo,
        searchParams,
        setSearchParams,
        handleUrlQueryStringChange
    }}>
        {props.children}
    </TraCuuContext.Provider>
}