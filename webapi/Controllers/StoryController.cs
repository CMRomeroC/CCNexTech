using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Reflection;
using System.Text.Json;
using System.Xml.Linq;
using webapi.Interfaces;
using webapi.Models;

namespace webapi.Controllers;

[ApiController]
[ResponseCache(Duration = 60,
               Location = ResponseCacheLocation.Any)]
public class StoryController : ControllerBase
{
    private readonly IStoryService _storyService;

    public StoryController(IStoryService storyService)
    {
        _storyService = storyService;
    }

    [HttpGet]
    [Route("api/GetNewStories/")]
    [Route("api/GetNewStories/{currentPage}/{pageSize}")]
    public async Task<ActionResult<IEnumerable<Story>>> GetNewStories(int currentPage = 1, int pageSize = 10)
    {
        return Ok(await _storyService.NewestStories(currentPage, pageSize));
    }

    [HttpGet]
    [Route("api/GetStory/{id}")]
    public async Task<ActionResult<Story>> GetStory(int id)
    {
        return Ok(await _storyService.GetStoryById(id));
    }

    [HttpGet]
    [Route("api/GetTotalStories/")]
    public async Task<ActionResult<int>> GetTotalStories()
    {
        return Ok(await _storyService.TotalStories());
    }
}
