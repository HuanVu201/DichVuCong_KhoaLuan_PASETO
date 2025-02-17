import { AntdTab, IAntdTabsProps } from "@/lib/antd/components";
import { CaretDownOutlined } from "@ant-design/icons";
import iconDVC from "../../../../../../assets/images/info-white.svg"
import "../../TaiLieuDienTuComponent.scss"
import "./index.scss"
import { KhoTaiLieuCongDanNamDinhProvider, useKhoTaiLieuCongDanNamDinhContext } from "../contexts";
import LoaiGiayToCaNhanTable from "./LoaiGiayToCaNhanNamDinhTable";
import NhomGiayToCaNhanTable from "./NhomGiayToCaNhanNamDinhTable";
import TaiLieuCaNhanNamDinhTable from "./TaiLieuCaNhanNamDinhTable";
import ThongKeTaiLieuCongDan from "./ThongKeTaiLieu";
import TaiLieuKySoNamDinhTable from "./TaiLieuKySoTable";

function KhoTaiLieuCongDanNamDinhComponent() {
    const khoTaiLieuDienTuContext = useKhoTaiLieuCongDanNamDinhContext()
    const DVCTab: IAntdTabsProps["items"] = [

        {
            label: "Tài liệu cá nhân",
            key: "tai-lieu-ca-nhan",
            children: <TaiLieuCaNhanNamDinhTable />,
        },
        {
            label: "Giấy tờ đã ký số",
            key: "tai-lieu-ky-so",
            children: <TaiLieuKySoNamDinhTable />,
        },
        {
            label: "Danh mục loại giấy tờ",
            key: "loai-giay-to",
            children: <LoaiGiayToCaNhanTable />,
        },
        {
            label: "Danh mục nhóm giấy tờ",
            key: "nhom-giay-to",
            children: <NhomGiayToCaNhanTable />,
        },
        {
            label: "Thống kê tài liệu",
            key: "thong-ke-tai-lieu",
            children: <ThongKeTaiLieuCongDan />,
        },
    ];

    const handleTabChange = (key: string) => {
        if (key == 'loai-giay-to') {
            khoTaiLieuDienTuContext.setTypeLoaiNhom('loại giấy tờ')
        } else if (key == 'nhom-giay-to') {
            khoTaiLieuDienTuContext.setTypeLoaiNhom('nhóm giấy tờ')
        } else {
            khoTaiLieuDienTuContext.setTypeLoaiNhom(undefined)
        }
    }

    return (<>

        <div className="taiLieuDienTu">

            <div className="main-title">
                <div className="icon">
                    <img src={iconDVC} />
                </div>
                <div className="title">Kho tài liệu cá nhân</div>
            </div>
            <div className="KhoTaiLieuCongDanSwapper">
                <AntdTab
                    size="small"
                    style={{ margin: '10px auto' }}
                    type="card"
                    items={DVCTab}
                    moreIcon={<CaretDownOutlined />}
                    onChange={handleTabChange}
                />
            </div>
        </div>
    </>)
}


const KhoTaiLieuCongDanNamDinhWrapper = () =>
(
    <KhoTaiLieuCongDanNamDinhProvider>
        <KhoTaiLieuCongDanNamDinhComponent />
    </KhoTaiLieuCongDanNamDinhProvider>
)

export default KhoTaiLieuCongDanNamDinhWrapper;