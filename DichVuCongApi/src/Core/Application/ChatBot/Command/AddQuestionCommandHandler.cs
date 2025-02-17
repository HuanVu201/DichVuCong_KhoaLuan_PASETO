using Newtonsoft.Json.Linq;
using System;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp;
using TD.DichVuCongApi.Application.Catalog.FileApp.Commands;
using TD.DichVuCongApi.Application.Catalog.ThongBaoApp.Commands;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Commands;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;
using System.Text.Json.Serialization;
using Newtonsoft.Json;


namespace TD.DichVuCongApi.Application.ChatBot.Command;

public class GoiTinThuTucQG
{
    public string ID { get; set; }
    public string MaTTHC { get; set; } = string.Empty;
    public string TENTTHC { get; set; } = string.Empty;
    public string MACOQUANCONGBO { get; set; } = string.Empty;
    public string LOAITTHC { get; set; } = string.Empty;
    public string MOTADOITUONGTHUCHIEN { get; set; } = string.Empty;
    public string DIACHITIEPNHAN { get; set; } = string.Empty;
    public string YEUCAU { get; set; } = string.Empty;
    public string TUKHOA { get; set; } = string.Empty;
    public string IDQUYETDINHCONGBO { get; set; } = string.Empty;
    public string TRANGTHAI { get; set; } = string.Empty;
    public string MOTACOQUANTHUCHIEN { get; set; } = string.Empty;
    public string MOTACOQUANTHAMQUYEN { get; set; } = string.Empty;
    public string MOTA { get; set; } = string.Empty;
    public string TRINHTUTHUCHIEN { get; set; } = string.Empty;
    public string PHILEPHI { get; set; } = string.Empty;

    public List<CapThucHien> CAPTHUCHIEN { get; set; }
    public List<LinhVucThucHien> LINHVUCTHUCHIEN { get; set; }
    public string CACHTHUCTHUCHIEN { get; set; } = string.Empty;
    public List<DoiTuongThucHien> DOITUONGTHUCHIEN { get; set; }
    public string THANHPHANHOSO { get; set; } = string.Empty;
    public List<KetQuaThucHien> KETQUATHUCHIEN { get; set; }
    public string CANCUPHAPLY { get; set; } = string.Empty;
    public List<string> TTHCLIENQUAN { get; set; } = new List<string>();
    public List<string> TTHCLIENTHONG { get; set; } = new List<string>();
    public List<CoQuanThucHien> COQUANTHUCHIEN { get; set; } = new List<CoQuanThucHien>();
    public List<CoQuanCoThamQuyen> COQUANCOTHAMQUYEN { get; set; } = new List<CoQuanCoThamQuyen>();
    public List<CoQuanDuocUyQuyen> COQUANDUOCUYQUYEN { get; set; } = new List<CoQuanDuocUyQuyen>();
    public List<CoQuanPhoiHop> COQUANPHOIHOP { get; set; } = new List<CoQuanPhoiHop>();
    public DateTime? NgayCapNhat { get; set; }
    public bool? TrangThaiPhiLePhi { get; set; }
    public string? MucDo { get; set; } = string.Empty;
    public bool? LienThong { get; set; }
    public int? HoSoPhatSinhTrongNam { get; set; }
    public int? ThuTu { get; set; }
    public bool? LaTieuBieu { get; set; }
    [Newtonsoft.Json.JsonIgnore]
    public int TotalCount { get; set; }
}

public class SearchThuTucQueryWhereBuilder
{
    public static string Build(AddQuestionCommand req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.listKeyStr))
            where += " AND TenTTHC Like '%' + @listKeyStr + '%'";
        if (!string.IsNullOrEmpty(req.capThucHien))
            where += " AND CapThucHien Like '%' + @capThucHien + '%'";
        if (!string.IsNullOrEmpty(req.Id))
            where += " AND Id = @Id";
      
        if (req.Removed == false)
            where += " AND DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}


