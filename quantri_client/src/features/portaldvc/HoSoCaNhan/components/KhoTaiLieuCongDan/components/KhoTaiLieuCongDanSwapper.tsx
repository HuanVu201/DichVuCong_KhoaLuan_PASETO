import { AntdTab, IAntdTabsProps } from "@/lib/antd/components";
import { KhoTaiLieuCongDanProvider, useKhoTaiLieuCongDanContext } from "../contexts/KhoTaiLieuCongDanContext";
import TaiLieuCaNhanTable from "./TaiLieuCaNhanTable";
import TaiLieuDuocChiaSeTable from "./TaiLieuDuocChiaSeTable";
import { CaretDownOutlined } from "@ant-design/icons";
import iconDVC from "../../../../../../assets/images/info-white.svg"
import "../../TaiLieuDienTuComponent.scss"
import "./index.scss"
import TaiLieuKySoTable from "../../KhoTaiLieuCongDanNamDinh/components/TaiLieuKySoTable";
import LoaiGiayToCaNhanTable from "../../KhoTaiLieuCongDanNamDinh/components/LoaiGiayToCaNhanNamDinhTable";
import NhomGiayToCaNhanTable from "../../KhoTaiLieuCongDanNamDinh/components/NhomGiayToCaNhanNamDinhTable";
import ThongKeTaiLieuCongDan from "../../KhoTaiLieuCongDanNamDinh/components/ThongKeTaiLieu";
import TraCuuTaiLieuCaNhanTable from "./TraCuuTaiLieuCaNhanTable";
import ThongKeTaiLieuCaNhanTable from "./ThongKeTaiLieuCaNhanTable";

function KhoTaiLieuCongDanComponent() {
    const khoTaiLieuContext = useKhoTaiLieuCongDanContext()
    const DVCTab: IAntdTabsProps["items"] = [

        {
            label: "Tài liệu cá nhân",
            key: "tai-lieu-ca-nhan",
            children: <TaiLieuCaNhanTable />,
        },
        {
            label: "Tài liệu được chia sẻ",
            key: "tai-lieu-duoc-chia-se",
            children: <TaiLieuDuocChiaSeTable />,
        },
        {
            label: "Giấy tờ đã ký số",
            key: "tai-lieu-ky-so",
            children: <TaiLieuKySoTable />,
        },
        {
            label: "Tra cứu tài liệu",
            key: "tra-cuu-tai-lieu",
            children: <TraCuuTaiLieuCaNhanTable />,
        },
        {
            label: "Thống kê tài liệu",
            key: "thong-ke-tai-lieu",
            children: <ThongKeTaiLieuCaNhanTable />,
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
            label: "Thống kê tài liệu theo loại/nhóm",
            key: "thong-ke-tai-lieu-theo-loai",
            children: <ThongKeTaiLieuCongDan />,
        },
    ];

    const handleTabChange = (key: string) => {
        if (key == 'loai-giay-to') {
            khoTaiLieuContext.setTypeLoaiNhom('Loại giấy tờ')
        } else if (key == 'nhom-giay-to') {
            khoTaiLieuContext.setTypeLoaiNhom('Nhóm giấy tờ')
        } else {
            khoTaiLieuContext.setTypeLoaiNhom(undefined)
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


const KhoTaiLieuCongDanWrapper = () =>
(
    <KhoTaiLieuCongDanProvider>
        <KhoTaiLieuCongDanComponent />
    </KhoTaiLieuCongDanProvider>
)

export default KhoTaiLieuCongDanWrapper;