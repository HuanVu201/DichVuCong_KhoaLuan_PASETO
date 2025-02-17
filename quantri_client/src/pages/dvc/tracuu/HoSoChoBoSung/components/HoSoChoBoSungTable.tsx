import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
    ButtonActionProvider,
    useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { IHoSo, ISearchHoSo,  ISearchHoSoTraLaiXinRut } from "@/features/hoso/models";
import { AntdSelect, AntdSpace, AntdTable } from "@/lib/antd/components";
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
    ReloadOutlined,
    RollbackOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { HoSoChoBoSungSearch } from "./HoSoChoBoSungSearch";
import '../../../../../features/thongKe/ThongKe.scss'
import { useHoSoChoBoSungColumn } from "../hooks/useHoSoChoBoSungColumn";
import { toast } from "react-toastify";
import { Spin } from "antd";

const HoSoChoBoSungTable = () => {
    const dispatch = useAppDispatch();
    const buttonActionContext = useButtonActionContext();
    const [firstAccess, setFirstAccess] = useState<boolean>(true)
    const [hoSoData, setHoSoData] = useState<IHoSo[]>()
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
        loai: "Bổ sung"
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
    const { columns } = useHoSoChoBoSungColumn(
        { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
        items
    );

    const onFinish = () => {
        (async () => {
            setLoading(true)
            const res: any = await dispatch(SearchHoSoTraLaiXinRut(searchParams as any))

            if (res) {
                setHoSoData(res.payload?.data)
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

                        <div className="thongKeSwapper">
                            <div className="headerThongKe">
                                <div className="title">
                                    <h6>Danh sách hồ sơ chờ bổ sung</h6>
                                </div>
                                <div className="actionButtons">
                                    <button
                                        className="btnThongKe"
                                        onClick={onFinish}
                                    >
                                        <span className="icon">
                                            <SearchOutlined />
                                        </span>
                                        <span>Thống kê</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <HoSoChoBoSungSearch searchParams={searchParams} setSearchParams={setSearchParams}
                            resetSearchParams={() => { }} />
                        <AntdTable
                            columns={columns}
                            dataSource={hoSoData}
                            pagination={{
                                total: hoSoData?.length,
                            }}
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}
                            onSearch={(params) => { }}
                        />
                    </AntdSpace>
                </Spin>
            </LazyActions>
        </>
    );
};
const HoSoTableWrapper = () => (
    <ButtonActionProvider>
        <HoSoChoBoSungTable />
    </ButtonActionProvider>
);
export default HoSoTableWrapper;
