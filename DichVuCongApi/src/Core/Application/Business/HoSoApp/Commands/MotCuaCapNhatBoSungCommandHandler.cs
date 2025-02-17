using System.Net.WebSockets;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoBoSungApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;

public class HoSoBoSung_Select
{
    public Guid Id { get; set; }
}
/// <summary>
/// client: 
//gửi 
//- thông tin bổ sung
//- hồ sơ id 
//- danh sách thành phần hồ sơ: thành phần hồ sơ id, file cũ, file mới

//server
//- từ hồ sơ id tìm ra hosobosung id => select top1 ra hồ sơ bổ sung id
//- lưu thông tin bổ sung vào hosobosung
//- với từng item trong danh sách tphs: tạo 1 object thanhphanbosunghoso =>
//thêm hết
//- sửa thành phần hồ sơ sang đính kèm mới hết
/// </summary>
public class MotCuaCapNhatBoSungCommandHandler : ICommandHandler<MotCuaCapNhatBoSungCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _user;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IRepositoryWithEvents<HoSoBoSung> _repositoryHoSoBoSung;
    private readonly IRepositoryWithEvents<ThanhPhanHoSoBoSung> _repositoryThanhPhanHoSoBoSung;
    private readonly IRepositoryWithEvents<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly ILLTPService _lLTPService;

    public MotCuaCapNhatBoSungCommandHandler(ILLTPService lLTPService, IRepositoryWithEvents<ThanhPhanHoSo> repositoryThanhPhanHoSo, IDapperRepository dapperRepository, ICurrentUser user, IRepositoryWithEvents<HoSo> repositoryHoSo, IRepositoryWithEvents<HoSoBoSung> repositoryHoSoBoSung, IRepositoryWithEvents<ThanhPhanHoSoBoSung> repositoryThanhPhanHoSoBoSung)
    {
        _dapperRepository = dapperRepository;
        _user = user;
        _repositoryHoSo = repositoryHoSo;
        _repositoryHoSoBoSung = repositoryHoSoBoSung;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _repositoryThanhPhanHoSoBoSung = repositoryThanhPhanHoSoBoSung;
        _lLTPService = lLTPService;
    }

    public async Task<Result> Handle(MotCuaCapNhatBoSungCommand request, CancellationToken cancellationToken)
    {
        var userId = _user.GetUserId();
        var hoSo = await _repositoryHoSo.GetByIdAsync(request.Id, cancellationToken);
        var sqlGetHoSoBoSung = @"SELECT TOP 1 Id FROM Business.HoSoBoSungs WHERE MaHoSo = @MaHoSo AND DeletedOn is null
                    AND TrangThaiBoSung IN @TrangThaiBoSungList ORDER BY CreatedOn DESC";
        var sqlUpdateHoSoBoSung = "UPDATE Business.HoSoBoSungs SET ThongTinTiepNhan = @ThongTinTiepNhanBoSung WHERE Id = @Id";
        var sqlUpdateThanhPhanHoSo = @"
        CREATE TABLE #TempTableThanhPhanHoSo (DinhKem nvarchar(MAX), Id uniqueidentifier);
        INSERT INTO #TempTableThanhPhanHoSo VALUES (@DinhKem, @Id);
        UPDATE tphs SET tphs.DinhKem = (CASE WHEN temp.DinhKem is null or temp.DinhKem = '' THEN tphs.DinhKem ELSE temp.DinhKem END) FROM Business.ThanhPhanHoSos tphs INNER JOIN
        #TempTableThanhPhanHoSo temp ON tphs.Id = temp.Id";
        var maTrangThaiHienTai = hoSo.TrangThaiHoSoId;
        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        }
        _lLTPService.CheckThaoTac(hoSo.LoaiDuLieuKetNoi);
        var trangThaiBoSungList = new List<string> { "Yêu cầu một cửa bổ sung", string.Empty, "Yêu cầu công dân bổ sung", "Công dân đã gửi bổ sung" };
        var hoSoBoSung = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoBoSung_Select>(sqlGetHoSoBoSung, new
        {
            hoSo.MaHoSo,
            TrangThaiBoSungList = trangThaiBoSungList
        });
        if (hoSoBoSung == null)
        {
            throw new NotFoundException($"HoSoBoSung với mã: {hoSoBoSung.Id} chưa được thêm vào hệ thống");
        }
        if (maTrangThaiHienTai == "5" && hoSo.NguoiDangXuLy.ToLower().Contains(userId.ToString().ToLower()))
        {
            //using (var transactionScope = new TransactionScope(TransactionScopeOption.Suppress, new TransactionOptions
            //{
            //    IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted,
            //}, TransactionScopeAsyncFlowOption.Enabled))
            //{
            try
            {
                var updatedHoSo = hoSo.MotCuaCapNhatBoSung(request.ThongTinTiepNhanBoSung);
                await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
                var updatedHoSoBoSungRows = await _dapperRepository.ExcuteAsync(sqlUpdateHoSoBoSung, new
                {
                    hoSoBoSung.Id,
                    request.ThongTinTiepNhanBoSung
                });
                if (updatedHoSoBoSungRows == 0)
                {
                    return (Result)Result.Fail("Cập nhật hồ sơ bổ sung thất bại");
                }
                var insertTempValues = request.DanhSachGiayToBoSung.Select(x => new { DinhKem = x.FileDinhKemMoi, Id = x.ThanhPhanHoSoId }).ToList();
                var thanhPhanHoSoBoSungs = new List<ThanhPhanHoSoBoSung>() { };
                foreach (var thanhPhanHoSo in request.DanhSachGiayToBoSung)
                {
                    var thanhPhanHoSoBoSung = new ThanhPhanHoSoBoSung(hoSoBoSung.Id.ToString(), thanhPhanHoSo.ThanhPhanHoSoId, thanhPhanHoSo.FileDinhKemCu, thanhPhanHoSo.FileDinhKemMoi, thanhPhanHoSo.NoiDungBoSung);
                    thanhPhanHoSoBoSungs.Add(thanhPhanHoSoBoSung);
                }
                var updatedThanhPhanHoSoRows = await _dapperRepository.ExcuteAsync(sqlUpdateThanhPhanHoSo, insertTempValues);
                if (updatedThanhPhanHoSoRows == 0)
                {
                    return (Result)Result.Fail("Cập nhật thành phần hồ sơ thất bại");
                }
                if (request.DanhSachGiayToBoSungMoi != null && request.DanhSachGiayToBoSungMoi.Count > 0)
                {
                    List<ThanhPhanHoSo> thanhPhanHoSos = new List<ThanhPhanHoSo>();
                    for (int i = 0; i < request.DanhSachGiayToBoSungMoi.Count; i++)
                    {
                        MotCuaCapNhatBoSung_ThanhPhanHoSo currTPHS = request.DanhSachGiayToBoSungMoi[i];
                        var thanhPhanHoSo = new ThanhPhanHoSo(currTPHS.TenThanhPhan, hoSo.MaHoSo, null, null, null, currTPHS.FileDinhKemMoi, null, null, null, null, null, null, null, null, null, null);
                        thanhPhanHoSo.SetNoiDungBoSung(currTPHS.NoiDungBoSung);
                        thanhPhanHoSos.Add(thanhPhanHoSo);
                    }
                    await _repositoryThanhPhanHoSo.AddRangeAsync(thanhPhanHoSos);
                }

                await _repositoryThanhPhanHoSoBoSung.AddRangeAsync(thanhPhanHoSoBoSungs, cancellationToken);
                   
                //var hoSoBoSung = await _repositoryHoSoBoSung.FirstOrDefaultAsync(new GetHoSoBoSungQuerySpec(hoSo.MaHoSo, trangThaiBoSungList));
                    
                //var updatedHoSoBoSung = hoSoBoSung.MotCuaCapNhatBoSung(request.ThongTinTiepNhanBoSung, String.Join("##", request.DanhSachGiayToBoSung));
                //await _repositoryHoSoBoSung.UpdateAsync(updatedHoSoBoSung, cancellationToken);
                //transactionScope.Complete();
                return (Result)Result.Success();
            }
            catch (Exception ex)
            {
                return (Result)Result.Fail(ex.Message);
            }
            //}
        }
        else
        {
            return (Result)Result.Fail("Hồ sơ không ở trạng thái bổ sung hoặc bạn không phải người xử lý hồ sơ!");
        }
    }
}
