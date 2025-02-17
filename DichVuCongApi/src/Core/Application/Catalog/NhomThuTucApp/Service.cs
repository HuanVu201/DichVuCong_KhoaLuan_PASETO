using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using System.Net.Http;
using Newtonsoft.Json;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Application.Catalog.NhomThuTucApp.Commands;
using static TD.DichVuCongApi.Application.Catalog.NhomThuTucApp.Service;
using Newtonsoft.Json.Linq;
using System.Text.Json.Nodes;
using System.Runtime.InteropServices.JavaScript;

namespace TD.DichVuCongApi.Application.Catalog.NhomThuTucApp;

public class Service
{
    public class ImportNhomThuTucServiceCommand : ICommand<Guid>
    {
        public string message { get; set; }
        public string urlAPI_NhomThuTuc { get; set; }
        //urlAPI_NhomThuTuc: https://apidvc.thanhhoa.gov.vn/KetNoiMotCuaQuocGia/LayDanhMucNhomThuTuc
    }

    public class ImportServiceCommandHandler : ICommandHandler<ImportNhomThuTucServiceCommand, Guid>
    {
        private readonly IRepositoryWithEvents<NhomThuTuc> _repositoryWithEvents;
        public ImportServiceCommandHandler(IRepositoryWithEvents<NhomThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

        public async Task<Result<DefaultIdType>> Handle(ImportNhomThuTucServiceCommand request, CancellationToken cancellationToken)
        {
            using (var httpClient = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = await httpClient.GetAsync(request.urlAPI_NhomThuTuc);
                    string jsonContent = await response.Content.ReadAsStringAsync();
                    var results = JsonConvert.DeserializeObject<ImportNhomThuTucServiceCommand>(jsonContent);
                    JObject jsonObject = JObject.Parse(results.message);
                    JArray arr = (JArray)jsonObject["result"];
                    var linhVucs = new List<NhomThuTuc>();

                    //foreach (var item in arr)
                    //{
                    //    var linhVuc = NhomThuTuc.Create(item["TENLINHVUC"].ToString(), item["MALINHVUC"].ToString(), item["MANGANH"].ToString(), true, 0, 0, 0, 0);
                    //    linhVucs.Add(linhVuc);
                    //}

                    await _repositoryWithEvents.AddRangeAsync(linhVucs, cancellationToken);
                    Console.WriteLine("\nImport NhomThuTuc Success!");

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


