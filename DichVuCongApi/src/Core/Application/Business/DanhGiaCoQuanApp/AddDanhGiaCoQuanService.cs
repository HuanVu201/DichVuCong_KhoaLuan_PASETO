using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp.Commands;
using TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp;
using TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Commands;
using TD.DichVuCongApi.Application.Catalog.SoChungThucApp;
using TD.DichVuCongApi.Application.Common.DvcPayment;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.ServiceLogger;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp;

public interface IDanhGiaCoQuanService : ITransientService, IEnableServiceLogger
{
    public Task AddDanhGiaCoQuan();
    public Task TinhTrungBinhDGHLDonVi();
    public Task TinhTongSoPhieuVaMucDoHLDonVi();

}


public class AddDanhGiaCoQuanService : IDanhGiaCoQuanService
{
    private readonly IMediator _mediator;
    private readonly IRepositoryWithEvents<DanhGiaCoQuan> _repositoryWithEventsDanhGiaCoQuan;
    private readonly IDapperRepository _dapperRepository;

    public AddDanhGiaCoQuanService(IMediator mediator, IDapperRepository dapperRepository, IRepositoryWithEvents<DanhGiaCoQuan> repositoryWithEventsDanhGiaCoQuan)
    {
        _mediator = mediator;
        _dapperRepository = dapperRepository;
        _repositoryWithEventsDanhGiaCoQuan = repositoryWithEventsDanhGiaCoQuan;


    }
    public async Task AddDanhGiaCoQuan()
    {
        DateTime currentDate = DateTime.Now;
        int currentYear = currentDate.Year;
        int currentQuarter = (currentDate.Month - 1) / 3 + 1;
        string sqlExist = "SELECT COUNT(DonVi) as TotalCount FROM [Business].[DanhGiaCoQuans] WHERE Quy = @Quy AND Nam = @Nam";
        var data = await _dapperRepository.QueryFirstOrDefaultAsync<CountSoChungThucDto>(sqlExist, new
        {
            Quy = currentQuarter.ToString(),
            Nam = currentYear.ToString(),

        });
        if (data.TotalCount > 0)
        {
            throw new Exception("Dữ liệu đã tồn tại, không thể tạo job");
        }
        AddDanhGiaCoQuanCommand command = new AddDanhGiaCoQuanCommand();
        var res = await _mediator.Send(command);

    }

