import './ThongKeTable.scss'
import { useEffect, useMemo, useState } from "react"
import { useColumn } from "../hooks/useColumn"
import { AntdSelect, AntdSelectProps, AntdSpace, AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { SearchBanner } from "@/features/portaldvc_admin/banner/redux/action"
import { Col, Form, Select, SelectProps } from "antd"
import { ConfigProvider } from "antd";
import { baoCaoTongHopApi } from "@/features/baocaotonghop/services"
import { IBaoCaoDonVi, ISearchBaoCaoDonVi } from "@/features/baocaotonghop/model"
import dayjs from 'dayjs'
import { getFirstAndLastDayOfMonth } from "@/utils/common"
import { MONTH, YEAR } from "@/data"
import { ThongKeTab } from "./ThongKeDetail/ThongKeTab"
import { useThongKePortalContext } from "../context/ThongKePortalContext"
import { toast } from 'react-toastify'
import { SearchCoCauToChuc } from '@/features/cocautochuc/redux/crud'

const optionsTest: SelectProps["options"] = [
    { label: "Tất cả", value: '' },
    { label: "Sở ban ngành", value: 'so-ban-nganh' },
    { label: "Quận huyện", value: 'quan-huyen' },
    { label: "Xã phường", value: 'xa-phuong' },
    { label: "Chi nhánh văn phòng đăng kí đất đai", value: 'cnvpdk' },
];



export const ThongKeTable = ({ searchQuery }: { searchQuery: URLSearchParams }) => {
    const [baoCaoDonVis, setBaoCaoDonVis] = useState<IBaoCaoDonVi[]>()
    const [groupCodeParent, setGroupCodeParent] = useState<string>("")
    const [searchParams, setSearchParams] = useState<ISearchBaoCaoDonVi>({ type: "don-vi" })
    const [catalogSelected, setCatalogSelected] = useState('so-ban-nganh')
    const thongKePortalContext = useThongKePortalContext()
    let [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
    useEffect(() => {
        dispatch(
            SearchCoCauToChuc({
                type: "don-vi",
                pageNumber: 1,
                pageSize: 1000,
                // cataLog: 'quan-huyen',
            })
        );
    }, [thongKePortalContext.catalogSearchPortal == 'xa-phuong']);

    const onSelect = (e: any) => {
        if (e == 'xa-phuong')
            toast('Chọn đơn vị để thực hiện thống kê!');
        setCatalogSelected(e)
        thongKePortalContext.setCatalogSearchPortal(e)
    }
    const { columns } = useColumn()
    useEffect(() => {
        const nam = searchQuery.get("nam")
        const thang = searchQuery.get("thang")
        const { firstDay, lastDay } = getFirstAndLastDayOfMonth(nam ? +nam : YEAR, thang ? +thang : MONTH)
        setSearchParams((curr) => ({ ...curr, tuNgay: firstDay, denNgay: lastDay, catalog: catalogSelected || undefined }))

    }, [searchQuery, catalogSelected])

    const onSearch = async (params: ISearchBaoCaoDonVi) => {
        const res = await baoCaoTongHopApi.BaoCaoTongHopDonVi(params)
        if (res.data) {
            const soBanNganh: IBaoCaoDonVi[] = []
            const quanHuyen: IBaoCaoDonVi[] = []
            const xaPhuong: IBaoCaoDonVi[] = []
            const resItem: IBaoCaoDonVi[] = []

            res.data.data.forEach(item => {
                if (item.catalog == "so-ban-nganh") soBanNganh.push(item)
                else if (item.catalog == "quan-huyen") quanHuyen.push(item)
                else if (item.catalog == "xa-phuong") xaPhuong.push(item)
                else resItem.push(item)
            })
            setBaoCaoDonVis([...soBanNganh, ...quanHuyen, ...xaPhuong, ...resItem])
        }
    }

    const [sortByThuTuAndTenThongKe] = useMemo(() => {
        if (baoCaoDonVis?.find(x => x.thuTu == 0))
            return [baoCaoDonVis?.sort((a, b) => a.tenThongKe.localeCompare(b.tenThongKe))]
        return [baoCaoDonVis?.sort((a, b) => a.thuTu - b.thuTu)]
    }, [baoCaoDonVis])

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                    },
                },
            }}
        >
            <div className="d-flex flex-wrap">
                <span style={{ fontSize: '15px', fontWeight: 600 }}>Thống kê nhóm đơn vị: </span>
                <AntdSelect options={optionsTest} onSelect={onSelect} style={{ width: '100%' }} defaultValue={""}></AntdSelect>
            </div>
            {thongKePortalContext.catalogSearchPortal == 'xa-phuong' ?
                <Form form={form} name="" style={{ marginTop: '15px' }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: '10px' }}>
                        <Col style={{ flex: 1 }}
                        >
                            <Form.Item name="capHuyen">
                                <AntdSelect
                                    placeholder='Chọn đơn vị cấp huyện'
                                    generateOptions={{
                                        model: coCauToChucs?.filter(x => x.catalog == 'quan-huyen'),
                                        value: "groupCode",
                                        label: "groupName",
                                    }}
                                    onChange={(e: any) => {
                                        setGroupCodeParent(e)
                                        form.setFieldValue("capXa", undefined)
                                        thongKePortalContext.setThongKeXaPhuong({
                                            catalog: 'quan-huyen',
                                            groupCode: e
                                        })
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col style={{ flex: 1 }}>
                            <Form.Item name="capXa">
                                <AntdSelect
                                    placeholder='Chọn đơn vị cấp xã'
                                    generateOptions={{
                                        model: coCauToChucs?.filter(x => x?.ofGroupCode == groupCodeParent && x.catalog),
                                        value: "groupCode",
                                        label: "groupName",
                                    }}
                                    onChange={(e: any) => {
                                        thongKePortalContext.setThongKeXaPhuong({
                                            catalog: 'xa-phuong',
                                            groupCode: e
                                        })
                                    }}
                                    showSearch
                                />
                            </Form.Item>
                        </Col>
                    </div>
                </Form>
                : <></>
            }
            <div style={{ margin: 'auto' }}>
                <ThongKeTab />

            </div>
        </ConfigProvider>

    )
}