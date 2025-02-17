using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp.Commands;
using TD.DichVuCongApi.Application.Catalog.NguoiDungNhomNguoiDungApp.Queries;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.NguoiDungNhomNguoiDungApp.Commands;
internal class AddListNguoiDungToNhomNguoiDungHandler : ICommandHandler<AddListNguoiDungToNhomNguoiDung>
{
    private  IRepositoryWithEvents<NguoiDungNhomNguoiDung> _repositoryWithEvents;
    private readonly IReadRepository<NguoiDungNhomNguoiDung> _readRepository;
    public AddListNguoiDungToNhomNguoiDungHandler(IRepositoryWithEvents<NguoiDungNhomNguoiDung> repositoryWithEvents, IReadRepository<NguoiDungNhomNguoiDung> readRepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _readRepository= readRepository;
    }
    public async Task<Result> Handle(AddListNguoiDungToNhomNguoiDung request, CancellationToken cancellationToken)
    {
       
        List<object> resList = new List<object>();
        if (request.TaiKhoans == null | string.IsNullOrEmpty(request.NhomNguoiDungId)) throw new ArgumentNullException(nameof(request));
        List<NguoiDungNhomNguoiDung> existNguoiDungNhomNguoidungs = _readRepository.ListAsync(new GetNguoiDungNhomNguoiDungByNhomNguoiDungIdSpec(request.NhomNguoiDungId), cancellationToken).Result;
        List<string> exitsTaiKhoans = new List<string>();
        existNguoiDungNhomNguoidungs.ForEach(item => exitsTaiKhoans.Add(item.TaiKhoan));
        List<NguoiDungNhomNguoiDung> nguoiDungNhomNguoiDungs = new List<NguoiDungNhomNguoiDung>();
        request.TaiKhoans.ForEach(taiKhoan =>
        {
            if ( exitsTaiKhoans.Count==0 | exitsTaiKhoans.IndexOf(taiKhoan) ==-1)
                nguoiDungNhomNguoiDungs.Add(new NguoiDungNhomNguoiDung(taiKhoan, request.NhomNguoiDungId));
        });
        try
        {
            await _repositoryWithEvents.AddRangeAsync(nguoiDungNhomNguoiDungs, cancellationToken);
            await _repositoryWithEvents.SaveChangesAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
        }
       
        return (Result)Result.Success();
    }

}
