import { RenderTitle } from "@/components/common"
import { IDanhMucDiaBan, ISearchDanhMucDiaBan } from "@/features/danhmucdiaban/models"
import { danhMucDiaBanApi } from "@/features/danhmucdiaban/services"
import { AntdSelect } from "@/lib/antd/components"
import { useAppSelector } from "@/lib/redux/Hooks"
import { filterOptions, filterOptionsWithTitle, filterOptionsWithValue } from "@/utils"
import { Col, Form, Row, Select } from "antd"
import { DefaultOptionType } from "antd/es/select"
import { FormInstance } from "antd/lib"
import { useEffect, useMemo, useState } from "react"

export const ChonDonVi3Cap = <IModel,>({title, formItemNameMapper, form}: {form: FormInstance<IModel>; title: string; formItemNameMapper: {maTinh: keyof IModel; maHuyen: keyof IModel; maXa: keyof IModel;}}) => {
    const [diaBan, setDiaBan] = useState<{maTinh: IDanhMucDiaBan[]; maHuyen: IDanhMucDiaBan[]; maXa: IDanhMucDiaBan[]}>({
        maTinh: [],
        maHuyen: [],
        maXa: []
    })
    const maTinhDangChon = Form.useWatch(formItemNameMapper.maTinh.toString(), form)
    const {publicModule} = useAppSelector(state => state.config)
    const maTinhDefault = useMemo(() => {
        return publicModule?.find(x => x.code == "ma-tinh")?.content
    }, [publicModule])

    useEffect(() => {
        (async () => {
            const maTinh = maTinhDangChon || maTinhDefault
            console.log(diaBan.maTinh.length);
            
            if(diaBan.maTinh.length > 0){
                const res = await danhMucDiaBanApi.Search({ Loai: "Huyen", maDiaBan: maTinh})
                setDiaBan((curr) => ({...curr, maHuyen: res.data.data}))
            } else if (diaBan.maTinh){
                const res = await danhMucDiaBanApi.Search({ Loai: "Tinh" })
                console.log("???");
                
                setDiaBan((curr) => ({...curr, maTinh: res.data.data}))
            }
        })()
    }, [diaBan.maTinh.length])
    useEffect(() => {
        form.setFieldValue(formItemNameMapper.maTinh.toString(), maTinhDefault)
    }, [maTinhDefault])
    const onChangeMaDonVi = async (data: string, Loai: ISearchDanhMucDiaBan["Loai"], currentSelect: ISearchDanhMucDiaBan["Loai"]) => {
        if(data){
            if (currentSelect != "Xa") {
                const res = await danhMucDiaBanApi.Search({ Loai: Loai, maDiaBan: data as string })
                setDiaBan((curr) => {
                    if(Loai == "Tinh")
                        curr.maTinh = res.data.data
                    else if(Loai == "Huyen")
                        curr.maHuyen = res.data.data
                    else if(Loai == "Xa")
                        curr.maXa = res.data.data
                    return {...curr}
                })
            }
            if (currentSelect == "Tinh") {
                form.setFieldValue(formItemNameMapper.maTinh.toString(), data)
                form.resetFields([formItemNameMapper.maHuyen.toString(), formItemNameMapper.maXa.toString()])
            }
            if (currentSelect == "Huyen") {
                form.setFieldValue(formItemNameMapper.maHuyen.toString(), data)
                form.resetFields([formItemNameMapper.maXa.toString()])
            }
            if (currentSelect == 'Xa') {
                form.setFieldValue(formItemNameMapper.maXa.toString(), data)
            }
        }
    }

    return (
        <Row gutter={[8, 8]}>
            <Col span={24}>
                <RenderTitle title={title} />
            </Col>
            <Col md={8} span={24}>
                <Form.Item name={formItemNameMapper.maTinh.toString()} >
                    <AntdSelect placeholder="Tỉnh thành" generateOptions={{model: diaBan.maTinh, value: "maDiaBan" , label: "tenDiaBan"}} showSearch allowClear 
                    onChange={(value) => onChangeMaDonVi(value, "Huyen", "Tinh")} filterOption={filterOptions}/>
                </Form.Item>
            </Col>
            <Col md={8} span={24}>
                <Form.Item name={formItemNameMapper.maHuyen.toString()}>
                    <AntdSelect generateOptions={diaBan.maHuyen ? {model: diaBan.maHuyen, value: "maDiaBan", label: "tenDiaBan"} : undefined} 
                    placeholder="Quận, huyện" showSearch allowClear  onChange={(value) => onChangeMaDonVi(value, "Xa", "Huyen")} filterOption={filterOptions}/>
                </Form.Item>
            </Col>
            <Col md={8} span={24}>
                <Form.Item name={formItemNameMapper.maXa.toString()} >
                    <AntdSelect generateOptions={diaBan.maXa ? {model: diaBan.maXa , value: "maDiaBan", label: "tenDiaBan"} : undefined} 
                    placeholder="Xã, phường, thị trấn" showSearch allowClear  onChange={(value) => onChangeMaDonVi(value, "Xa", "Xa")} filterOption={filterOptions}/>
                </Form.Item>
            </Col>
        </Row>
    )
}


