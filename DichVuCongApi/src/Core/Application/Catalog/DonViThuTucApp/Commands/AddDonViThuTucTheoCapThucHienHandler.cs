using Mapster;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.CoQuanThucHienThuTuc;
using TD.DichVuCongApi.Domain.Catalog;


namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;
public class AddDonViThuTucTheoCapThucHienHandler : ICommandHandler<AddDonViThuTucTheoCapThucHien>
{

    private readonly IMediator _mediator;
    private readonly IRepositoryWithEvents<DonViThuTuc> _repositoryWithEvents;
    public AddDonViThuTucTheoCapThucHienHandler(IMediator mediator, IRepositoryWithEvents<DonViThuTuc> repositoryWithEvents)
    {
      
          _repositoryWithEvents = repositoryWithEvents;
        _mediator = mediator;
    }
    public async Task<Result> Handle(AddDonViThuTucTheoCapThucHien request, CancellationToken cancellationToken)
    {
       
        
        List<DonViThuTuc> addRequest = new List<DonViThuTuc>();
        List<string> quanHuyens = new List<string>();
        List<string> xaPhuongs = new List<string>();
        SearchPortalGroupQuery searchGroups = new SearchPortalGroupQuery();
        searchGroups.Catalogs = new List<string>();
        searchGroups.PageNumber = 1;
        searchGroups.PageSize = 1000;
        searchGroups.Type = GroupContants.DON_VI;
        searchGroups.Catalogs.Add(GroupContants.QUAN_HUYEN);
        searchGroups.Catalogs.Add(GroupContants.XA_PHUONG);
        var groups = await _mediator.Send(searchGroups);
        if (groups != null && groups.Data != null)
        {
            quanHuyens = groups.Data.Where(t => t.Catalog == GroupContants.QUAN_HUYEN).Select(t => t.GroupCode).ToList();
            xaPhuongs = groups.Data.Where(t => t.Catalog == GroupContants.XA_PHUONG).Select(t => t.GroupCode).ToList();
        }
       foreach(var donViThucHien in request.data)
        {
            if (donViThucHien.CapThucHien == GroupContants.QUAN_HUYEN)
            {
                foreach(string quanHuyen in quanHuyens)
                {
                    var donViThuTuc = DonViThuTuc.Create(donViThucHien.MaTTHC, quanHuyen, null, donViThucHien.MucDo, null, null, null, null);
                    addRequest.Add(donViThuTuc);
                }
            }else
                 if (donViThucHien.CapThucHien == GroupContants.XA_PHUONG)
            {
                foreach (string xaPhuong in xaPhuongs)
                {
                    var donViThuTuc = DonViThuTuc.Create(donViThucHien.MaTTHC, xaPhuong, null, donViThucHien.MucDo, null, null, null, null);
                    addRequest.Add(donViThuTuc);
                }
            }
            if(!string.IsNullOrEmpty(donViThucHien.DonViThucHienId))
            {
                var donViThuTuc = DonViThuTuc.Create(donViThucHien.MaTTHC, donViThucHien.DonViThucHienId, null, donViThucHien.MucDo, null, null, null, null);
                addRequest.Add(donViThuTuc);
            }
        }
        await _repositoryWithEvents.AddRangeAsync(addRequest, cancellationToken);
        return (Result)Result.Success();
    }
}
