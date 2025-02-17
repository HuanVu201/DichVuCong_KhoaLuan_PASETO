using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.ActionApp.Commands;
using TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp.Commands;



public class AddDanhGiaCoQuanCommandHandler : ICommandHandler<AddDanhGiaCoQuanCommand, Guid>
{
    private readonly IRepository<DanhGiaCoQuan> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;
    

    public AddDanhGiaCoQuanCommandHandler(IRepository<DanhGiaCoQuan> repositoryWithEvents, IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
        _repositoryWithEvents = repositoryWithEvents;
    }

    

    public async Task<Result<DefaultIdType>> Handle(AddDanhGiaCoQuanCommand request, CancellationToken cancellationToken)
    {
        try
        {
            string sql = "Select * from [Catalog].[Groups] where DeletedOn is null";
            var groups = await _dapperRepository.QueryAsync<GroupDto>(sql);
            DateTime currentDate = DateTime.Now;
            int currentYear = currentDate.Year;
            int currentQuarter = (currentDate.Month - 1) / 3 + 1;
            List<DanhGiaCoQuan> listDanhGiaCoQuans = new List<DanhGiaCoQuan>();
            int index = 0;
            foreach (var group in groups)
            {
                index++;
                request.DonVi = group.GroupCode ?? null;
                request.DonViText = group.GroupName ?? null;
                request.MaNhomCha = group.OfGroupCode ?? null;
                request.MaNhomChaText = group.OfGroupName ?? null;
                var danhGiaCoQuan = DanhGiaCoQuan.Create(request.DonVi, request.DonViText, request.MaNhomCha, request.MaNhomChaText, request.DongBo, currentQuarter.ToString(), currentYear.ToString(),"0",
                                                 "0", "0", "0", "0", "0", "0", "0", "0",
                                                 request.SoPhieu, request.TongDiem, request.PhongBan, request.LyDoTruDiem, request.MaHoSo, request.HinhThucDanhGia, request.MucDoRHL, request.MucDoHL,
                                                 request.MucDoBT, request.MucDoKHL, request.MucDoRKHL, request.ThamDinhTraLoi1,request.ThamDinhTraLoi2, request.ThamDinhTraLoi3, request.ThamDinhTraLoi4,
                                                 request.ThamDinhTraLoi5, request.ThamDinhTraLoi6, request.ThamDinhTraLoi7,request.ThamDinhTraLoi8, request.ThamDinhTraLoi9, request.XepLoai, request.XepHang, request.TongDonViCon,
                                                 "0", "0", request.ThamDinhTraLoi10, request.ThamDinhTraLoi11);

               // listDanhGiaCoQuans.Add(danhGiaCoQuan);
                //   await _repositoryWithEvents.AddAsync(danhGiaCoQuan, cancellationToken);
                var insertedDanhGiaCoQuan = await _dapperRepository.InsertEntityAsync<DanhGiaCoQuan>(danhGiaCoQuan, SchemaNames.Business + "." + TableNames.DanhGiaCoQuans);

            }

            return Result<Guid>.Success("Success");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return Result<Guid>.Fail($"An error occurred: {ex.Message}");
        }
      

    }
}
