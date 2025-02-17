import TruongHopThuTucTableWrapper from '@/features/truonghopthutuc/components/TruongHopThuTucTable';
import dayjs from 'dayjs'

const isValidDate = (date: Date) => {
    if (Object.prototype.toString.call(date) === "[object Date]") {
        // it is a date
        if (isNaN(date.valueOf())) { // d.getTime() or d.valueOf() will also work
            // date object is not valid
            return false;
        } else {
            // date object is valid
            return true;
        }
    } else {
        // not a date object
        return false;
    }
}

export const formatDateStringToDate = (dateStr: string) => {
    // Tìm các số trong chuỗi
    var numbers = dateStr.match(/\d+/g);
    console.log(numbers);

    // Nếu có các số, sử dụng chúng để tạo đối tượng Date
    if (numbers && numbers.length >= 3) {
        var year = parseInt(numbers[2], 10);
        var month = parseInt(numbers[1], 10) - 1; // Tháng trong JavaScript bắt đầu từ 0
        var day = parseInt(numbers[0], 10);
        console.log(year, month, day);
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var milliseconds = now.getMilliseconds();
        // Chuyển đổi thành đối tượng Date
        var dateObject = new Date(year, month, day, hours,minutes,seconds, milliseconds);
        if (isValidDate(dateObject)) {
            return dayjs(dateObject)
        }
        return dayjs()
    }
    return dayjs()
}