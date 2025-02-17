using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp;
using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Queries;
using TD.DichVuCongApi.Application.Common.ExportExcel;
using TD.DichVuCongApi.Application.Common.Minio;
using Syncfusion.XlsIO;
using TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using System.Threading;
using TD.DichVuCongApi.Application.Business.ActionApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using MediatR;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;
using Newtonsoft.Json.Linq;

namespace TD.DichVuCongApi.Infrastructure.ExportThongKe;
public class ExportExcelServices : IExportExcelService
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;

    public ExportExcelServices(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
    }

    public async Task<StreamDataFile> ExportToExcelBaoCao01(List<BaoCao01Dto> data, string quy, string nam, string donVi)
    {
        GroupDto groupInfo = null;
        if (!string.IsNullOrEmpty(donVi))
        {
            var groupsInfo = await _mediator.Send(new GetByGroupCodeQuery(donVi));
            if (groupsInfo != null) groupInfo = groupsInfo.Data;
        }

        MemoryStream stream = new MemoryStream();
        using (ExcelEngine excelEngine = new ExcelEngine())
        {
            IApplication application = excelEngine.Excel;
            application.DefaultVersion = ExcelVersion.Excel2016;
            IWorkbook workbook = application.Workbooks.Create(1);
            IWorksheet worksheet = workbook.Worksheets[0];

            worksheet.Range["E5:K5"].Merge();
            worksheet.Range["C8:I8"].Merge();
            worksheet.Range["C7:I7"].Merge();
            worksheet["E5"].Text = "TỔNG HỢP KẾT QUẢ ĐÁNH GIÁ CÁC CHỈ SỐ THÀNH PHẦN; XẾP LOẠI CÁN BỘ, CÔNG CHỨC VÀ MỨC ĐỘ HÀI LÒNG THÔNG QUA PHIẾU ĐÁNH GIÁ ";
            worksheet["C7"].Text = $"Cơ quan/đơn vị : {groupInfo.GroupName}";
            worksheet["C8"].Text = $"Thời điểm đánh giá : Quý {quy} Năm {nam}";

            worksheet["E5"].CellStyle.Font.Bold = true;
            worksheet["E5"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["E5"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["E5"].CellStyle.WrapText = true;
            worksheet["E5"].CellStyle.Font.Size = 13; // Set font size to 14
            worksheet["C8"].CellStyle.Font.Bold = true;
            worksheet["C8"].CellStyle.WrapText = true;
            worksheet["C8"].CellStyle.Font.Size = 13;
            worksheet["C7"].CellStyle.Font.Bold = true;
            worksheet["C7"].CellStyle.WrapText = true;
            worksheet["C7"].CellStyle.Font.Size = 13;// Set f


            // Merge columns for TT
            worksheet.Range["A13:B14"].Merge();
            worksheet["A13"].Text = "TT";
            worksheet["A13"].CellStyle.Font.Bold = true;
            worksheet["A13"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["A13"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter; // Can giữa theo chiều dọc
            worksheet["A13"].CellStyle.Font.Size = 13; // Set font size to 14

            // Merge columns for Hồ sơ
            worksheet.Range["C13:D14"].Merge();
            worksheet["C13"].Text = "Hồ sơ";
            worksheet["C13"].CellStyle.Font.Bold = true;
            worksheet["C13"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["C13"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["C13"].CellStyle.Font.Size = 13;

            // Merge columns for Điểm chỉ số thành phần
            worksheet.Range["E13:J13"].Merge();
            worksheet["E13"].Text = "Điểm chỉ số thành phần";
            worksheet["E13"].CellStyle.Font.Bold = true;
            worksheet["E13"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["E13"].CellStyle.Font.Size = 13;
            // Add subheaders for Điểm chỉ số thành phần
            worksheet["E14"].Text = "Chỉ số 1";
            worksheet["E14"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["E14"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["F14"].Text = "Chỉ số 2";
            worksheet["F14"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["F14"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["G14"].Text = "Chỉ số 3";
            worksheet["G14"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["G14"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["H14"].Text = "Chỉ số 4";
            worksheet["H14"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["H14"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["I14"].Text = "Chỉ số 6";
            worksheet["I14"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["I14"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["J14"].Text = "Chỉ số 7";
            worksheet["J14"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["J14"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;

            // Merge columns for Xếp loại CB,CC
            worksheet.Range["K13:L13"].Merge();
            worksheet["K13"].Text = "Xếp loại CB,CC";
            worksheet["K13"].CellStyle.Font.Size = 13;
            worksheet["K13"].CellStyle.Font.Bold = true;
            worksheet["K13"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["K13"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;

            // Add subheaders for Xếp loại CB,CC
            worksheet["K14"].Text = "Tổng điểm đánh giá";
            worksheet["L14"].Text = "Xếp loại hoàn thành nhiệm vụ";
            worksheet["K14"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["K14"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["L14"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["L14"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["K14"].CellStyle.WrapText = true;
            worksheet["L14"].CellStyle.WrapText = true;
            worksheet["M14"].CellStyle.WrapText = true;
            worksheet["M14"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["M14"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["O14"].CellStyle.WrapText = true;
            worksheet["O14"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["O14"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
            worksheet["N14"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["N14"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;

            // Merge columns for Mức độ hài lòng
            worksheet.Range["M13:O13"].Merge();
            worksheet["M13"].Text = "Mức độ hài lòng";
            worksheet["M13"].CellStyle.Font.Size = 13;
            worksheet["M13"].CellStyle.Font.Bold = true;
            worksheet["M13"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            worksheet["M13"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;

            // Add subheaders for Xếp loại CB,CC
            worksheet["M14"].Text = "Không hài lòng";
            worksheet["N14"].Text = "Hài lòng";
            worksheet["O14"].Text = "Rất hài lòng";

            // Set column widths and heg
            worksheet.SetColumnWidth(1, 3);
            worksheet.SetColumnWidth(3, 5);
            worksheet.SetRowHeight(14, 100);
            worksheet.SetRowHeight(5, 70);

            // Thiết lập border cho các ô trong phạm vi từ A13 đến O14
            worksheet.Range["A13:O14"].CellStyle.Borders[ExcelBordersIndex.EdgeTop].LineStyle = ExcelLineStyle.Thin;
            worksheet.Range["A13:O14"].CellStyle.Borders[ExcelBordersIndex.EdgeBottom].LineStyle = ExcelLineStyle.Thin;
            worksheet.Range["A13:O14"].CellStyle.Borders[ExcelBordersIndex.EdgeLeft].LineStyle = ExcelLineStyle.Thin;
            worksheet.Range["A13:O14"].CellStyle.Borders[ExcelBordersIndex.EdgeRight].LineStyle = ExcelLineStyle.Thin;
            worksheet.Range["A13:O14"].CellStyle.Borders[ExcelBordersIndex.InsideHorizontal].LineStyle = ExcelLineStyle.Thin;
            worksheet.Range["A13:O14"].CellStyle.Borders[ExcelBordersIndex.InsideVertical].LineStyle = ExcelLineStyle.Thin;

            // Row
            int rowIndex = 15;
            int columnIndex = 5;
            int rowCount = 1;

            foreach (var item in data)
            {
                var mergedRangeTT = worksheet.Range[rowIndex, 1, rowIndex, 2];
                mergedRangeTT.Merge();
                mergedRangeTT.Text = rowCount.ToString();
                mergedRangeTT.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter; // Căn giữa ngang cho ô mergedRangeTT


                var mergedRangeHoSo = worksheet.Range[rowIndex, 3, rowIndex, 4];
                mergedRangeHoSo.Merge();
                mergedRangeHoSo.Text = item.MaHoSo;
                mergedRangeHoSo.CellStyle.WrapText = true;


                // Thêm dữ liệu vào các cột ChiSo1, ChiSo2, ..., XepLoai
                worksheet.Range[rowIndex, columnIndex].Text = item.ChiSo1;
                worksheet.Range[rowIndex, columnIndex + 1].Text = item.ChiSo2;
                worksheet.Range[rowIndex, columnIndex + 2].Text = item.ChiSo3;
                worksheet.Range[rowIndex, columnIndex + 3].Text = item.ChiSo4;
                worksheet.Range[rowIndex, columnIndex + 4].Text = item.ChiSo6;
                worksheet.Range[rowIndex, columnIndex + 5].Text = item.ChiSo7;
                worksheet.Range[rowIndex, columnIndex + 6].Text = item.TongDiem;
                worksheet.Range[rowIndex, columnIndex + 7].Text = item.XepLoai;
                worksheet.Range[rowIndex, columnIndex + 10].Text = "1";
                worksheet.Range[rowIndex, columnIndex + 10].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;


                // Thiết lập border cho hàng vừa thêm dữ liệu
                var range = worksheet.Range[rowIndex, 1, rowIndex, columnIndex + 10];
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
            // Tính tổng các số của các cột tương ứng cộng lại
            int sumChiSo1 = data.Sum(x => int.TryParse(x.ChiSo1, out int result) ? result : 0);
            int sumChiSo2 = data.Sum(x => int.TryParse(x.ChiSo2, out int result) ? result : 0);
            int sumChiSo3 = data.Sum(x => int.TryParse(x.ChiSo3, out int result) ? result : 0);
            int sumChiSo4 = data.Sum(x => int.TryParse(x.ChiSo4, out int result) ? result : 0);
            int sumChiSo6 = data.Sum(x => int.TryParse(x.ChiSo6, out int result) ? result : 0);
            int sumChiSo7 = data.Sum(x => int.TryParse(x.ChiSo7, out int result) ? result : 0);
            int sumTongDiem = data.Sum(x => int.TryParse(x.TongDiem, out int result) ? result : 0);

            // Thêm hàng tổng số
            int lastRowIndex = rowIndex;
            var mergedRangeTongSo = worksheet.Range[lastRowIndex, 1, lastRowIndex, 4];
            mergedRangeTongSo.Merge();
            mergedRangeTongSo.Text = "Tổng số";
            mergedRangeTongSo.CellStyle.Font.Size = 13;
            mergedRangeTongSo.CellStyle.Font.Bold = true;
            mergedRangeTongSo.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            mergedRangeTongSo.CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;

            worksheet.Range[lastRowIndex, columnIndex].Text = sumChiSo1.ToString();
            worksheet.Range[lastRowIndex, columnIndex + 1].Text = sumChiSo2.ToString();
            worksheet.Range[lastRowIndex, columnIndex + 2].Text = sumChiSo3.ToString();
            worksheet.Range[lastRowIndex, columnIndex + 3].Text = sumChiSo4.ToString();
            worksheet.Range[lastRowIndex, columnIndex + 4].Text = sumChiSo6.ToString();
            worksheet.Range[lastRowIndex, columnIndex + 5].Text = sumChiSo7.ToString();
            worksheet.Range[lastRowIndex, columnIndex + 6].Text = sumTongDiem.ToString();
            worksheet.Range[lastRowIndex, columnIndex + 7].Text = ""; // Không có dữ liệu cho cột XepLoai
            worksheet.Range[lastRowIndex, columnIndex + 10].Text = ""; // Không có dữ liệu cho cột cuối cùng

            // Thiết lập border cho hàng tổng số chỉ số
            var rangeTongSo = worksheet.Range[lastRowIndex, 1, lastRowIndex, columnIndex + 10];
            rangeTongSo.CellStyle.Borders[ExcelBordersIndex.EdgeTop].LineStyle = ExcelLineStyle.Thin;
            rangeTongSo.CellStyle.Borders[ExcelBordersIndex.EdgeBottom].LineStyle = ExcelLineStyle.Thin;
            rangeTongSo.CellStyle.Borders[ExcelBordersIndex.EdgeLeft].LineStyle = ExcelLineStyle.Thin;
            rangeTongSo.CellStyle.Borders[ExcelBordersIndex.EdgeRight].LineStyle = ExcelLineStyle.Thin;

            var mergedRangeDiemBinhQuanChiSo = worksheet.Range[lastRowIndex + 1, 1, lastRowIndex + 1, 4];
            mergedRangeDiemBinhQuanChiSo.Merge();
            mergedRangeDiemBinhQuanChiSo.Text = "Điểm bình quân chỉ số";
            mergedRangeDiemBinhQuanChiSo.CellStyle.Font.Size = 13;
            mergedRangeDiemBinhQuanChiSo.CellStyle.Font.Bold = true;
            mergedRangeDiemBinhQuanChiSo.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
            mergedRangeDiemBinhQuanChiSo.CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;

            worksheet.Range[lastRowIndex + 1, columnIndex].Text = "2,0";
            worksheet.Range[lastRowIndex + 1, columnIndex + 1].Text = "2,0";
            worksheet.Range[lastRowIndex + 1, columnIndex + 2].Text = "2,0";
            worksheet.Range[lastRowIndex + 1, columnIndex + 3].Text = "2,0";
            worksheet.Range[lastRowIndex + 1, columnIndex + 4].Text = "2,0";
            worksheet.Range[lastRowIndex + 1, columnIndex + 5].Text = "2,0";
            worksheet.Range[lastRowIndex + 1, columnIndex + 7].Text = ""; // Không có dữ liệu cho cột XepLoai
            worksheet.Range[lastRowIndex + 1, columnIndex + 10].Text = ""; // Không có dữ liệu cho cột cuối cùng

            // Thiết lập border cho hàng tổng số
            var rangeDiemBinhQuan = worksheet.Range[lastRowIndex + 1, 1, lastRowIndex + 1, columnIndex + 10];
            rangeDiemBinhQuan.CellStyle.Borders[ExcelBordersIndex.EdgeTop].LineStyle = ExcelLineStyle.Thin;
            rangeDiemBinhQuan.CellStyle.Borders[ExcelBordersIndex.EdgeBottom].LineStyle = ExcelLineStyle.Thin;
            rangeDiemBinhQuan.CellStyle.Borders[ExcelBordersIndex.EdgeLeft].LineStyle = ExcelLineStyle.Thin;
            rangeDiemBinhQuan.CellStyle.Borders[ExcelBordersIndex.EdgeRight].LineStyle = ExcelLineStyle.Thin;
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
