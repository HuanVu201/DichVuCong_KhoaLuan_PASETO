import { Form } from "react-router-dom"
import { AntdModal } from "../../modal/Modal"
import React, { useState } from "react";
import { AntdTable } from "../../table/Table";
import { ISearchHoSo } from "@/features/hoso/models";
import { useColumn } from "../hooks/useSignatureColumn";
import { GetSignatureDataResponse } from "@/features/file/services";

export const SignatureDataModal = ({visible, setVisible, dataSource}: {dataSource: GetSignatureDataResponse[] | undefined; visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const handlerCancel = () => {
        setVisible(false)
    }
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 50 })
    const {columns} = useColumn()

    return <AntdModal width={1400} visible={visible} handlerCancel={handlerCancel} maskClosable={false} title={"Danh sách thông tin ký số"} 
    footer={null}>
    <AntdTable 
        columns={columns as any} 
        dataSource={dataSource as any}
        onSearch={(values) => {}} 
        searchParams={searchParams} 
        setSearchParams={setSearchParams} 
        pagination={{
            total: dataSource?.length
        }}
        />
</AntdModal>
}