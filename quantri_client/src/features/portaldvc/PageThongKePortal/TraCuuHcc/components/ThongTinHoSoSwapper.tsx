import { AntdTab, IAntdTabsProps } from "@/lib/antd/components";
import { CaretDownOutlined } from "@ant-design/icons";
import ThongTinHoSoTraCuu from "./ThongTinHoSo";
import ThongTinQuaTrinhXuLy from "./ThongTinQuaTrinhXuLy";

export const ThongTinHoSoSwapper = () => {
    const DVCTab: IAntdTabsProps["items"] = [

        {
            label: "Thông tin",
            key: "thong-tin",
            children: <ThongTinHoSoTraCuu />,
        },
        {
            label: "Quá trình xử lý",
            key: "qua-trinh-xu-ly",
            children: <ThongTinQuaTrinhXuLy />,
        },
    ];


    return (<>
        <div className="thongTinTraCuuHoSo">
            <div className="title">
                <b>Thông tin hồ sơ</b>
            </div>
        </div>
        <AntdTab
            size="small"
            style={{ margin: '10px auto' }}
            type="card"
            items={DVCTab}
            moreIcon={<CaretDownOutlined />}
        />
    </>
    );
};
