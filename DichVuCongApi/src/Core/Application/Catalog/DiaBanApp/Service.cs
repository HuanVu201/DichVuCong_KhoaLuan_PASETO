using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Caching;
using System.Net.Http.Json;

namespace TD.DichVuCongApi.Application.Catalog.DiaBanApp;
public class Service
{
    public class ThongTinDiaBan
    {
        public string? TENTINH { get; set; }
        public string? MATINH { get; set; }
        public string? TENHUYEN { get; set; }
        public string? MAHUYEN { get; set; }
        public string? TENXA { get; set; }
        public string? MAXA { get; set; }

    }
    public class ImportDiaBanServiceCommand : ICommand<Guid>
    {
        public List<ThongTinDiaBan> thongTinDiaBan { get; set; }
    }

    public class ImportDiaBanServiceCommandHandler : ICommandHandler<ImportDiaBanServiceCommand, Guid>
    {
        private readonly ICacheService _cacheService;
        private readonly int _cacheTime = 2;
        private readonly IDapperRepository _dapperRepository;

        public ImportDiaBanServiceCommandHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;

        public async Task<Result<DefaultIdType>> Handle(ImportDiaBanServiceCommand request, CancellationToken cancellationToken)
        {
            int dem = 0;
            foreach (var item in request.thongTinDiaBan)
            {
                dem++;
                Guid Id = Guid.NewGuid();
                string TenDiaBan = string.Empty;
                string MaDiaBan = string.Empty;
                int ThuTu = 1;
                bool Active = true;

                if (!string.IsNullOrEmpty(item.TENTINH))
                {
                    TenDiaBan = item.TENTINH;
                }
                else if (!string.IsNullOrEmpty(item.TENHUYEN))
                {
                    TenDiaBan = item.TENHUYEN;
                }
                else if (!string.IsNullOrEmpty(item.TENXA))
                {
                    TenDiaBan = item.TENXA;
                }

                if (!string.IsNullOrEmpty(item.MATINH) && string.IsNullOrEmpty(item.MAHUYEN) && string.IsNullOrEmpty(item.MAXA))
                {
                    MaDiaBan = item.MATINH;
                }
                else if (!string.IsNullOrEmpty(item.MAHUYEN) && string.IsNullOrEmpty(item.MAXA))
                {
                    MaDiaBan = item.MATINH + "." + item.MAHUYEN;
                }
                else if (!string.IsNullOrEmpty(item.MAXA))
                {
                    var getMaDiaBanParent = $@"SELECT MaDiaBan FROM TD_DichVuCong.Catalog.DiaBans WHERE MaDiaBan Like'%.{item.MAHUYEN}'";
                    var maDiaBanParent = await _dapperRepository.QueryFirstOrDefaultObjectAsync<string>(getMaDiaBanParent);
                    MaDiaBan = maDiaBanParent + "." + item.MAXA;
                }

                Console.WriteLine("Running: " + dem + "/" + request.thongTinDiaBan.Count());
                var sql = GetQueryInsertOrUpdateSQL(Id, TenDiaBan.Replace("\'", "\'\'"), MaDiaBan, ThuTu, Active);
                await _dapperRepository.ExcuteAsync(sql);
            }

            return null;
        }
    }


    private static string GetQueryInsertOrUpdateSQL(Guid? id, string? tenDiaBan, string? maDiaBan, long? thuTu, bool? active)
    {
        return
            $"IF EXISTS (SELECT MaDiaBan FROM Catalog.DiaBans WHERE MaDiaBan='{maDiaBan}') " +
                $"BEGIN UPDATE Catalog.DiaBans " +
                $"SET " +
                $"TenDiaBan = N'{tenDiaBan}', MaDiaBan='{maDiaBan}', ThuTu = {thuTu}, Active = '{active}'" +

                $"WHERE MaDiaBan='{maDiaBan}' " +
                $"END " +
            $"ELSE " +
                $"BEGIN " +
                $"INSERT INTO Catalog.DiaBans " +
                    $"([Id], [TenDiaBan], [MaDiaBan], [ThuTu], [Active])" +
                $"VALUES " +
                    $"('{id}', N'{tenDiaBan}', '{maDiaBan}', {thuTu}, '{active}') " +
                $"END; ";
    }
}

