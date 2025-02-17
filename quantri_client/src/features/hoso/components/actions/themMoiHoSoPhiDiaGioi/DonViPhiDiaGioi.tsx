import { RenderTitle } from "@/components/common";
import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { coCauToChucService } from "@/features/cocautochuc/services";
import { AntdSelect } from "@/lib/antd/components"
import { filterOptions, filterOptionsWithTitle } from "@/utils";
import { Col, Form, Input, Row, SelectProps } from "antd"
import { FormInstance } from "antd/lib";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
const CATALOG_OPTIONS: SelectProps["options"] = [
    { label: "Sở ban ngành", value: "so-ban-nganh" },
    { label: "Huyện, thị xã, thành phố", value: "quan-huyen" },
    { label: "Xã, phường, thị trấn", value: "xa-phuong" },
];
const DonViPhiDiaGioi = ({form, requiredMark = true} : {form: FormInstance<any>; requiredMark?: boolean}) => {
    const [group, setGroup] = useState<{
        soBanNganhs: ICoCauToChuc[];
        quanHuyens: ICoCauToChuc[];
        xaPhuongs: ICoCauToChuc[];
    }>({
        soBanNganhs: [],
        quanHuyens: [],
        xaPhuongs: [],
    })
    const capThucHienDonViPhiDiaGioi = Form.useWatch("capThucHienDonViPhiDiaGioi", form)
    const isSoBanNganh = capThucHienDonViPhiDiaGioi === "so-ban-nganh"
    const isQuanHuyen = capThucHienDonViPhiDiaGioi === "quan-huyen"
    const isXaPhuong = capThucHienDonViPhiDiaGioi === "xa-phuong"
    const currentSelectQuanHuyen = Form.useWatch("quanHuyen", form)
    const currentSelectSoBanNganh = Form.useWatch("soBanNganh", form)
    const currentSelectXaPhuong = Form.useWatch("xaPhuong", form)
    const xaPhuongCaches = useMemo(() => {
        return group.xaPhuongs.filter(x => x.ofGroupCode === currentSelectQuanHuyen) || []
    }, [group.xaPhuongs, currentSelectQuanHuyen])

    useEffect(() => {
        if(capThucHienDonViPhiDiaGioi == "so-ban-nganh"){
            form.setFieldValue("donViPhiDiaGioi", currentSelectSoBanNganh)
        } else if(capThucHienDonViPhiDiaGioi == "quan-huyen"){
            form.setFieldValue("donViPhiDiaGioi", currentSelectQuanHuyen)
        } else if(capThucHienDonViPhiDiaGioi == "xa-phuong"){
            form.setFieldValue("donViPhiDiaGioi", currentSelectXaPhuong)
        }
    }, [currentSelectQuanHuyen, currentSelectSoBanNganh, currentSelectXaPhuong, capThucHienDonViPhiDiaGioi])
    
    // lưu hết api gọi search tới xaPhuongVao cache xaphuongs với memo (...[] vào nó khi search quận huyện - từ đó khi search xã phường từ quận huyện đã search thì sẽ k phải gọi lại api)
    const getGroupData = async (cataLog: string, quanHuyen: string | undefined= undefined) => {
        try {
            const res = await coCauToChucService.PortalSearch({cataLog, pageSize:5000, ofGroupCode: cataLog === "xa-phuong" ? quanHuyen : undefined})
            if(cataLog === "so-ban-nganh"){
                setGroup((curr) => ({
                    ...curr, soBanNganhs: res.data.data || []
                }))
            } else if(cataLog === "quan-huyen") {
                setGroup((curr) => ({
                    ...curr, quanHuyens: res.data.data || []
                }))
            } else if (cataLog === "xa-phuong"){
                setGroup((curr) => ({
                    ...curr, xaPhuongs: res.data.data || []
                }))
            }
        } catch (error) {
            console.log(error);
            toast.error("Có lỗi xảy ra khi lấy dữ liệu")
        }
    }

    const onChangQuanHuyen : SelectProps["onChange"] = async (value) => {
        await getGroupData("xa-phuong",  value)
    }

    const onChangeCapThucHien : SelectProps["onChange"]= async (value, option) => {
        if(value === "so-ban-nganh" && !group.soBanNganhs.length){
            await getGroupData(value)
        } else if(value === "quan-huyen" && !group.quanHuyens.length) {
            await getGroupData(value)
        } else if (value === "xa-phuong"){
            if(!group.quanHuyens.length){
                await getGroupData("quan-huyen")
            }
        }
    }

    return (<Row gutter={[4,0]}>
        <Form.Item hidden name={"donViPhiDiaGioi"}  rules={[{message: "Vui lòng chọn đơn vị theo cấp thực hiện cụ thể", required:true}]}><Input></Input></Form.Item>
        <Col span={24}>
            <RenderTitle title="Đơn vị phi địa giới"/>
        </Col>
        <Col span={24} md={6}>
            <Form.Item name="capThucHienDonViPhiDiaGioi" label="Cấp thực hiện">
                <AntdSelect options={CATALOG_OPTIONS} onChange={onChangeCapThucHien} allowClear showSearch filterOption={filterOptionsWithTitle}></AntdSelect>
            </Form.Item>
        </Col>
        {isSoBanNganh ? <Col span={24} md={6}>
            <Form.Item name={"soBanNganh"} label="Sở ban ngành" rules={requiredMark ? [{message: "Vui lòng chọn đơn vị", required:true}] : undefined}>
                <AntdSelect
                    generateOptions={{ model: group.soBanNganhs, value: "groupCode", label: "groupName" }}
                    showSearch
                    allowClear
                    filterOption={filterOptions}
                >
                </AntdSelect>
            </Form.Item>
        </Col> : null}
        {isQuanHuyen || isXaPhuong ? <Col span={24} md={6}>
            <Form.Item name={"quanHuyen"} label="Huyện, thị xã, thành phố" rules={isQuanHuyen && requiredMark ? [{message: "Vui lòng chọn đơn vị", required:true}] : undefined}>
                <AntdSelect generateOptions={{ model: group.quanHuyens, value: "groupCode", label: "groupName" }}
                    showSearch
                    allowClear
                    filterOption={filterOptions}
                    onChange={onChangQuanHuyen}
                    >
                </AntdSelect>
            </Form.Item>
        </Col> : null}
        {isXaPhuong ? <Col span={24} md={6}>
            <Form.Item name={"xaPhuong"} label="Xã, phường, thị trấn" rules={requiredMark ? [{message: "Vui lòng chọn đơn vị", required:true}] : undefined}>
                <AntdSelect generateOptions={{ model: xaPhuongCaches, value: "groupCode", label: "groupName" }}
                    showSearch
                    allowClear
                    filterOption={filterOptions}>
                </AntdSelect>
            </Form.Item>
        </Col> : null}
    </Row>)
}

export default DonViPhiDiaGioi