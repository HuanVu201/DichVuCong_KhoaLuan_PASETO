 export const svgToPng = (svgDataurl: any, width: number, height: number) => new Promise((resolve, reject) => {
    let canvas: any;
    let ctx: any;
    let img: any;

    img = new Image();
    img.src = svgDataurl;
    img.onload = () => {
        canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);

        img = new Image();
        img.src = canvas.toDataURL('image/png');
        img.onload = () => {
            canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        }
    };
});