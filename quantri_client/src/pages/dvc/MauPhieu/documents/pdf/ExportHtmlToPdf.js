import html2pdf from 'html2pdf.js'
import axios from 'axios';
import FormData from 'form-data'

export async function downloadPhieuPdf(fileName, elementId= "ContainerSwapper") {
    var element = document.querySelector('#'+elementId)
    const options = {
        margin: 14,
        filename: `${fileName}.pdf`,
        // image: { type: 'jpeg', quality: 1 },
        html2canvas: {
            scale: 10,
            scrollY: 0,
        },
        // pagebreak: { mode: ['avoid-all'] },
        pagebreak: { avoid: ['#signature'] },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },

    };
    html2pdf().from(element).set(options).save();

}