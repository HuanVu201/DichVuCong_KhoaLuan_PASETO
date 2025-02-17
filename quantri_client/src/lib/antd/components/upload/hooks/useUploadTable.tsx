import React, { useCallback, useEffect, useMemo, useState, useTransition } from "react"
import { UploadAntdTableProps } from "../UploadTable"
import { ID_SEPARATE } from "@/data"
import { AntdButton, AntdSpace } from "../.."
import { CloudDownloadOutlined, DeleteOutlined, EditOutlined, FileAddFilled, FileAddOutlined, FileProtectOutlined, LinkOutlined, ScanOutlined } from "@ant-design/icons"
import { callApiAndDisplayFile, callApiAndDownload, getFileName, getFileNameWithFixedLength } from "@/utils"
import { Popconfirm } from "antd"
import { SignSignature, btnSignClick } from "@/utils/common"
import { NeacModal } from "../modals/NeacModal"
import { fileApi, GetSignatureDataResponse } from "@/features/file/services"
import { useWindowSizeChange } from "@/hooks/useWindowSizeChange"
import { SignatureDataModal } from "../components/SignatureDataModal"
import { toast } from "react-toastify"
import { useAppSelector } from "@/lib/redux/Hooks"
import { useKhoTaiLieuCongDanContext } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/contexts/KhoTaiLieuCongDanContext"
import PullTaiLieuModal from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/components/PullTaiLieuModal"
import { Nguon_ThanhPhanHoSo } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/models"

export type useUploadTableType<IModel> = Pick<UploadAntdTableProps<IModel>, "folderName" | "kySoToken" | "kySoNEAC" | "dinhKem" | "setDataSource" | "colDinhKemName" | "rowNumber" | "hideUpload" | "hideKySoWith" | "onCleanSoHoa" | "onRemoveFile"> & {
    customSignature?: SignSignature[];
    customGetFileSignature?: (fileName: string) => Promise<any>
    addKhoTaiLieuCaNhanVisible?: boolean
    maLinhVuc?: string
}
export const useUploadTable = <IModel,>(props: useUploadTableType<IModel>) => {
    const { folderName, kySoToken, customGetFileSignature, customSignature, kySoNEAC, dinhKem, setDataSource, colDinhKemName, rowNumber, hideUpload, hideKySoWith, onCleanSoHoa, onRemoveFile, addKhoTaiLieuCaNhanVisible, maLinhVuc } = props
    // thêm sửa xóa trường dinhKem trên row của dataSource.
    const [_, startTransition] = useTransition()
    const [neacVisible, setNeacVisible] = useState(false)

    const onChangeDinhKemTable = (fileName: string, oldFile?: string, flag: "override" | "remove" | "add" | "replace" = "add", overideRowNumber: number = rowNumber) => {
        console.log(setDataSource);
        console.log("fileName", fileName);
        console.log("oldFile", oldFile);
        console.log("flag", flag);
        console.log("overideRowNumber", overideRowNumber);
        console.log("rowNumber", rowNumber);

        // startTransition(() => {
        setDataSource((curr) => {
            const newDataSource = [...curr];
            console.log(newDataSource);
            return newDataSource.map((item, idx) => {
                const rowIdx = overideRowNumber !== rowNumber ? overideRowNumber : rowNumber // dùng để tránh gọi useUploadTable bên trong 1 hàm do cần truyền động index
                if (idx === rowIdx) {
                    const dinhKem = (item[colDinhKemName] as string) || ""
                    const fileAlreadyExists = dinhKem && dinhKem?.includes(fileName)
                    if (flag == "add") {
                        const newValues = dinhKem ? dinhKem + ID_SEPARATE + fileName : fileName
                        return { ...item, [colDinhKemName]: fileAlreadyExists ? dinhKem : newValues }
                    } else if (flag == "override" && oldFile != undefined) {
                        console.log("KYSO_COLDINHKEM_" + (colDinhKemName as any));
                        console.log("KYSO_TOANBOFILE_" + dinhKem);
                        console.log("KYSO_FILEMOI_" + fileName)
                        console.log("KYSO_FILECU_" + oldFile)
                        const newItem = { ...item, [colDinhKemName]: dinhKem ? dinhKem?.replace(oldFile, fileName) : fileName }
                        console.log(("KYSO_NEWITEM_" + JSON.stringify(newItem)));
                        return newItem
                    } else if (flag == "remove") {
                        const oldDinhKem = dinhKem?.split(ID_SEPARATE)
                        const removedFile = oldDinhKem?.filter(x => x != fileName)
                        return { ...item, [colDinhKemName]: dinhKem ? removedFile.length ? removedFile.join(ID_SEPARATE) : undefined : fileName }
                    } else if (flag == "replace") {
                        return { ...item, [colDinhKemName]: fileName }
                    }
                }
                return item
            })
        })
        // })
    }

    const removeFileHandler = async (fileName: string) => {
        // const res = await fileApi.RemoveFile({
        //     path: fileName
        // })
        // if (res.status === 200) {
        onChangeDinhKemTable(fileName, undefined, "remove")
        // không được phép xóa file đã số hóa
        hideKySoWith === undefined && onRemoveFile ? onRemoveFile(fileName) : null
    }

    useEffect(() => {
        if (!dinhKem && onCleanSoHoa) {
            onCleanSoHoa()
        }
    }, [onCleanSoHoa, dinhKem])

    const signFileToken = async (fileName: string) => {
        if (fileName && folderName) {
            await btnSignClick(fileName, folderName, (urlFileSigned, oldFileUrl) => {
                console.log("CALLBACK_KYSO_SIGNEDFILE" + urlFileSigned)
                console.log("CALLBACK_KYSO_OLDFILE" + oldFileUrl)
                onChangeDinhKemTable(urlFileSigned, oldFileUrl, "override")
            }, customGetFileSignature, customSignature)
        } else {
            console.error("không tìm thấy file đã tải lên")
        }
    }

    const onClickSignFileNEAC = () => {
        setNeacVisible(true)
    }

    const danhSachDinhKems = useMemo(() => {
        const danhSach = dinhKem ? dinhKem?.split(ID_SEPARATE) : []
        return <AntdSpace direction="vertical">
            {danhSach?.map((fileName, index) => {
                return <DanhSachFile key={index} fileName={fileName} hideKySoWith={hideKySoWith} hideUpload={hideUpload} kySoNEAC={kySoNEAC}
                    kySoToken={kySoToken} neacVisible={neacVisible} onChangeDinhKemTable={onChangeDinhKemTable} onClickSignFileNEAC={onClickSignFileNEAC}
                    removeFileHandler={removeFileHandler} setNeacVisible={setNeacVisible} signFileToken={signFileToken} addKhoTaiLieuCaNhanVisible={addKhoTaiLieuCaNhanVisible ?? false} maLinhVuc={maLinhVuc || ''}
                />
            })}
        </AntdSpace>

    }, [dinhKem, hideUpload, neacVisible, hideKySoWith, kySoToken, kySoNEAC, onRemoveFile, rowNumber, onChangeDinhKemTable])
    return { danhSachDinhKems, onChangeDinhKemTable }
}

