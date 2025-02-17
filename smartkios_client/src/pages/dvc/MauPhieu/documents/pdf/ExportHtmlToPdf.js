import html2pdf from 'html2pdf.js'
import axios from 'axios';
import FormData from 'form-data'

export async function downloadPhieuPdf(fileName) {
    var element = document.querySelector('#ContainerSwapper')
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



    // const axios = require('axios')
    // console.log(axios.isCancel('something'));
    // const FormData = require('formData') 
    // let fs = require('fs')

    // const formData = new FormData()
    // formData.append('instructions', JSON.stringify({
    //     parts: [
    //         {
    //             html: document.querySelector('#ContainerSwapper').innerHTML
    //         }
    //     ]
    // }))
    // formData.append(document.querySelector('#ContainerSwapper'), fs.createReadStream(document.querySelector('#ContainerSwapper')))

    //     ; (async () => {
    //         try {
    //             const response = await axios.post('https://api.pspdfkit.com/build', formData, {
    //                 headers: formData.getHeaders({
    //                     'Authorization': 'Bearer your_api_key_here'
    //                 }),
    //                 responseType: "stream"
    //             })

    //             response.data.pipe(fs.createWriteStream("result.pdf"))
    //         } catch (e) {
    //             const errorString = await streamToString(e.response.data)
    //             console.log(errorString)
    //         }
    //     })()

    // function streamToString(stream) {
    //     const chunks = []
    //     return new Promise((resolve, reject) => {
    //         stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)))
    //         stream.on("error", (err) => reject(err))
    //         stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
    //     })
    // }


}