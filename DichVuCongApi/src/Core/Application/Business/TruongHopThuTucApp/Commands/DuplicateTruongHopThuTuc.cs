using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;


namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Commands;
public sealed record DuplicateTruongHopThuTuc(DefaultIdType id) : ICommand;

