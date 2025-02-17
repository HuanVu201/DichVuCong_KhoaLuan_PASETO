import { useState } from "react";
import { LeftSideHuongDanSuDung } from "./components/LeftSideHuongDanSuDung";
import { RightSideHuongDanSuDung } from "./components/RightSideHuongDanSuDung";
import'./index.scss'

const HuongDanSuDungPortal = () => {
  const [setlected, setSelected] = useState<string | undefined>(undefined);

  return (
    <div className="containerHDSD commonBackgroundTrongDong" >
      <div className="row">
        <div className="col-12 col-lg-3 col-md-4 col-sm-4">
          <LeftSideHuongDanSuDung
            selected={setlected}
            setSelected={setSelected}
          />
          
        </div>
        <div className="col-12 col-lg-9 col-md-8 col-sm-8">
          <RightSideHuongDanSuDung selected={setlected} />
        </div>
      </div>
    </div>
  );
};

export default HuongDanSuDungPortal;
