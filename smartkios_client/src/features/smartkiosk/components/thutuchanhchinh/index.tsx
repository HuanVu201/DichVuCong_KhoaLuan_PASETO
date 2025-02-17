import "./index.scss";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchDanhMucTTHC, SearchThuTuc } from "@/features/thutuc/redux/action";
import { ThuTucService } from "@/features/thutuc/services";
import { useParams } from "react-router-dom";
import { DanhMucThuTucPortalProvider, useDanhMucThuTucPortalContext } from "@/features/portaldvc/DanhMucThuTuc/context/DanhMucThuTucPortalContext";
import SidebarDanhMucThuTuc from "./SidebarTTHC";
import HeaderContainerTTHC from "./HeaderContainerTTHC";
import { ThuTucHanhChinhSmartKiosk } from "./ThuTucHanhChinhSmartKiosk";
import DetailThuTucHanhChinhSmartKiosk from "./DetailThuTucSmartKiosk";
import SidebarThuTucHanhChinhSmartKiosk from "./SidebarTTHC";
const ThuTucHanhChinhSmartKisokContainer = () => {
    const dispatch = useAppDispatch();
    const thuTucContext = useDanhMucThuTucPortalContext();
    let maThuTuc = thuTucContext.searchParams.get('MaThuTuc')
    // const 

    useEffect(() => {
        (async () => {
            dispatch(SearchDanhMucTTHC({
                ...thuTucContext.searchPortal,
                maLinhVuc: thuTucContext.searchParams.get('MaLinhVuc') || undefined,
                hasThuTuc: true,
                hasThuTucCapTinh: thuTucContext.searchParams.get('CapThucHien') == "CapTinh" ? true : undefined,
                hasThuTucCapHuyen: thuTucContext.searchParams.get('CapThucHien') == "CapHuyen" ? true : undefined,
                hasThuTucCapXa: thuTucContext.searchParams.get('CapThucHien') == "CapXa" ? true : undefined,
                tuKhoa: thuTucContext.searchParams.get('TuKhoa') || undefined,
            })

            );
        })();
    }, [thuTucContext.searchPortal, thuTucContext.searchParams, thuTucContext.handleUrlQueryStringChange]);

    const setIdThuTuc = async () => {
        const res: any = await dispatch(SearchThuTuc({ maTTHC: maThuTuc?.toString() }))
        const idThuTuc: string = res?.payload.data[0].id
        thuTucContext.setThuTucId(idThuTuc)
    }
    useEffect(() => {
        if (maThuTuc)
            setIdThuTuc()
    }, [])



    return (
        <div className="DanhMucTTHC_Swapper" style={{ marginTop: '50px' }}>
            <div className="row">
                <div className="col-12 col-lg-3">
                    <SidebarThuTucHanhChinhSmartKiosk />
                </div>
                <div className="col-12 col-lg-9 container">
                    <HeaderContainerTTHC />
                    <div className="container">
                        <div className="row">
                            {!thuTucContext.thuTucId ? (
                                <ThuTucHanhChinhSmartKiosk />
                            ) : (
                                <DetailThuTucHanhChinhSmartKiosk />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function DanhMucThuTucPortalWrapper() {
    return (
        <DanhMucThuTucPortalProvider>
            <ThuTucHanhChinhSmartKisokContainer />
        </DanhMucThuTucPortalProvider>
    );
}

export default DanhMucThuTucPortalWrapper;
