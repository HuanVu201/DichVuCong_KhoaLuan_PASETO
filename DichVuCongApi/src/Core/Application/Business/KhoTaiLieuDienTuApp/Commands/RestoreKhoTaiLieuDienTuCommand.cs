using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.KhoTaiLieuDienTuApp.Commands;
public sealed record RestoreKhoTaiLieuDienTuCommand(Guid Id) : ICommand;
