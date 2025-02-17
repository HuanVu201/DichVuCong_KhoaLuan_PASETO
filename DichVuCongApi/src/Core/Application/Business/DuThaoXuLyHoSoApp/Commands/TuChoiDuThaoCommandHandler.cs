using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Constant;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Common.LTQVLB;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Commands;

public class TuChoiDuThaoCommandHandler : ICommandHandler<TuChoiDuThaoCommand, DefaultIdType>
{
    private readonly IRepository<DuThaoXuLyHoSo> _repositoryDuThaoXuLyHoSo;
    private readonly IRepository<HoSo> _repositoryHoSo;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private readonly IHoSoServices _hoSoServices;
    private readonly ILTQLVBService _lTQLVBService;
    private readonly IMediator _mediator;
    private readonly ILLTPService _lLTPService;
    public TuChoiDuThaoCommandHandler(ILLTPService lLTPService, IRepository<DuThaoXuLyHoSo> repositoryDuThaoXuLyHoSo, IRepository<HoSo> repositoryHoSo, IDapperRepository dapperRepository, ICurrentUser currentUser, IHoSoServices hoSoServices, ILTQLVBService lTQLVBService, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IMediator mediator)
    {
        _repositoryDuThaoXuLyHoSo = repositoryDuThaoXuLyHoSo;
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _hoSoServices = hoSoServices;
        _repositoryHoSo = repositoryHoSo;
        _lTQLVBService = lTQLVBService;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _mediator = mediator;
        _lLTPService = lLTPService;
    }
    public async Task<Result<DefaultIdType>> Handle(TuChoiDuThaoCommand request, CancellationToken cancellationToken)
    {
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;


        string sqlQueryDuThao = @"SELECT TOP (1) 
	                                Id, MaHoSo, Loai, FileDinhKem, NguoiXuLy, TrichYeu, TrangThai, TrangThaiLienThongQLVB,
	                                NgayHenTraMoi, LanhDaoThongQua, TenLanhDaoKy, TaiKhoanLanhDaoKy
                                  FROM [Business].[DuThaoXuLyHoSos]
                                  where Id= @Id";

        var duThaoXuLyHoSo = await _dapperRepository.QueryFirstOrDefaultAsync<DuThaoXuLyHoSo>(sqlQueryDuThao, new
        {
            Id = request.Id
        });

        if (duThaoXuLyHoSo != null)
        {
            Result<DefaultIdType>.Fail("Không có thông dự thảo!");
        }


        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoQLVB>(hoSoSelect.GetHoSoByMaHoSoSql, new
        {
            MaHoSo = duThaoXuLyHoSo.MaHoSo
        });
        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        }
        if (hoSo.LoaiDuLieuKetNoi == "LTKS" || hoSo.LoaiDuLieuKetNoi == "LTKT")
        {
            throw new Exception("Hồ sơ thuộc Dịch vụ công liên thông, vui lòng không sử dụng chức năng này");
        }
        _lLTPService.CheckThaoTac(hoSo.LoaiDuLieuKetNoi);

        try
        {
            duThaoXuLyHoSo.UpdateTrangThai(DuThaoXuLyHoSoConstant.TrangThai_TuChoi);
            await _repositoryDuThaoXuLyHoSo.UpdateAsync(duThaoXuLyHoSo);
            hoSo.SetDangChoBanHanh(false);
            await _repositoryHoSo.UpdateAsync(hoSo);

            return Result<DefaultIdType>.Success(request.Id);

        }
        catch (Exception ex)
        {
            return Result<DefaultIdType>.Fail(ex.ToString());
        }
    }
}
