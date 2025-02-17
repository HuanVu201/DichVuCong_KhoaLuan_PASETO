import { useMemo } from "react";
import { ColumnsType } from "antd/es/table";
import { IBasePagination } from "../../../models";
import { useButtonActionContext } from "../contexts/ButtonActionsContext";
import { IYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import { getCurrency } from "@/utils";
import { Space } from "antd";
import { HoSoTableActions } from "./useHoSoColumn";
import { useChoThuPhiContext } from "@/pages/dvc/thuphilephi/chothuphi/contexts/ChoThuPhiContext";
import dayjs from "dayjs"
import { useAppSelector } from "@/lib/redux/Hooks";

export const useCanBoYeuCauThanhToanColumn = ({
  pagination,
  items,
}: {
  pagination: IBasePagination;
  items: HoSoTableActions[];
}) => {
  const yeuCauThanhToanContext = useChoThuPhiContext();
  const { data: hoSo } = useAppSelector(state => state.hoso)
  const columns = useMemo((): ColumnsType<IYeuCauThanhToan> => {
    return [
      {
        title: "STT",
        width: "5%",
        align: "center",
        render: (_, record, idx) => {
          const pageNumber = pagination.pageNumber ?? 1
          const pageSize = pagination.pageSize ?? 10
          return <>{(pageNumber - 1) * pageSize + idx + 1}</>
        },
      },
      {
        title: "Phí (VNĐ)",
        key: "phi",
        dataIndex: "phi",
        align: "center",
        render: (_, record) => {
          return <div style={{ textAlign: "right" }}>{getCurrency(record.phi)}</div>;
        },
      },
      {
        title: "Lệ phí (VNĐ)",
        key: "lePhi",
        dataIndex: "lePhi",
        align: "center",
        render: (_, record) => {
          return <div style={{ textAlign: "right" }}>{getCurrency(record.lePhi)}</div>;
        },
      },
      {
        title: "Số tiền (VNĐ) ",
        key: "soTien",
        dataIndex: "soTien",
        align: "center",
        render: (_, record) => {
          return <div style={{ textAlign: "right" }}>{getCurrency(record.soTien)}</div>;
        },
      },
      {
        title: "Hình thức thu",
        key: "hinhThucThu",
        align: "center",
        dataIndex: "hinhThucThu",
      },
      {
        title: "Trạng thái",
        key: "trangThai",
        align: "center",
        dataIndex: "trangThai",
      },
      {
        title: "Ngày yêu cầu",
        key: "ngayYeuCau",
        dataIndex: "ngayYeuCau",
        align: 'center',
        render(value, record, index) {
          return (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', }}>

                <div
                  style={{ fontWeight: '400' }}
                >
                  {dayjs(record.ngayYeuCau).format('DD/MM/YYYY')}
                </div>
              </div>

            </>
          )
        },
      },
      {
        title: "Thao tác",

        dataIndex: "",
        width: "10%",
        align: "center",
        key: "",
        render: (_, record) => {
          return (
            <Space direction="horizontal">
              {items?.map((item: any, index: number) => {
                if (
                  record.trangThai == "Đã thanh toán")
                  if (record.loaiBienLaiThanhToan == 'local' && item.key == "phiLephi")
                    return (
                      <span
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          yeuCauThanhToanContext.setSelectedIds([record.id]);
                        }}
                      >
                        {item.icon}
                      </span>
                    );
                  else if (record.loaiBienLaiThanhToan == 'vnpt' && (item.key == "phi" || item.key == "lePhi"))
                    return (
                      <span
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          yeuCauThanhToanContext.setSelectedIds([record.id]);
                        }}
                      >
                        {item.icon}
                      </span>);
                  else if (item?.key == 'paymentPlatform' && record?.hinhThucThanhToan == "truc-tuyen") {
                    return (
                      <span
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          yeuCauThanhToanContext.setSelectedIds([record.id]);
                          yeuCauThanhToanContext.setSelectedMaGiaoDich(record.maThamChieuGiaoDich)
                        }}
                      >
                        {item.icon}
                      </span>
                    );
                  }
              })}
            </Space>
          );
        },
      },
    ];
  }, [pagination, hoSo]);
  return columns;
};
