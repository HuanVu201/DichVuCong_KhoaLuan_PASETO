
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../../lib/antd/components"
import iconQuestion from '../../../../assets/images/mess.svg'
import iconAnswer from '../../../../assets/images/icon-answer.svg'
import "./PhanAnhKienNghiDetail.scss"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import dayjs from 'dayjs'

export const PhanAnhKienNghiDetail = (props: any) => {

    const handleCancel = () => {
        props.setStateModal(false)
    };

    return (
        <AntdModal title="" width={'1000px'}
            visible={props.showDetailModal}
            handlerCancel={handleCancel} footer={null} 
            >

            <div className="PhanAnhKienNghiDetail ">
                <div className="componentBox headerBlock">
                    <div className="titlePAKN">
                        Kiến nghị về việc: {props.paknDetail.tieuDe}
                    </div>
                    <p className="from">
                        {props.paknDetail.hoTen} - {props.paknDetail.ngayGui ? dayjs(props.paknDetail.ngayGui).format(FORMAT_DATE_WITHOUT_TIME) : ''}

                    </p>
                </div>
                <div className="componentBox question row">
                    <div className="col-2 leftContent">
                        <img src={iconQuestion} alt="" />
                    </div>
                    <div className="col-10 rightContent">
                        <p className="titleContent">
                            Nội dung kiến nghị:
                        </p>
                        <p className="content">
                            {props.paknDetail.noiDung}
                        </p>
                    </div>
                </div>
                <div className="componentBox answer row">
                    <div className="col-2 leftContent">
                        <img src={iconAnswer} alt="" />
                    </div>
                    <div className="col-10 rightContent">
                        <p className="titleContent">
                            Cơ quan chức năng trả lời:
                        </p>
                        <p className="content">
                            {props.paknDetail.noiDungTraLoi}
                        </p>
                    </div>
                </div>
            </div>

        </AntdModal >
    )
}