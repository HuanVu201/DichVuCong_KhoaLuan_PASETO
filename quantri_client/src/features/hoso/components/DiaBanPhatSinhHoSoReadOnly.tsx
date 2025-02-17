import { RenderTitle } from "@/components/common"
import { form } from "@formio/react"
import { Col, Form, Input } from "antd"
import { FormInstance } from "antd/lib"
import { useEffect } from "react"

export const DiaBanPhatSinhHoSoReadOnly = ({tenDiaBan, form}: {tenDiaBan: string | undefined, form: FormInstance<any>}) => {
    
    useEffect(() => {
        const tenDiaBanParse = tenDiaBan ? JSON.parse(tenDiaBan) : {tenTinh: "", tenHuyen: "", tenXa: ""}
      //   console.log(tenDiaBanParse);
        
        form.setFieldValue("tenTinhThanhDiaBan", tenDiaBanParse?.tenTinh || "")
        form.setFieldValue("tenQuanHuyenDiaBan", tenDiaBanParse?.tenHuyen || "")
        form.setFieldValue("tenXaPhuongDiaBan", tenDiaBanParse?.tenXa || "")
    }, [tenDiaBan])

    return <>
      <Col span={24}>
         <RenderTitle title="Địa bàn phát sinh hồ sơ" />
      </Col>
      <Col md={8} span={24}>
         <Form.Item name="tenTinhThanhDiaBan">
            <Input placeholder="Tỉnh thành"></Input>
         </Form.Item>
      </Col>
      <Col md={8} span={24}>
         <Form.Item name="tenQuanHuyenDiaBan">
            <Input placeholder="Quận, huyện"></Input>
         </Form.Item>
      </Col>
      <Col md={8} span={24}>
         <Form.Item name="tenXaPhuongDiaBan" >
            <Input placeholder="Xã, phường, thị trấn"></Input>
         </Form.Item>
      </Col>
   </>
}