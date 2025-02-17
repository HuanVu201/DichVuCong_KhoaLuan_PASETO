import { FolderContextProvider, useFolderContext } from "@/contexts/FolderContext"
import { CoCauToChucContextMenu } from "@/features/cocautochuc/components/CoCauToChucContextMenu"
import { ISearchCoCauToChuc } from "@/features/cocautochuc/models"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { ThayDoiTruongHopThuTuc } from "@/features/hoso/redux/action"
import { ISearchTruongHopThuTuc, ITruongHopThuTuc } from "@/features/truonghopthutuc/models"
import { SearchTruongHopThuTuc } from "@/features/truonghopthutuc/redux/action"
import { AntdModal, AntdTable } from "@/lib/antd/components"
import { AntdDirectoryTree } from "@/lib/antd/components/tree/DirctoryTree"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { IBasePagination } from "@/models"
import { Col, Input, Row, Spin } from "antd"
import React, { SetStateAction, useEffect, useMemo, useState } from "react"
import { DanhSachCanBo } from "./DanhSachCanBo"
import { CoCauModalProvider } from "@/features/cocautochuc/contexts/CoCauModalContext"
import { LoadingOutlined } from "@ant-design/icons"
// import {ThemNguoiTiepNhanHoSo} from "./ThemNguoiTiepNhanHoSo"

const ThemNguoiTiepNhanHoSo = () => {
    const buttonActionContext = useButtonActionContext()
    const [tenThuTuc, setTenThuTuc] = useState<string>()
    const { datas: hoSos } = useAppSelector(state => state.hoso)
    const { datas: coCauToChucs, loading } = useAppSelector((state) => state.cocautochuc);
    const [loadingModal, setLoadingModal] = useState<boolean>(false)
    const { data: user } = useAppSelector(state => state.user)
    const folderContext = useFolderContext();
    const [folderSearchParams, setFolderSearchParams] = useState("");
    const [searchParams, setSearchParams] = useState<ISearchCoCauToChuc>({
        pageNumber: 1,
        pageSize: 10000,
        reFetch: true,
        orderBy: ["GroupOrder", "GroupCode"],
        groupCode: user?.officeCode,
        getAllChildren: true,
    });

    useEffect(() => {
        dispatch(SearchCoCauToChuc(searchParams));
    }, [searchParams]);


    const dispatch = useAppDispatch()
    const hoSo = useMemo(() => {
        return hoSos?.find(hoSo => hoSo.id === buttonActionContext.selectedHoSos[0] as string)
    }, [hoSos])
    useEffect(() => {
        setTenThuTuc(hoSo?.tenTTHC)
    }, [hoSo])


    const handleCancel = () => {
        buttonActionContext.setThemNguoiTiepNhanHoSoModalVisible(false)
        buttonActionContext.setSelectedHoSos([])
    }


    return <AntdModal title="Thêm người tiếp nhận" visible={true} handlerCancel={handleCancel} footer={null} fullsizeScrollable >

        <Spin spinning={loading || loadingModal}
            indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
            <Row gutter={[8, 8]}>
                <Col md={8} span={24}>
                    <AntdDirectoryTree
                        treeName="CoCauToChuc"
                        multiple={false}
                        generateTree={{
                            data: coCauToChucs,
                            title: "groupName",
                            parentId: "ofGroupCode",
                            id: "groupCode",
                        }}
                        searchParams={folderSearchParams}
                        onSelect={(value) => {
                            let tmpNode = coCauToChucs?.find((x) => x.groupCode == value[0]);
                            folderContext.setSelectedGroup(tmpNode);
                            folderContext.setFolderId((value as string[])[0]);
                        }}
                        contextMenu={(setVisible, id, top, left, node) => {
                            return (
                                <CoCauToChucContextMenu
                                    id={id}
                                    top={top}
                                    left={left}
                                    setVisible={setVisible}
                                    folder={node?.dataNode}
                                />
                            );
                        }}
                    />
                </Col>

                <Col md={16} span={24}>
                    <DanhSachCanBo setLoadingModal={setLoadingModal} />
                </Col>

            </Row>
        </Spin>
    </AntdModal>
}

const ThemNguoiTiepNhanHoSoModal = () => {
    return (
        <FolderContextProvider>
            <CoCauModalProvider>
                <ThemNguoiTiepNhanHoSo />
            </CoCauModalProvider>
        </FolderContextProvider>
    );
};

export default ThemNguoiTiepNhanHoSoModal