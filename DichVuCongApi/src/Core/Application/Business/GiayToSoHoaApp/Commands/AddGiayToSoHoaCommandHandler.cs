using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Interfaces;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Commands;

public class AddGiayToSoHoaCommandHandler : ICommandHandler<AddGiayToSoHoaCommand, string>
{
    private readonly IRepository<GiayToSoHoa> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _user;
    private readonly IGiayToSoHoaService _giayToSoHoaService;
    public AddGiayToSoHoaCommandHandler(IRepository<GiayToSoHoa> repositoryWithEvents, ICurrentUser user, IDapperRepository dapperRepository, IGiayToSoHoaService giayToSoHoaService)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _user = user;
        _dapperRepository = dapperRepository;
        _giayToSoHoaService = giayToSoHoaService;
    }
   
    public async Task<Result<string>> Handle(AddGiayToSoHoaCommand request, CancellationToken cancellationToken)
    {
        HoSo? hoSo = null;
        if (!string.IsNullOrEmpty(request.MaHoSo))
        {
            string sqlGetHoSo = $"SELECT {nameof(HoSo.MaTTHC)}, {nameof(HoSo.MaLinhVuc)} FROM {SchemaNames.Business}.{TableNames.HoSos} WHERE {nameof(HoSo.MaHoSo)} = @MaHoSo";

            hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo>(sqlGetHoSo, new
            {
                MaHoSo = request.MaHoSo
            }, cancellationToken: cancellationToken);
        }
        string maTTHC = hoSo?.MaTTHC ?? request.MaTTHC;
        string maLinhVuc = hoSo?.MaLinhVuc ?? request.MaLinhVuc;

        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userId = _user.GetUserId();
        string maDinhDanhCurrentUser = _user.GetUserMaDinhDanh();

        DateTime? thoiGianHieuLuc = currentTime.AddMonths(6);
        if(request.ThoiHanHieuLuc.HasValue && request.ThoiHanHieuLuc != default)
        {
            thoiGianHieuLuc = (DateTime)request.ThoiHanHieuLuc;
        }

        if(request.ThoiHanVinhVien == true)
        {
            thoiGianHieuLuc = null;
        }

        var ma = await _giayToSoHoaService.GetMaSuffix(request.Ma);
        // loại số hóa là kết quả => ẩn giấy tờ cho đến khi trả kết quả
        bool anGiayTo = request.LoaiSoHoa == GiayToSoHoa.GiayToSoHoa_LoaiSoHoa.KetQua ? true : false;
        // đối với số hóa thành phần và số hóa kết quả sẽ phải cập nhật đính kèm riêng DinhKemSoHoa, DinhKem (sẽ được xử lý trên giao diện)
        var giayToSoHoa = GiayToSoHoa.Create(request.Ten, ma, request.MaGiayToKhoQuocGia, request.MaDinhDanh, request.MaGiayTo, maDinhDanhCurrentUser, userId.ToString(),
            currentTime, thoiGianHieuLuc, request.NgayBanHanh, request.PhamViHieuLuc, request.TrichYeuNoiDung, request.CoQuanBanHanh, request.NguoiKy,
            request.LoaiSoHoa, request.LoaiSoHoa == GiayToSoHoa.GiayToSoHoa_LoaiSoHoa.KetQua ? request.DinhKemSoHoa : request.DinhKem, request.SoKyHieu, request.ThoiHanVinhVien, request.JsonOcr, request.MaHoSo, anGiayTo);
        giayToSoHoa.SetThongTinSoHoaKetQua(null, maTTHC, maLinhVuc);
        giayToSoHoa.SetChuGiayTo(request.ChuGiayTo);
        await _repositoryWithEvents.AddAsync(giayToSoHoa, cancellationToken);

        await _giayToSoHoaService.ThemGiayToSoHoaKetQua(request, ma);
        await _giayToSoHoaService.ThemGiayToSoHoaThanhPhan(request, ma);
        
        return Result<string>.Success(data: ma);
    }
}
