using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Commands;
public  class DeleteQuyTrinhXuLyByTruongHopId : ICommand
{

    public DeleteQuyTrinhXuLyByTruongHopId(DefaultIdType truongHopId, bool forceDelete)
    {
        TruongHopId = truongHopId;
        ForceDelete = forceDelete;
    }

    public DefaultIdType TruongHopId { get; set; }
    public bool ForceDelete { get; set; } = false;
}

