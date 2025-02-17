using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ChuyenPhiDiaGioiHandler : ICommandHandler<ChuyenPhiDiaGioi>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _user;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepositoryWithEvents<NgayNghi> _repositoryNgayNghi;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IHoSoServices _hoSoServices;
    private readonly IEMCService _eMCService;
    private readonly ISyncDVCQGService _syncDVCQGService;
    private int soGioMacDinhBuocXuLy = 2;
    private readonly IMediator _mediator;
    public ChuyenPhiDiaGioiHandler(ISyncDVCQGService syncDVCQGService, IDapperRepository dapperRepository, IUserService user, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IRepositoryWithEvents<NgayNghi> repositoryNgayNghi, IRepositoryWithEvents<HoSo> repositoryHoSo, IHoSoServices hoSoServices, IEMCService eMCService, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _user = user;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryNgayNghi = repositoryNgayNghi;
        _repositoryHoSo = repositoryHoSo;
        _hoSoServices = hoSoServices;
        _eMCService = eMCService;
        _syncDVCQGService = syncDVCQGService;
        _mediator = mediator;
    }
    public async Task<Result> Handle(ChuyenPhiDiaGioi request, CancellationToken cancellationToken)
    {
        var currentUser = await _user.GetCurrentUserAsync(cancellationToken);
        DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var hoSos = await _dapperRepository.QueryAsync<HoSoQLVB>(hoSoSelect.GetHoSos, new
        {
            request.Ids
        });


        if (hoSos == null)
        {
            throw new NotFoundException($"Hồ sơ chưa được thêm vào hệ thống");
        }
    
        try
        {
            List<HoSo> updateListHoSos = new List<HoSo>();
            List<QuaTrinhXuLyHoSo> updateListQuaTrinhHoSos = new List<QuaTrinhXuLyHoSo>();
            foreach( HoSo hoSo in hoSos)
            {
                GetDonViThuTucBy getDonViThuTucBy = new GetDonViThuTucBy(request.DonViId, hoSo.MaTTHC);
                var donViThuTuc = await _mediator.Send(getDonViThuTucBy);
                if (donViThuTuc.Data != null)
                {
                    string nguoiDangXuLy = string.Empty;
                    var updatedHoSo = hoSo.ChuyenPhiDiaGioi(request.DonViId, donViThuTuc.Data.NguoiTiepNhanId);
                    var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, currentUser.Id.ToString(), currentUser.UserName, null, null, currentTime, "", "Chuyển phi địa giới", false);
                    updateListHoSos.Add(updatedHoSo);
                    updateListQuaTrinhHoSos.Add(quaTrinhXuLyHoSo);

                }
            }
            await _repositoryHoSo.UpdateRangeAsync(updateListHoSos, cancellationToken);
            await _repositoryQuaTrinhXuLyHoSo.AddRangeAsync(updateListQuaTrinhHoSos);

             

            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);

        }

        
    }
}