const DanhSachFile = ({ fileName, removeFileHandler, hideUpload, kySoToken, signFileToken, hideKySoWith, kySoNEAC, onClickSignFileNEAC,
    neacVisible, setNeacVisible, onChangeDinhKemTable, addKhoTaiLieuCaNhanVisible = false, maLinhVuc = ''
}:
    {
        fileName: string; removeFileHandler: (fileName: string) => void; hideUpload: boolean | undefined; kySoToken: boolean | undefined; signFileToken: (fileName: string) => Promise<void>;
        hideKySoWith: React.ReactNode; kySoNEAC: boolean | undefined; onClickSignFileNEAC: () => void; neacVisible: boolean; setNeacVisible: React.Dispatch<React.SetStateAction<boolean>>;
        onChangeDinhKemTable: (fileName: string, oldFile?: string, flag?: "override" | "remove" | "add" | "replace", overideRowNumber?: number) => void,
        addKhoTaiLieuCaNhanVisible?: boolean
        maLinhVuc?: string
    }) => {
    const { isWindow } = useWindowSizeChange()
    const fileTitle = getFileName(fileName)
    const [viewFileLoading, setViewFileLoading] = useState(false)
    const [signatureData, setSignatureData] = useState<GetSignatureDataResponse[]>()
    const [signatureDataModal, setSignatureDataModal] = useState<boolean>(false)
    const [addKhoTaiLieuModalVisible, setAddKhoTaiLieuModalVisiable] = useState<boolean>(false)
    const [filePath, setFilePath] = useState<string>()
    const { data: user } = useAppSelector(state => state.user)

    const onViewFile = async (fileName: string) => {
        setViewFileLoading(true)
        await callApiAndDisplayFile(fileName)
        setViewFileLoading(false)
    }
    const getSignatureData = async (filePath: string) => {
        try {
            setViewFileLoading(true)
            var res = await fileApi.GetSignatureData(filePath)
            if (res.data.succeeded) {
                setSignatureData(res.data.data)
                setSignatureDataModal(true)
            } else {
                toast.info(res.data.message || "Thao tác không thành công")
            }
            setViewFileLoading(false)
        } catch (error) {
            setViewFileLoading(false)
        }
    }

    const downloadFile = async (filePath: string) => {
        try {
            setViewFileLoading(true)
            await callApiAndDownload(filePath)
            setViewFileLoading(false)
        } catch (error) {
            toast.info("Có lỗi xảy ra khi lấy tệp")
            setViewFileLoading(false)
        }
    }


    const AddKhoTaiLieuCaNhanHandler = async (filePathRequest: string) => {
        setViewFileLoading(addKhoTaiLieuModalVisible)
        setFilePath(filePathRequest)
        setAddKhoTaiLieuModalVisiable(true)
    }

    return <>
        <AntdSpace direction="horizontal">
            <AntdButton disabled={false} style={{ marginTop: 0, padding: 0, height: "100%" }} loading={viewFileLoading} type="link" title={fileTitle} onClick={() => getSignatureData(fileName)}>
                <FileProtectOutlined title="Kiểm tra thông tin ký số" />
            </AntdButton>
            <AntdButton disabled={false} style={{ marginTop: 0, padding: 0, height: "100%" }} loading={viewFileLoading} type="link" title={fileTitle} onClick={() => downloadFile(fileName)}>
                <CloudDownloadOutlined title="Tải tệp tin về máy" />
            </AntdButton>
            <AntdButton disabled={false} style={{ marginTop: 0, padding: 0, height: "100%" }} loading={viewFileLoading} type="link" title={fileTitle} onClick={() => onViewFile(fileName)}>
                <>{getFileNameWithFixedLength(fileName)}</>
            </AntdButton>
            {hideUpload ? null : <Popconfirm
                title='Xoá?'
                onConfirm={() => {
                    removeFileHandler(fileName)
                }}
                okText='Xoá'
                cancelText='Huỷ'
            >

                <DeleteOutlined style={{ color: "tomato" }} />
            </Popconfirm>}
            {/* hideKySoWith là khi trạng thái số hóa */}
            {kySoToken && hideKySoWith === undefined && isWindow ? <div style={{zIndex:999, position:"relative"}}><span onClick={async () => {
                await signFileToken(fileName)
            }} style={{ backgroundColor: "#1677ff", borderRadius: 4, padding: "0 4px", color: "#fff", minWidth: 45, cursor: "pointer" }}>
                <span style={{ whiteSpace: "nowrap" }}><EditOutlined /><span id={`check_daKySo_${fileName || ""}`}>Ký số</span></span>
            </span></div> : null}
            {kySoNEAC && hideKySoWith === undefined && fileName.toLowerCase().endsWith(".pdf") ? <div style={{zIndex:999, position:"relative"}}><span onClick={onClickSignFileNEAC} style={{ backgroundColor: "#1677ff", borderRadius: 4, padding: "0 4px", color: "#fff", minWidth: 45, cursor: "pointer" }}>
                <span style={{ whiteSpace: "nowrap" }}><EditOutlined /><span >Ký số NEAC</span></span>
            </span></div> : null}
            {addKhoTaiLieuCaNhanVisible && user?.soDinhDanh ? <span onClick={() => AddKhoTaiLieuCaNhanHandler(fileName)} style={{ backgroundColor: "#1677ff", borderRadius: 4, padding: "2px 4px", color: "#fff", minWidth: 45, cursor: "pointer" }}>
                <span style={{ whiteSpace: "nowrap" }}><FileAddFilled /><span >  Thêm vào kho tài liệu cá nhân</span></span>
            </span> : null}

        </AntdSpace>
        <NeacModal setVisible={setNeacVisible} visible={neacVisible} fileList={fileName} onSignedSucceed={(newFile: string, oldFile: string) => {
            onChangeDinhKemTable(newFile, oldFile, "override")
        }} />
        <SignatureDataModal setVisible={setSignatureDataModal} visible={signatureDataModal} dataSource={signatureData} />
        {addKhoTaiLieuModalVisible && user?.soDinhDanh ? <PullTaiLieuModal formPost={Nguon_ThanhPhanHoSo} setViewFileLoading={setViewFileLoading} setAddKhoTaiLieuModalVisiable={setAddKhoTaiLieuModalVisiable} filePath={filePath ?? ""} maLinhVuc={maLinhVuc} /> : null}
    </>
}