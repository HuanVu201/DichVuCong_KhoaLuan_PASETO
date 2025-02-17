using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Commands;
public class DanhGiaHaiLongHccCommandHandler : ICommandHandler<DanhGiaHaiLongHccCommand>
{
    private readonly ICurrentUser _currentUser;
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    public DanhGiaHaiLongHccCommandHandler(IDapperRepository dapperRepository, ICurrentUser currentUser, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _mediator = mediator;
    }

    public async Task<Result> Handle(DanhGiaHaiLongHccCommand request, CancellationToken cancellationToken)
    {
        var userId = _currentUser.GetUserId();

        string sqlQueryHoSo = @"Select Top (1) MaHoSo
                              FROM [Business].[HoSos] 
                              WHERE CreatedBy = @CreatedBy AND DeletedOn is null AND CreatedOn >= DATEADD(MINUTE, -10, GETDATE())
                              ORDER BY CreatedOn DESC";

        string sqlQueryDanhGia = @"Select Top (1) MaHoSo, DanhGia
                              FROM [Business].[DanhGiaHaiLongs]
                              WHERE CreatedBy = @CreatedBy and MaHoSo = @MaHoSo";

        var resHoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo>(sqlQueryHoSo, new
        {
            CreatedBy = userId
        });
        if (resHoSo == null)
            return (Result)Result.Fail(message: "Không có thông tin hồ sơ!");

        var resDGHL = await _dapperRepository.QueryFirstOrDefaultAsync<DanhGiaHaiLong>(sqlQueryDanhGia, new
        {
            CreatedBy = userId,
            MaHoSo = resHoSo.MaHoSo
        });

        if (resDGHL == null)
        {
            var resAddDGHL = await _mediator.Send(new AddDanhGiaHaiLongCommand()
            {
                MaHoSo = resHoSo.MaHoSo,
                LoaiDanhGia = "CongDan",
                NguoiDanhGia = userId.ToString(),
                ThoiGianDanhGia = DateTime.Now,
                NoiDungDanhGia = "Công dân đánh giá cán bộ tại quầy",
                DanhGia = request.DanhGia
            });
            if (resAddDGHL.Succeeded)
                return (Result)Result.Success(message: "Đánh giá cán bộ thành công!");
            else
                return (Result)Result.Fail(message: "Có lỗi trong quá trình xử lý đánh giá!");
        }
        else
        {
            return (Result)Result.Fail(message: "Hồ sơ đã được đánh giá!");
        }
    }
}
