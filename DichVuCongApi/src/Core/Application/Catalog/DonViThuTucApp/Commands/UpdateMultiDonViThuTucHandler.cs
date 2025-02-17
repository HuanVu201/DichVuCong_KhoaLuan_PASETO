
using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Application.Catalog.DonViThuTucApp;
using TD.DichVuCongApi.Application.Catalog.ThayDoiMucDoThuTucApp.Commands;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Commands;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;
public class UpdateMultiDonViThuTucHandler : ICommandHandler<UpdateMultiDonViThuTuc>
{
    private readonly string donViThuTucTableName = "Catalog.DonViThuTucs";
    private readonly IRepositoryWithEvents<DonViThuTuc> _repositoryWithEvents;
    private readonly IRepositoryWithEvents<ThayDoiMucDoThuTuc> _repositoryWithEventsThayDoiMucDoThuTuc;
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
 
    public UpdateMultiDonViThuTucHandler(IRepositoryWithEvents<DonViThuTuc> repositoryWithEvents, IDapperRepository dapperRepository, IMediator mediator, IRepositoryWithEvents<ThayDoiMucDoThuTuc> repositoryWithEventsThayDoiMucDoThuTuc)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _repositoryWithEventsThayDoiMucDoThuTuc = repositoryWithEventsThayDoiMucDoThuTuc;
    }
    public async Task<Result> Handle(UpdateMultiDonViThuTuc request, CancellationToken cancellationToken)
    {
        List<DonViThuTuc> updateData = new List<DonViThuTuc>();
        if (request.Ids == null) throw new ArgumentNullException(nameof(request.Ids));
        if(request.Ids.Count == 0) throw new ArgumentNullException(nameof(request.Ids));
        var ids = string.Join(",", request.Ids.Select(t => $"'{t}'"));
        var sql = $"SELECT {donViThuTucTableName}.* FROM {donViThuTucTableName} " +
           $"WHERE {donViThuTucTableName}.Id IN ({ids}) " +
           $"AND {donViThuTucTableName}.DeletedOn is null";
        var donViThuTucs = await _dapperRepository.QueryAsync<DonViThuTucDto>(sql);

        foreach (var donViThuTuc in donViThuTucs)
        {
            DateTime thoiGianThayDoi = DateTime.Now;

            if (donViThuTuc.MucDo != request.MucDo)
            {
                AddThayDoiThuTucCommand addThayDoiMucDoThuTuc = new AddThayDoiThuTucCommand();
                addThayDoiMucDoThuTuc.MucDoCu = donViThuTuc.MucDo;
                addThayDoiMucDoThuTuc.MucDoMoi = request.MucDo;
                addThayDoiMucDoThuTuc.ThuTuc = donViThuTuc.MaTTHC;
                addThayDoiMucDoThuTuc.DonVi = donViThuTuc.DonViId;
                addThayDoiMucDoThuTuc.ThoiGian = thoiGianThayDoi;
                addThayDoiMucDoThuTuc.NguoiCapNhat = donViThuTuc.LastModifiedBy.ToString();
                var thayDoiMucDoThuTuc = ThayDoiMucDoThuTuc.Create(donViThuTuc.MaTTHC, donViThuTuc.DonViId, thoiGianThayDoi, donViThuTuc.MucDo, request.MucDo, donViThuTuc.LastModifiedBy.ToString());
                await _repositoryWithEventsThayDoiMucDoThuTuc.AddAsync(thayDoiMucDoThuTuc, cancellationToken);
            }
            DonViThuTuc tmp = donViThuTuc.Adapt<DonViThuTuc>();
            var nguoiTiepNhanId = string.Empty;
            if(request.LaBoSungNguoiTiepNhan == true && !string.IsNullOrEmpty(donViThuTuc.NguoiTiepNhanId) && !string.IsNullOrEmpty(request.NguoiTiepNhanId))
            {
                var nguoiTiepNhanIds = donViThuTuc.NguoiTiepNhanId.Split("##").ToList();
                var reqNguoiTiepNhanIds = request.NguoiTiepNhanId.Split("##").ToList();
                foreach (var i in reqNguoiTiepNhanIds)
                {
                    if (!nguoiTiepNhanIds.Contains(i)) nguoiTiepNhanIds.Add(i);
                }
                nguoiTiepNhanId = string.Join("##",nguoiTiepNhanIds);
               
            }
            else if (request.LaBoNguoiTiepNhan == true && !string.IsNullOrEmpty(donViThuTuc.NguoiTiepNhanId) && !string.IsNullOrEmpty(request.NguoiTiepNhanId))
            {
                var nguoiTiepNhanIds = donViThuTuc.NguoiTiepNhanId.Split("##").ToList();
                var reqNguoiTiepNhanIds = request.NguoiTiepNhanId.Split("##").ToList();
                foreach (var i in reqNguoiTiepNhanIds)
                {
                    if (nguoiTiepNhanIds.Contains(i)) nguoiTiepNhanIds.Remove(i);
                }
                nguoiTiepNhanId = string.Join("##", nguoiTiepNhanIds);

            }
            else
            {
                nguoiTiepNhanId = request.NguoiTiepNhanId != null ? request.NguoiTiepNhanId : donViThuTuc.NguoiTiepNhanId;
            }
            tmp.Update(
                donViThuTuc.MaTTHC,
                donViThuTuc.DonViId,
                nguoiTiepNhanId,
                request.MucDo != null ? request.MucDo : donViThuTuc.MucDo,
                donViThuTuc.UrlRedirect,
                donViThuTuc.MaSoThue,
                donViThuTuc.DonViMaSoThue,
                request.TaiKhoanThuHuongId != null ? request.TaiKhoanThuHuongId.Value : donViThuTuc.TaiKhoanThuHuongId
                );
            updateData.Add(tmp);
        }
        await _repositoryWithEvents.UpdateRangeAsync(updateData, cancellationToken);
        // Update mức độ thủ tục
        if (!string.IsNullOrEmpty(request.MucDo))
        {
            List<string> maTTHCs = new List<string>();
            foreach(var donViThuTuc in donViThuTucs)
            {
                if (!maTTHCs.Contains(donViThuTuc.MaTTHC)) maTTHCs.Add(donViThuTuc.MaTTHC);
            }
            UpdateMucDoMultiThuTuc updateMucDo = new UpdateMucDoMultiThuTuc();
            updateMucDo.MucDo = request.MucDo;
            updateMucDo.MaTTHCs = maTTHCs;
            var resUpdate = await _mediator.Send(updateMucDo);
        }
        return Result<string>.Success("success");
    }
}
