using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using System.Net.Http;
using Newtonsoft.Json;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Application.Catalog.LinhVucApp.Commands;
using static TD.DichVuCongApi.Application.Catalog.LinhVucApp.Service;
using Newtonsoft.Json.Linq;
using System.Text.Json.Nodes;
using System.Runtime.InteropServices.JavaScript;

namespace TD.DichVuCongApi.Application.Catalog.LinhVucApp;

public class Service
{
    public class ImportLinhVucServiceCommand : ICommand<Guid>
    {
        public string message { get; set; }
        public string urlAPI_LinhVuc { get; set; }
        //urlAPI_LinhVuc: https://apidvc.thanhhoa.gov.vn/KetNoiMotCuaQuocGia/LayDanhMucLinhVuc
    }

    public class ImportServiceCommandHandler : ICommandHandler<ImportLinhVucServiceCommand, Guid>
    {
        private readonly IRepositoryWithEvents<LinhVuc> _repositoryWithEvents;
        public ImportServiceCommandHandler(IRepositoryWithEvents<LinhVuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

        public async Task<Result<DefaultIdType>> Handle(ImportLinhVucServiceCommand request, CancellationToken cancellationToken)
        {
            using (var httpClient = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = await httpClient.GetAsync(request.urlAPI_LinhVuc);
                    string jsonContent = await response.Content.ReadAsStringAsync();
                    var results = JsonConvert.DeserializeObject<ImportLinhVucServiceCommand>(jsonContent);
                    JObject jsonObject = JObject.Parse(results.message);
                    JArray arr = (JArray)jsonObject["result"];
                    var linhVucs = new List<LinhVuc>();

                    foreach (var item in arr)
                    {
                        var linhVuc = LinhVuc.Create(item["TENLINHVUC"].ToString(), item["MALINHVUC"].ToString(), item["MANGANH"].ToString(), true, 0, 0, 0, 0);
                        linhVucs.Add(linhVuc);
                    }

                    await _repositoryWithEvents.AddRangeAsync(linhVucs, cancellationToken);
                    Console.WriteLine("\nImport LinhVuc Success!");

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


