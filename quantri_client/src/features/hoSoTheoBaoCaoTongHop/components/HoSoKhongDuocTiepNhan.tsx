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
import { useHoSoKhongDuocTiepNhanColumn } from "../hooks/useHoSoKhongDuocTiepNhanColumn";
// import { XuatDanhSachHoSoTable } from "@/features/thongKe/components/XuatDanhSachHoSoTable";

const HoSoTheoDoiKhongDuocTiepNhanTable = () => {
    const dispatch = useAppDispatch();
    const buttonActionContext = useButtonActionContext();
    const {
        datas,
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
    const { columns } = useHoSoKhongDuocTiepNhanColumn(
        {
            pageNumber: hoSoTheoBaoCaoTongHopContext.searchTheoDoiHoSoKhongDuocTiepNhan.pageNumber,
            pageSize: hoSoTheoBaoCaoTongHopContext.searchTheoDoiHoSoKhongDuocTiepNhan.pageSize,
        },
        items
    );
    useEffect(() => {
            dispatch(
                SearchHoSo(hoSoTheoBaoCaoTongHopContext.searchTheoDoiHoSoKhongDuocTiepNhan)
            );
    }, [hoSoTheoBaoCaoTongHopContext.searchTheoDoiHoSoKhongDuocTiepNhan]);
    return (
        <AntdModal
            visible={true}
            title={"Danh sách hồ sơ"}
            fullsizeScrollable
            footer={null}
            handlerCancel={() =>
                hoSoTheoBaoCaoTongHopContext.setTheoDoiHoSoKhongDuocTiepNhanModalVisible(false)
            }
        >
            <LazyActions
                setSearchParams={hoSoTheoBaoCaoTongHopContext.setSearchTheoDoiHoSoKhongDuocTiepNhan}
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
                            dataSource={datas}
                            pagination={{
                                total: count,
                            }}
                            loading={loading}
                            searchParams={hoSoTheoBaoCaoTongHopContext.searchTheoDoiHoSoKhongDuocTiepNhan}
                            setSearchParams={hoSoTheoBaoCaoTongHopContext.setSearchTheoDoiHoSoKhongDuocTiepNhan}
                            onSearch={(params) => { }}
                        />
                    </Spin>
                </AntdSpace>
                {datas ? <XuatDanhSachHoSoTheoBaoCaoTongHopModal data={datas} /> : null}
            </LazyActions>
        </AntdModal>
    );
};
const HoSoKhongDuocTiepNhanWrapper = () => (
    <ButtonActionProvider>
        <HoSoTheoDoiKhongDuocTiepNhanTable />
    </ButtonActionProvider>
);
export default HoSoKhongDuocTiepNhanWrapper;
