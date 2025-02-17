import { Form, Input, Space, Row, Col, Radio } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useCallback, useEffect, useState } from "react"
import { useBaoCaoMau01Context } from "../contexts/BaoCao01Context"
import { IPhieuKhaoSat, ISearchPhieuKhaoSat } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/models"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { filterOptions } from "@/utils"
import { ExportExcel } from "@/lib/xlsx/ExportExcel"
import { ExportExcelBaoCao01, SearchBaoCao01 } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/redux/action"
import { PhieuKhaoSatApi } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/services"
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel"
import { parseJwt } from "@/utils/common"
import { IParseUserToken } from "@/models"
import { IUserRole } from "@/features/user/models"
import { userService } from "@/features/user/services"

export const BaoCao01Search = ({ setSearchParams, }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchPhieuKhaoSat>> }) => {
    const loaidonViThongKeOptions = [
        { label: "Không bao gồm đơn vị trực thuộc", value: "donvicaptren" },
        { label: "Tất cả", value: "toanbo" },
    ];
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3).toString()
    const currentYear = new Date().getFullYear().toString()
    const { datas: donVis } = useAppSelector(state => state.cocautochuc)
    const [thongKeToanHeThong, setThongKeToanHeThong] = useState<boolean>(false);
    const { data: auth } = useAppSelector((state) => state.auth);
    const [userData, setUserData] = useState<IParseUserToken>();

    const onFinish = async (values: ISearchPhieuKhaoSat) => {

        setSearchParams((curr) => ({ ...curr, ...values, donVi: form.getFieldValue("donVi") ? form.getFieldValue("donVi") : user?.officeCode, quy: form.getFieldValue("quy") || currentQuarter, nam: form.getFieldValue("nam") || currentYear }))
    }
    const { data: user } = useAppSelector(state => state.user)

    const [years, setYears] = useState<string[]>([])
    const [quarters, setQuarters] = useState<string[]>(['1', '2', '3', '4'])
    useEffect(() => {
        const currentYear = new Date().getFullYear()
        const yearsArray = Array.from({ length: currentYear - 2020 }, (_, index) => (currentYear - index).toString())
        setYears(yearsArray)
    }, [])
    useEffect(() => {
        if (auth) {
            var user = parseJwt(auth.token) as IParseUserToken;
            setUserData(user);
            (async () => {
                var user = parseJwt(auth.token) as IParseUserToken;
                let getRoles = await userService.GetUserRoles(user.uid);
                if (getRoles?.data && getRoles?.data?.length > 0) {
                    getRoles?.data.map((item: IUserRole) => {
                        // console.log((item.roleName == 'Thống kê toàn hệ thống' && item.enabled))
                        if ((item.roleName == 'Thống kê toàn hệ thống' && item.enabled) || (item.roleName == "Admin" && item.enabled)) {
                            setThongKeToanHeThong(true)
                        }
                    });
                }
            })()
        }
    }, [auth]);
    const onChangeLoaiDonVi = (e: any) => {
        if (e.target.value == "donvicaptren") {
            setSearchParams((cur) => ({ ...cur, donVi: form.getFieldValue("donVi"), tatCa: undefined }))
        }
        else if (e.target.value == "toanbo") {
            setSearchParams((cur) => ({ ...cur, donVi: form.getFieldValue("donVi"), tatCa: true }))
        }
    }
    return (

        <Form style={{ marginTop: '30px' }} name='baocao01' layout="vertical" onFinish={onFinish} form={form}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', }}>
                <Row hidden={thongKeToanHeThong ? false : true}  style={{ alignItems: 'inherit', }}>
                    <span style={{ fontSize: '16px', fontWeight: '700', marginRight: '10px', marginTop: '3px' }}>Loại : </span>
                    <Form.Item
                        name="loaiDonViThongKe"
                        hidden={thongKeToanHeThong ? false : true}
                    >
                        <Radio.Group
                            onChange={onChangeLoaiDonVi}
                            options={loaidonViThongKeOptions}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </Form.Item>

                </Row>

                <Row style={{ alignItems: 'inherit', }}>
                    <span style={{ fontSize: '16px', fontWeight: '700', marginRight: '10px', marginTop: '3px' }}>Đơn vị : </span>
                    <Form.Item
                        name="donVi"
                    >
                        <AntdSelect
                            defaultValue={user?.officeName}
                            generateOptions={{ model: donVis, label: "groupName", value: "groupCode" }}
                            showSearch
                            allowClear
                            filterOption={filterOptions}
                            style={{ width: '400px' }}
                        />
                    </Form.Item>
                </Row>
                <Row style={{ alignItems: 'inherit', }}>
                    <span style={{ fontSize: '16px', fontWeight: '700', marginRight: '10px' }}>Quý :</span>
                    <Form.Item
                        name="quy"

                    >
                        <AntdSelect defaultValue={currentQuarter} allowClear style={{ width: '200px' }}
                            options={quarters.map(quarter => ({ value: quarter, label: quarter }))}>

                        </AntdSelect>
                    </Form.Item>
                </Row>
                <Row style={{ alignItems: 'inherit', }}>
                    <span style={{ fontSize: '16px', fontWeight: '700', marginRight: '10px' }}>Năm :</span>
                    <Form.Item
                        name="nam"
                    >
                        <AntdSelect defaultValue={currentYear} allowClear style={{ width: '200px' }}
                            options={years.map(year => ({ value: year, label: year }))}>
                        </AntdSelect>
                    </Form.Item>
                </Row>
            </div>
            <Form.Item>
                <Row justify="space-around" style={{ marginTop: "10px" }}>
                    <Space size="large">
                        <AntdButton type="primary" htmlType="submit"  >
                            Thống kê
                        </AntdButton>
                        <AntdButton onClick={() => {
                            downloadPhieuExcel("Báo cáo mẫu 01", "ExportExcelBaoCao01DGHL");
                        }}
                            style={{ backgroundColor: '#23b723', color: 'white' }} htmlType="submit" >
                            Xuất danh sách
                        </AntdButton>

                    </Space>
                </Row>
            </Form.Item>
        </Form>
    )
}