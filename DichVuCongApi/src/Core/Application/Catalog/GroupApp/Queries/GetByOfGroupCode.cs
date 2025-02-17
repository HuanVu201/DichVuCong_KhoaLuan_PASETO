﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
public  class GetByOfGroupCodeSpec : Specification<Group>, ISingleResultSpecification
{
    public GetByOfGroupCodeSpec(string ofGroupCode)
    {
        Query.Where(x => x.OfGroupCode == ofGroupCode);
    }
}

