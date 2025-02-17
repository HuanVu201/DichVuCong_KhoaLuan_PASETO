import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp";
import { ISearchHoSo } from "@/features/hoso/models";
import { AntdButton, AntdSelect, AntdSpace, AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHoSoChuyenTaiKHoanColumn } from "./HoSoChuyenTaiKhoanColumn";
import { SearchHoSo } from "@/features/hoso/redux/action";
import { Button, Col, DatePicker, Form, Input, Row, Space } from "antd";
import { filterOptions } from "@/utils";
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { useChuyenDLTKContext } from "../contexts/ChuyenDLTKContext";
import dayjs from 'dayjs'
import { toast } from "react-toastify";

export const HoSoChuyenTaiKhoan = () => {
    const dispatch = useAppDispatch();
    const chuyenDLTKContext = useChuyenDLTKContext()

    const { datas: hoSos, count, loading } = useAppSelector((state) => state.hoso);
    const [form] = Form.useForm<ISearchHoSo>();

    const [searchParams, setSearchParams] = useState<ISearchHoSo>({
        pageNumber: 1,
        pageSize: 10,
        reFetch: true,
        searchAllType: true,

    });
    const { columns } = useHoSoChuyenTaiKHoanColumn(
        { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    );

    useEffect(() => {
        if (searchParams && chuyenDLTKContext.ChuyenDLTKLeftSideId)
            setSearchParams(values => ({ ...values, hoSoTaiKhoan: chuyenDLTKContext.ChuyenDLTKLeftSideId }))
    }, [chuyenDLTKContext.ChuyenDLTKLeftSideId])
    const maHoSoList = useMemo(() => {
        if (hoSos)
            return hoSos.map(item => item.maHoSo)
    }, [hoSos])

    useEffect(() => {
        if (maHoSoList)
            chuyenDLTKContext.setMaHoSoChuyenDLTK(maHoSoList)
    }, [maHoSoList])

    const onFinish = () => {
        const values = form.getFieldsValue();
        if (chuyenDLTKContext.ChuyenDLTKLeftSideId == null) {
            toast.warning("Vui lòng chọn tài khoản muốn chuyển dữ liệu bên trái!");
        } else {
            dispatch(SearchHoSo({
                ...values,
                ...searchParams,
                tiepNhanFrom: values.tiepNhanFrom
                    ? dayjs(values.tiepNhanFrom).format()
                    : undefined,
                tiepNhanTo: values.tiepNhanTo
                    ? dayjs(values.tiepNhanTo).format()
                    : undefined,
            }));
        }
    };

    return (
        <>
            <hr style={{ margin: "30px 0" }} />
            <Form
                name={"SearchHoSo_"}
                layout="inline"
                // onFinish={onFinish}
                form={form}
                className=""
                style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
            >
                <Form.Item label="Tiếp nhận ngày" name="tiepNhanFrom" >
                    <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
                </Form.Item>
                <Form.Item label="Đến ngày" name="tiepNhanTo">
                    <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
                </Form.Item>

                <Form.Item label="Loại" name="maTrangThai">
                    <AntdSelect style={{ width: '200px' }} options={[
                        { value: '4', label: 'Đang xử lý' },
                        { value: null, label: 'Tất cả' },
                    ]}></AntdSelect>
                </Form.Item>

                <Form.Item>
                    <AntdButton key={2} type="primary" onClick={onFinish} >
                        Tìm kiếm hồ sơ
                    </AntdButton>

                </Form.Item>

            </Form>
            <AntdTable
                style={{ marginTop: '20px' }}
                loading={loading}
                columns={columns}
                dataSource={hoSos}
                pagination={{
                    total: count,
                }}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                onSearch={(params) => onFinish()}
            />
        </>
    )
}