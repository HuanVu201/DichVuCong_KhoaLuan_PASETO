export async function downloadPhieuExcel(titleFile, elementId = "tableToExcel") {
    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentMonth = currentDate.getMonth() + 1;
    var currentYear = currentDate.getFullYear();
    var currentHour = currentDate.getHours();
    var currentMinute = currentDate.getMinutes();

    let dataType = 'application/vnd.ms-excel';
    let extension = '.xls';

    let base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)))
    };

    let fileName = `${titleFile} ${currentDay}/${currentMonth}/${currentYear} ${currentHour}:${currentMinute}`;

    let template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table style="font-family: &quot;Times New Roman&quot;, Times, serif; font-size: 17px">{table}</table></body></html>';
    let render = function (template, content) {
        return template.replace(/{(\w+)}/g, function (m, p) {
            return content[p];
        });
    };

    addMsoNumberFormat();

    let tableElement = document.querySelector('#' + elementId);

    let tableExcel = render(template, {
        worksheet: titleFile,
        table: tableElement.innerHTML
    });


    fileName = fileName + extension;

    if (navigator.msSaveOrOpenBlob) {
        let blob = new Blob(['\ufeff', tableExcel], {
            type: dataType
        });

        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        let downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        downloadLink.href = 'data:' + dataType + ';base64,' + base64(tableExcel);

        downloadLink.download = fileName;

        downloadLink.click();
    }
}

const addMsoNumberFormat = () => {
    const leftCells = document.querySelectorAll('.addMsoNumberFormat_left');
    leftCells.forEach(cell => {
        if (cell.innerText.startsWith('0') || cell.innerText.startsWith('*')) {
            cell.setAttribute('style', 'mso-number-format:"\@"; text-align: left');
        }
    });


    const centerCells = document.querySelectorAll('.addMsoNumberFormat_center');
    centerCells.forEach(cell => {
        if (cell.innerText.startsWith('0') || cell.innerText.startsWith('*')) {
            cell.setAttribute('style', 'mso-number-format:"\@"; border: 1px solid #333; text-align: center');
        }
    });
    
    
    const rightCells = document.querySelectorAll('.addMsoNumberFormat_right');
    rightCells.forEach(cell => {
        if (cell.innerText.startsWith('0') || cell.innerText.startsWith('*')) {
            cell.setAttribute('style', 'mso-number-format:"\@"; border: 1px solid #333; text-align: right');
        }
    });
};