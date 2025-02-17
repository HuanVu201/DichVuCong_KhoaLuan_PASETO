import { useMemo, useState } from "react";
import { IThuTuc } from "../models";
import { ColumnsType } from "antd/es/table";
import { Popconfirm, Space, TableColumnsType, Table } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  ForkOutlined,
  EyeOutlined,
  UnorderedListOutlined,
  MoneyCollectOutlined,
  EditOutlined,
  DollarOutlined,
  AppstoreAddOutlined,
  MoreOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "../../../lib/redux/Hooks";
import { DeleteThuTuc, UpdateThuTuc } from "../redux/action";
import { IBasePagination } from "../../../models";
import { useThuTucContext } from "../contexts/ThuTucContext";
import { usePhiLePhiContext } from "@/features/philephi/contexts/PhiLePhiContext";
import { useHoSoTheoBaoCaoTongHopContext } from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import { useBaoCaoTongHopContext } from "@/features/thongKe/ThongKeTheoDonVi/context/BaoCaoTongHopContext";
export const useColumnTongHopThuTuc = (pagination: IBasePagination) => {
  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
  const thuTucContext = useThuTucContext();
  const thongKeHoSoContext = useBaoCaoTongHopContext();
  const handleLoadHoSo = (maTTHC: string) => {
    hoSoTheoBaoCaoTongHopContext.setHoSoTheoBaoCaoTongHopModalVisible(true);
    hoSoTheoBaoCaoTongHopContext.setSearchParams({
      pageNumber: 1,
      pageSize: 20,
      MaTTHC: maTTHC,
      MaDinhDanh: thongKeHoSoContext.searchBaoCaoThuTuc.maDinhDanh,
      TuNgay: thongKeHoSoContext.searchBaoCaoThuTuc.tuNgay,
      DenNgay: thongKeHoSoContext.searchBaoCaoThuTuc.denNgay,
      tieuChi: "",
    });
  };
  const expandedColumns = useMemo(() => {
    const columns: TableColumnsType<IThuTuc> = [
      {
        title: "STT",
        width: "5%",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Mã thủ tục",
        key: "maTTHC",
        dataIndex: "maTTHC",
      },
      {
        title: "Tên thủ tục",
        key: "tenTTHC",
        dataIndex: "tenTTHC",
      },
      {
        title: "Có phí, lệ phí",
        key: "trangThaiPhiLePhi",
        dataIndex: "trangThaiPhiLePhi",
        align: "center",
        render: (text) =>
          text == true ? (
            <CheckCircleOutlined
              style={{ color: "green" }}
            ></CheckCircleOutlined>
          ) : (
            <CloseCircleOutlined style={{ color: "red" }}></CloseCircleOutlined>
          ),
      },
      //   {
      //     title: "Sử dụng",
      //     key: "suDung",
      //     dataIndex: "suDung",
      //     align: "center",
      //     render: (text, record) => (
      //       <Space style={{ cursor: "pointer" }} direction="horizontal">
      //         <Popconfirm
      //           title="Cập nhật?"
      //           onConfirm={() => {
      //             dispatch(
      //               UpdateThuTuc({
      //                 id: record.id,
      //                 data: {
      //                   ...record,
      //                   suDung: !record.suDung,
      //                   linhVucId: "",
      //                   goiTinThuTucQG: null as any,
      //                   ngayCapNhat: record.ngayCapNhat,
      //                 },
      //               })
      //             );
      //           }}
      //           okText="OK"
      //           cancelText="Huỷ"
      //         >
      //           {text == true ? (
      //             <CheckCircleOutlined
      //               style={{ color: "green" }}
      //             ></CheckCircleOutlined>
      //           ) : (
      //             <CloseCircleOutlined
      //               style={{ color: "red" }}
      //             ></CloseCircleOutlined>
      //           )}
      //         </Popconfirm>
      //       </Space>
      //     ),
      //   },
      //   {
      //     title: "Liên thông",
      //     key: "lienThong",
      //     align: "center",
      //     render: (_, record) => {
      //       return record.lienThong ? (
      //         <CheckCircleOutlined style={{ color: "green" }} />
      //       ) : (
      //         <CloseCircleOutlined style={{ color: "red" }} />
      //       );
      //     },
      //   },
      {
        title: "Thao tác",
        width: "10%",
        align: "center",
        key: "thaotac",
        render: (_, record) => (
          <Space direction="horizontal">
            <EditOutlined
              style={{ color: "cornflowerblue" }}
              title="Xem chi tiết thủ tục"
              onClick={() => {
                thuTucContext.setThuTucId(record.id);
                thuTucContext.setThuTucModalVisible(true);
              }}
            />
            <UnorderedListOutlined
              title="Xem danh sách hồ sơ thuộc thủ tục"
              onClick={() => {
                // console.log(record.id);
                handleLoadHoSo(record.maTTHC);
              }}
            />
          </Space>
        ),
      },
    ];
    return columns;
  }, [pagination]);
  // const columns = useMemo((): ColumnsType<IThuTuc> => {
  //     return [
  //         { title: 'Tên lĩnh vực', dataIndex: 'linhVucChinh', key: 'linhVucChinh' },
  //         { title: 'Mã lĩnh vực', dataIndex: 'maLinhVucChinh', key: 'maLinhVucChinh' },
  //     ];
  // }, [pagination])
  return { expandedColumns };
};
