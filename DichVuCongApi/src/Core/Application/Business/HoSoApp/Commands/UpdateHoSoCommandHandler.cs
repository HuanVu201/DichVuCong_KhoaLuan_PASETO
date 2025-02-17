using Mapster;
using Newtonsoft.Json;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Validate;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Commands;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.OCR;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;

public class UpdateHoSo_ThanhPhanHoSo_Select
{
    public Guid Id { get; set; }
}

public class UpdateHoSoCommandHandler : ICommandHandler<UpdateHoSoCommand>
{
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IRepositoryWithEvents<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLy;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currUser;
    private readonly IValidateThanhPhanHoSo _validateThanhPhanHoSo;

    public UpdateHoSoCommandHandler(IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLy, IValidateThanhPhanHoSo validateThanhPhanHoSo, ICurrentUser currUser, IRepositoryWithEvents<HoSo> repositoryHoSo, IRepositoryWithEvents<ThanhPhanHoSo> repositoryThanhPhanHoSo, IDapperRepository dapperRepository)
    {
        _repositoryHoSo = repositoryHoSo;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _dapperRepository = dapperRepository;
        _currUser = currUser;
        _validateThanhPhanHoSo = validateThanhPhanHoSo;
        _repositoryQuaTrinhXuLy = repositoryQuaTrinhXuLy;
    }
    private async Task UpdateTPCT(List<ThanhPhanHoSoUpdate> reqThanhPhanHoSos, string maHoSo)
    {
        var ids = reqThanhPhanHoSos.Select(x => x.Id).ToList<Guid>();
        var thanhPhanHoSos = await _repositoryThanhPhanHoSo.ListAsync(new GetThanhPhanHoSosSpec(maHoSo));
        var thanhPhanNotInDbs = reqThanhPhanHoSos.Where(u => !thanhPhanHoSos.Select(x => x.Id.ToString().ToLower()).ToList().Contains(u.Id.ToString())).ToList();
        var newUpdateThanhPhanHoSos = new List<Domain.Business.ThanhPhanHoSo>();
        var newCreateThanhPhanHoSos = new List<Domain.Business.ThanhPhanHoSo>();
        for (int i = 0; i < thanhPhanHoSos.Count; i++)
        {
            var thanhPhanHoSo = thanhPhanHoSos[i];
            var reqTPHS = reqThanhPhanHoSos.FirstOrDefault(x => x.Id == thanhPhanHoSo.Id);
            if (reqTPHS == null)
            {
                thanhPhanHoSo.SoftDelete();
            }
            else
            {
                thanhPhanHoSo.UpdateHoSo(reqTPHS.MaGiayTo, reqTPHS.Ten, reqTPHS.SoTrang, reqTPHS.SoBanGiay, reqTPHS.KyDienTuBanGiay, reqTPHS.DinhKem, reqTPHS.SoBanChinh, reqTPHS.SoBanSao);
                thanhPhanHoSo.SetDinhKemGoc(reqTPHS.DinhKem);
            }
            newUpdateThanhPhanHoSos.Add(thanhPhanHoSo);
        }
        var thanhPhanNotInDbsAdapter = thanhPhanNotInDbs.Adapt<List<ThanhPhanHoSo>>();
        for (int i = 0; i < thanhPhanNotInDbs.Count; i++)
        {
            var thanhPhanHoSo = thanhPhanNotInDbsAdapter[i];
            thanhPhanHoSo.SetDinhKemGoc(thanhPhanHoSo.DinhKem);
            newCreateThanhPhanHoSos.Add(thanhPhanHoSo);
        }
        await _repositoryThanhPhanHoSo.UpdateRangeAsync(newUpdateThanhPhanHoSos);
        await _repositoryThanhPhanHoSo.AddRangeAsync(newCreateThanhPhanHoSos);
    }
    public async Task<Result> Handle(UpdateHoSoCommand request, CancellationToken cancellationToken)
    {
        var userId = _currUser.GetUserId().ToString();
        DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userFullName = _currUser.GetUserFullName();
        
        var itemExitst = await _repositoryHoSo.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        if(itemExitst.KenhThucHien != "2" && itemExitst.LaHoSoChungThuc == false)
        {
            var validateTPHSreq = request.ThanhPhanHoSos.Adapt<List<AddThanhPhanHoSoCommand>>();
            var validateTPHSResponse = await _validateThanhPhanHoSo.ValidateBaseOnConfig(validateTPHSreq, ValidateThanhPhanHoSoLoaiNguoiDung.CanBo);
            if (!validateTPHSResponse.IsSucceed)
            {
                return Result<string>.Fail(validateTPHSResponse.Message);
            }
        }
        try
        {
                
            var updatedHoSo = itemExitst.Update(request.DonViId, request.MaHoSo, request.DonViQuanLy, request.ChoXacNhan, request.KenhThucHien, request.LoaiDoiTuong, request.MaDoiTuong,
            request.ChuHoSo, request.SoDienThoaiChuHoSo, request.EmailChuHoSo, request.SoGiayToChuHoSo, request.LoaiGiayToChuHoSo, request.NgaySinhChuHoSo, request.TinhThanhChuHoSo,
            request.QuanHuyenChuHoSo, request.XaPhuongChuHoSo, request.DiaChiChuHoSo, request.UyQuyen, request.NguoiUyQuyen, request.SoDienThoaiNguoiUyQuyen, request.EmailNguoiUyQuyen,
            request.SoGiayToNguoiUyQuyen, request.LoaiGiayToNguoiUyQuyen, request.NgaySinhNguoiUyQuyen, request.TinhThanhNguoiUyQuyen, request.QuanHuyenNguoiUyQuyen, request.XaPhuongNguoiUyQuyen,
            request.DiaChiNguoiUyQuyen, request.TrichYeuHoSo, request.NgayTiepNhan, request.NgayHenTra, request.TrangThaiHoSoId, request.NgayTra, request.HinhThucTra, request.NgayKetThucXuLy,
            request.GhiChu, request.NoiNopHoSo, request.HoSoCoThanhPhanSoHo, request.TaiKhoanDuocXacThucVoiVNeID, request.DuocThanhToanTrucTuyen, request.NgayTuChoi, request.LoaiDinhDanh,
            request.SoDinhDanh, request.NgayNopHoSo, request.MaTTHC, request.MaLinhVuc, request.TenLinhVuc, request.TenTruongHop, request.MaTruongHop, request.TruongHopId,
            request.ThoiGianThucHien, request.LoaiThoiGianThucHien, request.ThongBaoEmail, request.ThongBaoZalo, request.ThongBaoSMS, request.NguoiXuLyTiep,
            request.BuocXuLyTiep, request.NguoiNhanHoSo, request.NguoiDaXuLy, request.MucDo, request.SoBoHoSo, request.TenBuocHienTai, request.BuocHienTai, request.NguoiXuLyTruoc,
            request.BuocXuLyTruoc, request.DangKyNhanHoSoQuaBCCIData, request.TrichYeuKetQua, request.DinhKemKetQua, request.YKienNguoiChuyenXuLy, request.DinhKemYKienNguoiChuyenXuLy,
            request.NguoiDangXuLy, request.EFormData, request.TenDiaBan,null,null,null,null,null,null, null,null);
            updatedHoSo.SetDiaBanHoSo(request.TenDiaBan, request.TinhThanhDiaBan, request.QuanHuyenDiaBan, request.XaPhuongDiaBan);

            await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);

            //bulk insert
            if (request.ThanhPhanHoSos != null && request.ThanhPhanHoSos.Count > 0)
            {
                await UpdateTPCT(request.ThanhPhanHoSos, itemExitst.MaHoSo);
            }
            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(updatedHoSo.MaHoSo, userId, userFullName, null, null, currentTime, "", "Sửa hồ sơ", false);
            await _repositoryQuaTrinhXuLy.AddAsync(quaTrinhXuLyHoSo);

            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
}
