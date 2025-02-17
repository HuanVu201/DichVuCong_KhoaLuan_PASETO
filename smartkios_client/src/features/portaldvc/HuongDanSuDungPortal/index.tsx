import { useState } from "react";
import { LeftSideHuongDanSuDung } from "./components/LeftSideHuongDanSuDung";
import { RightSideHuongDanSuDung } from "./components/RightSideHuongDanSuDung";

const HuongDanSuDungPortal = () => {
  const [setlected, setSelected] = useState<string | undefined>(undefined);

  return (
    <div className="container" style={{marginTop : '50px'}}>
      <div className="row" style={{ marginLeft: "30px" }}>
        <div className="col-3">
          <LeftSideHuongDanSuDung
            selected={setlected}
            setSelected={setSelected}
          />
          ,
        </div>
        <div className="col-md-9">
          <RightSideHuongDanSuDung selected={setlected} />
        </div>
      </div>
    </div>
  );
};

export default HuongDanSuDungPortal;
