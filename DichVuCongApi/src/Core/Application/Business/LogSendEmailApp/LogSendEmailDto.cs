using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.LogSendEmailApp;
public   class LogSendEmailDto : IDto
{
    public Guid Id { get; set; } // Change to Guid if Id is a GUID
    public string Service { get; set; }
    public string Sender { get; set; }
    public string Receiver { get; set; }
    public bool IsSucceed { get; set; }
    public string Request { get; set; }
    public string Response { get; set; }
    public string MaHoSo { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class ServiceLog
{
    public Guid Id { get; set; } // Change to Guid if Id is a GUID
    public string Service { get; set; }
    public string Sender { get; set; }
    public string Receiver { get; set; }
    public bool IsSucceed { get; set; }
    public string Request { get; set; }
    public string Response { get; set; }
    public string MaHoSo { get; set; }
    public DateTime CreatedAt { get; set; }
}