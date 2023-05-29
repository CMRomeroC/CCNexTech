using webapi.Models;

namespace webapi.Interfaces
{
    public interface IStoryService
    {
        Task<Story> GetStoryById(int id);
        Task<Story> ListStoryDescriptionAsync(int storyId);
        Task<Story[]> NewestStories(int currentPage, int pageSize);
        Task<int> TotalStories();
    }
}