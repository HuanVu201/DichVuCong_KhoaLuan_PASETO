import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
    ButtonActionProvider,
    useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { IHoSo, ISearchHoSo, ISearchHoSoTraLaiXinRut } from "@/features/hoso/models";
import { AntdButton, AntdSelect, AntdSpace, AntdTable } from "@/lib/antd/components";
import { SearchHoSo, SearchHoSoTraLaiXinRut } from "@/features/hoso/redux/action";

import {
    HoSoTableActions,
    useHoSoColumn,
} from "@/features/hoso/hooks/useHoSoColumn";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";

import {
    EditOutlined,
    EyeOutlined,
    LoadingOutlined,
    PrinterOutlined,
    ReloadOutlined,
    RollbackOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { HoSoTraLaiXinRutSearch } from "./HoSoTraLaiXinRutSearch";
import '../../../../../features/thongKe/ThongKe.scss'
import { useHoSoTraLaiXinRutColumn } from "../hooks/useHoSoTraLaiXinRutColumn";
import { toast } from "react-toastify";
import { Space, Spin } from "antd";
import { XuatDanhSachHoSoTraLaiXinRutModal } from "./XuatDanhSachHoSoTraLaiXinRut";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel";

const HoSoTraLaiXinRutTable = () => {
    const dispatch = useAppDispatch();
    const buttonActionContext = useButtonActionContext();
    const [firstAccess, setFirstAccess] = useState<boolean>(true)
    const [hoSoData, setHoSoData] = useState<IHoSo[]>()
    const [totalHoSoData, setTotalHoSoData] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const { data: user } = useAppSelector((state) => state.user);
    useEffect(() => {
        dispatch(SearchCoCauToChuc({ pageSize: 1500, groupCode: user?.groupCode, getAllChildren: true, type: 'don-vi' }))
    }, [])
    const {
        datas: hoSos,
        data: hoSo,
        count,
    } = useAppSelector((state) => state.hoso);
    // const { btnElememts } = useButtonActions({
    //     maScreen: screenType["tra-cuu-ho-so"],
    // });
    const [searchParams, setSearchParams] = useState<ISearchHoSoTraLaiXinRut>({
        pageNumber: 1,
        pageSize: 50,
        loai: "Trả lại/Xin rút"
    });
    const items: HoSoTableActions[] = useMemo(
        () => [
            {
                icon: (
                    <EyeOutlined
                        title="Xem chi tiết"
                        onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}
                    />
                ),
            },

        ],
        []
    );
    const { columns } = useHoSoTraLaiXinRutColumn(
        { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
        items
    );

    const onFinish = () => {
        (async () => {
            setLoading(true)
            const res: any = await dispatch(SearchHoSoTraLaiXinRut(searchParams as any))

            if (res) {
                setHoSoData(res.payload?.data)
                setTotalHoSoData(res.payload?.totalCount)
            } else {
                toast.error("Lấy thông tin lỗi!")
            }
            setLoading(false)
        })()
    }

    return (
        <>
            <LazyActions setSearchParams={setSearchParams}>
                <Spin spinning={loading}
                    indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
                >
                    <AntdSpace direction="vertical" style={{ width: "100%" }}>

                
                        <HoSoTraLaiXinRutSearch searchParams={searchParams} setSearchParams={setSearchParams}
                            resetSearchParams={() => { }} onFinish={onFinish} />
                        <AntdTable
                            columns={columns}
                            dataSource={hoSoData}
                            pagination={{
                                total: totalHoSoData,
                            }}
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}
                            onSearch={(params) => { }}
                        />
                        <XuatDanhSachHoSoTraLaiXinRutModal data={hoSoData}/>
                    </AntdSpace>
                </Spin>
            </LazyActions>
        </>
    );
};
const HoSoTableWrapper = () => (
    <ButtonActionProvider>
        <HoSoTraLaiXinRutTable />
    </ButtonActionProvider>
);
export default HoSoTableWrapper;
