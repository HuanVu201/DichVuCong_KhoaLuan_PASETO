import "./ThuTucHanhChinhSmartKiosk.scss";
import { Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useAppSelector } from "@/lib/redux/Hooks";
import { Link } from "react-router-dom";
import { IThuTuc } from "@/features/thutuc/models";
import { MUCDO_THUTUC } from "@/features/thutuc/data";
import { useDanhMucThuTucPortalContext } from "@/features/portaldvc/DanhMucThuTuc/context/DanhMucThuTucPortalContext";

export const ThuTucHanhChinhSmartKiosk = () => {
  const {
    datas: thuTucs,
    count,
    loading,
  } = useAppSelector((state) => state.thutuc);
  const thuTucPortalContext = useDanhMucThuTucPortalContext();
  const columns = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "Mã thủ tục",
      dataIndex: "maTTHC",
      key: "maTTHC",
    },
    {
      title: "Thủ tục hành chính",
      dataIndex: "tenTTHC",
      key: "tenTTHC",
      render: (text: string, record: any, index: number) => {
        return (
          <Link
            //to={`/portaldvc/danh-muc-tthc?MaThuTuc=${record.maTTHC}`}
            to={``}
            onClick={() => {
              thuTucPortalContext.setThuTucId(record.id)
            }}
          >
            {text}
          </Link>
        );
      },
    },
    {
      title: "Tên lĩnh vực",
      dataIndex: "linhVucChinh",
      key: "linhVucChinh",
    },
    {
      title: "Mức độ",
      dataIndex: "mucDo",
      key: "mucDo",
      render: (_, record) => {
        if (record.mucDo)
          return <>
            {MUCDO_THUTUC[record.mucDo]}
          </>
      }
    },
    {
      title: "Cơ quan thực hiện",
      dataIndex: "coQuanThucHienChinh",
      key: "coQuanThucHienChinh",
    },
  ] as ColumnsType<IThuTuc>;



  const onchangeTablePage = (page: number, pageSize: number) => {
    thuTucPortalContext.setSearchPortal({
      ...thuTucPortalContext.searchPortal,
      pageNumber: page,
      pageSize: pageSize,
    });
  };
  return (
    <div className="contentBlock">
      <div className="thongKeSoLuong"> Có {count} thủ tục</div>
      <div className="tableDanhMucThuTuc">
        <Spin spinning={loading}>
          <Table
            loading={loading}
            columns={columns}
            dataSource={thuTucs}
            pagination={{
              total: count,
              onChange: (page: number, pageSize: number) => {
                onchangeTablePage(page, pageSize);
              },
              pageSize: thuTucPortalContext.searchPortal.pageSize,
              current: thuTucPortalContext.searchPortal.pageNumber,
            }}
          ></Table>
        </Spin>
      </div>
    </div>
  );
};
