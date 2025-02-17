using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp;
using TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp.Commands;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Commands;
public class AddPhieuKhaoSatCommandHandler : ICommandHandler<AddPhieuKhaoSatCommand, Guid>
{
    private readonly IRepositoryWithEvents<PhieuKhaoSat> _repositoryWithEvents;
    private readonly IRepositoryWithEvents<DanhGiaCoQuan> _repositoryWithEventsDanhGiaCoQuan;
    private readonly IRepositoryWithEvents<Group> _repositoryWithEventsGroup;

    private readonly IDapperRepository _dapperRepository;

    public AddPhieuKhaoSatCommandHandler(IRepositoryWithEvents<PhieuKhaoSat> repositoryWithEvents, IDapperRepository dapperRepository, IRepositoryWithEvents<DanhGiaCoQuan> repositoryWithEventsDanhGiaCoQuan, IRepositoryWithEvents<Group> repositoryWithEventsGroup)
    {
        _dapperRepository = dapperRepository;
        _repositoryWithEvents = repositoryWithEvents;
        _repositoryWithEventsDanhGiaCoQuan = repositoryWithEventsDanhGiaCoQuan;
        _repositoryWithEventsGroup = _repositoryWithEventsGroup;
    }

    public async Task<Result<DefaultIdType>> Handle(AddPhieuKhaoSatCommand request, CancellationToken cancellationToken)
    {

        if (!string.IsNullOrEmpty(request.MaHoSo))
        {
            string sql = @"SELECT MaHoSo FROM  Business.PhieuKhaoSats WHERE MaHoSo = @MaHoSo";
            var data = await _dapperRepository.QueryFirstOrDefaultAsync<PhieuKhaoSat>(sql, request);
            if (data != null)
            {
                throw new NotFoundException($"Mã hồ sơ {request.MaHoSo} đã được đánh giá, không thể đánh giá lại");
            }
            else
            {
                var phieuKhaoSatAdd = PhieuKhaoSat.Create(request.donVi, request.donViText, request.traLoi1, request.traLoi2, request.traLoi3, request.traLoi4, request.traLoi5, request.traLoi6, request.traLoi7, request.traLoi8, request.traLoi9, request.MaHoSo, request.hinhThucDanhGia, request.traLoi11 == "2" ?  "1" : "0", request.traLoi11 == "1" ? "1" : "0", request.mucDoBT, request.traLoi11 == "0" ? "1" : "0", request.mucDoRKHL, request.NgayTao, request.nguoiNhapDanhGia, request.nguoiNhapDanhGiaText, request.loaiNhom, request.phongBan, request.phongBanText, request.hoanThanhDanhGia,request.tongDiem,request.xepLoai,request.traLoi10,request.traLoi11);
                await _repositoryWithEvents.AddAsync(phieuKhaoSatAdd, cancellationToken);
                UpdateDanhGiaCoQuanCommand updateDanhGiaCoQuan = new UpdateDanhGiaCoQuanCommand();
                
                return Result<Guid>.Success(phieuKhaoSatAdd.Id);
            }
        }
        else
        {
            throw new NotFoundException($"Người dùng vui lòng chọn mã hồ sơ để đánh giá");
        }
    }




}
