﻿using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.MenuApp.Commands;
public class AddMenuCommand : ICommand<Guid>
{
    public string TenMenu { get; set; }
    public Guid? ParentId { get; set; }
    public int ThuTuMenu { get; set; }
    public bool Active { get; set; }
    public string Module { get; set; }
    public string? IconName { get; set; }
    public string? FullPath { get; set; }
    public string? Permission { get; set; }
    public string? MaScreen { get; set; }
    public bool? IsTopMenu { get; set; }
}
