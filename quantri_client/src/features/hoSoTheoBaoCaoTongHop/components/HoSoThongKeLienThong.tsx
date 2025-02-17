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

const HoSoTheoBaoCaoLienThongTable = () => {
    const dispatch = useAppDispatch();
    const buttonActionContext = useButtonActionContext();
    const {
        datas: hoSos,
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
            pageNumber: hoSoTheoBaoCaoTongHopContext.searchThongKeHoSoLienThong.pageNumber,
            pageSize: hoSoTheoBaoCaoTongHopContext.searchThongKeHoSoLienThong.pageSize,
        },
        items
    );
    useEffect(() => {
            dispatch(
                SearchHoSo(hoSoTheoBaoCaoTongHopContext.searchThongKeHoSoLienThong)
            );
    }, [hoSoTheoBaoCaoTongHopContext.searchThongKeHoSoLienThong]);
    return (
        <AntdModal
            visible={true}
            title={"Danh sách hồ sơ"}
            fullsizeScrollable
            footer={null}
            handlerCancel={() =>
                hoSoTheoBaoCaoTongHopContext.setThongKeHSLTModalVisible(false)
            }
        >
            <LazyActions
                setSearchParams={hoSoTheoBaoCaoTongHopContext.setsearchThongKeHoSoLienThong}
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
                            dataSource={hoSos}
                            pagination={{
                                total: count,
                            }}
                            loading={loading}
                            searchParams={hoSoTheoBaoCaoTongHopContext.searchThongKeHoSoLienThong}
                            setSearchParams={hoSoTheoBaoCaoTongHopContext.setsearchThongKeHoSoLienThong}
                            onSearch={(params) => { }}
                        />
                    </Spin>
                </AntdSpace>
                {hoSos ? <XuatDanhSachHoSoTheoBaoCaoTongHopModal data={hoSos} /> : null}
            </LazyActions>
        </AntdModal>
    );
};
const HoSoTheoBaoCaoLienThongWrapper = () => (
    <ButtonActionProvider>
        <HoSoTheoBaoCaoLienThongTable />
    </ButtonActionProvider>
);
export default HoSoTheoBaoCaoLienThongWrapper;
