import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { INguoiTiepNhanThuTuc, ISearchNguoiTiepNhanThuTuc } from "../../thutuc/models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchNguoiTiepNhanThuTucs } from "../../thutuc/redux/action"
import { NguoiTiepNhanThuTucSearch } from "./NguoiTiepNhanThuTucSearch"
import { useThuTucContext, ThuTucProvider } from "../../thutuc/contexts/ThuTucContext"
import { ThuTucDetail } from "@/features/thutuc/components/ThuTucDetail"
import { NguoiTiepNhanThuTucDetail } from "./NguoiTiepNhanThuTucDetail"
import { Button, Row, Space } from "antd"
import { toast } from "react-toastify"
import { AddNguoiTiepNhanSearch } from "./AddNguoiTiepNhanSearch"
import AddNguoiTiepNhanTable from "./AddNguoiTiepNhanTable"
import { ChonMucDoModal } from "@/features/donvithutuc/components/ChonMucDoModal"
import { UpdateMucDoModal } from "./UpdateMucDoModal"

const NguoiTiepNhanThuTucTable = () => {
    const dispatch = useAppDispatch()
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const NguoiTiepNhanThuTucContext = useThuTucContext()
    const { datas: NguoiTiepNhanThuTucs, count } = useAppSelector(state => state.nguoitiepnhanthutuc)
    const [searchParams, setSearchParams] = useState<ISearchNguoiTiepNhanThuTuc>({ pageNumber: 1, pageSize: 50, reFetch: true })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    const [donViIds, setDonViIds] = useState([])

    const onSelectTableChange = (newSelectedRowKeys: any, e: any) => {
        const newDonViIds = e.map((item: any) => item.donViId);
        setDonViIds(newDonViIds)
        setSelectedRowKeys(newSelectedRowKeys);
        let tmpUsers = newSelectedRowKeys.map((item: string) => {
            let tmpUser = NguoiTiepNhanThuTucs?.find((x) => x.id == item);
            return {
                id: tmpUser?.id,
                maTTHC: tmpUser?.maTTHC,
            };
        }) as INguoiTiepNhanThuTuc[];

        NguoiTiepNhanThuTucContext.setSelectedNguoiTiepNhanThuTucs(tmpUsers ?? []);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectTableChange,
    };



    return (
        <>
            <Row>
                {" "}
                <Space size="small">
                    <Button
                        type="primary"
                        className="m-2"
                        onClick={() => {
                            if (NguoiTiepNhanThuTucContext.selectedNguoiTiepNhanThuTucs.length > 0) {
                                NguoiTiepNhanThuTucContext.setAddCanBoTiepNhanModalVisible(true);
                            } else {
                                toast.warning("Bạn chưa chọn thủ tục");
                            }
                        }}
                    >
                        Cập nhật cán bộ tiếp nhận
                    </Button>
                </Space>
                <Space size="small">
                    <Button
                        type="primary"
                        className="m-2"
                        onClick={() => {
                            if (NguoiTiepNhanThuTucContext.selectedNguoiTiepNhanThuTucs.length > 0) {
                                NguoiTiepNhanThuTucContext.setUpdateMucDoModalVisible(true);
                            } else {
                                toast.warning("Bạn chưa chọn thủ tục");
                            }
                        }}
                    >
                        Chọn mức độ
                    </Button>
                </Space>
            </Row>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <NguoiTiepNhanThuTucSearch setSearchParams={setSearchParams} />
                <AntdTable
                    bordered
                    onSearch={(params) => {
                        dispatch(SearchNguoiTiepNhanThuTucs({ ...params }));
                    }}
                    rowSelection={rowSelection}
                    dataSource={NguoiTiepNhanThuTucs}
                    columns={columns}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    pagination={{ total: count }}
                />
            </AntdSpace>
            {NguoiTiepNhanThuTucContext.thuTucModalVisible ? <NguoiTiepNhanThuTucDetail /> : null}
            {NguoiTiepNhanThuTucContext.addCanBoTiepNhanModalVisible ? <AddNguoiTiepNhanTable donViIds={donViIds} /> : null}
            {NguoiTiepNhanThuTucContext.updateMucDoModalVisible ? <UpdateMucDoModal donViIds={donViIds} /> : null}

        </>

    )
}
const LoaiNguoiTiepNhanThuTucWrapper = () => (<ThuTucProvider>
    <NguoiTiepNhanThuTucTable />
</ThuTucProvider>)
export default LoaiNguoiTiepNhanThuTucWrapper