using Newtonsoft.Json;
using webapi.Interfaces;
using webapi.Models;

namespace webapi.Services
{
    public class StoryService : IStoryService
    {

        public async Task<Story[]> NewestStories(int currentPage, int pageSize) 
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://hacker-news.firebaseio.com/v0/");

                using (HttpResponseMessage response = await client.GetAsync("topstories.json?print=pretty"))
                {
                    string responseContent = response.Content.ReadAsStringAsync().Result;
                    List<int> newestStoriesIds = JsonConvert.DeserializeObject<List<int>>(responseContent);
                    response.EnsureSuccessStatusCode();


                    var storiesPages = newestStoriesIds
                        .Skip((currentPage - 1) * pageSize)
                        .Take(pageSize)
                        .ToList();

                    var storiesTasks = storiesPages.Select(async s =>
                    {
                        return await ListStoryDescriptionAsync(s);
                    });
                    var stories = await Task.WhenAll(storiesTasks);

                    return stories;
                }
            }
        }

        public async Task<Story> ListStoryDescriptionAsync(int storyId)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://hacker-news.firebaseio.com/v0/item/");

                using (HttpResponseMessage response = await client.GetAsync(storyId + ".json?print=pretty"))
                {
                    string responseContent = response.Content.ReadAsStringAsync().Result;
                    var item = JsonConvert.DeserializeObject<Story>(responseContent);
                    if (item != null)
                    {
                        return new Story() { Id = item.Id, Title = item.Title, Url = item.Url == null ? "" : item.Url };
                    }
                    response.EnsureSuccessStatusCode();
                }
            }
            return null;
        }

        public async Task<int> TotalStories()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://hacker-news.firebaseio.com/v0/");

                using (HttpResponseMessage response = await client.GetAsync("topstories.json?print=pretty"))
                {
                    string responseContent = response.Content.ReadAsStringAsync().Result;
                    List<int> newestStoriesIds = JsonConvert.DeserializeObject<List<int>>(responseContent);
                    response.EnsureSuccessStatusCode(); ;

                    return newestStoriesIds == null ? 0 : newestStoriesIds.Count;
                }
            }
        }

        public async Task<Story> GetStoryById(int id)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://hacker-news.firebaseio.com/v0/item/");

                using (HttpResponseMessage response = await client.GetAsync(id + ".json?print=pretty"))
                {
                    string responseContent = response.Content.ReadAsStringAsync().Result;   
                    var item = JsonConvert.DeserializeObject<Story>(responseContent);
                    response.EnsureSuccessStatusCode();

                    return item;
                }
            }
        }

    }
}
