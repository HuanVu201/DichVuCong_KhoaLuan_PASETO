import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { IQrCodeService } from "../Models"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { QrCodeServiceCreat } from "./QrCodeCreat"
import { QrCodeServiceDetail } from "./QrCodeDetail"
import { useQrCodeServiceContext } from "../context/QrCodeService"
import { Table } from "antd"

const QrCodeServiceTable = () => {
    const dispatch = useAppDispatch()
    const QrCodeServiceContext = useQrCodeServiceContext()
    const [createdDataQr, setCreatedDataQr] = useState<any>()

    const storedData = localStorage.getItem(QrCodeServiceContext.localStorageName);
    useEffect(() => {
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setCreatedDataQr(parsedData.reverse())
        } else {
            console.log('Không có dữ liệu trong localStorage cho key:', QrCodeServiceContext.localStorageName);
        }
        QrCodeServiceContext.setReloadTable(false)
    }, [QrCodeServiceContext.reloadTable])

    const { columns } = useColumn({ pageNumber: 100, pageSize: 10 })
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <Table dataSource={createdDataQr} columns={columns} />;
            </AntdSpace>
            <QrCodeServiceCreat />
            <QrCodeServiceDetail />
        </>

    )
}

export default QrCodeServiceTable