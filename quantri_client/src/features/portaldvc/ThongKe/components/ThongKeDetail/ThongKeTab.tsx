import { AntdTab, IAntdTabsProps } from "@/lib/antd/components";
import { Space } from "antd";
import { ThongKeThanhToanTrucTuyen } from "./ThanhToanTrucTuyen";
import { ThongKeTienDoGiaiQuyet } from "./TienDoGiaiQuyet";
import { ThongKeChiTieuDVC } from "./ChiTieuDVC";
import { ThongKeChiTieuSoHoa } from "./ChiTieuSoHoa";
import { ThongKeTongHop } from "./TongHop";
import { CaretDownOutlined } from "@ant-design/icons";
import { useThongKe } from "../../hooks/useThongKe";



export const ThongKeTab = () => {
  const DVCTab: IAntdTabsProps["items"] = [

    {
      label: "Thống kê tổng hợp",
      key: "thong-ke-tong-hop",
      children: <ThongKeTongHop useThongKe={useThongKe}/>,
    },
    {
      label: "Tiến độ giải quyết",
      key: "tien-do-giai-quyet",
      children: <ThongKeTienDoGiaiQuyet />,
    },
    {
      label: "Dịch vụ công trực tuyến",
      key: "dvc-truc-tuyen",
      children: <ThongKeChiTieuDVC />,
    },
    {
      label: "Thanh toán trực tuyến",
      key: "thanh-toan-truc-tuyen",
      children: <ThongKeThanhToanTrucTuyen/>,
    },
    {
      label: "Số hóa hồ sơ",
      key: "so-hoa-ho-so",
      children: <ThongKeChiTieuSoHoa />,
    },
    
  ];
  
  
  return (
      <AntdTab
        size="small"
        style={{ margin: '10px auto' }}
        type="line"
        items={DVCTab}
        moreIcon={<CaretDownOutlined />}
      />
  );
};
