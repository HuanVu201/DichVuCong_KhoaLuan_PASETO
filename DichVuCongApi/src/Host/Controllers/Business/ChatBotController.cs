using Hangfire;
using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.ActionApp.Commands;
using TD.DichVuCongApi.Application.Business.ActionApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.ChatBot.Command;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class ChatBotController : VersionedApiController
{
    [AllowAnonymous]
    [HttpPost]
    [OpenApiOperation("Thêm một câu hỏi", "")]
    public async Task<ActionResult> Add( AddQuestionCommand req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [AllowAnonymous]
    [HttpPost("Groups")]
    [OpenApiOperation("Chatbot tìm kiếm thông tin cơ quan, đơn vị", "")]
    public async Task<ActionResult> ChatBotSearchGroup(ChatBotSearchGroup req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return StatusCode(200, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

}
