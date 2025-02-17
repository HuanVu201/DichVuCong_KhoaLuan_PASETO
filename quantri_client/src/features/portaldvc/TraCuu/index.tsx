import "./index.scss"
import { SearchHoSoPortal } from "./components/Search";
import ContentTraCuuPortal from "./components/Content";
import { TraCuuProvider } from "./context/TraCuuProvider";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchPublicConfig } from "@/features/config/redux/action";
const TraCuuHoSoPortalWrapper = () => {
  const {publicModule} = useAppSelector(state => state.config)
  const dispatch = useAppDispatch()
  
  const recaptchaSiteKey = useMemo(() => {
    return publicModule?.find(module => module.code === "recaptcha_site_key")?.content || ""
  }, [publicModule])
  // console.log(recaptchaSiteKey);
  
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
      <TraCuuProvider >
      <div className="containerTraCuu commonBackgroundTrongDong">
          <SearchHoSoPortal />
      </div>
    </TraCuuProvider>
    </GoogleReCaptchaProvider>
  )
};
export default TraCuuHoSoPortalWrapper