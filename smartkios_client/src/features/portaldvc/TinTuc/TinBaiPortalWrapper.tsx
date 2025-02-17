import React, { useEffect, useState } from "react";

import { SearchTinBaiPortal } from "./redux/action";
import { TinTucLayOut } from "./layouts/TinTuc";
import { ITinBaiPortal } from "./models/TinBai";
import { useLocation, useParams } from "react-router-dom";
import { ItemTinBai } from "./components/TinBai";
import { TinBaiPortalService } from "./services/TinBai";

function TinBaiPortalWrapper() {
  let params = useParams();
  let tinBaiPortalService = new TinBaiPortalService();
  const [tinBai, setTinBai] = useState<ITinBaiPortal>();
  useEffect(() => {
    (async () => {
      if (params.id) {
        let resTinBai = await tinBaiPortalService.Get(params.id);
        if (resTinBai?.data?.data) {
          setTinBai(resTinBai.data.data);
        }
      }
    })();
  }, [params]);
  return (
    <TinTucLayOut>
      <div className="container">
        <div className="col-xs-12 col-md-12">
          <ItemTinBai tinBai={tinBai} />
        </div>
      </div>
    </TinTucLayOut>
  );
}

export default TinBaiPortalWrapper;
