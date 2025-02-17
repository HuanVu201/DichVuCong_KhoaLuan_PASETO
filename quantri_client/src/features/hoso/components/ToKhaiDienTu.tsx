import { Form } from "@formio/react"
import "formiojs/dist/formio.full.css";
import { Collapse, Dropdown, FormInstance, Menu, MenuProps, Modal, Spin } from "antd";
import { AntdButton, AntdSpace } from "@/lib/antd/components";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Eform, EformProps } from "@/lib/eform";
import { fillEformData } from "@/utils/common";
import { useWindowSizeChange } from "@/hooks/useWindowSizeChange";
import { PORTAL_PRIMARY_COLOR } from "@/data";
import { toast } from "react-toastify";
import { FileExclamationOutlined, FileOutlined, FilePdfOutlined, FileWordOutlined } from "@ant-design/icons";
import { downloadJsonFile, downloadXmlFile } from "@/utils";

export interface ToKhaiDienTuProps extends Omit<EformProps, "form"> {
    showDownloadBtn?: boolean;
    showPrintBtn?: boolean;
    showSaveBtn?: boolean;
    form: string;
    antdForm: FormInstance<any>;
    templateUrl?: string;
    defaultOpen?: boolean;
    hideCollapse?: boolean;
    onSaved?: (uploadedFileName: string) => void;
    viewMode?: EformProps["viewMode"]
}

