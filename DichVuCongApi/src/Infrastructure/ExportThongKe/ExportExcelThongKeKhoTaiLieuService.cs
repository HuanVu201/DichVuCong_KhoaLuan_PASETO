using MediatR;
using Newtonsoft.Json.Linq;
using Syncfusion.XlsIO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Portal.ThongKeKhoTaiLieuApp;
using TD.DichVuCongApi.Application.Portal.ThongKeKhoTaiLieuApp.Commands;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

namespace TD.DichVuCongApi.Infrastructure.ExportThongKe;
public class ExportExcelThongKeKhoTaiLieuService : IExportExcelThongKeKhoTaiLieuService
{

    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;

    public ExportExcelThongKeKhoTaiLieuService(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
    }

    public async Task<StreamDataFile> ThongKeSuDungKhoTaiLieu(List<ThongKeKhoTaiLieuDto> data, string parameters)
    {

        MemoryStream stream = new MemoryStream();
        using (ExcelEngine excelEngine = new ExcelEngine())
        {
            IApplication application = excelEngine.Excel;
            application.DefaultVersion = ExcelVersion.Xlsx;
            IWorkbook workbook = application.Workbooks.Create(1);
            IWorksheet worksheet = workbook.Worksheets[0];
            worksheet.Name = "Thống kê tài khoản sử dụng kho tài liệu điện tử";

            worksheet.Range["B2:I2"].Merge();
            worksheet.Range["B4:I4"].Merge();

            worksheet["B2"].Text = "THỐNG KÊ TÀI KHOẢN SỬ DỤNG KHO TÀI LIỆU ĐIỆN TỬ";
            worksheet["B2"].CellStyle.Font.Bold = true;
            worksheet["B2"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["B2"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["B2"].CellStyle.WrapText = true;
            worksheet["B2"].CellStyle.Font.Size = 14;

            //Set Parameters
            worksheet["B4"].Text = parameters;
            worksheet["B4"].CellStyle.Font.Bold = true;
            worksheet["B4"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignLeft;
            worksheet["B4"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["B4"].CellStyle.WrapText = true;
            worksheet["B4"].CellStyle.Font.Size = 12;
            worksheet["B4"].CellStyle.Font.Bold = true;

            //Set header
            worksheet["B6"].Text = "STT";
            worksheet["B6"].CellStyle.Font.Bold = true;
            worksheet["B6"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["B6"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["B6"].CellStyle.Font.Size = 12;

            worksheet["C6"].Text = "Họ và tên";
            worksheet["C6"].CellStyle.Font.Bold = true;
            worksheet["C6"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["C6"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["C6"].CellStyle.Font.Size = 12;

            worksheet["D6"].Text = "Tài khoản";
            worksheet["D6"].CellStyle.Font.Bold = true;
            worksheet["D6"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["D6"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["D6"].CellStyle.Font.Size = 12;

            worksheet["E6"].Text = "Số định danh";
            worksheet["E6"].CellStyle.Font.Bold = true;
            worksheet["E6"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["E6"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["E6"].CellStyle.Font.Size = 12;

            worksheet["F6"].Text = "Số điện thoại";
            worksheet["F6"].CellStyle.Font.Bold = true;
            worksheet["F6"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["F6"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["F6"].CellStyle.Font.Size = 12;

            worksheet["G6"].Text = "Số lượng kho";
            worksheet["G6"].CellStyle.Font.Bold = true;
            worksheet["G6"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["G6"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["G6"].CellStyle.Font.Size = 12;

            worksheet["H6"].Text = "Số lượng giấy tờ";
            worksheet["H6"].CellStyle.Font.Bold = true;
            worksheet["H6"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["H6"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["H6"].CellStyle.Font.Size = 12;

            worksheet["I6"].Text = "Tổng dung lượng";
            worksheet["I6"].CellStyle.Font.Bold = true;
            worksheet["I6"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["I6"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["I6"].CellStyle.Font.Size = 12;



            // Set column widths and heg
            worksheet.SetColumnWidth(2, 10);
            worksheet.SetColumnWidth(3, 30);
            worksheet.SetColumnWidth(4, 20);
            worksheet.SetColumnWidth(5, 20);
            worksheet.SetColumnWidth(6, 20);
            worksheet.SetColumnWidth(7, 20);
            worksheet.SetColumnWidth(8, 20);
            worksheet.SetColumnWidth(9, 20);

            worksheet.SetRowHeight(2, 25);
            worksheet.SetRowHeight(4, 50);

            // Thiết lập border cho các ô trong phạm vi
            worksheet.Range["B6:I6"].CellStyle.Borders[ExcelBordersIndex.EdgeTop].LineStyle = ExcelLineStyle.Thin;
            worksheet.Range["B6:I6"].CellStyle.Borders[ExcelBordersIndex.EdgeBottom].LineStyle = ExcelLineStyle.Thin;
            worksheet.Range["B6:I6"].CellStyle.Borders[ExcelBordersIndex.EdgeLeft].LineStyle = ExcelLineStyle.Thin;
            worksheet.Range["B6:I6"].CellStyle.Borders[ExcelBordersIndex.EdgeRight].LineStyle = ExcelLineStyle.Thin;
            worksheet.Range["B6:I6"].CellStyle.Borders[ExcelBordersIndex.InsideHorizontal].LineStyle = ExcelLineStyle.Thin;
            worksheet.Range["B6:I6"].CellStyle.Borders[ExcelBordersIndex.InsideVertical].LineStyle = ExcelLineStyle.Thin;

            // Row
            int rowIndex = 7;
            int columnIndex = 2;
            int rowCount = 1;

            foreach (var item in data)
            {
                var mergedRangeTT = worksheet.Range[rowIndex, columnIndex];
                mergedRangeTT.Text = rowCount.ToString();
                mergedRangeTT.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
                mergedRangeTT.CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;

                var mergedRangeHoTen = worksheet.Range[rowIndex, columnIndex + 1];
                mergedRangeHoTen.Text = item.FullName;
                mergedRangeHoTen.CellStyle.WrapText = true;
                mergedRangeHoTen.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignLeft;
                mergedRangeHoTen.CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;

                var mergedRangeUserName = worksheet.Range[rowIndex, columnIndex + 2];
                mergedRangeUserName.Text = item.UserName;
                mergedRangeUserName.CellStyle.WrapText = true;
                mergedRangeUserName.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignLeft;
                mergedRangeUserName.CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;

                var mergedRangeSoDinhDanh = worksheet.Range[rowIndex, columnIndex + 3];
                mergedRangeSoDinhDanh.Text = item.SoDinhDanh;
                mergedRangeSoDinhDanh.CellStyle.WrapText = true;
                mergedRangeSoDinhDanh.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
                mergedRangeSoDinhDanh.CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;

                var mergedRangePhoneNumber = worksheet.Range[rowIndex, columnIndex + 4];
                mergedRangePhoneNumber.Text = item.PhoneNumber;
                mergedRangePhoneNumber.CellStyle.WrapText = true;
                mergedRangePhoneNumber.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
                mergedRangePhoneNumber.CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;

                var mergedRangeSoLuongKho = worksheet.Range[rowIndex, columnIndex + 5];
                mergedRangeSoLuongKho.Text = item.SoLuongKho;
                mergedRangeSoLuongKho.CellStyle.WrapText = true;
                mergedRangeSoLuongKho.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
                mergedRangeSoLuongKho.CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;

                var mergedRangeSoLuongGiayTo = worksheet.Range[rowIndex, columnIndex + 6];
                mergedRangeSoLuongGiayTo.Text = item.SoLuongGiayTo;
                mergedRangeSoLuongGiayTo.CellStyle.WrapText = true;
                mergedRangeSoLuongGiayTo.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
                mergedRangeSoLuongGiayTo.CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;

                var mergedRangeTongDungLuong = worksheet.Range[rowIndex, columnIndex + 7];
                mergedRangeTongDungLuong.Text = item.TongDungLuong.ToString("0.##") + " MB";
                mergedRangeTongDungLuong.CellStyle.WrapText = true;
                mergedRangeTongDungLuong.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
                mergedRangeTongDungLuong.CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;

                

                // Thiết lập border cho hàng vừa thêm dữ liệu
                var range = worksheet.Range[rowIndex, columnIndex, rowIndex, columnIndex + 7];
                range.CellStyle.Borders[ExcelBordersIndex.EdgeTop].LineStyle = ExcelLineStyle.Thin;
                range.CellStyle.Borders[ExcelBordersIndex.EdgeBottom].LineStyle = ExcelLineStyle.Thin;
                range.CellStyle.Borders[ExcelBordersIndex.EdgeLeft].LineStyle = ExcelLineStyle.Thin;
                range.CellStyle.Borders[ExcelBordersIndex.EdgeRight].LineStyle = ExcelLineStyle.Thin;
                range.CellStyle.Borders[ExcelBordersIndex.InsideHorizontal].LineStyle = ExcelLineStyle.Thin;
                range.CellStyle.Borders[ExcelBordersIndex.InsideVertical].LineStyle = ExcelLineStyle.Thin;
                // Di chuyển đến cột tiếp theo để thêm dữ liệu
                rowIndex++;
                rowCount++;
            }

            workbook.SaveAs(stream);
        }

        stream.Position = 0;

        StreamDataFile streamDataFile = new StreamDataFile
        {
            StreamData = stream,
            ContentType = "application/vnd.ms-excel"
        };

        return streamDataFile;
    }

}
