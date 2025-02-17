import { ITinBaiPortal } from "../models/TinBai";
import 'bootstrap/dist/css/bootstrap.css';
import "./TinBai.scss"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
import dayjs from 'dayjs';
import { useMemo } from 'react';

const transformMediaEmbed = (htmlContent: string) => {
  const div = document.createElement('div');
  div.innerHTML = htmlContent;

  const oembedElements = div.querySelectorAll('oembed');
  oembedElements.forEach((element) => {
    const url = element.getAttribute('url');
    if (url && url.includes('youtube.com')) {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('width', '600');
      iframe.setAttribute('height', '500');
      iframe.setAttribute('src', url.replace('watch?v=', 'embed/'));
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowFullScreen', 'true');

      // Wrap the iframe in a div with a center alignment class
      const wrapperDiv = document.createElement('div');
      wrapperDiv.classList.add('videoWrapper');
      wrapperDiv.appendChild(iframe);

      element.replaceWith(wrapperDiv);
    }
  });

  return div.innerHTML;
};

export const ItemTinBai = ({ tinBai }: { tinBai?: ITinBaiPortal }) => {
  // Use useMemo to only transform HTML when the content changes
  const transformedContent = useMemo(() => {
    return tinBai ? transformMediaEmbed(tinBai.noiDung) : '';
  }, [tinBai?.noiDung]);

  return (
    <>
      {tinBai ? (
        <div className="containerItemTinBai">
          <div className="row">
            <div className="col-sm-12">
              <div className="tinBaiBlock">
                <div className="pageHeader">
                  <h4 className="pageHeader_title">{tinBai.tieuDe}</h4>
                  <span className="pageHeader_date">
                    Ngày đăng tin: {tinBai.ngayBanHanh ? dayjs(tinBai.ngayBanHanh).format(FORMAT_DATE_WITHOUT_TIME) : ''}
                  </span>
                </div>
                <div className="pageContent" dangerouslySetInnerHTML={{ __html: transformedContent }} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
