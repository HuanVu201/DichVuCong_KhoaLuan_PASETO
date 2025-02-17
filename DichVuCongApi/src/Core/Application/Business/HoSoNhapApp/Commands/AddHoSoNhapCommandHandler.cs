using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp.Validate;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Classes;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Application.Business.HoSoNhapApp.Dtos;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;

namespace TD.DichVuCongApi.Application.Business.HoSoNhapApp.Commands;
public class AddHoSoNhapCommandHandler : RemoveFileWithJobHandler, ICommandHandler<AddHoSoNhapCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepositoryWithEvents<ThanhPhanHoSoNhap> _repositoryThanhPhanHoSo;
    private readonly IRepositoryWithEvents<HoSoNhap> _repositoryHoSo;
    private readonly IDapperRepository _dapperRepository;
    private readonly IEMCService _eMCService;
    private readonly IZaloService _zaloService;
    private readonly IReadRepository<NgayNghi> _repositoryNgayNghi;
    private readonly IJobService _jobService;
    private readonly bool usingZaloTemplate = false;
    private readonly IMediator _mediator;
    private readonly IInjectConfiguration _configuration;
    private readonly IEventPublisher _publisher;
    private readonly IUserService _user;

    public AddHoSoNhapCommandHandler(IEventPublisher publisher, IJobService jobService, IReadRepository<NgayNghi> repositoryNgayNghi, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IRepositoryWithEvents<ThanhPhanHoSoNhap> repositoryThanhPhanHoSo, IRepositoryWithEvents<HoSoNhap> repositoryHoSo, IDapperRepository dapperRepository, IEMCService eMCService, IInjectConfiguration configuration, IZaloService zaloService, IMediator mediator, IUserService user)
    {
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _repositoryHoSo = repositoryHoSo;
        _dapperRepository = dapperRepository;
        _eMCService = eMCService;
        _repositoryNgayNghi = repositoryNgayNghi;
        _jobService = jobService;
        usingZaloTemplate = configuration.GetValue<bool>("ZaloSetting:usingTemplate");
        _zaloService = zaloService;
        _configuration = configuration;
        _mediator = mediator;
        _user = user;
        _publisher = publisher;
    }

    public async Task<Result<DefaultIdType>> Handle(AddHoSoNhapCommand request, CancellationToken cancellationToken)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var user = await _user.GetCurrentUserAsync(cancellationToken);
        var sqlGetNguoiTiepNhan = hoSoQueryBuilder.select.GetNguoiTiepNhanSql;
        var sql = $@"SELECT COUNT(Id) as SoLuongHoSoNhap From {SchemaNames.Business}.{TableNames.HoSoNhaps} where NguoiGui = @NguoiGui and DeletedOn is null";

        //using (var transactionScope = new TransactionScope(TransactionScopeOption.Suppress, new TransactionOptions
        //{
        //    IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted,
        //}, TransactionScopeAsyncFlowOption.Enabled))
        //{
            try
            {

                var nguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<TaiKhoanNguoiTiepNhan_Select>(sqlGetNguoiTiepNhan, new
                {
                    request.MaTTHC,
                    request.DonViId,
                });
                var hoSoNhaps = await _dapperRepository.QueryFirstOrDefaultAsync<CountHoSoNhapDto>(sql, new
                {
                    NguoiGui = user.SoDinhDanh,
                });
                var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken: cancellationToken);
            GroupDto groupInfo = null;

                string donViQuanLy = request.DonViId;
                if (!string.IsNullOrEmpty(request.DonViId))
                {
                    var groupsInfo = await _mediator.Send(new GetByGroupCodeQuery(request.DonViId));
                    if (groupsInfo != null) groupInfo = groupsInfo.Data;
                }

                if (groupInfo != null && !string.IsNullOrEmpty(groupInfo?.DonViQuanLy))
                {
                    donViQuanLy = groupInfo.DonViQuanLy;
                }
                //var caculateTime = new CaculateTime(_configuration);
                //var ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, 8, "Ngày làm việc");
                if (hoSoNhaps.SoLuongHoSoNhap >= 5)
                {
                    throw new Exception("Ông/bà đã lưu nháp quá 05 hồ sơ, đề nghị Ông/bà xoá hồ sơ lưu nháp không cần thiết để tiếp tục");
                }
                var hoSoNopTrucTuyen = new HoSoNhap(request.DonViId, request.LoaiDoiTuong, request.ChuHoSo, request.SoDienThoaiChuHoSo, request.EmailChuHoSo, request.SoGiayToChuHoSo,
                                    request.LoaiGiayToChuHoSo, request.NgaySinhChuHoSo, request.TinhThanhChuHoSo, request.QuanHuyenChuHoSo,
                                    request.XaPhuongChuHoSo, request.DiaChiChuHoSo, request.NguoiGui, request.MaTTHC, request.MaTruongHop,
                                    request.TenTruongHop, request.TruongHopId, request.EFormData, request.DangKyNhanHoSoQuaBCCIData, nguoiTiepNhan.TaiKhoanTiepNhan,
                                    request.TrichYeuHoSo, request.UyQuyen, request.NguoiUyQuyen, request.SoDienThoaiNguoiUyQuyen, request.EmailNguoiUyQuyen, request.SoGiayToNguoiUyQuyen,
                                    request.TinhThanhNguoiUyQuyen, request.QuanHuyenNguoiUyQuyen, request.XaPhuongNguoiUyQuyen, request.DiaChiNguoiUyQuyen, request.MucDo, request.HinhThucTra, request.LaHoSoChungThuc, donViQuanLy);
                hoSoNopTrucTuyen.SetNotificationOn();
                await _repositoryHoSo.AddAsync(hoSoNopTrucTuyen);
                if (request.ThanhPhanHoSos.Count > 0)
                {
                    var thanhPhanHoSos = new List<ThanhPhanHoSoNhap>();
                    request.ThanhPhanHoSos.ForEach(item =>
                    {
                        var thanhPhanHoSo = new ThanhPhanHoSoNhap(item.Ten, hoSoNopTrucTuyen.Id.ToString(), item.SoBanChinh,
                            item.SoBanSao, item.MaGiayToKhoQuocGia, item.DinhKem, item.NhanBanGiay, item.MaGiayToSoHoa, item.TrangThaiSoHoa,
                            item.MaGiayTo, item.DuocLayTuKhoDMQuocGia, item.MaKetQuaThayThe, item.SoTrang, item.SoBanGiay, item.KyDienTuBanGiay, item.TrangThaiDuyet);
                        thanhPhanHoSos.Add(thanhPhanHoSo);
                    });

                    await _repositoryThanhPhanHoSo.AddRangeAsync(thanhPhanHoSos);
                }
                //await DeleteFiles(_jobService, request.RemoveFiles);
                //transactionScope.Complete();
                return Result<DefaultIdType>.Success(data: hoSoNopTrucTuyen.Id);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        //}
    }

}
