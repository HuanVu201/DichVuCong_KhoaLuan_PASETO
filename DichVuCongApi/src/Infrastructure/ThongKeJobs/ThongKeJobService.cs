using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.ThongKeJobs;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Infrastructure.ThongKeJobs;

internal class GetDuLieuThongKeSpec : Specification<DuLieuThongKeHoSo>
{
    public GetDuLieuThongKeSpec(int month, int year)
    {
        Query.Where(x => x.Thang == month && x.Nam == year);
    }
}

internal class ThongKeJobService : IThongKeJobService
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<DuLieuThongKeHoSo> _repositoryDuLieuThongKeHoSo;
    public ThongKeJobService(IDapperRepository dapperRepository, IRepositoryWithEvents<DuLieuThongKeHoSo> repositoryDuLieuThongKeHoSo)
    {
        _dapperRepository = dapperRepository;
        _repositoryDuLieuThongKeHoSo = repositoryDuLieuThongKeHoSo;
    }
    public async Task AddOrUpdate()
    {
        var month = DateTime.Now.Month;
        var year = DateTime.Now.Year;
        var sqlGetDuLieuThongKe = @"SELECT 
            SUM(case when TrangThaiHoSoId = '9' and DATEDIFF(HOUR, NgayHenTra, NgayTra) <= 0 then 1 else 0 end) as HoSoDaXuLyDungHan,
            SUM(case when TrangThaiHoSoId = '9' and DATEDIFF(HOUR, NgayHenTra, NgayTra) > 0 then 1 else 0 end) as HoSoDaXuLyQuaHan,
            SUM(case when TrangThaiHoSoId = '2' then 1 else 0 end) as HoSoMoiTiepNhan,
            0 as HoSoTuKyTruoc
            FROM [Business].HoSos
            WHERE MONTH(NgayTiepNhan) = @month AND YEAR(NgayTiepNhan) = @year AND DeletedOn is null AND TrangThaiHoSoId in ('2', '9')";
        var duLieuThongKe = await _dapperRepository.QueryFirstOrDefaultAsync<ThongKeJobRequest>(sqlGetDuLieuThongKe, new
        {
            month,
            year
        });
        int tongSoHoSo = duLieuThongKe.HoSoTuKyTruoc + duLieuThongKe.HoSoMoiTiepNhan;
        int tongSoHoSoDaXuLy = duLieuThongKe.HoSoDaXuLyQuaHan + duLieuThongKe.HoSoDaXuLyDungHan;
        var dataExisted = await _repositoryDuLieuThongKeHoSo.GetBySpecAsync(new GetDuLieuThongKeSpec(month, year));
        if (dataExisted != null)
        {
            var updatedDuLieuThongKe = dataExisted.Update(tongSoHoSo, duLieuThongKe.HoSoTuKyTruoc, duLieuThongKe.HoSoMoiTiepNhan, tongSoHoSoDaXuLy, duLieuThongKe.HoSoDaXuLyDungHan, duLieuThongKe.HoSoDaXuLyQuaHan);
            await _repositoryDuLieuThongKeHoSo.UpdateAsync(updatedDuLieuThongKe);
            return;
        }
        var newDuLieuThongKe = new DuLieuThongKeHoSo(tongSoHoSo, duLieuThongKe.HoSoTuKyTruoc, duLieuThongKe.HoSoMoiTiepNhan, tongSoHoSoDaXuLy, duLieuThongKe.HoSoDaXuLyDungHan, duLieuThongKe.HoSoDaXuLyQuaHan);
        await _repositoryDuLieuThongKeHoSo.AddAsync(newDuLieuThongKe);
        return;
    }
}
