import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Divider, Form, Input } from "antd"
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDanhGiaHaiLongContext } from "../contexts/DanhGiaHaiLongContexts";
import TraKetQuaHoSoVaDanhGiaHaiLongModal from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/TraKetQuaVaDanhGiaHaiLongModal";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { SearchTrangThaiHoSo } from "@/features/trangthaihoso/redux/action";
import { GetHoSoByMa, GetHoSoDanhGiaHaiLong } from "@/features/hoso/redux/action";
import { toast } from "react-toastify";
import { hoSoApi } from "@/features/hoso/services";
import DanhGiaHaiLongPortalModal from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/DanhGiaHaiLongPortalModal";

const INPUT_RULES = {
    SearchValue: [{ required: true, message: "Không được để trống!" }],
};

export const DanhGiaHaiLongPortal = () => {
    const [form] = Form.useForm<IHoSo>();
    const dispatch = useAppDispatch();
    const buttonActionContext = useButtonActionContext()
    const { data: hoso } = useAppSelector(state => state.hoso)
    const { data: user } = useAppSelector(state => state.user)
    const [maHoSoNguoiDungNhap, setMaHoSoNguoiDungNhap] = useState('')
    const [danhGiaHaiLongModalVisible, setDanhGiaHaiLongModalVisible] = useState(false)

    const { publicModule: config } = useAppSelector(state => state.config)
    let getTinh
    config?.map(item => {
        if (item.code == "ten-don-vi-lowercase") {
            getTinh = item.content
        }
    })

    useEffect(() => {
        if (hoso && maHoSoNguoiDungNhap) {
            if (hoso?.trangThaiHoSoId != '9' && hoso?.trangThaiHoSoId != '10') {
                toast.warning("Mã hồ sơ chưa đủ điều kiện để được đánh giá ")
            }
            else {
                setDanhGiaHaiLongModalVisible(true)
                form.resetFields()
            }
        }
    }, [hoso])

    const onFinish = async (values: any) => {
        setMaHoSoNguoiDungNhap(values.maHoSo)
        const repsonse = await dispatch(GetHoSoDanhGiaHaiLong({ maHoSo: values.maHoSo })).unwrap()

        if (!repsonse.data) {
            toast.warning("Mã hồ sơ chưa đủ điều kiện để được đánh giá ")
        }
    }

    return (
        <>
            <Divider></Divider>
            <div>
                <div className="DGHLtitle" style={{ marginBottom: '20px' }}>
                    <div className="text-center title" style={{ fontStyle: 'normal', fontWeight: 'bold', color: '#ce7a58', marginBottom: '5px' }}>
                        ĐÁNH GIÁ CHẤT LƯỢNG DỊCH VỤ HÀNH CHÍNH CÔNG
                    </div>
                    <p style={{ fontWeight: '600' }} className="text-center expandTitle">Xin vui lòng nhập mã số hồ sơ người nộp hồ sơ để tiếp tục đánh giá</p>
                </div>
                <Form form={form} name="FilterDanhGiaHaiLong" onFinish={onFinish}>
                    <div className="d-flex justify-content-center align-items-center flex-column" >
                        <div className="col-xs-12 col-sm-5 col-sm-offset-1 form-left" >
                            <div >
                                <div className="mb-4">
                                    <Form.Item name="maHoSo" rules={INPUT_RULES["SearchValue"]}>
                                        <Input allowClear placeholder="Nhập mã hồ sơ" />
                                    </Form.Item>
                                </div>
                                <div className="DGHL-footer d-flex justify-content-center align-items-center">
                                    <AntdButton
                                        style={{ color: 'white', fontWeight: '600' }}
                                        htmlType="submit"
                                    >
                                        Thực hiện
                                    </AntdButton>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 text-center note" style={{ width: '80%', fontStyle: 'normal', fontWeight: '600', color: '#ce7a58' }}>
                            <span >
                                Để nâng cao chất lượng phục vụ của cơ quan hành chính nhà nước và của cán bộ, công chức, viên chức trong giải quyết thủ tục hành chính tại tỉnh {getTinh}, kính mong Quý Ông/Bà dành thời gian để đánh giá sự hài lòng về dịch vụ hành chính công mà Quý Ông/Bà đã hoặc đang thực hiện.
                            </span>
                        </div>
                        <div className="whiteBg"></div>
                    </div>
                </Form>
            </div>
            {danhGiaHaiLongModalVisible ? <DanhGiaHaiLongPortalModal setDanhGiaHaiLongModalVisible={setDanhGiaHaiLongModalVisible} id={hoso?.id as any} donViId={hoso?.donViId as any} maHoSoNguoiDungNhap={maHoSoNguoiDungNhap} closeModal={function (): void {

            }}></DanhGiaHaiLongPortalModal> : <></>}

        </>
    )
}


