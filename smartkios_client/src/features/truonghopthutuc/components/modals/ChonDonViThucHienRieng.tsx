import { IDonVi, ISearchDonVi } from "@/features/donvi/models";
import { AntdModal, AntdTable } from "@/lib/antd/components";
import { Button, Form, Popconfirm, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import SearchDonViContainer from "../container/SearchDonViContainer";
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchDonVi } from "@/features/donvi/redux/action";
import { useColumnDonViThucHienRieng } from "../../hooks/useColumnDonViThucHienRieng";
import { toast } from "react-toastify";
import { IAddMultiDonViThuTuc } from "@/features/donvithutuc/models";
import Item from "antd/es/list/Item";
import { AddMultiDonViThuTuc } from "@/features/donvithutuc/redux/action";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { useTruongHopThuTucContext } from "../../contexts/TruongHopThuTucContext";
export const ChonDonViThucHienRiengModal = ({
  handleCancel,
}: {
  handleCancel: () => void;
}) => {
  const thuTucContext = useThuTucContext();
  const truongHopThuTucContext = useTruongHopThuTucContext();
  const dispatch = useAppDispatch();
  let [form] = Form.useForm<ISearchDonVi>();
  const { columns } = useColumnDonViThucHienRieng({
    pageNumber: thuTucContext.searchDonViParams.pageNumber,
    pageSize: thuTucContext.searchDonViParams.pageSize,
  });
  const {
    datas: donVis,
    data: donVi,
    count,
  } = useAppSelector((state) => state.cocautochuc);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleOk = async () => {
    setLoading(true);
    if (selectedRowKeys.length > 0) {
      handleCancel();
    } else {
      toast.error("Bạn chưa chọn đơn vị");
    }
    setLoading(false);
  };
  // load DonVi
  //   useEffect(() => {
  //     (async () => {
  //       var groups = await dispatch(
  //         SearchDonVi(thuTucContext.searchDonViParams)
  //       ).unwrap();
  //     })();
  //   }, [thuTucContext.searchDonViParams]);
  const onSelectTableChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    if (donVis)
      truongHopThuTucContext.setSelectedDonViThucHienRieng([
        ...donVis?.filter((x) => newSelectedRowKeys.indexOf(x.id) != -1),
      ]);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectTableChange,
  };
  return (
    <AntdModal
      footer={
        <Space size="small">
          <Button type="primary" onClick={handleOk}>
            Chọn đơn vị thủ tục
          </Button>
          <Button
            type="default"
            onClick={() => {
              handleCancel();
              truongHopThuTucContext.setSelectedDonViThucHienRieng([]);
            }}
          >
            Hủy
          </Button>
        </Space>
      }
      fullsizeScrollable
      visible={true}
      title="Chọn đơn vị thực hiện"
      handlerCancel={() => {
        handleCancel();
        truongHopThuTucContext.setSelectedDonViThucHienRieng([]);
      }}
    >
      <SearchDonViContainer />
      <Spin spinning={loading}>
        <AntdTable
          columns={columns}
          rowSelection={rowSelection}
          dataSource={donVis}
          pagination={{
            total: count,
            pageSizeOptions: ["10", "11", "50", "100", "600", "1000"],
          }}
          searchParams={thuTucContext.searchDonViParams}
          setSearchParams={thuTucContext.setSearchDonViParams}
          onSearch={(params) => dispatch(SearchCoCauToChuc(params))}
        />
      </Spin>
    </AntdModal>
  );
};
