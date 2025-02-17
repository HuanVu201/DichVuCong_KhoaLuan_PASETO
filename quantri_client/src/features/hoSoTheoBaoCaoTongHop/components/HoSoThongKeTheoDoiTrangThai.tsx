import { useEffect, useMemo, useState } from "react";
import { AntdTable, AntdSpace, AntdModal } from "../../../lib/antd/components";

import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";

import {
    HoSoTheoBaoCaoTongHopProvider,
    useHoSoTheoBaoCaoTongHopContext,
} from "../contexts/HoSoTheoBaoCaoTongHopContext";

import {
    ButtonActionProvider,
    useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { screenType } from "@/features/hoso/data";
import { useHoSoTheoBaoCaoTongHopColumn } from "../hooks/useHoSoTheoBaoCaoTongHopColumn";
import { HoSoTableActions } from "@/features/hoso/hooks/useHoSoColumn";
import {
    EyeOutlined,
    FileExcelOutlined,
    FileWordOutlined,
} from "@ant-design/icons";
import { ISearchHoSoTheoBaoCaoTongHopParams } from "@/features/hoso/models";
import { SearchHoSo, SearchHoSoTheoBaoCaoTongHop } from "@/features/hoso/redux/action";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { Button, Spin } from "antd";
import { XuatDanhSachHoSoTable } from "@/features/thongKe/components/XuatDanhSachHoSoTable";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";
import { XuatDanhSachHoSoTheoBaoCaoTongHopModal } from "../exportElements/XuatDanhSachHoSoTheoBaoCaoTongHop";
import { useHoSoThongKeTiepNhanBuuChinhColumn } from "../hooks/useHoSoThongKeTiepNhanBuuChinhColumn";
// import { XuatDanhSachHoSoTable } from "@/features/thongKe/components/XuatDanhSachHoSoTable";

const HoSoThongKeTheoDoiTrangThaiTable = () => {
    const dispatch = useAppDispatch();
    const buttonActionContext = useButtonActionContext();
    const {
        datas: thongKeTheoDoiTrangThaiHS,
        count,
        loading,
    } = useAppSelector((state) => state.hoso);

    const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();
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
    const { columns } = useHoSoTheoBaoCaoTongHopColumn(
        {
            pageNumber: hoSoTheoBaoCaoTongHopContext.searchThongKeTheoDoiTrangThaiHS.pageNumber,
            pageSize: hoSoTheoBaoCaoTongHopContext.searchThongKeTheoDoiTrangThaiHS.pageSize,
        },
        items
    );
    useEffect(() => {
            dispatch(
                SearchHoSo(hoSoTheoBaoCaoTongHopContext.searchThongKeTheoDoiTrangThaiHS)
            );
    }, [hoSoTheoBaoCaoTongHopContext.searchThongKeTheoDoiTrangThaiHS]);
    return (
        <AntdModal
            visible={true}
            title={"Danh sách hồ sơ"}
            fullsizeScrollable
            footer={null}
            handlerCancel={() =>
                hoSoTheoBaoCaoTongHopContext.setThongKeTheoDoiTrangThaiHoSoModalVisible(false)
            }
        >
            <LazyActions
                setSearchParams={hoSoTheoBaoCaoTongHopContext.setsearchThongKeTheoDoiTrangThaiHS}
            >

                <AntdSpace direction="vertical" style={{ width: "100%" }}>
                    <AntdSpace direction="horizontal" style={{ flexWrap: "wrap" }}>
                        <Button
                            onClick={() => {
                                downloadPhieuExcel("Danh sách hồ sơ", "danhSachHoSoTable");
                            }}
                        >
                            <FileExcelOutlined style={{ color: "#36a3f7" }} /> In danh sách
                        </Button>
                    </AntdSpace>
                    <Spin spinning={loading}>
                        <AntdTable
                            columns={columns}
                            dataSource={thongKeTheoDoiTrangThaiHS}
                            pagination={{
                                total: count,
                            }}
                            loading={loading}
                            searchParams={hoSoTheoBaoCaoTongHopContext.searchThongKeTheoDoiTrangThaiHS}
                            setSearchParams={hoSoTheoBaoCaoTongHopContext.setsearchThongKeTheoDoiTrangThaiHS}
                            onSearch={(params) => { }}
                        />
                    </Spin>
                </AntdSpace>
                {thongKeTheoDoiTrangThaiHS ? <XuatDanhSachHoSoTheoBaoCaoTongHopModal data={thongKeTheoDoiTrangThaiHS} /> : null}
            </LazyActions>
        </AntdModal>
    );
};
const HoSoThongKeTheoDoiTrangThaiWrapper = () => (
    <ButtonActionProvider>
        <HoSoThongKeTheoDoiTrangThaiTable />
    </ButtonActionProvider>
);
export default HoSoThongKeTheoDoiTrangThaiWrapper;
