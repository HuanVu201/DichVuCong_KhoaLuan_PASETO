import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IProcOfThisType_Mgr } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddProcOfThisType_Mgr, GetProcOfThisType_Mgr, SearchProcOfThisType_Mgr, UpdateProcOfThisType_Mgr } from "../redux/action"
import { useProcOfThisType_MgrContext } from "../contexts/ProcOfThisType_MgrContext"
import { resetData,resetDatas } from "@/features/proGruop_Mgr/redux/slice"
import { useTypeOfProc_MgrContext } from "@/features/typeOfProc_Mgr/contexts/TypeOfProc_MgrContext"
import { GetThuTuc, SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchTypeOfProc_Mgr } from "@/features/typeOfProc_Mgr/redux/action"

export const ProcOfThisType_MgrDetail = () => {
    const dispatch = useAppDispatch()
    const { data: procOfThisType_Mgr, datas: procOfThisType_Mgrs } = useAppSelector(state => state.procofthistype_mgr)
    const { datas: ThuTucs, data:ThuTuc } = useAppSelector((state) => state.thutuc);
    const procOfThisType_MgrContext = useProcOfThisType_MgrContext()
    const typeOfProc_MgrContext = useTypeOfProc_MgrContext();
    const [form] = Form.useForm<IProcOfThisType_Mgr>()
    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (procOfThisType_MgrContext?.procOfThisType_MgrId) {
            dispatch(UpdateProcOfThisType_Mgr({ id: procOfThisType_MgrContext.procOfThisType_MgrId, data: { ...formData,loaithutucid: typeOfProc_MgrContext.typeOfProc_MgrId,} }))
            try{
                const resultUpdate =  await  dispatch(UpdateProcOfThisType_Mgr({  id: procOfThisType_MgrContext.procOfThisType_MgrId, data: { ...formData,loaithutucid: typeOfProc_MgrContext.typeOfProc_MgrId,} }))
                if (UpdateProcOfThisType_Mgr.fulfilled.match(resultUpdate)) {
                    const { succeeded } = resultUpdate.payload;
                    if (succeeded === true) {
                      dispatch(SearchProcOfThisType_Mgr({  pageNumber: 1, pageSize: 50, loaithutucid: typeOfProc_MgrContext.typeOfProc_MgrId, }));
                    }
                  }
            }
            catch(error)
            {
                console.error('Error:', error);
            }
        } else {
            //dispatch(AddProcOfThisType_Mgr({ ...formData,loaithutucid: typeOfProc_MgrContext.typeOfProc_MgrId }))
            try{
                const resultAdd =  await  dispatch(AddProcOfThisType_Mgr({ ...formData,loaithutucid: typeOfProc_MgrContext.typeOfProc_MgrId }))
                if (AddProcOfThisType_Mgr.fulfilled.match(resultAdd)) {
                    const { succeeded } = resultAdd.payload;
                    if (succeeded === true) {
                      dispatch(SearchProcOfThisType_Mgr({  pageNumber: 1, pageSize: 50, loaithutucid: typeOfProc_MgrContext.typeOfProc_MgrId, }));
                    }
                  }
            }
            catch(error)
            {
                console.error('Error:', error);
            }
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        procOfThisType_MgrContext.setProcOfThisType_MgrModalVisible(false)
        procOfThisType_MgrContext.setProcOfThisType_MgrId(undefined)
    };
    useEffect(() => {
        if (procOfThisType_MgrContext.procOfThisType_MgrId) {
            dispatch(GetProcOfThisType_Mgr(procOfThisType_MgrContext.procOfThisType_MgrId))
        }
    }, [procOfThisType_MgrContext.procOfThisType_MgrId])

    useEffect(() => {
        if (procOfThisType_Mgr) {
            form.setFieldsValue({ ...procOfThisType_Mgr })
        }
        // if(procOfThisType_Mgr?.thuTucID != undefined)
        // {
        //     dispatch(GetThuTuc(procOfThisType_Mgr?.thuTucID))
        //     procOfThisType_Mgr.tenthutuc = ThuTuc?.tenTTHC
        // }
    }, [procOfThisType_Mgr])

    useEffect(() => {
        dispatch(
            SearchThuTuc({
              pageNumber: 1,
              pageSize: 100,
              reFetch: true,
            })
          );
    },[])
    // useEffect(() => {
    //     if (!loaiProcOfThisType_Mgrs?.length && !loading) {
    //         dispatch(SearchLoaiProcOfThisType_Mgr({}))
    //     }
    // }, [])
    return (
        <AntdModal title={procOfThisType_MgrContext.procOfThisType_MgrId ? `Sửa thông tin loại thủ tục` : `Thêm mới loại thủ tục`} visible={procOfThisType_MgrContext.procOfThisType_MgrModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='ProcOfThisType_Mgr' layout="vertical" onFinish={onFinish} form={form} requiredMark={procOfThisType_MgrContext.procOfThisType_MgrId !== null}
                initialValues={{ }}>
                       <Row gutter={[8, 8]}>
                    <Col xs={24} md={24}>
                    <Form.Item
                        label="Thủ tục"
                        name="thuTucID"
                        style={{ marginBottom: '16px' }}
                    >
                        <AntdSelect
                            defaultValue={procOfThisType_Mgr?.thuTucID}
                            placeholder="Chọn thủ tục"
                            allowClear
                            generateOptions={{ model: ThuTucs, label: 'tenTTHC', value: 'id' }}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Thứ tự"
                            name="thuTu"
                        >
                            <InputNumber/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Space >
                        <AntdButton type="primary" onClick={onFinish}>
                            Xác nhận
                        </AntdButton>
                        <AntdButton type="default" onClick={handleCancel}>
                            Đóng
                        </AntdButton>
                    </Space>
                </Form.Item>
            </Form>
        </AntdModal>
    )
}