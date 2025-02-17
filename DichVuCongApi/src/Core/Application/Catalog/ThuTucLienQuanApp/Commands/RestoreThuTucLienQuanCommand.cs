using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucLienQuanApp.Commands;
public sealed record RestoreThuTucLienQuanCommand(Guid Id) : ICommand;