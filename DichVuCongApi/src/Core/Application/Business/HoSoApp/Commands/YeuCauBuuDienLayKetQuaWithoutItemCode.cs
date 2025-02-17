using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public sealed record YeuCauBuuDienLayKetQuaWithoutItemCode(List<string> Ids) : ICommand<List<YeuCauBuuDienLayKetQuaWithoutItemCodeResponse>>;
