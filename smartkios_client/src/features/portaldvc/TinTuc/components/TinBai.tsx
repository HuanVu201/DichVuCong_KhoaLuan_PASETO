import { ITinBaiPortal } from "../models/TinBai";
import 'bootstrap/dist/css/bootstrap.css';
import "./TinBai.scss"


export const ItemTinBai = ({ tinBai }: { tinBai?: ITinBaiPortal }) => {
  return <>
    {
      tinBai ?
        <div className="containerItemTinBai">
          <div className="row">
            <div className="col-sm-12">
              <div className="tinBaiBlock">
                <div className="pageHeader">
                  <h2 className="pageHeader_title">
                    {tinBai.tieuDe}
                  </h2>
                  <span className="pageHeader_date">
                    {tinBai.ngayBanHanh}
                  </span>
                </div>
                <div className="pageContent" dangerouslySetInnerHTML={{__html: tinBai.noiDung}}/>
              </div>
            </div>
          </div>
        </div>

        : ""
    }
  </>;
};
