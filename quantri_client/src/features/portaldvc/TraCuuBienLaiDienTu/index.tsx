import "./index.scss"
import { SearchBienLaiDienTuPortal } from "./components/SearchBienLaiDienTu";
import ContentTraCuuBienLaiDienTuPortal from "./components/ContentBienLaiDienTu";
import { TraCuuBienLaiDienTuProvider } from "./context/TraCuuBienLaiDienTuProvider";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchPublicConfig } from "@/features/config/redux/action";
const TraCuuBienLaiDienTuPortalWrapper = () => {
  const {publicModule} = useAppSelector(state => state.config)
  const dispatch = useAppDispatch()
  
  const recaptchaSiteKey = useMemo(() => {
    return publicModule?.find(module => module.code === "recaptcha_site_key")?.content || ""
  }, [publicModule])
  
  if(!recaptchaSiteKey)
    return <></>
  return (
    <GoogleReCaptchaProvider  reCaptchaKey={recaptchaSiteKey}
    container={{
      parameters: {
        badge: undefined, 
        theme: undefined,
      }
    }}>
      <TraCuuBienLaiDienTuProvider >
      <div className="containerTraCuu commonBackgroundTrongDong">
          <SearchBienLaiDienTuPortal />
          
      </div>
    </TraCuuBienLaiDienTuProvider>
    </GoogleReCaptchaProvider>
  )
};
export default TraCuuBienLaiDienTuPortalWrapper