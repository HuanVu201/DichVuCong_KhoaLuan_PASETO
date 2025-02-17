import { Form, Input, Space, Row, Col, Radio } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useCallback, useEffect, useMemo, useState } from "react"
import { parseJwt } from "@/utils/common"
import { IParseUserToken } from "@/models"
import { userService } from "@/features/user/services"
import { IUserRole } from "@/features/user/models"
import { CATALOG_OPTIONS } from "@/features/cocautochuc/components/modals/AddGroupChild"
import { ICoCauToChuc } from "@/features/cocautochuc/models"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { coCauToChucService } from "@/features/cocautochuc/services"
import { ISearchDanhGiaCoQuan } from "@/features/danhgiacoquan/models"
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel"

const loaidonViThongKeOptions = [
    { label: "Đơn vị cấp trên", value: "donvicaptren" },
    { label: "Tất cả", value: "toanbo" },
];

export const BaoCao03Search = ({ setSearchParams, dataCoCauToChuc, setDataCoCauToChuc }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhGiaCoQuan>>, dataCoCauToChuc: ICoCauToChuc[], setDataCoCauToChuc: React.Dispatch<React.SetStateAction<ICoCauToChuc[]>> }) => {
    const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3).toString()
    const currentYear = new Date().getFullYear().toString()
    const [form] = Form.useForm()
    const dispatch = useAppDispatch();
    const [thongKeToanHeThong, setThongKeToanHeThong] = useState<boolean>(false);
    const [loadingRoles, setLoadingRoles] = useState<boolean>(false);
    const { data: auth } = useAppSelector((state) => state.auth);
    const [userData, setUserData] = useState<IParseUserToken>();
    const catalog = Form.useWatch("catalog", form);
    const quanHuyen = Form.useWatch("quanHuyen", form);
    const { data: user, } = useAppSelector(state => state.user)
    const onFinish = (values: ISearchDanhGiaCoQuan) => {
        setSearchParams((curr) => ({
            ...curr, ...values,
            quy: form.getFieldValue("quy") ? form.getFieldValue("quy") : currentQuarter,
            nam: form.getFieldValue("nam") ? form.getFieldValue("nam") : currentYear,
            // maDinhDanhCha: form.getFieldValue("maDinhDanhCha") ? form.getFieldValue("maDinhDanh") : user?.maDinhDanh
        }))
    }
    const resetSearchParams = useCallback(() => {
        setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true, quy: currentQuarter, nam: currentYear, maDinhDanhCha: user?.maDinhDanh })
        form.resetFields()
    }, [])
    const [years, setYears] = useState<string[]>([])
    const [quarters, setQuarters] = useState<string[]>(['1', '2', '3', '4'])
    useEffect(() => {
        (async () => {
            if (userData?.typeUser) {
                const res = await coCauToChucService.Search({
                    type: "don-vi",
                    pageNumber: 1,
                    pageSize: 1500,
                    maDinhDanhCha:
                        !thongKeToanHeThong ? userData?.maDinhDanh : "",
                    orderBy: ["MaDinhDanh"],
                })
                setDataCoCauToChuc(res.data.data)
            }
        }
        )()
    }, [userData]);
    const sltCoCauToChucs = useMemo(() => {
        var tmp = [{ maDinhDanh: "", groupName: "Tất cả" }] as ICoCauToChuc[];

        if (dataCoCauToChuc) {

            if (catalog == 'xa-phuong' && quanHuyen) {
                return [...tmp, ...dataCoCauToChuc.filter((x: any) => x.maDinhDanh && x.ofGroupCode == quanHuyen && x.catalog == 'xa-phuong')];
            }
            if (catalog) {
                if (thongKeToanHeThong)
                    return [...tmp, ...dataCoCauToChuc.filter((x) => x.maDinhDanh && x.catalog == catalog)];
                else return dataCoCauToChuc.filter((x) => x.maDinhDanh && x.catalog == catalog);
            } else {
                if (thongKeToanHeThong)
                    return [...tmp, ...dataCoCauToChuc.filter((x) => x.maDinhDanh)];
                else return dataCoCauToChuc.filter((x) => x.maDinhDanh);
            }
        }
        return [];
    }, [dataCoCauToChuc, quanHuyen, catalog]);

    const tmpCoCauToChucHuyens = useMemo(() => {
        var tmp = [{ maDinhDanh: "", groupName: "Tất cả" }] as ICoCauToChuc[];
        if (catalog == 'xa-phuong' && dataCoCauToChuc) {
            if (thongKeToanHeThong)
                return [...tmp, ...dataCoCauToChuc.filter((x) => x.maDinhDanh && x.catalog == 'quan-huyen')];
            else return dataCoCauToChuc.filter((x) => x.maDinhDanh && x.catalog == 'quan-huyen');
        }
        return [];
    }, [catalog]);
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
                setLoadingRoles(true)
                var user = parseJwt(auth.token) as IParseUserToken;
                let getRoles = await userService.GetUserRoles(user.uid);
                if (getRoles?.data && getRoles?.data?.length > 0) {
                    getRoles?.data.map((item: IUserRole) => {
                        // console.log((item.roleName == 'Thống kê toàn hệ thống' && item.enabled))
                        if ((item.roleName == 'Thống kê toàn hệ thống' && item.enabled) || (item.roleName == "Admin" && item.enabled)) {
                            setThongKeToanHeThong(true)
                            setLoadingRoles(false)
                        }
                    });
                }
                setLoadingRoles(false)
            })()
        }
    }, [auth]);
    const onChangeLoaiDonVi = (e: any) => {
        if (e.target.value == "donvicaptren") {
            setSearchParams((cur) => ({ ...cur, maDinhDanhCha: undefined, maDinhDanh: form.getFieldValue("maDinhDanh") }))
        }
        else if (e.target.value == "donvicon") {
            setSearchParams((cur) => ({ ...cur, maDinhDanhCha: form.getFieldValue("maDinhDanh"), maDinhDanh: undefined, layDonViCon: true, catalog: undefined }))
        }
        else if (e.target.value == "toanbo") {
            setSearchParams((cur) => ({ ...cur, maDinhDanhCha: form.getFieldValue("maDinhDanh"), maDinhDanh: undefined, layDonViCon: undefined, catalog: undefined }))
        }
    }

    return (

        <Form name='danhGiaCoQuan' layout="horizontal" onFinish={onFinish} form={form} style={{
            padding: "20px 20px",
            backgroundColor: "#f1f5f1",
            borderRadius: "5px",
            marginTop: "10px",
        }}>

            <Row justify="center" gutter={[8, 8]}>
                <Col hidden={thongKeToanHeThong ? false : true} style={{ flex: '1' }}>
                    <Form.Item
                        label="Loại"
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
                </Col>
                <Col hidden={thongKeToanHeThong ? false : true} style={{ flex: '1' }}>
                    <Form.Item label="Cấp thực hiện" name="catalog">
                        <AntdSelect
                            options={CATALOG_OPTIONS}
                            allowClear={false}
                            defaultValue={""}
                        />
                    </Form.Item>
                </Col>
                <Col style={{ flex: '1' }} hidden={catalog == 'xa-phuong' ? false : true}>
                    <Form.Item name="quanHuyen"
                        label={`Quận huyện`}
                    >
                        <AntdSelect
                            generateOptions={{
                                model: tmpCoCauToChucHuyens,
                                value: "groupCode",
                                label: "groupName",
                            }}
                            showSearch
                        />
                    </Form.Item>
                </Col>
                <Col style={{ flex: '1' }}>
                    <Form.Item label={`${catalog != '' && catalog ? CATALOG_OPTIONS?.find(x => x.value == catalog)?.label : 'Đơn vị'}`} name="maDinhDanh">
                        <AntdSelect
                            generateOptions={{
                                model: sltCoCauToChucs,
                                value: "maDinhDanh",
                                label: "groupName",
                            }}
                            showSearch
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="center" gutter={16}>
                <Col style={{ alignItems: 'inherit', }}>
                    <Form.Item
                        label="Quý"
                        name="quy"
                    >
                        <AntdSelect defaultValue={currentQuarter} allowClear style={{ width: '200px' }}
                            options={quarters.map(quarter => ({ value: quarter, label: quarter }))}>

                        </AntdSelect>
                    </Form.Item>
                </Col>
                <Col style={{ alignItems: 'inherit', }}>
                    <Form.Item
                        label="Năm"
                        name="nam"
                    >
                        <AntdSelect defaultValue={currentYear} allowClear style={{ width: '200px' }}
                            options={years.map(year => ({ value: year, label: year }))}>
                        </AntdSelect>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Row justify="space-around">
                    <Space size="large">
                        <AntdButton type="primary" htmlType="submit" >
                            Thống kê
                        </AntdButton>
                        <AntdButton onClick={() => {
                            downloadPhieuExcel("Báo cáo mẫu 03", "ExportExcelBaoCao03DGHL");
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