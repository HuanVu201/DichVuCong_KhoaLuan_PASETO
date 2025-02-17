import { IHoSo } from "@/features/hoso/models"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { useTruongHopThuTucColumn } from "@/features/hoso/hooks/useTruongHopThuTucColumn"
import { ISearchTruongHopThuTuc } from "@/features/truonghopthutuc/models"
import { GetDuLieuThemHoSo, SearchTruongHopThuTuc } from "@/features/truonghopthutuc/redux/action"
import { AntdDivider, AntdSelect, AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, DatePicker, Form, FormInstance, Input, InputNumber, Row } from "antd"
import { ElementRef, useCallback, useEffect, useMemo, useRef, useState } from "react"
import dayjs from 'dayjs'
import { filterOptions } from "@/utils/select"
import { LOAITIEPNHAN_FORMNOPTRUCTIEP, LOAITIEPNHAN_OPTIONS } from "@/features/hoso/data/formData"
import { resetDatas, resetDuLieuThemHoSo } from "@/features/truonghopthutuc/redux/slice"
import { RenderTitle } from "../../../../../components/common/RenderTitle"
import { FORMAT_DATE } from "@/data"
import { INPUT_RULES } from "@/features/hoso/data/formRules"
import { ISearchThuTuc } from "@/features/thutuc/models"
import { Select } from "antd/lib"


