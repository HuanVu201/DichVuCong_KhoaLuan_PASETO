import $ from 'jquery';

export async function downloadPhieuWord(filename, download = true, elementId = "", options = null) {
    const element = elementId ? elementId : 'ContainerSwapper';
    var html = document.getElementById(element).innerHTML;
    var tmpOptions = options ? options : {
        pageOrientation: "landscape"
    };
    var meta = "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>";
    var head = "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n";

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });

    var css = (
        '<style>' +
        `@page { size: 11.69in 8.27in; margin: 1in; mso-page-orientation: ${tmpOptions.pageOrientation}; }` +
        `img {width:300px;}table {border-collapse: collapse; border-spacing: 0; }td{padding: 6px;}` +
        '</style>'
    );

    var options = { maxWidth: 624 };
    var images = Array();
    var img = $("#" + element).find("img");
    if (img) {
        for (var i = 0; i < img.length; i++) {
            var w = Math.min(img[i].width, options.maxWidth);
            var h = img[i].height * (w / img[i].width);
            var canvas = document.createElement("CANVAS");
            canvas.width = w;
            canvas.height = h;
            var context = canvas.getContext('2d');
            context.drawImage(img[i], 0, 0, w, h);
            var uri = canvas.toDataURL("image/png");
            $(img[i]).attr("src", img[i].src);
            img[i].width = w;
            img[i].height = h;
            images[i] = {
                type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                location: $(img[i]).attr("src"),
                data: uri.substring(uri.indexOf(",") + 1)
            };
        }
    }

    var imgMetaData = "\n";
    for (var i = 0; i < images.length; i++) {
        imgMetaData += "--NEXT.ITEM-BOUNDARY\n";
        imgMetaData += "Content-Location: " + images[i].location + "\n";
        imgMetaData += "Content-Type: " + images[i].type + "\n";
        imgMetaData += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
        imgMetaData += images[i].data + "\n\n";
    }
    imgMetaData += "--NEXT.ITEM-BOUNDARY--";

    var output = meta.replace("_html_", head.replace("_styles_", css) + html) + imgMetaData;

    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(output);
    filename = filename ? filename + '.doc' : 'document.doc';

    if (download) {
        var downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);

        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            downloadLink.href = url;
            downloadLink.download = filename;
            downloadLink.click();
        }

        document.body.removeChild(downloadLink);
    }

    return url;
}
export function export2Word(filename, download = true, elementId = "",) {

    const element = elementId ? elementId : 'ContainerSwapper';
    var html, link, blob, url, css;

    css = (
        `<style>  table {border-collapse: collapse;  border-style:none;  } 
        @page ${element}{size: 841.95pt 595.35pt;mso-page-orientation: landscape;} 
        div.${element} {page: ${element};} 
        </style>`
    );
    html = document.getElementById(element).outerHTML;
    blob = new Blob(['\ufeff', css + html], {
        type: 'application/msword'
    });
    url = URL.createObjectURL(blob);
    filename = filename ? filename + '.doc' : 'document.doc';

    link = document.createElement('A');
    link.href = url;
    link.download = filename;  // default name without extension 
    document.body.appendChild(link);
    if (navigator.msSaveOrOpenBlob)
        navigator.msSaveOrOpenBlob(blob, filename); // IE10-11
    else link.click();  // other browsers
    document.body.removeChild(link);


};