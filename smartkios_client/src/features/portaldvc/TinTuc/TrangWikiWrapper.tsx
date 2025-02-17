import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ITinTucPortal } from "./models/TinTuc";
import { TinTucPortalService } from "./services/TinTuc";
const TrangWikiWrapper = () => {
  let params = useParams();
  let tinTucPortalService = new TinTucPortalService();
  const [tinTuc, setTinTuc] = useState<ITinTucPortal>();
  useEffect(() => {
    (async () => {
      if (params.id) {
        let resTinTuc = await tinTucPortalService.Get(params.id);
        if (resTinTuc?.data?.data) {
          setTinTuc(resTinTuc.data.data);
        }
      }
    })();
  }, [params]);
  return (
    <div className="container">
      <div dangerouslySetInnerHTML={{ __html: tinTuc?.noiDung || "" }} />
    </div>
  );
};
export default TrangWikiWrapper