export const LuaChonThuTucSectionWrapper = ({ form, extraSearchThuTuc}: {extraSearchThuTuc?: ISearchThuTuc; form: FormInstance<IHoSo> }) => {
    const { datas: thuTucs } = useAppSelector(state => state.thutuc)
    const { datas: truongHopThuTucs, duLieuThemHoSo } = useAppSelector(state => state.truonghopthutuc)
    const { data: user } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useState<ISearchTruongHopThuTuc>({ pageNumber: 1, pageSize: 100, reFetch: true, byUserOfficeCode: true  })
    const [selectedTruongHop, setSelectedTruongHop] = useState<string>()
    const [selectedThuTuc, setSelectedThuTuc] = useState<string>()
    const columns = useTruongHopThuTucColumn()
    useEffect(() => {
        if (thuTucs === undefined && user !== undefined) {
                dispatch(SearchThuTuc({ pageNumber: 1, pageSize: 200, reFetch: true, donVi: user.officeCode, nguoiTiepNhanId: user.id,laThuTucChungThuc: false, ...extraSearchThuTuc}))
        }
        return () => {
            dispatch(resetDuLieuThemHoSo())
            dispatch(resetDatas())
            form.setFieldValue("thuTucId", undefined)
        }
    }, [thuTucs, user])

    useEffect(() => {
        if (duLieuThemHoSo && duLieuThemHoSo?.truongHopthuTuc) {
            const truongHopThuTuc = duLieuThemHoSo.truongHopthuTuc

            form.setFieldValue("ngayTiepNhan", duLieuThemHoSo.ngayTiepNhan ? dayjs(duLieuThemHoSo.ngayTiepNhan) : null)
            form.setFieldValue("ngayHenTra", duLieuThemHoSo.ngayHenTra ? dayjs(duLieuThemHoSo.ngayHenTra) : null)
            form.setFieldValue("truongHopId", truongHopThuTuc.id)
            form.setFieldValue("maTruongHop", truongHopThuTuc.ma)
            form.setFieldValue("tenTruongHop", truongHopThuTuc.ten)
            form.setFieldValue("thoiHanBuocXuLy", truongHopThuTuc.thoiGianThucHien)
            form.setFieldValue("loaiThoiHanBuocXuLy", truongHopThuTuc.loaiThoiGianThucHien)
        } else {
            form.setFieldValue("ngayTiepNhan", undefined)
            form.setFieldValue("ngayHenTra", undefined)
            form.setFieldValue("truongHopId", undefined)
            form.setFieldValue("maTruongHop", undefined)
            form.setFieldValue("tenTruongHop", undefined)
            form.setFieldValue("thoiHanBuocXuLy", undefined)
            form.setFieldValue("loaiThoiHanBuocXuLy", undefined)
        }

    }, [duLieuThemHoSo?.truongHopthuTuc])

    useEffect(() => {
        if (selectedTruongHop) {
            dispatch(GetDuLieuThemHoSo({ thuTucId: form.getFieldValue("maTTHC"), truongHopId: selectedTruongHop, returnPhiLePhi: true}))
        }
    }, [selectedTruongHop])

    useEffect(() => {
        if (truongHopThuTucs?.length) {
            setSelectedTruongHop(truongHopThuTucs[0].ma)
        }
        return () => {
            setSelectedTruongHop(undefined)
        }
    }, [truongHopThuTucs])

    useEffect(() => {
        if (thuTucs && thuTucs?.length == 1) {
            const thuTuc = thuTucs[0];
            setSelectedThuTuc(thuTuc.maTTHC)
            form.setFieldValue("maTTHC", thuTuc.maTTHC)
            setSearchParams((curr): ISearchTruongHopThuTuc => ({ ...curr, thuTucId: thuTuc.maTTHC }))  
        }
    }, [thuTucs])

    const onChangeThuTuc = (maTTHC: string, attrs: any) => {
        dispatch(resetDuLieuThemHoSo())
        setSelectedTruongHop(undefined)
        const kenhThucHien = attrs["data-kenhthuchien"]
        const maLinhVucChinh = attrs["data-malinhvucchinh"]
        const trichYeuHoSo = attrs["data-trichyeuhoso"]
        form.setFieldValue("kenhThucHien", "1")

        if(thuTucs?.length && thuTucs?.length == 1){
            setSelectedThuTuc(maTTHC)
        }
        if(!maTTHC){
            setSearchParams((curr): ISearchTruongHopThuTuc => ({ ...curr, thuTucId: undefined }))
            return
        }
        form.setFieldValue("maTTHC", maTTHC)
        form.setFieldValue("tenTTHC", trichYeuHoSo)
        form.setFieldValue("trichYeuHoSo", trichYeuHoSo)
        setSearchParams((curr): ISearchTruongHopThuTuc => ({ ...curr, thuTucId: maTTHC }))
        form.setFieldValue("linhVucId", maLinhVucChinh)
    }
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedTruongHop(selectedRowKeys[0] as string)
        },
        selectedRowKeys: [selectedTruongHop] as any
    }
    return <>
        <>
            <RenderTitle title="Lựa chọn thủ tục" />
            <Form.Item name="thuTucId" label="Chọn thủ tục tiếp nhận">
                {thuTucs != undefined && thuTucs?.length == 1&& selectedThuTuc !== undefined ? <Select key="1" style={{ width: "100%" }} defaultValue={selectedThuTuc} filterOption={filterOptions}  allowClear showSearch onChange={onChangeThuTuc}  >
                    {thuTucs?.map((thutuc, idx) => {
                        return <Select.Option  key={idx} value={thutuc.maTTHC} data-kenhthuchien={"1"} data-malinhvucchinh={thutuc.maLinhVucChinh} data-trichyeuhoso={thutuc.tenTTHC}>
                            <span style={{fontSize:"1rem"}}>{thutuc.tenTTHC}</span>
                        </Select.Option>
                    })}
                </Select>: null}
                {/* số lượng thủ tục lớn hơn 1 */}
                {thuTucs != undefined && thuTucs?.length  && selectedThuTuc === undefined ? <Select key="2" style={{ width: "100%" }}  filterOption={filterOptions}  allowClear showSearch onChange={onChangeThuTuc}  >
                    {thuTucs?.map((thutuc, idx) => {
                        return <Select.Option  key={idx} value={thutuc.maTTHC} data-kenhthuchien={"1"} data-malinhvucchinh={thutuc.maLinhVucChinh} data-trichyeuhoso={thutuc.tenTTHC}>
                            <span style={{fontSize:"1rem"}}>{thutuc.tenTTHC}</span>
                        </Select.Option>
                    })}
                </Select> : null}
                
            </Form.Item>
        </>
        {searchParams.thuTucId ? <>
            <>
                <RenderTitle title="Lựa chọn trường hợp" />
                <AntdTable
                    style={{marginBottom:12}}
                    rowKey={"ma"}
                    columns={columns}
                    dataSource={truongHopThuTucs}
                    pagination={false}
                    rowSelection={{ type: 'radio', ...rowSelection }}
                    onSearch={(params) => dispatch(SearchTruongHopThuTuc(params))}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams} />
                {duLieuThemHoSo?.truongHopthuTuc ? <>
                    <RenderTitle title="Thông tin chung"/>
                    <Row gutter={[8, 0]}>
                        <Col md={6} span={24}>
                            {/* ? */}
                            <Form.Item name="kenhThucHien" label="Loại tiếp nhận">
                                <AntdSelect options={LOAITIEPNHAN_FORMNOPTRUCTIEP} showSearch allowClear filterOption={filterOptions} />
                            </Form.Item>
                        </Col>
                        <Col md={6} span={24}>
                            <Form.Item name="ngayTiepNhan" label="Ngày tiếp nhận" rules={INPUT_RULES.ngayTiepNhan}>
                                <DatePicker disabled format={FORMAT_DATE} />
                            </Form.Item>
                        </Col>
                        <Col md={6} span={24}>
                            <Form.Item name="ngayHenTra" label="Ngày hẹn trả" rules={INPUT_RULES.ngayHenTra}>
                                <DatePicker disabled format={FORMAT_DATE} />
                            </Form.Item>
                        </Col>
                        <Col md={6} span={24}>
                            <Form.Item name="soBoHoSo" label="Số bộ hồ sơ">
                                <InputNumber min={0} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            {/* ? */}
                            <Form.Item name="trichYeuHoSo" label="Nội dung hồ sơ">
                                <Input.TextArea rows={3} />
                            </Form.Item>
                        </Col>
                    </Row>
                </> : null}
                <AntdDivider />
            </>
        </> : null}
    </>
}
