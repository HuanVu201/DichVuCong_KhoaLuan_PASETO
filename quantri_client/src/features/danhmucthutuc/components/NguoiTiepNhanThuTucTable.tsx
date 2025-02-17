import { useEffect, useMemo, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { INguoiTiepNhanThuTuc, ISearchNguoiTiepNhanThuTuc } from "../../thutuc/models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchNguoiTiepNhanThuTucs } from "../../thutuc/redux/action"
import { NguoiTiepNhanThuTucSearch } from "./NguoiTiepNhanThuTucSearch"
import { useThuTucContext, ThuTucProvider } from "../../thutuc/contexts/ThuTucContext"
import { ThuTucDetail } from "@/features/thutuc/components/ThuTucDetail"
import { NguoiTiepNhanThuTucDetail } from "./NguoiTiepNhanThuTucDetail"
import { Button, Row, Space, Spin } from "antd"
import { toast } from "react-toastify"
import { AddNguoiTiepNhanSearch } from "./AddNguoiTiepNhanSearch"
import AddNguoiTiepNhanTable from "./AddNguoiTiepNhanTable"
import { ChonMucDoModal } from "@/features/donvithutuc/components/ChonMucDoModal"
import { UpdateMucDoModal } from "./UpdateMucDoModal"
import { TruongHopModal } from "@/features/thutuc/components/modals/truonghopthutuc/TruongHopModal"
import { TruongHopQuanTriDonViModal } from "@/features/thutuc/components/modals/truonghopthutuc/TruongHopQuanTriDonViModal"
import { log } from "console"
import { BoSungCanBoTiepNhanModal } from "@/features/danhmucthutucdonvi/components/BoSungCanBoTiepNhanModal"
import { NguoiTiepNhanThuTucProvider, useNguoiTiepNhanThuTucContext } from "../contexts/NguoiTiepNhanThuTucContext"
import { SearchDonVi } from "@/features/donvi/redux/action"

import { DonViThuTucProvider, useDonViThuTucContext } from "@/features/danhmucthutucdonvi/contexts/DonViThuTucContext"
import { BoSungCanBoTiepNhanThuTucModal } from "./BoSungCanBoTiepNhanThuTucModal"
import { LoadingOutlined } from "@ant-design/icons"
import BoNguoiTiepNhanTable from "@/features/danhmucthutucdonvi/components/BoCanBoTiepNhanModal"
import BoNguoiTiepNhanModal from "@/features/danhmucthutucdonvi/components/BoCanBoTiepNhanModal"

const NguoiTiepNhanThuTucTable = () => {
    const dispatch = useAppDispatch()
    const nguoiTiepNhanContext = useNguoiTiepNhanThuTucContext()
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const NguoiTiepNhanThuTucContext = useThuTucContext()
    const { datas: NguoiTiepNhanThuTucs, count, loading } = useAppSelector(state => state.nguoitiepnhanthutuc)
    const { data: user } = useAppSelector(state => state.user)
    const [searchParams, setSearchParams] = useState<ISearchNguoiTiepNhanThuTuc>({ pageNumber: 1, pageSize: 50, reFetch: true })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    const [donViIds, setDonViIds] = useState([])
    const [nguoiTiepNhanIds, setNguoiTiepNhanIds] = useState([])
    const donViThuTucContext = useDonViThuTucContext();
    // const [selectedDonViThuTucs, setSelectedDonViThuTucs] = useState([]);
    const onSelectTableChange = (newSelectedRowKeys: any, e: any) => {
        const newNguoiTiepNhanIds = e.map((item: any) => item.nguoiTiepNhanId);
        const newDonViIds = e.map((item: any) => item.donViId);
        setDonViIds(newDonViIds)
        setNguoiTiepNhanIds(newNguoiTiepNhanIds)
        setSelectedRowKeys(newSelectedRowKeys);
        let tmpUsers = newSelectedRowKeys.map((item: string) => {
            let tmpUser = NguoiTiepNhanThuTucs?.find((x) => x.id == item);
            return {
                id: tmpUser?.id,
                maTTHC: tmpUser?.maTTHC,
            };
        }) as INguoiTiepNhanThuTuc[];
        NguoiTiepNhanThuTucContext.setSelectedNguoiTiepNhanThuTucs(tmpUsers ?? []);

        // setSelectedDonViThuTucs(newSelectedRowKeys);
        donViThuTucContext.setSelectedDonViThuTucs(
            newSelectedRowKeys.filter((t: string) => t.indexOf("parent") == -1)
        );
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectTableChange,
    };

    const idUserSelected = useMemo(() => {
        const extractUniqueIds = (inputArray: any[]) => {
            const uniqueIds = new Set();

            inputArray?.forEach(item => {
                const ids = item?.split('##');
                ids?.forEach((id: any) => uniqueIds.add(id));
            });

            return Array.from(uniqueIds);
        };

        return extractUniqueIds(nguoiTiepNhanIds);

    }, [nguoiTiepNhanIds])

    useEffect(() => {
        if (user && user.officeCode) {
            setSearchParams({ ...searchParams, donViId: user.officeCode })
        }
    }, [user])


    return (
        <>
            <Row>
                <Space size="small">
                    <Button
                        type="primary"
                        className="m-2"
                        onClick={() => {
                            if (NguoiTiepNhanThuTucContext.selectedNguoiTiepNhanThuTucs.length > 0) {
                                NguoiTiepNhanThuTucContext.setAddCanBoTiepNhanModalVisible(true);
                            } else {
                                toast.warning("Chưa chọn thủ tục!");
                            }
                        }}
                    >
                        Cập nhật cán bộ tiếp nhận
                    </Button>
                    <Button
                        type="primary"
                        className="m-1"
                        style={{ backgroundColor: "rgb(255, 184, 72)" }}
                        onClick={() => {
                            if (NguoiTiepNhanThuTucContext.selectedNguoiTiepNhanThuTucs.length > 0) {
                                donViThuTucContext.setBoSungCanBoTiepNhanModalVisible(true);
                            } else {
                                toast.error("Chưa chọn thủ tục!");
                            }
                        }}
                    >
                        Bổ sung cán bộ tiếp nhận
                    </Button>
                    <Button
                        type="primary"
                        className="m-1"
                        style={{ backgroundColor: "#198754" }}
                        onClick={() => {
                            if (NguoiTiepNhanThuTucContext.selectedNguoiTiepNhanThuTucs.length > 0) {
                                donViThuTucContext.setBoCanBoTiepNhanModalVisible(true);
                            } else {
                                toast.error("Chưa chọn thủ tục!");
                            }
                        }}
                    >
                        Bỏ cán bộ tiếp nhận
                    </Button>
                </Space>
                {/* <Space size="small">
                    <Button
                        type="primary"
                        className="m-2"
                        onClick={() => {
                            if (NguoiTiepNhanThuTucContext.selectedNguoiTiepNhanThuTucs.length > 0) {
                                NguoiTiepNhanThuTucContext.setUpdateMucDoModalVisible(true);
                            } else {
                                toast.warning("Chưa chọn thủ tục!");
                            }
                        }}
                    >
                        Chọn mức độ
                    </Button>
                </Space> */}
            </Row>
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <AntdSpace direction="vertical" style={{ width: "100%" }}>
                    <NguoiTiepNhanThuTucSearch searchParams={searchParams} setSearchParams={setSearchParams} />
                    <AntdTable
                        bordered
                        onSearch={(params) => {
                            if (user?.officeCode && searchParams.donViId) {
                                dispatch(SearchNguoiTiepNhanThuTucs(searchParams));
                            }
                        }}
                        rowSelection={rowSelection}
                        dataSource={NguoiTiepNhanThuTucs}
                        columns={columns}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        pagination={{ total: count }}
                    />

                </AntdSpace>
            </Spin>
            {NguoiTiepNhanThuTucContext.thuTucModalVisible ? <NguoiTiepNhanThuTucDetail /> : null}
            {NguoiTiepNhanThuTucContext.addCanBoTiepNhanModalVisible ? <AddNguoiTiepNhanTable donViIds={donViIds} /> : null}
            {NguoiTiepNhanThuTucContext.updateMucDoModalVisible ? <UpdateMucDoModal donViIds={donViIds} /> : null}
            {NguoiTiepNhanThuTucContext.truongHopThuTucModalVisible ? <TruongHopQuanTriDonViModal /> : null}
            {donViThuTucContext.boCanBoTiepNhanModalVisible ? <BoNguoiTiepNhanModal idUserSelected={idUserSelected} donViIds={donViIds} /> : null}
            {donViThuTucContext.boSungCanBoTiepNhanModalVisible ? (
                <BoSungCanBoTiepNhanThuTucModal
                    donViThuTucIds={donViIds}
                    handleCancel={() =>
                        donViThuTucContext.setBoSungCanBoTiepNhanModalVisible(false)
                    }
                    onReload={() => dispatch(SearchDonVi(searchParams))}
                />
            ) : null}

        </>

    )
}
const LoaiNguoiTiepNhanThuTucWrapper = () => (
    <DonViThuTucProvider>
        <NguoiTiepNhanThuTucProvider>
            <ThuTucProvider>
                <NguoiTiepNhanThuTucTable />
            </ThuTucProvider>
        </NguoiTiepNhanThuTucProvider>
    </DonViThuTucProvider>)
export default LoaiNguoiTiepNhanThuTucWrapper