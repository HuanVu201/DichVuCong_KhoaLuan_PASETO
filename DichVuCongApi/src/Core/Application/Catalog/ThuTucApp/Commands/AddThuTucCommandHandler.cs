using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Commands;
public class AddThuTucCommandHandler : ICommandHandler<AddThuTucCommand, Guid>
{
    private readonly IRepositoryWithEvents<ThuTuc> _repositoryWithEvents;
    public AddThuTucCommandHandler(IRepositoryWithEvents<ThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddThuTucCommand request, CancellationToken cancellationToken)
    {
        LinhVucThucHien linhVucThucHien = new LinhVucThucHien();

        if (request.LINHVUCTHUCHIEN.Any())
        {
            var firstItem = request.LINHVUCTHUCHIEN[0];
            linhVucThucHien.MALINHVUC = firstItem.MALINHVUC;
            linhVucThucHien.TENLINHVUC = firstItem.TENLINHVUC;
        }

        CapThucHien capThucHien = new CapThucHien();
        if (request.CAPTHUCHIEN.Any())
        {
            foreach (var i in request.CAPTHUCHIEN)
            {
                capThucHien.TENCAP += i.TENCAP + "#";
            }

            if (capThucHien.TENCAP.TrimStart().EndsWith("#"))
                capThucHien.TENCAP = capThucHien.TENCAP.TrimEnd().Substring("#".Length);
        }


        CoQuanThucHien coQuanThucHien = new CoQuanThucHien();
        if (request.COQUANTHUCHIEN.Any())
        {
            var firstItem = request.COQUANTHUCHIEN[0];
            coQuanThucHien.MADONVI = firstItem.MADONVI;
            coQuanThucHien.TENDONVI = firstItem.TENDONVI;
        }

        KetQuaThucHien ketQuaThucHien = new KetQuaThucHien();
        if (request.KETQUATHUCHIEN.Any())
        {
            var firstItem = request.KETQUATHUCHIEN[0];
            ketQuaThucHien.MAKETQUA = firstItem.MAKETQUA;
            ketQuaThucHien.TENKETQUA = firstItem.TENKETQUA;
        }

        string thoiGianThucHien = "";
        if (request.CACHTHUCTHUCHIEN.Any())
        {
            var cachThucFisrtItem = request.CACHTHUCTHUCHIEN[0];
            if (cachThucFisrtItem.THOIGIAN.Any())
            {
                var thoiGian = cachThucFisrtItem.THOIGIAN[0];
                thoiGianThucHien = thoiGian.THOIGIANGIAIQUYET;
            }
        }

        var thuTuc = ThuTuc.Create(request.ID, request.MaTTHC, request.TENTTHC, JsonConvert.SerializeObject(request), request.LOAITTHC, request.TRANGTHAI, null,
            linhVucThucHien.TENLINHVUC, linhVucThucHien.MALINHVUC, coQuanThucHien.TENDONVI, capThucHien.TENCAP, ketQuaThucHien.MAKETQUA, ketQuaThucHien.TENKETQUA,
            thoiGianThucHien, request.IDQUYETDINHCONGBO, DateTime.UtcNow, null, null, null, null, null, request.ThuTu, request.LaTieuBieu,request.QUYETDINH,request.LaThuTucChungThuc,
            request.ThucHienTaiBoPhanMotCua,request.DinhKemQuyetDinh, request.LaPhiDiaGioi, request.LaThuTucLienThongDatDai);
        await _repositoryWithEvents.AddAsync(thuTuc, cancellationToken);
        return Result<Guid>.Success(thuTuc.Id);
    }
}
