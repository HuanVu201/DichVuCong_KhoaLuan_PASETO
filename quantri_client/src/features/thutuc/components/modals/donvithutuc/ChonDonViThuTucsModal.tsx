import { IDonVi, ISearchDonVi } from "@/features/donvi/models";
import { AntdModal, AntdTable } from "@/lib/antd/components";
import { Button, Form, Popconfirm, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import SearchDonViContainer from "./SearchDonViContainer";
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchDonVi } from "@/features/donvi/redux/action";
import { useColumn } from "./hooks/useColumn";
import { toast } from "react-toastify";
import { IAddMultiDonViThuTuc } from "@/features/donvithutuc/models";
import Item from "antd/es/list/Item";
import { AddMultiDonViThuTuc } from "@/features/donvithutuc/redux/action";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
export const ChonDonViThuTucsModal = ({
  handleCancel,
}: {
  handleCancel: () => void;
}) => {
  const thuTucContext = useThuTucContext();
  const dispatch = useAppDispatch();
  let [form] = Form.useForm<ISearchDonVi>();
  const { columns } = useColumn({
    pageNumber: thuTucContext.searchDonViParams.pageNumber,
    pageSize: thuTucContext.searchDonViParams.pageSize,
  });
  const {
    datas: donVis,
    data: donVi,
    count,
  } = useAppSelector((state) => state.cocautochuc);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleOk = async () => {
    setLoading(true);
    if (selectedRowKeys.length > 0) {
      var maDonVis = selectedRowKeys.map((item) => {
        return donVis?.find((t) => t.id === item)?.groupCode;
      });
      var lstThuTucs = thuTucContext.selectedThuTucs.map((item) => {
        return item.maTTHC;
      });
      var postData = {
        idDonVis: maDonVis,
        maTTHCs: lstThuTucs,
      } as IAddMultiDonViThuTuc;

      await dispatch(AddMultiDonViThuTuc(postData)).unwrap();
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
  const onSelectTableChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
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
          <Button type="default" onClick={handleCancel}>
            Hủy
          </Button>
        </Space>
      }
      fullsizeScrollable
      visible={true}
      title="Chọn đơn vị thực hiện"
      handlerCancel={handleCancel}
    >
      <SearchDonViContainer />
      <Spin spinning={loading}>
        <AntdTable
          columns={columns}
          rowSelection={rowSelection}
          dataSource={donVis}
          pagination={{
            total: count,
          }}
          searchParams={thuTucContext.searchDonViParams}
          setSearchParams={thuTucContext.setSearchDonViParams}
          onSearch={(params) => dispatch(SearchCoCauToChuc(params))}
        />
      </Spin>
    </AntdModal>
  );
};
