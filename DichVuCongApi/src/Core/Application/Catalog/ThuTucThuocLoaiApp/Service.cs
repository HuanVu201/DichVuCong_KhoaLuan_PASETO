using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using System.Net.Http;
using Newtonsoft.Json;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Commands;
using static TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Service;
using Newtonsoft.Json.Linq;
using System.Text.Json.Nodes;
using System.Runtime.InteropServices.JavaScript;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp;

public class Service
{
    public class ImportThuTucThuocLoaiServiceCommand : ICommand<Guid>
    {
        public string message { get; set; }
        public string urlAPI_ThuTucThuocLoai { get; set; }
        //urlAPI_ThuTucThuocLoai: https://apidvc.thanhhoa.gov.vn/KetNoiMotCuaQuocGia/LayDanhMucThuTucThuocLoai
    }

    public class ImportServiceCommandHandler : ICommandHandler<ImportThuTucThuocLoaiServiceCommand, Guid>
    {
        private readonly IRepositoryWithEvents<ThuTucThuocLoai> _repositoryWithEvents;
        public ImportServiceCommandHandler(IRepositoryWithEvents<ThuTucThuocLoai> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

        public async Task<Result<DefaultIdType>> Handle(ImportThuTucThuocLoaiServiceCommand request, CancellationToken cancellationToken)
        {
            using (var httpClient = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = await httpClient.GetAsync(request.urlAPI_ThuTucThuocLoai);
                    string jsonContent = await response.Content.ReadAsStringAsync();
                    var results = JsonConvert.DeserializeObject<ImportThuTucThuocLoaiServiceCommand>(jsonContent);
                    JObject jsonObject = JObject.Parse(results.message);
                    JArray arr = (JArray)jsonObject["result"];
                    var linhVucs = new List<ThuTucThuocLoai>();

                    //foreach (var item in arr)
                    //{
                    //    var linhVuc = ThuTucThuocLoai.Create(item["TENLINHVUC"].ToString(), item["MALINHVUC"].ToString(), item["MANGANH"].ToString(), true, 0, 0, 0, 0);
                    //    linhVucs.Add(linhVuc);
                    //}

                    await _repositoryWithEvents.AddRangeAsync(linhVucs, cancellationToken);
                    Console.WriteLine("\nImport ThuTucThuocLoai Success!");

                    return Result<Guid>.Success();
                }
                catch (HttpRequestException ex)
                {
                    Console.WriteLine("\n Exception Caught!");
                    Console.WriteLine("Message Import handle :{0} ", ex.Message);
                }
            }

            return null;
        }
    }
}


