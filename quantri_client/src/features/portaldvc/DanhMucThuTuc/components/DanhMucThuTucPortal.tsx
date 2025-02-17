import "./DanhMucThuTucPortal.scss";
import { Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useDanhMucThuTucPortalContext } from "../context/DanhMucThuTucPortalContext";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Link, useNavigate } from "react-router-dom";
import { IThuTuc } from "@/features/thutuc/models";
import { MUCDO_THUTUC } from "@/features/thutuc/data";
import { getCurrency } from "@/utils";
import { LoadingOutlined, LoginOutlined } from "@ant-design/icons";
import { Service } from "@/services";
import { toast } from "react-toastify";
import { togglerLoginModalVisible } from "@/lib/redux/GlobalState";

export const DanhMucThuTucPortal = () => {
  const {
    datas: thuTucs,
    count,
    loading,
  } = useAppSelector((state) => state.thutuc);
  const thuTucPortalContext = useDanhMucThuTucPortalContext();
  const thuTucContext = useDanhMucThuTucPortalContext();
  const { data: user } = useAppSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const columns = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text: string, record: any, index: number) => <>
        {(thuTucPortalContext?.searchPortal?.pageSize || 0) * ((thuTucPortalContext.searchPortal.pageNumber || 0) - 1) + index + 1}
      </>,
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
              thuTucPortalContext.setThuTucId(record.id);
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
        if (record.mucDo) return <>{MUCDO_THUTUC[record.mucDo]}</>;
      },
    },
    {
      title: "Cơ quan thực hiện",
      dataIndex: "coQuanThucHienChinh",
      key: "coQuanThucHienChinh",
    },
    {
      title: "Thao tác",
      key: "thaoTac",
      render: (_, record) => {
        if (record.mucDo == '3' || record.mucDo == '4')
          return <>
            <div title="Nộp trực tuyến" className="nopTrucTuyenButton"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={(e) => {
                if (!user) {
                  dispatch(togglerLoginModalVisible(true))
                  toast.info("Vui lòng đăng nhập để tiếp tục!")
                  e.preventDefault()
                } else {
                  navigate(`${Service.primaryRoutes.portaldvc.nopHoSoTrucTuyen}?maTTHC=${record?.maTTHC}`)
                }
              }}
            >
              <LoginOutlined style={{ fontSize: "20px" }} />
            </div>
          </>;
      },
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
      <div className="thongKeSoLuong"> Tổng số: {getCurrency(count as any, ".")} thủ tục</div>
      <div className="tableDanhMucThuTuc">
        <Spin spinning={loading}
            indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
          <Table
            loading={loading}
            columns={columns}
            dataSource={thuTucs}
            pagination={{
              total: count,
              onChange: (page: number, pageSize: number) => {
                onchangeTablePage(page, pageSize);
              },
              pageSize: thuTucPortalContext.searchPortal.pageSize || 50,
              current: thuTucPortalContext.searchPortal.pageNumber,
            }}
          ></Table>
        </Spin>
      </div>
    </div>
  );
};