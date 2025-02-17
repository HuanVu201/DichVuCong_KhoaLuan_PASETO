import { RenderTitle } from "@/components/common";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import {
    GetHoSo,
    TuChoiTiepNhanHoSoTrucTuyen,
} from "@/features/hoso/redux/action";
import {
    AdminGetHoSo,
    AdminUpdateHoSo,
} from "@/features/adminHoSo/redux/action";
import { AntdAutoComplete, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { AdminUpdateHoSoParams } from "@/features/adminHoSo/services";
import { FormHeader } from "@/features/portaldvc/NopHoSoTrucTuyen/components/FormHeader";
import dayjs from "dayjs";
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from "@/data/constant";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { ISearchCoCauToChuc } from "@/features/cocautochuc/models";
import { ISearchUser } from "@/features/user/models";
import { SearchUser } from "@/features/user/redux/Actions";
import { LOAI_KET_QUA_OPTIONS } from "@/features/hoso/data/formData";
import { DefaultOptionType } from "antd/es/select";
import { userService } from "@/features/user/services";
import { ReadOnlyThanhPhanChungThuc } from "../../ReadOnlyThanhPhanChungThuc";
import { ReadOnLyTepDinhKem } from "../../ReadOnlyTepDinhKem";
import { ThanhPhanChungThucHoSo } from "../themMoiHoSoChungThuc/ThanhPhanHoSo";
import { TepDinhKemSuaHoSo } from "../suaHoSo/TepDinhKemHoSo";
const AdminCapNhatThanhPhanHoSoModal = ({
    setSearchHoSoParams,
}: {
    setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}) => {
    const [form] = Form.useForm<any>();
    const { data: hoSo, loading } = useAppSelector((state) => state.adminHoSo);
    const { datas: groups } = useAppSelector((state) => state.cocautochuc);
    const { data: user } = useAppSelector(state => state.user)
    const [users, setUsers] = useState<DefaultOptionType[]>()

    useEffect(() => {
        (async () => {
            if (user?.officeCode && user?.groupCode) {
                const res = await userService.SearchNhomLanhDao({ officeCode: user.officeCode, groupCode: user.groupCode })
                setUsers(res.data.data.map(x => {
                    const title = `${x.fullName} - ${x.name} ${x.groupName ? `(Phòng: ${x.groupName})` : ''} ${x.officeName ? `(Đơn vị: ${x.officeName})` : ''} `
                    return {
                        label: title,
                        value: x.userName,
                        title,
                        fullName: x.fullName
                    }
                }));
            }
        })()
    }, [])

    const buttonActionContext = useButtonActionContext();
    const dinhKem = Form.useWatch("dinhKemKetQua", form);
    const dispatch = useAppDispatch();
    const [searchGroupParams, setSearchGroupParams] =
        useState<ISearchCoCauToChuc>({ pageNumber: 1, pageSize: 5000 });
    const [searchUserParams, setSearchuserParams] = useState<ISearchUser>({
        pageNumber: 1,
        pageSize: 200000,
    });
    const handleCancel = () => {
        buttonActionContext.setSelectedHoSos([]);
        buttonActionContext.setAdminCapNhatThanhPhanHoSoModalVisible(false);
    };

    useEffect(() => {
        if (buttonActionContext.selectedHoSos.length) {
            dispatch(AdminGetHoSo(buttonActionContext.selectedHoSos[0] as string));
        }
    }, [buttonActionContext.selectedHoSos.length]);
    useEffect(() => {
        (async () => {
            if (hoSo) {
                form.setFieldsValue({
                    ...hoSo,
                    
                    deletedOn: hoSo.deletedOn ? dayjs(hoSo.deletedOn) : undefined,
                    ngayBanHanhKetQua: hoSo.ngayBanHanhKetQua
                    ? (dayjs(hoSo.ngayBanHanhKetQua) as any)
                    : undefined,
                  ngayKyKetQua: hoSo.ngayKyKetQua
                    ? (dayjs(hoSo.ngayKyKetQua) as any)
                    : undefined,
                });
            }
        })();
    }, [hoSo]);

    const onOk = async () => {
        const formData =
            (await form.validateFields()) as AdminUpdateHoSoParams["data"];
        if (buttonActionContext.selectedHoSos.length) {
            const res = await dispatch(
                AdminUpdateHoSo({
                    id: buttonActionContext.selectedHoSos[0] as string,
                    data: formData,
                })
            ).unwrap();
            if (res.succeeded) {
                setSearchHoSoParams((curr) => ({ ...curr }));
                handleCancel();
            }
        }
    };
    return (
        <AntdModal
            confirmLoading={loading}
            title={`Chỉnh sửa kết quả và thành phần hồ sơ`}
            visible={true}
            handlerCancel={handleCancel}
            width={1200}
            onOk={onOk}
            okText="Xác nhận"
        >
            <Form form={form} layout="vertical" name="AdminCapNhatHoSo">
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <FormHeader>Kết quả xử lý</FormHeader>
                    </Col>
                    <Row gutter={[4, 8]}>
                        <Col span={24} md={6}>
                            <Form.Item name="loaiVanBanKetQua" label="Loại kết quả">
                                <AntdAutoComplete generateOptions={{ model: LOAI_KET_QUA_OPTIONS, value: 'value', label: 'label' }}>
                                    <Input placeholder="Nhập hoặc chọn loại kết quả" />
                                </AntdAutoComplete>
                            </Form.Item>
                        </Col>
                        <Col span={24} md={6}>
                            <Form.Item name="soKyHieuKetQua" label="Số ký hiệu">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={6}>
                            <Form.Item name="nguoiKyKetQua" label="Người ký">
                                <AntdAutoComplete generateOptions={{ model: users, value: 'fullName', label: 'title' }}>
                                    <Input placeholder="Chọn người ký" />
                                </AntdAutoComplete>
                            </Form.Item>
                        </Col>
                        <Col span={24} md={6}>
                            <Form.Item name="coQuanBanHanhKetQua" label="Cơ quan ban hành">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={8}>
                            <Form.Item name="trichYeuKetQua" label="Trích yếu kết quả">
                                <Input.TextArea rows={3} />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={4}>
                            <Form.Item name="dinhKemKetQua" label="Đính kèm kết quả">
                                {/* <AntdUpLoad editing = {buttonActionContext.chiTietHoSoModalVisible !== undefined} formInstance={form} fieldName="dinhKemKetQua" folderName="DinhKemKetQua" listType="text" showUploadList={true} /> */}
                                {/* <AntdUpLoad editing={true} formInstance={form} fieldName="dinhKemKetQua" folderName="DinhKemKetQua" listType="text" showUploadList={true} /> */}
                                {hoSo?.maHoSo ? (
                                    <RegularUpload
                                        // kySo={KY_SO}
                                        hideUpload={true}
                                        dinhKem={dinhKem}
                                        fieldName={'dinhKemKetQua'}
                                        folderName={hoSo.maHoSo}
                                        form={form}
                                    />
                                ) : null}
                            </Form.Item>
                        </Col>
                        <Col span={24} md={6}>
                            <Form.Item name="ngayBanHanhKetQua" label="Ngày ban hành">
                                <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={6}>
                            <Form.Item name="ngayKyKetQua" label="Ngày ký">
                                <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
                            </Form.Item>
                        </Col>
                        {/* <Col span={24}>
                            <RenderTitle title="Kết quả liên quan (nếu có)" />
                            {hoSo ? <KetQuaLienQuanWrapper maHoSo={hoSo.maHoSo} /> : null}
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Ý kiến chuyển xử lý" name="yKienNguoiChuyenXuLy" >
                                <AntdAutoComplete generateOptions={{ model: yKienChuyenXuLyOptions, value: 'value', label: 'label' }}>
                                    <Input placeholder="Nhập ý kiến chuyển xử lý" />
                                </AntdAutoComplete>
                            </Form.Item>
                        </Col> */}
                    </Row>
                    <Col span={24}>
                        <FormHeader>Tệp tin đính kèm</FormHeader>
                    </Col>
                    <Col span={24}>
                    {/* {hoSo?.laHoSoChungThuc ? (
                            <>
                                <ThanhPhanChungThucHoSo form={form} />
                            </>
                        ) : (
                            <>
                                <RenderTitle title="Tệp tin đính kèm" />
                                <TepDinhKemSuaHoSo form={form} />
                            </>
                        )} */}
                    </Col>





                </Row>
            </Form>
        </AntdModal>
    );
};

export default AdminCapNhatThanhPhanHoSoModal;
