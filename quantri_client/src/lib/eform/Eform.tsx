import { FormProps } from "@formio/react/lib/components/Form"
import {ComponentProps, ElementRef, useEffect, useState} from 'react'
import { Form, FormBuilder, Formio } from "@formio/react"
import "./index.scss"
import React from "react"
import { useAppSelector } from "../redux/Hooks"
import { API_VERSION, GETFILE_ENDPOINT, HOST_PATH_FILE } from "@/data"
import { fileApi } from "@/features/file/services"
import { getBase64UrlFromBlob } from "@/utils"
import { log } from "node:console"
export type EformProps = FormProps & {
    ref?: ElementRef<any>
    viewMode?: "view" | "edit"
}

export const Eform = ({viewMode = "edit", ...props}: EformProps) => {
  const {data: token} = useAppSelector(state => state.auth)
  useEffect(() => {
    Formio.setBaseUrl(HOST_PATH_FILE + API_VERSION + GETFILE_ENDPOINT)
    
    if(token && Formio){
      Formio.setToken(token.token)
    }
  }, [token, Formio])
  const onChange = async (formdata: any, dataChanges: any) => {
    const changes = dataChanges.changes
    if(changes != null && changes.length){
      for (let i = 0; i < changes.length; i++) {
        const component = changes[i];
        if(component.instance.type == "file"){
          const wrapperElemet : HTMLElement = component.instance.element
          const dataUrls = component.value
          let url = ""
          if(dataUrls && dataUrls.length){
            url = dataUrls[0].data.url
          }
          if(!url){
            return
          }
          
          if(wrapperElemet){
            const img : HTMLImageElement | null= wrapperElemet.querySelector('[ref="fileImage"]')
            const link : HTMLElement | null= wrapperElemet.querySelector('[ref="removeLink"]')
            if(viewMode == "view"){
              link?.remove()
            } else {
              const newLinkElement= link?.cloneNode(true);
              if(newLinkElement){
                link?.parentNode?.replaceChild(newLinkElement, link)
                newLinkElement?.addEventListener('click', async (e) => {
                  e.preventDefault();
                  if (confirm("Xác nhận xóa đính kèm?")) {
                    await fileApi.RemoveFile({path: url})
                    link?.click();
                    wrapperElemet.remove()
                  }
                });
              }
            }
            if(img){
              const imgBase64 = await getBase64UrlFromBlob(url)
              img.src = imgBase64
              img.alt = "Có lỗi xảy ra khi hiển thị hình ảnh: " + img.alt + ", vui lòng thử lại sau"
            }
          }
        }
      }
    }
    props.onChange ? props.onChange(formdata, dataChanges) : undefined
  }
  return<><Isolate><Form {...props}
  onChange={onChange}
  ></Form></Isolate></>
};

class Isolate extends React.Component {
    shouldComponentUpdate () {
      return false // prevent parent state changes from re-rendering FormBuilder
    }
    render () {
      return <React.Fragment>
        {(this.props as any).children}
      </React.Fragment>
    }
}



export const EFormBuilder = (props : ComponentProps<typeof FormBuilder>) => {
    return <FormBuilder {...props}>

    </FormBuilder>
}


