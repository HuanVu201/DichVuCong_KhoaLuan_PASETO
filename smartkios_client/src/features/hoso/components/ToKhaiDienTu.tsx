import { Form } from "@formio/react"
import "formiojs/dist/formio.full.css";
import { Collapse, Dropdown, FormInstance, MenuProps, Modal } from "antd";
import { AntdButton, AntdSpace } from "@/lib/antd/components";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Eform, EformProps } from "@/lib/eform";
import { fillEformData } from "@/utils/common";
import { useWindowSizeChange } from "@/hooks/useWindowSizeChange";
import { PORTAL_PRIMARY_COLOR } from "@/data";

export interface ToKhaiDienTuProps extends Omit<EformProps, "form"> {
    showDownloadBtn?: boolean;
    showPrintBtn?: boolean;
    showSaveBtn?: boolean;
    form: string;
    antdForm: FormInstance<any>;
    templateUrl?: string;
    defaultOpen?: boolean;
    hideCollapse?: boolean;
    onSaved?: (uploadedFileName: string) => void
}

export const ToKhaiDienTu = memo((props: ToKhaiDienTuProps) => {
    const { form, showDownloadBtn, showPrintBtn, showSaveBtn, defaultOpen, antdForm, templateUrl, onSaved, hideCollapse, ...rest } = props
    const { isMobile } = useWindowSizeChange()
    const hanldeEFormData = useCallback(() => {
        const eFormData = antdForm.getFieldValue("eFormData")
        if (!eFormData) {
            return { docxTemplate: undefined, eFormData: undefined }
        }
        for (const [key, value] of Object.entries(eFormData)) {
            var valueText = `${value}`;
            var keyText = `${key}`;
            try {
                const dateKey : any = new Date(valueText);
                if(dateKey instanceof Date === true && dateKey.toString() !== 'Invalid Date'){
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
    const onDownload = useCallback(() => {
        const { docxTemplate, eFormData } = hanldeEFormData()
        if (docxTemplate) {
            fillEformData(docxTemplate, eFormData, "to-khai.docx")
        }
    }, [])
    const onPrint = () => {
        const { docxTemplate, eFormData } = hanldeEFormData()
        if (docxTemplate) {
            fillEformData(docxTemplate, eFormData, "to-khai.pdf", undefined, undefined, "word2pdf")
        }
    }
    const onSave = () => {
        const { docxTemplate, eFormData } = hanldeEFormData()
        if (docxTemplate) {
            fillEformData(docxTemplate, eFormData, "to-khai.pdf", "ThanhPhanHoSo", onSaved, "saveToTable")
        }
    }

    const onMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key == "print"){
            onPrint()
        }else if (e.key == "save"){
            onSave()
        }
    };
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
        return <AntdSpace direction="horizontal" >
            {isMobile ? <Dropdown.Button menu={{ items, onClick: onMenuClick }} onClick={onDownload}>Tải tờ khai</Dropdown.Button> :
                <>
                    {showDownloadBtn ? <AntdButton key="download" onClick={onDownload}>Tải tờ khai</AntdButton> : null}
                    {showPrintBtn ? <AntdButton key="print" onClick={onPrint}>In tờ khai</AntdButton> : null}
                    {showSaveBtn ? <AntdButton key="save" onClick={onSave}>Lưu vào thành phần hồ sơ</AntdButton> : null}
                </>}

        </AntdSpace>
    }, [showDownloadBtn, showPrintBtn, showSaveBtn, isMobile])
    if(!form){
        return <></>
    }
    const ToKhaiComponent = <>
        <Eform form={JSON.parse(form)} {...rest} onSubmit={onDownload
        }></Eform>
        <div style={{ display: "flex", justifyContent: "end" }}>
            {buttons}
        </div>
    </>
    if(hideCollapse){
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
