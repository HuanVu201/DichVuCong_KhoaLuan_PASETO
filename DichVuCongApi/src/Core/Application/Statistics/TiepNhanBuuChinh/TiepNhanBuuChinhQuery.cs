using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.ConfigApp;
using Newtonsoft.Json;


namespace TD.DichVuCongApi.Application.Statistics.TiepNhanBuuChinh;
public class TiepNhanBuuChinhQuery : PaginationFilter, IRequest<PaginationResponse<TiepNhanBuuChinhDto>>
{
        public DateTime? TuNgay {  get; set; }
        public DateTime? DenNgay {  get; set; }
        public string? Catalog {  get; set; }
        public string? MaDinhDanh {  get; set; }
        public string? MaDinhDanhCha {  get; set; }
        public bool? LaHoSoChungThuc {  get; set; }
        public bool? Removed { get; set; } = false;
        [JsonIgnore]
        public bool? ReFetch { get; set; } = false;
        public new int PageSize { get; set; } = 10;
        public new int PageNumber { get; set; } = 1;
    }
