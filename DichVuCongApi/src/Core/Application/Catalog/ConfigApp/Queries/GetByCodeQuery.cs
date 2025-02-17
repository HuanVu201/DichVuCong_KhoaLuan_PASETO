using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
public sealed record GetByCodeQuery(string maConfig) : IQuery<ConfigDto>;