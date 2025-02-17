using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Events;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class DatLaiQuyTrinhXuLyCommandHandler : ICommandHandler<DatLaiQuyTrinhXuLyCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<HoSo> _repositoryHoSo;
    private readonly IRepository<NgayNghi> _repositoryNgayNghi;
    private readonly IInjectConfiguration _configuration;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IHoSoServices _hoSoServices;
    private readonly IUserService _user;
    private readonly IEventPublisher _eventPublisher;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    private int soGioMacDinhBuocXuLy = 2;
    public DatLaiQuyTrinhXuLyCommandHandler(IEventPublisher eventPublisher, IRepository<HoSo> repositoryHoSo, IUserService user, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IRepository<NgayNghi> repositoryNgayNghi,
        IDapperRepository dapperRepository, IHoSoServices hoSoServices, IInjectConfiguration configuration, INguoiXuLyHoSoService nguoiXuLyHoSoService)
    {
        _repositoryHoSo = repositoryHoSo;
        _user = user;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryNgayNghi = repositoryNgayNghi;
        _dapperRepository = dapperRepository;
        _hoSoServices = hoSoServices;
        _eventPublisher = eventPublisher;
        _configuration = configuration;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }
    public async Task<Result> Handle(DatLaiQuyTrinhXuLyCommand request, CancellationToken cancellationToken)
    {
        var caculateTime = new CaculateTime(_configuration);
        var currentUser = await _user.GetCurrentUserAsync(cancellationToken);

        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
  
        var sqlTruongHopThuTuc = "SELECT NodeQuyTrinh, EdgeQuyTrinh, ThoiGianThucHienTrucTuyen, ThoiGianThucHien, LoaiThoiGianThucHien, Ten, Ma, Id FROM Business.TruongHopThuTucs WHERE Ma = @MaTruongHop";
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoQLVB>(hoSoSelect.GetHoSo, new
        {
            Id= request.HoSoId
        });
        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.HoSoId} chưa được thêm vào hệ thống");
        }
        var nguoiXuLy = string.Join("##", request.NguoiXuLys);
        var trangThaiNguoiXuLyCu = NguoiXuLyHoSo.NguoiXuLyHoSo_TrangThai.TrungGian;
 
        try
        {
            DateTime? ngayYeuCauBoSung = null;
            var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>(sqlTruongHopThuTuc, new
            {
                hoSo.MaTruongHop
            }, cancellationToken: cancellationToken);
            if (truongHopThuTuc == null) throw new Exception("Không có thông tin trường hợp thủ tục");
            var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken: cancellationToken);
            var updateHoSoData = _hoSoServices.GetNextNode(truongHopThuTuc, request.NodeQuyTrinhId);
            if (updateHoSoData != null && updateHoSoData?.NextNode != null && updateHoSoData?.NextNode.data != null) {
                var nextNode = updateHoSoData.NextNode;
                if (nextNode.data.maTrangThaiHoSo == "2")
                {
                    nguoiXuLy = hoSo.NguoiNhanHoSo;
                    trangThaiNguoiXuLyCu = NguoiXuLyHoSo.NguoiXuLyHoSo_TrangThai.TrungGian;
                    if (nguoiXuLy.Length <= 50)
                    {
                        hoSo.SetNguoiNhanHoSo(nguoiXuLy);
                    }
                    else if(request.NguoiXuLys != null && request.NguoiXuLys?.Count == 1)
                    {
                        hoSo.SetNguoiNhanHoSo(request.NguoiXuLys[0]);
                    }
                }
                if (nextNode.data.maTrangThaiHoSo == "8" || nextNode.data.maTrangThaiHoSo == "6")
                {
                    ngayYeuCauBoSung = currentTime;
                }
                var ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, soGioMacDinhBuocXuLy, nextNode.data.loaiThoiGian);
                hoSo.DatLaiQuyTrinh(nextNode.data.tenBuocXuLy, request.NodeQuyTrinhId, nguoiXuLy, nextNode.data.maTrangThaiHoSo, ngayHenTraCaNhan, ngayYeuCauBoSung);

            await _repositoryHoSo.UpdateAsync(hoSo, cancellationToken);
            await _nguoiXuLyHoSoService.OverrideNguoiDangXuLy(hoSo.Id, nguoiXuLy, trangThaiNguoiXuLyCu);
            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, currentUser.Id.ToString(), currentUser.FullName, null, null, currentTime, "", "Đặt lại quy trình xử lý", true);
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
               
            return (Result)Result.Success();
            }
            else
            {
                if (truongHopThuTuc == null) throw new Exception("Không có thông tin node quy trình chuyển đến");
            }
            return (Result)Result.Fail();
        }
           
        catch (Exception ex)
        {
            return (Result)Result.Fail(ex.Message);
        }
        
    }
}
