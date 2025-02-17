import { Suspense, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
    ButtonActionProvider,
    useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";
import { ISearchHoSo } from "@/features/hoso/models";
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { SearchHoSo, SearchScanHoSoDienTu } from "@/features/hoso/redux/action";
import { MenuProps, Spin } from "antd";

import { HoSoTableActions, useHoSoColumn } from "@/features/hoso/hooks/useHoSoColumn";
import dayjs from "dayjs";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { EyeOutlined } from "@ant-design/icons";
import { IUserRole } from "@/features/user/models";
import { resetDatas } from "@/features/hoso/redux/slice";
import { ScanHoSoDienTuSearch } from "./ScanHoSoDienTuSearch";


const ScanHoSoDienTuTable = () => {
    const dispatch = useAppDispatch();
    const buttonActionContext = useButtonActionContext();
    const { datas: hoSos, count, loading } = useAppSelector((state) => state.hoso);
    const { btnElememts } = useButtonActions({ maScreen: screenType["scan-ho-so-dien-tu"] });
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({
        pageNumber: 1,
        pageSize: 50,
        reFetch: true,

    });

    useEffect(() => {
        return () => {
            dispatch(resetDatas())
        }
    }, [])

    const items: HoSoTableActions[] = useMemo(
        () => [
            {
                icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)} />
            },
        ],
        []
    );
    const { columns } = useHoSoColumn(
        { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
        items
    );
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[]) => {
            buttonActionContext.setSelectedHoSos(selectedRowKeys);
        },
        selectedRowKeys: buttonActionContext.selectedHoSos,
    };

    return (
        <LazyActions setSearchParams={setSearchParams}>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                {btnElememts}
                <ScanHoSoDienTuSearch setSearchParams={setSearchParams}></ScanHoSoDienTuSearch>
                <AntdTable
                    loading={loading}
                    columns={columns}
                    dataSource={hoSos}
                    pagination={{
                        total: count,
                    }}
                    rowSelection={rowSelection}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchScanHoSoDienTu({ ...params }))}
                />
                )
            </AntdSpace>
        </LazyActions>
    );
};
const HoSoTableWrapper = () => (
    <ButtonActionProvider>
        <ScanHoSoDienTuTable />
    </ButtonActionProvider>
);
export default HoSoTableWrapper;