export const ToKhaiDienTu = memo((props: ToKhaiDienTuProps) => {
    const { form, showDownloadBtn, showPrintBtn, showSaveBtn, defaultOpen, antdForm, templateUrl, onSaved, hideCollapse, ...rest } = props
    const { isMobile } = useWindowSizeChange()
    const [loading, setLoading] = useState(false);

    const hanldeEFormData = useCallback(() => {
        const eFormDataValid = antdForm.getFieldValue("eFormDataValid")
        const eFormData = antdForm.getFieldValue("eFormData")
        if (!eFormDataValid) {
            toast.warn(<>Vui lòng nhập đầy đủ thông tin các trường được đánh dấu <span style={{ color: "red" }}>*</span></>)
            return { docxTemplate: undefined, eFormData: undefined }
        }
        if (!eFormData) {
            return { docxTemplate: undefined, eFormData: undefined }
        }
        for (const [key, value] of Object.entries(eFormData)) {
            var valueText = `${value}`;
            var keyText = `${key}`;
            try {
                const dateKey: any = new Date(valueText);
                if (dateKey instanceof Date === true && dateKey.toString() !== 'Invalid Date') {
                    eFormData[keyText + 'Text'] = dateKey.toLocaleDateString('en-GB');
                }
            } catch (err) { }
        }
        const toDay = new Date();
        eFormData["ExportEformDataTime"] = toDay.getHours() + " giờ " + toDay.getMinutes() + " phút, ngày " + toDay.getDate() + " tháng " + (toDay.getMonth() + 1) + " năm " + toDay.getFullYear();
        let docxTemplate = templateUrl;
        let docxTemplateCustom = "";
        try {
            docxTemplateCustom = eFormData["ExportTemplateCustom"];
            if (docxTemplateCustom) {
                docxTemplate = docxTemplateCustom;
            }
        } catch (err) { }
        return { docxTemplate, eFormData }
    }, [antdForm, templateUrl])

    const onDownload = useCallback(async () => {
        const { docxTemplate, eFormData } = hanldeEFormData()
        setLoading(true)
        if (docxTemplate) {
            await fillEformData(docxTemplate, eFormData, "to-khai.docx")
        }
        setLoading(false)

    }, [])

    const onDownloadPDF = useCallback(async () => {
        const { docxTemplate, eFormData } = hanldeEFormData()
        setLoading(true)
        if (docxTemplate) {
            await fillEformData(docxTemplate, eFormData, "to-khai.pdf",undefined,undefined,"saveAsPdf")
        }
        setLoading(false)
    }, [])

    const onDownloadJson = useCallback(async () => {
        const { docxTemplate, eFormData } = hanldeEFormData()
       
        setLoading(true)
        if (eFormData) {
            await downloadJsonFile(eFormData,'to-khai.json')
        }
        setLoading(false)
    }, [])

    const onDownloadXML = useCallback(async () => {
        const { docxTemplate, eFormData } = hanldeEFormData()
        setLoading(true)
        if (eFormData) {
            await downloadXmlFile(eFormData,'to-khai.xml')
        }
        setLoading(false)
    }, [])

    const onPrint = async () => {
        const { docxTemplate, eFormData } = hanldeEFormData()
        setLoading(true)
        if (docxTemplate) {
            await fillEformData(docxTemplate, eFormData, "to-khai.pdf", undefined, undefined, "word2pdf")
        }
        setLoading(false)
    }
    const onSave = async () => {
        try {
            setLoading(true)
            console.log(123);

            const { docxTemplate, eFormData } = hanldeEFormData()
            if (docxTemplate) {
                await fillEformData(docxTemplate, eFormData, "to-khai.pdf", "ThanhPhanHoSo", onSaved, "saveToTable")
            }
        } catch (error) {
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }

    const onMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key == "print") {
            onPrint()
        } else if (e.key == "save") {
            onSave()
        }
    };
    const onTypeDownloadClick: MenuProps['onClick'] = (e) => {
        if (e.key == "PDF") {
            onDownloadPDF()
        } else if (e.key == "DOCX") {
            onDownload()
        }
        else if (e.key == "XML") {
            onDownloadXML()
        }
        else if (e.key == "JSON") {
            onDownloadJson()
        }
    }
    const buttons = useMemo(() => {
        const items = [
            // {
            //   key: 'download',
            //   label: 'Tải tờ khai',
            // },
            {
                key: 'print',
                label: 'In tờ khai',
            },
            {
                key: 'save',
                label: 'Lưu vào thành phần hồ sơ',
            },
        ];
        const typesDownload = [
            {
                key: 'PDF',
                label: 'PDF',
                icon: <FilePdfOutlined style={{ color: 'orangered' }} />,
            },
            {
                key: 'DOCX',
                label: 'DOCX',
                icon: <FileWordOutlined style={{ color: 'blue' }} />

            },
            {
                key: 'XML',
                label: 'XML',
                icon: <FileExclamationOutlined style={{ color: 'green' }}/>,

            },
            {
                key: 'JSON',
                label: 'JSON',
                icon: <FileOutlined />,

            },
        ];
        return <AntdSpace direction="horizontal" >
            {isMobile ? <Dropdown.Button menu={{ items, onClick: onMenuClick }} onClick={onDownload}>Tải tờ khai</Dropdown.Button> :
                <>
                    {showSaveBtn ? <AntdButton key="save" loading={loading} onClick={onSave}>Lưu vào thành phần hồ sơ</AntdButton> : null}
                    {showDownloadBtn ? (
                        <Dropdown overlay={<Menu onClick={onTypeDownloadClick} items={typesDownload} />}>
                            <AntdButton >Tải tờ khai</AntdButton>
                        </Dropdown>
                    ) : null}
                    {showPrintBtn ? <AntdButton key="print" loading={loading} onClick={onPrint}>In tờ khai</AntdButton> : null}
                </>}

        </AntdSpace>
    }, [showDownloadBtn, showPrintBtn, showSaveBtn, isMobile, loading])
    if (!form) {
        return <></>
    }
    const ToKhaiComponent = <>
        <Eform form={JSON.parse(form)} {...rest} onSubmit={onDownload
        }></Eform>
        <div style={{ display: "flex", justifyContent: "end" }}>
            {buttons}
        </div>
    </>
    if (hideCollapse) {
        return ToKhaiComponent
    }
    return (
        <Collapse items={[
            {
                key: "key",
                label: "Ẩn/ hiện tờ khai",
                children: ToKhaiComponent
            }
        ]} activeKey={defaultOpen ? "key" : undefined}>

        </Collapse>
    )
})
