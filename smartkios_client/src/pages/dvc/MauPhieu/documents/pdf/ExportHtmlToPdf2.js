import $ from 'jquery';

export async function downloadPdFromHtml(filename) {
    const element = 'ContainerSwapper'
    var html = document.getElementById(element).innerHTML;
    console.log(html)

    var dataToSend = {
        htmlString: html,
        fileName: `${filename}.pdf`
    };

    // Tùy chọn cho request
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    };

    var apiUrl = 'https://localhost:5001/api/v1/files/converthtmlstringtopdf';
    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}