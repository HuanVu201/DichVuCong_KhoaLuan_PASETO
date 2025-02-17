import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Spin } from "antd";
import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchPublicConfig } from "../config/redux/action";

const DVCQuocGia = () => {
    const { data: auth, loading: authLoading } = useAppSelector(state => state.auth)
    const { data: user } = useAppSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const encodeToBase64 = (str: string) => {
        const utf8Bytes = new TextEncoder().encode(str);
        const binaryString = Array.from(utf8Bytes).map(byte => String.fromCharCode(byte)).join('');
        return window.btoa(binaryString);
    };
    const { publicModule } = useAppSelector(state => state.config)

    useEffect(() => {
        dispatch(SearchPublicConfig())
    }, [])
    const [client_id, redirect_uri] = useMemo(() => {
        return [publicModule?.find(x => x.code == 'client_id'), publicModule?.find(x => x.code == 'redirect_uri')]
    }, [publicModule])
    const [searchQuerys, setSearchQuerys] = useSearchParams();
    const vnConnect = searchQuerys.get('vnconnect')
    const maThuTuc = searchQuerys.get('MaTTHCDP')
    const maDonVi = searchQuerys.get('MaCoQuanThucHien')
    const maDVC = searchQuerys.get('MaDVC')
    let urlState = window.location.origin + "/portaldvc/nop-ho-so-truc-tuyen?maTTHC=" + maThuTuc + "&donVi=" + maDonVi;
    let urlStateDecode = encodeToBase64(urlState)
    //https://apidvc.thanhhoa.gov.vn/sso/callback
    //2rdhV_6bkdetqfJeqSD_6AY9Y40a
    const urlDangNhapDVCQuocGia = `https://xacthuc.dichvucong.gov.vn/oauth2/authorize?response_type=code&client_id=${client_id?.content}&redirect_uri=${redirect_uri?.content}&scope=openid&acr_values=LoA1&state=` + urlStateDecode
    console.log(urlStateDecode);
    console.log(urlDangNhapDVCQuocGia);

    useEffect(() => {
        if (client_id && redirect_uri) {
            if (vnConnect == "1" && auth == undefined) {
                window.location.href = urlDangNhapDVCQuocGia
                // navigate(urlDangNhapDVCQuocGia, { replace: true })
            }
            else {
                // navigate(urlState, { replace: true })
                window.location.href = urlState
            }
        }
    },[client_id,redirect_uri])

    // if (vnConnect == "1" && auth == undefined) {
    //     window.location.href = urlDangNhapDVCQuocGia
    //     // navigate(urlDangNhapDVCQuocGia, { replace: true })
    // }
    // else {
    //     // navigate(urlState, { replace: true })
    //     window.location.href = urlState

    // }
    return <Spin style={{ display: "flex", alignItems: "center", justifyContent: "center" }} spinning={authLoading}>

    </Spin>
}

export default DVCQuocGia


