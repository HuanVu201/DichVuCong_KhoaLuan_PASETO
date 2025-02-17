import { useState } from "react"
import { AntdModal } from "../../modal/Modal"
import { AntdButton } from "../../button/Button";
import { Input } from "antd";
const DEFAULT_FILE_NAME = "thanhphanhoso.pdf"
export const PickNameScanPC = ({onScanFile, loading}: {loading: boolean; onScanFile: (fileName:string) => void}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>();

    const handlerCancel = () => {
        setVisible(false)
        setFileName(DEFAULT_FILE_NAME)
    }

    const onOk = () => {
        setVisible(false);  
        let name = fileName ? fileName : DEFAULT_FILE_NAME;
        if(!name.toLocaleLowerCase().endsWith(".pdf")){
            name = fileName + ".pdf"
        }
        onScanFile(name);
    }
    const onClickScan = () => {
        setVisible(true)
    }


    return (
        <>
            <AntdButton loading={loading} onClick={onClickScan}>Scan</AntdButton>
            <AntdModal title="Nhập tên tệp muốn lưu" visible={visible} handlerCancel={handlerCancel} okText={"Xác nhận"} onOk={onOk}>
                <Input value={fileName} defaultValue={fileName} placeholder={DEFAULT_FILE_NAME} onChange={(e) => setFileName(e.target.value)}></Input>
            </AntdModal>
        </>
    )
}