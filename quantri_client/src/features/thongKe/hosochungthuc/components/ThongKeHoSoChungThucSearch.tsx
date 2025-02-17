import { Form, Input, Space, Row, Col, DatePicker, Dropdown, MenuProps } from "antd"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useThongKeHoSoChungThucContext } from "../contexts/ThongKeHSCTContext"
import { IThongKeHoSoChungThuc } from "@/features/sochungthuc/models"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { CollapseContent } from "@/components/common"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { ICoCauToChuc } from "@/features/cocautochuc/models"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { filterOptions } from "@/utils"
import { toast } from "react-toastify"
import { IParseUserToken } from "@/models"
import { parseJwt } from "@/utils/common"
import { userService } from "@/features/user/services"
import { IUserRole } from "@/features/user/models"
import { CATALOG_OPTIONS } from "../../ThongKeTheoDonVi/components/SearchThongKeTiepNhanBuuChinh"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import dayjs from 'dayjs'
import { DownOutlined, FileExcelOutlined, FileWordOutlined } from "@ant-design/icons"
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel"
import { downloadPhieuWord } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord"

export const ThongKeHoSoChungThucSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<IThongKeHoSoChungThuc>> }) => {
    const loaidonViThongKeOptions = [
        { label: "Đơn vị cấp trên", value: "donvi" },
        { label: "Đơn vị trực thuộc", value: "donvicon" },
        { label: "Toàn bộ", value: "toanbo" },
    ];
    const thongKeSoChungThucContext = useThongKeHoSoChungThucContext()
    const [form] = Form.useForm()
    const dispatch = useAppDispatch();

    const { data: user } = useAppSelector((state) => state.user);
    const [thongKeToanHeThong, setThongKeToanHeThong] = useState<boolean>(false);
    const [loadingRoles, setLoadingRoles] = useState<boolean>(false);
    const quanHuyen = Form.useWatch("quanHuyen", form);
    const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
    const catalog = Form.useWatch("catalog", form);
    const maDinhDanh = Form.useWatch("MaDinhDanh", form);
    const { data: auth } = useAppSelector((state) => state.auth);
    const [userData, setUserData] = useState<IParseUserToken>();
    const resetSearchParams = useCallback(() => {
        // setSearchParams({ })
        form.resetFields()
    }, [])
    const [donVis, setDonVis] = useState<ICoCauToChuc[]>([])
    const [loading, setLoading] = useState<boolean>(false)



    const onFinish = (values: IThongKeHoSoChungThuc) => {
        setSearchParams((curr) => ({
            ...curr,
            ...values,
             maDinhDanhCha: form.getFieldValue("maDinhDanhCha") ? form.getFieldValue("maDinhDanhCha") : user?.maDinhDanh
        }))
    }
    console.log(form.getFieldValue("maDinhDanhCha"));

    useEffect(() => {
        const donVi = coCauToChucs?.find(x => x.groupCode == quanHuyen)
        if (catalog == 'xa-phuong' && maDinhDanh == "") {
            console.log(123);
            form.setFieldValue("maDinhDanhCha", donVi?.maDinhDanh);
        }
        else
            form.setFieldValue("maDinhDanhCha", user?.maDinhDanh);

    }, [catalog, quanHuyen, maDinhDanh])
    useEffect(() => {
        const now = new Date();
        var tuNgay = `01/01/${now.getFullYear()}`;
        var denNgay = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

        form.setFieldValue("tuNgay", tuNgay ? dayjs(tuNgay) : null);
        form.setFieldValue("denNgay", denNgay ? dayjs(denNgay) : null);
    }, [])

    useEffect(() => {
        if (userData?.typeUser) {
            dispatch(
                SearchCoCauToChuc({
                    type: "don-vi",
                    pageNumber: 1,
                    pageSize: 10000,
                    maDinhDanhCha:
                        !thongKeToanHeThong ? userData?.maDinhDanh : "",
                    orderBy: ["MaDinhDanh"],
                })
            );
        }
    }, [userData]);

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

    const handleMenuClick = (e: any) => {
        if (e.key === "excel") {
            downloadPhieuExcel("Danh sách hồ sơ chứng thực", "DanhSachHoSoChungThuc");
        } else if (e.key === "word") {
            downloadPhieuWord("Danh sách hồ sơ chứng thực", true, "DanhSachHoSoChungThuc");
        }
    };

    const items: MenuProps["items"] = [
        {
            label: "Xuất Word",
            key: "word",
            icon: <FileWordOutlined style={{ color: 'blue' }}></FileWordOutlined>
        },
        {
            label: "Xuất Excel",
            key: "excel",
            icon: <FileExcelOutlined style={{ color: 'green' }}></FileExcelOutlined>

        },

    ];

    const sltCoCauToChucs = useMemo(() => {
        var tmp = [{ maDinhDanh: "", groupName: "Tất cả" }] as ICoCauToChuc[];

        if (coCauToChucs) {
            if (catalog == 'xa-phuong' && quanHuyen) {
                return [...tmp, ...coCauToChucs.filter((x: any) => x.maDinhDanh && x.ofGroupCode == quanHuyen && x.catalog == 'xa-phuong')];
            }
            if (catalog) {
                if (thongKeToanHeThong)
                    return [...tmp, ...coCauToChucs.filter((x) => x.maDinhDanh && x.catalog == catalog)];
                else return coCauToChucs.filter((x) => x.maDinhDanh && x.catalog == catalog);
            } else {
                if (thongKeToanHeThong)
                    return [...tmp, ...coCauToChucs.filter((x) => x.maDinhDanh)];
                else return coCauToChucs.filter((x) => x.maDinhDanh);
            }
        }

        return [];
    }, [coCauToChucs, quanHuyen, catalog]);

    const tmpCoCauToChucHuyens = useMemo(() => {
        var tmp = [{ maDinhDanh: "", groupName: "Tất cả" }] as ICoCauToChuc[];
        if (catalog == 'xa-phuong' && coCauToChucs) {
            if (thongKeToanHeThong)
                return [...tmp, ...coCauToChucs.filter((x) => x.maDinhDanh && x.catalog == 'quan-huyen')];
            else return coCauToChucs.filter((x) => x.maDinhDanh && x.catalog == 'quan-huyen');
        }
        return [];
    }, [catalog]);

    return (

        <Form name='ThongKeHoSoChungThucSearch' layout="vertical" onFinish={onFinish} form={form}>
            <Row gutter={[8, 8]} justify="center">
                <Col lg={6} md={12} span={24} hidden={thongKeToanHeThong ? false : true} >
                    <Form.Item label="Cấp thực hiện" name="catalog">
                        <AntdSelect
                            options={CATALOG_OPTIONS}
                            allowClear={false}
                            defaultValue={""}
                        />
                    </Form.Item>
                </Col>
                <Col lg={6} md={12} span={24} hidden={catalog == 'xa-phuong' ? false : true}>
                    <Form.Item name="quanHuyen"
                        label={`Quận huyện`}
                    >
                        <AntdSelect
                            allowClear
                            generateOptions={{
                                model: tmpCoCauToChucHuyens,
                                value: "groupCode",
                                label: "groupName",
                            }}
                            showSearch
                        />
                    </Form.Item>
                </Col>
                <Col lg={thongKeToanHeThong ? 6 : 12} md={12} span={24} >
                    <Form.Item label={`${catalog != '' && catalog ? CATALOG_OPTIONS?.find(x => x.value == catalog)?.label : 'Đơn vị'}`} name="MaDinhDanh">
                        <AntdSelect
                            allowClear
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
            <Row gutter={[8, 8]} justify="center" style={{ marginBottom: '10px' }}>
                <Col lg={6} md={12} span={24}>
                    <Form.Item label="Từ ngày" name="tuNgay">
                        <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col lg={6} md={12} span={24}>
                    <Form.Item label="Đến ngày" name="denNgay">
                        <DatePicker format={FORMAT_DATE_WITHOUT_TIME} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Row justify="space-around">
                    <Space size="large">
                        <AntdButton type="primary" htmlType="submit" >
                            Xác nhận
                        </AntdButton>
                        <AntdButton type="default" onClick={resetSearchParams}>
                            Tải lại
                        </AntdButton>
                        <Dropdown menu={{ items: items, onClick: handleMenuClick }} trigger={["click"]}>
                            <AntdButton type="primary">
                                In danh sách <DownOutlined />
                            </AntdButton>
                        </Dropdown>
                    </Space>
                </Row>
            </Form.Item>
        </Form>

    )
}