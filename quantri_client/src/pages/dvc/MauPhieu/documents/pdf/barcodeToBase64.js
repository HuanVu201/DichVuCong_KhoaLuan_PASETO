import $ from 'jquery';

export const barcodeToBase64 = () => {
    let valueDataURL

    var options = { maxWidth: 624 };
    var img = $("#ContainerSwapper").find("img");
    if (img) {
        for (var i = 0; i < img.length; i++) {
            // Calculate dimensions of output image
            var w = Math.min(img[i].width, options.maxWidth);
            var h = img[i].height * (w / img[i].width);
            // Create canvas for converting image to data URL
            var canvas = document.createElement("CANVAS");
            canvas.width = w;
            canvas.height = h;
            // Draw image to canvas
            var context = canvas.getContext('2d');
            context.drawImage(img[i], 0, 0, w, h);
            // Get data URL encoding of image
            valueDataURL = canvas.toDataURL("image/png");

        }
    }
    if (valueDataURL) {
        return valueDataURL
    }
}