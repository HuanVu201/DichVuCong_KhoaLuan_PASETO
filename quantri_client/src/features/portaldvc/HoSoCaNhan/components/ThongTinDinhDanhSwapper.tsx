import "./ThongTinDinhDanhComponent.scss"
import iconDVC from "../../../../assets/images/info-white.svg"
import { DiaChi, IUser } from "@/features/user/models";
import { IUserPortal } from "../../UserPortal/models/UserPortal";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { useMemo, useState } from "react";
import { TSTypeHelpers } from "@/lib/typescripts";
import { CheckCircleFilled, EditFilled, LoadingOutlined } from "@ant-design/icons";
import { Button, Spin, Tag } from "antd";
import { toast } from "react-toastify";
import { userService } from "@/features/user/services";
import { GetUser, SearchUser } from "@/features/user/redux/Actions";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ThongTinDinhDanhComponent from "./ThongTinDinhDanhComponent";


const ThongTinDinhDanhWrapper = () => {
    const { publicModule } = useAppSelector(state => state.config)
    const dispatch = useAppDispatch()

    const recaptchaSiteKey = useMemo(() => {
        return publicModule?.find(module => module.code === "recaptcha_site_key")?.content || ""
    }, [publicModule])
    // console.log(recaptchaSiteKey);

    if (!recaptchaSiteKey)
        return <></>
    return (
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}
            container={{
                parameters: {
                    badge: undefined,
                    theme: undefined,
                }
            }}>
            <ThongTinDinhDanhComponent />

        </GoogleReCaptchaProvider>
    )
};
export default ThongTinDinhDanhWrapper