    public async Task TinhTongSoPhieuVaMucDoHLDonVi()
    {
        /**/
        UpdateDanhGiaCoQuanCommand updateDanhGiaCoQuan = new UpdateDanhGiaCoQuanCommand();
        string sql = @"
                        SELECT
                        Id
                        ,temp.*
                        FROM [Business].DanhGiaCoQuans dgcq
                        INNER JOIN (SELECT
                        DonVi
                        ,DATEPART(QUARTER, CONVERT(DATE, NgayTao)) AS Quy
                        ,YEAR(CONVERT(DATE, NgayTao)) AS Nam
                        ,count(id) as SoPhieu
                        ,SUM(CAST(MucDoRHL AS INT)) AS MucDoRHL
                        ,SUM(CAST(MucDoHL AS INT)) AS MucDoHL
                        ,SUM(CAST(MucDoKHL AS INT)) AS MucDoKHL
                        FROM [Business].[PhieuKhaoSats]
                        WHERE NgayTao >= DATEADD(QUARTER, DATEDIFF(QUARTER, 0, NgayTao), 0) AND NgayTao <= DATEADD(DAY, -1, DATEADD(QUARTER, DATEDIFF(QUARTER, 0, NgayTao) + 1, 0))
                        GROUP BY DonVi
                        ,DATEPART(QUARTER, CONVERT(DATE, NgayTao))
                        ,YEAR(CONVERT(DATE, NgayTao))) temp
                        ON temp.DonVi = dgcq.DonVi and temp.Nam = dgcq.Nam and temp.Quy = dgcq.Quy;";
        var tongSoPhieus = await _dapperRepository.QueryAsync<DanhGiaCoQuanDto>(sql);
        foreach (var phieu in tongSoPhieus)
        {
            var itemExitst = await _repositoryWithEventsDanhGiaCoQuan.GetByIdAsync(phieu.Id);
            if (itemExitst == null)
                throw new NotFoundException($"DanhGiaCoQuan với mã: {phieu.Id} chưa được thêm vào hệ thống");
            var updateRequest = itemExitst.UpdateSoPhieuVaMucDoHL(phieu.SoPhieu);
            await _repositoryWithEventsDanhGiaCoQuan.UpdateAsync(updateRequest);
        }
    }
    public async Task TinhTrungBinhDGHLDonVi()
    {
        UpdateDanhGiaCoQuanCommand updateDanhGiaCoQuan = new UpdateDanhGiaCoQuanCommand();
        string sqlDanhGiaCoQuan = @"SELECT
                                        Id
                                       ,temp.*
                                      FROM [Business].DanhGiaCoQuans dgcq
                                      INNER JOIN (SELECT
                                          DonVi 
                                         ,DATEPART(QUARTER, CONVERT(DATE, NgayTao)) AS Quy
                                         ,YEAR(CONVERT(DATE, NgayTao)) AS Nam,
                                        ROUND(AVG(CAST(TraLoi1 AS FLOAT)), 2) AS TraLoi1,
                                        ROUND(AVG(CAST(TraLoi2 AS FLOAT)), 2) AS TraLoi2,
                                        ROUND(AVG(CAST(TraLoi3 AS FLOAT)), 2) AS TraLoi3,
                                        ROUND(AVG(CAST(TraLoi4 AS FLOAT)), 2) AS TraLoi4,
                                        ROUND(AVG(CAST(TraLoi5 AS FLOAT)), 2) AS TraLoi5,   
                                        ROUND(AVG(CAST(TraLoi6 AS FLOAT)), 2) AS TraLoi6,   
                                        ROUND(AVG(CAST(TraLoi7 AS FLOAT)), 2) AS TraLoi7,   
                                        ROUND(AVG(CAST(TraLoi8 AS FLOAT)), 2) AS TraLoi8,
                                        ROUND(AVG(CAST(TraLoi9 AS FLOAT)), 2) AS TraLoi9,
                                        ROUND(AVG(CAST(TraLoi10 AS FLOAT)), 2) AS TraLoi10,
                                        ROUND(AVG(CAST(TraLoi11 AS FLOAT)), 2) AS TraLoi11
                                        FROM [Business].[PhieuKhaoSats]
                                         WHERE NgayTao >= DATEADD(QUARTER, DATEDIFF(QUARTER, 0, NgayTao), 0) AND NgayTao <= DATEADD(DAY, -1, DATEADD(QUARTER, DATEDIFF(QUARTER, 0, NgayTao) + 1, 0))
                                        GROUP BY DonVi
                                                ,DATEPART(QUARTER, CONVERT(DATE, NgayTao))
                                                ,YEAR(CONVERT(DATE, NgayTao))) temp
                                        ON temp.DonVi = dgcq.DonVi and temp.Nam = dgcq.Nam and temp.Quy = dgcq.Quy;";

        var phieuKhaoSats = await _dapperRepository.QueryAsync<DanhGiaCoQuanDto>(sqlDanhGiaCoQuan);

        foreach (var phieuKhaoSat in phieuKhaoSats)
        {
            /*  string sqlCheck = $"SELECT COUNT(Id) as TotalCount FROM [Business].[DanhGiaCoQuans]  WHERE DonVi = N'{phieuKhaoSat.DonVi}' And Quy = N'{phieuKhaoSat.Quy}' And Nam = N'{phieuKhaoSat.Nam} '";
              var check = await _dapperRepository.QueryFirstOrDefaultAsync<DanhGiaCoQuanDto>(sqlCheck);*/
            var itemExitst = await _repositoryWithEventsDanhGiaCoQuan.GetByIdAsync(phieuKhaoSat.Id);
            if (itemExitst == null)
                throw new NotFoundException($"DanhGiaCoQuan với mã: {phieuKhaoSat.Id} chưa được thêm vào hệ thống");
            updateDanhGiaCoQuan.Quy = phieuKhaoSat.Quy;
            updateDanhGiaCoQuan.Nam = phieuKhaoSat.Nam;
            updateDanhGiaCoQuan.DonVi = phieuKhaoSat.DonVi;
            updateDanhGiaCoQuan.TraLoi1 = phieuKhaoSat.TraLoi1;
            updateDanhGiaCoQuan.TraLoi2 = phieuKhaoSat.TraLoi2;
            updateDanhGiaCoQuan.TraLoi3 = phieuKhaoSat.TraLoi3;
            updateDanhGiaCoQuan.TraLoi4 = phieuKhaoSat.TraLoi4;
            updateDanhGiaCoQuan.TraLoi5 = phieuKhaoSat.TraLoi5;
            updateDanhGiaCoQuan.TraLoi6 = phieuKhaoSat.TraLoi6;
            updateDanhGiaCoQuan.TraLoi7 = phieuKhaoSat.TraLoi7;
            updateDanhGiaCoQuan.TraLoi8 = phieuKhaoSat.TraLoi8;
            updateDanhGiaCoQuan.TraLoi9 = phieuKhaoSat.TraLoi9;
            updateDanhGiaCoQuan.TraLoi10 = phieuKhaoSat.TraLoi10;
            updateDanhGiaCoQuan.TraLoi11 = phieuKhaoSat.TraLoi11;
            var updateRequest = itemExitst.Update(phieuKhaoSat.DonVi, updateDanhGiaCoQuan.DonViText, updateDanhGiaCoQuan.MaNhomCha, updateDanhGiaCoQuan.MaNhomChaText, updateDanhGiaCoQuan.DongBo, phieuKhaoSat.Quy, phieuKhaoSat.Nam, phieuKhaoSat.TraLoi1,
                       phieuKhaoSat.TraLoi2, phieuKhaoSat.TraLoi3, phieuKhaoSat.TraLoi4, phieuKhaoSat.TraLoi5, phieuKhaoSat.TraLoi6, phieuKhaoSat.TraLoi7, phieuKhaoSat.TraLoi8, phieuKhaoSat.TraLoi9,
                       updateDanhGiaCoQuan.SoPhieu, updateDanhGiaCoQuan.TongDiem, updateDanhGiaCoQuan.PhongBan, updateDanhGiaCoQuan.LyDoTruDiem, updateDanhGiaCoQuan.MaHoSo, updateDanhGiaCoQuan.HinhThucDanhGia, updateDanhGiaCoQuan.MucDoRHL, updateDanhGiaCoQuan.MucDoHL,
                       updateDanhGiaCoQuan.MucDoBT, updateDanhGiaCoQuan.MucDoKHL, updateDanhGiaCoQuan.MucDoRKHL, updateDanhGiaCoQuan.ThamDinhTraLoi1, updateDanhGiaCoQuan.ThamDinhTraLoi2, updateDanhGiaCoQuan.ThamDinhTraLoi3, updateDanhGiaCoQuan.ThamDinhTraLoi4,
                       updateDanhGiaCoQuan.ThamDinhTraLoi5, updateDanhGiaCoQuan.ThamDinhTraLoi6, updateDanhGiaCoQuan.ThamDinhTraLoi7, updateDanhGiaCoQuan.ThamDinhTraLoi8, updateDanhGiaCoQuan.ThamDinhTraLoi9, updateDanhGiaCoQuan.XepLoai, updateDanhGiaCoQuan.XepHang, updateDanhGiaCoQuan.TongDonViCon,
                       phieuKhaoSat.TraLoi10, phieuKhaoSat.TraLoi11, updateDanhGiaCoQuan.ThamDinhTraLoi10, updateDanhGiaCoQuan.ThamDinhTraLoi11);
            await _repositoryWithEventsDanhGiaCoQuan.UpdateAsync(updateRequest);
        }
    }
}
