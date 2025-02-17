using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Application.Catalog.DonViThuTucApp;
using TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp;
using TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp.Queries;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Commands;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;
public class AddMultiDonViThuTucHandler : ICommandHandler<AddMultiDonViThuTuc>
{
    private readonly string donViThuTucTableName = "Catalog.DonViThuTucs";
    private readonly IRepositoryWithEvents<DonViThuTuc> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    public AddMultiDonViThuTucHandler(IDapperRepository dapperRepository, IRepositoryWithEvents<DonViThuTuc> repositoryWithEvents, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _repositoryWithEvents = repositoryWithEvents;
        _mediator = mediator;
    }
    public async Task<Result> Handle(AddMultiDonViThuTuc request, CancellationToken cancellationToken)
    {
        List<DonViThuTuc> addRequest = new List<DonViThuTuc>();
        string nguoiTiepNhanId = request.NguoiTiepNhanId;
        if (request.IdDonVis.Count == 0) throw new ArgumentNullException(nameof(request.IdDonVis));
        if (request.maTTHCs.Count == 0) throw new ArgumentNullException(nameof(request.maTTHCs));
        var donVis = string.Join(",", request.IdDonVis.Select(t=>$"'{t}'"));
        var thuTucs = string.Join(",", request.maTTHCs.Select(t => $"'{t}'"));
        // Check exists Vi ThuTuc
        var sql = $"SELECT DonViId, MaTTHC FROM {donViThuTucTableName} " +
            $"WHERE {donViThuTucTableName}.DonViId IN ({donVis}) " +
            $"AND {donViThuTucTableName}.MaTTHC IN ({thuTucs}) " +
            $"AND {donViThuTucTableName}.DeletedOn is null";
        var donViThuTucs = await _dapperRepository.QueryAsync<DonViThuTucDto>(sql);
        // get userBy NhomNguoiDungs
        List<NguoiDungNhomNguoiDungDto> nguoiDungs = new List<NguoiDungNhomNguoiDungDto>();
        if(request.nhomNguoiDungs != null && request.nhomNguoiDungs.Count >0)
        {
            SearchNguoiDungNhomNguoiDungQuery searchNguoiDungs = new SearchNguoiDungNhomNguoiDungQuery();
            searchNguoiDungs.PageNumber = 1;
            searchNguoiDungs.PageSize = 1000;
            searchNguoiDungs.NhomNguoiDungIds = request.nhomNguoiDungs;
            var nguoiDungsDetail = await _mediator.Send(searchNguoiDungs);
            if(nguoiDungsDetail.Data != null)
            {
                nguoiDungs = nguoiDungsDetail.Data;
            }
        }
        foreach(var donVi in request.IdDonVis)
        {
            foreach(var thuTuc in request.maTTHCs)
            {
                if(donViThuTucs != null)
                {
                    var tmpDonViThuTucs = donViThuTucs.Where(t => t.DonViId == donVi && t.MaTTHC == thuTuc).FirstOrDefault();
                    if (tmpDonViThuTucs != null) continue;
                } 
                if(nguoiDungs != null && nguoiDungs.Count > 0)
                {
                    var tmpNguoiDungs = nguoiDungs.Where(t=> t.OfficeCode == donVi).Select(t=>t.UserId).ToList();
                    string tmpNguoiTiepNhan = string.Join("##", tmpNguoiDungs);
                    nguoiTiepNhanId = !string.IsNullOrEmpty(tmpNguoiTiepNhan) ? tmpNguoiTiepNhan : request.NguoiTiepNhanId;
                }
                addRequest.Add(new DonViThuTuc(thuTuc, donVi, nguoiTiepNhanId, request.MucDo, request.UrlRedirect, request.MaSoThue, request.DonViMaSoThue, request.TaiKhoanThuHuongId));
            }
        }
        if (addRequest.Count > 0)
        {
            var result = await _repositoryWithEvents.AddRangeAsync(addRequest, cancellationToken);
        }
        // Update mức độ thủ tục
        if (!string.IsNullOrEmpty(request.MucDo))
        {
            UpdateMucDoMultiThuTuc updateMucDo = new UpdateMucDoMultiThuTuc();
            updateMucDo.MucDo = request.MucDo;
            updateMucDo.MaTTHCs = request.maTTHCs;
            updateMucDo.DonViThuTucs = request.IdDonVis;
            var resUpdate = await _mediator.Send(updateMucDo);
        }

        return Result<string>.Success("success");
    }
}