public class AddQuestionCommandHandler : IRequestHandler<AddQuestionCommand, PaginationResponse<object>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public AddQuestionCommandHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<object>> Handle(AddQuestionCommand request, CancellationToken cancellationToken)
    {
        var where = SearchThuTucQueryWhereBuilder.Build(request);
        string sql = $"Select ID, GoiTinThuTucQG,CapThucHien FROM Catalog.ThuTucs {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ChatBotDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        PaginationResponse<object> respone = new PaginationResponse<object>();
        List<object> repsonselist = new List<object>();
        foreach (var i in data.Data)
        {
            AddThuTucCommand responseData = JsonConvert.DeserializeObject<AddThuTucCommand>(i.GoiTinThuTucQG);
            dynamic jsonObject = JObject.FromObject(responseData);
            GoiTinThuTucQG resultObject = new GoiTinThuTucQG();
            var test = request.fieldsStr.Split('#').ToList();

            foreach (var property in typeof(GoiTinThuTucQG).GetProperties())
            {
                if (test.Contains(property.Name))
                {
                    if (jsonObject[property.Name] != null && property.Name != "CANCUPHAPLY" && property.Name != "CACHTHUCTHUCHIEN" && property.Name != "THANHPHANHOSO" && property.Name != "TRINHTUTHUCHIEN" && property.Name != "PHILEPHI")
                    {
                        property.SetValue(resultObject, jsonObject[property.Name].ToObject(property.PropertyType));
                    }
                    else if (property.Name == "CANCUPHAPLY")
                    {
                        string result = "";
                        foreach (JObject item in jsonObject["CANCUPHAPLY"])
                        {
                            result += $"- {item["SOVANBAN"]}: {item["TENVANBAN"]}\n";
                        }
                        property.SetValue(resultObject, result.ToString());
                    }
                    else if (property.Name == "PHILEPHI")
                    {
                        string result = "";
                        foreach (JObject item in jsonObject["CACHTHUCTHUCHIEN"])
                        {
                            string kenh = item["KENH"].ToString();
                            string mota = item["THOIGIAN"][0]["MOTA"].ToString();
                            string sotien = "";
                            if (item["THOIGIAN"].HasValues && item["THOIGIAN"][0]["PHILEPHI"].HasValues)
                            {
                                if (item["THOIGIAN"][0]["PHILEPHI"][0]["SOTIEN"].HasValues)
                                {
                                    sotien = item["THOIGIAN"][0]["PHILEPHI"][0]["SOTIEN"].ToString() + "đồng;";
                                }
                                else
                                {
                                    sotien = "0 đồng;";
                                }
                            }
                            string channel = "";
                            switch (kenh)
                            {
                                case "1":
                                    channel = "Phí lệ phí nộp trực tiếp:";
                                    break;
                                case "2":
                                    channel = "Phí lệ phí nộp trực tuyến:";
                                    break;
                                case "3":
                                    channel = "Phí lệ phí nộp qua bưu chính công ích:";
                                    break;
                            }
                            result += $"{channel} {mota} {sotien} \n";
                            property.SetValue(resultObject, result.ToString());

                        }
                    }
                    else if (property.Name == "CACHTHUCTHUCHIEN")
                    {
                        string result = "";
                        foreach (JObject item in jsonObject["CACHTHUCTHUCHIEN"])
                        {
                            string kenh = item["KENH"].ToString();
                            string mota = item["THOIGIAN"][0]["MOTA"].ToString();
                            string thoigiangiaiquyet = item["THOIGIAN"][0]["THOIGIANGIAIQUYET"].ToString();
                            string sotien = "";
                            if (item["THOIGIAN"].HasValues && item["THOIGIAN"][0]["PHILEPHI"].HasValues)
                            {
                                if (item["THOIGIAN"][0]["PHILEPHI"][0]["SOTIEN"] != null)
                                {
                                    sotien = item["THOIGIAN"][0]["PHILEPHI"][0]["SOTIEN"].ToString();
                                }
                                else
                                {
                                    sotien = "0";
                                }
                            }
                            string channel = "";
                            switch (kenh)
                            {
                                case "1":
                                    channel = "nộp trực tiếp";
                                    break;
                                case "2":
                                    channel = "nộp trực tuyến";
                                    break;
                                case "3":
                                    channel = "nộp qua bưu chính công ích";
                                    break;
                            }

                            result += $"{channel}\n- Thời gian giải quyết: {thoigiangiaiquyet} Ngày làm việc;\n- Phí lệ phí: {sotien} ;\n- Mô tả: {mota};\n";
                            if (kenh == "2")
                            {
                                string[] lines = mota.Split('\n');
                                string diaChiTrucTuyen = lines[1];
                                result += $"{diaChiTrucTuyen}\n";
                            }
                           
                        }
                        property.SetValue(resultObject, result.ToString());
                    }
                    else if (property.Name == "THANHPHANHOSO")
                    {
                        string result = "";

                        foreach (JObject item in jsonObject["THANHPHANHOSO"])
                        {
                            result += $"{item["TRUONGHOP"]}: \n";

                            foreach (var giayto in item["GIAYTO"])
                            {
                                result += $"- {giayto["TENGIAYTO"]} (BẢN CHÍNH: {giayto["SOBANCHINH"]}; BẢN SAO: {giayto["SOBANSAO"]}) \n";
                            }
                            result += "\n";
                        }
                        property.SetValue(resultObject, result.ToString());

                    }
                    else if (property.Name == "TRINHTUTHUCHIEN")
                    {
                        string result = "";
                        foreach (JObject item in jsonObject["TRINHTUTHUCHIEN"])
                        {
                            foreach (var trinhtu in item["TRINHTU"])
                            {
                                result += $"{trinhtu["TENTRINHTU"]}\n";

                            }
                        }
                        property.SetValue(resultObject, result.ToString());

                    }
                    else
                    {
                        property.SetValue(resultObject, null);
                    }
                }
                else if (property.Name == "ID")
                {
                    string result = i.ID.ToString();
                    property.SetValue(resultObject, result.ToString());

                }
                else if (property.Name == "TENTTHC")
                {
                    property.SetValue(resultObject, jsonObject["TENTTHC"]?.ToString());
                }
                else if (property.Name == "MaTTHC")
                {
                    property.SetValue(resultObject, jsonObject["MaTTHC"]?.ToString());
                }
                else
                {
                    property.SetValue(resultObject, null);
                }
            }
            repsonselist.Add(resultObject);
        }
        respone.Data = repsonselist;
        return respone;
    }







}
