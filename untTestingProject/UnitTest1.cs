using NUnit.Framework;
using Moq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webapi.Interfaces;
using webapi.Controllers;
using webapi.Models;

namespace untTestingProject
{
    [TestFixture]
    public class StoryControllerTests
    {
        private StoryController _storyController;
        private Mock<IStoryService> _storyServiceMock;

        [SetUp]
        public void Setup()
        {
            _storyServiceMock = new Mock<IStoryService>();
            _storyController = new StoryController(_storyServiceMock.Object);
        }

        [Test]
        public async Task GetNewStories_ReturnsOkResult()
        {
            // Arrange
            int currentPage = 1;
            int pageSize = 5;
            var expectedStories = new List<Story>
            {
                new Story { Id = 1, Title = "Story 1", Url = "http://example.com/story1" },
                new Story { Id = 2, Title = "Story 2", Url = "http://example.com/story2" },
                new Story { Id = 3, Title = "Story 3", Url = "http://example.com/story3" },
                new Story { Id = 4, Title = "Story 4", Url = "http://example.com/story4" },
                new Story { Id = 5, Title = "Story 5", Url = "http://example.com/story5" }
            };

            _storyServiceMock.Setup(service => service.NewestStories(currentPage, pageSize))
            .ReturnsAsync(expectedStories.ToArray);

            // Act
            var result = await _storyController.GetNewStories(currentPage, pageSize);

            // Assert
            var actionResult = result.Result as OkObjectResult;
            Assert.That(actionResult, Is.Not.Null);
            var stories = actionResult.Value as IEnumerable<Story>;

            Assert.That(actionResult.StatusCode, Is.EqualTo(200));
            Assert.That(stories, Is.EqualTo(expectedStories));
        }

        [Test]
        public async Task GetStory_ReturnsOkResult()
        {
            // Arrange
            int storyId = 123; // Replace with a valid story ID
            var expectedStory = new Story { Id = 123, Title = "Story 1", Url = "http://example.com/story1" };
      
            _storyServiceMock.Setup(service => service.GetStoryById(storyId))
            .ReturnsAsync(expectedStory);

            // Act
            var result = await _storyController.GetStory(storyId);
            var actionResult = result.Result as OkObjectResult;

            // Assert
            Assert.That(actionResult, Is.Not.Null);
            Assert.That(actionResult.StatusCode, Is.EqualTo(200));
            Assert.That(actionResult.Value, Is.EqualTo(expectedStory));
        }

        [Test]
        public async Task GetTotalStories_ReturnsOkResult()
        {
            // Arrange
            int expectedTotalStories = 100; // Replace with the expected total number of stories
            _storyServiceMock.Setup(service => service.TotalStories())
                .ReturnsAsync(expectedTotalStories);

            // Act
            var result = await _storyController.GetTotalStories();
            var actionResult = result.Result as OkObjectResult;

            // Assert
            Assert.That(actionResult, Is.Not.Null);
            Assert.That(actionResult.StatusCode, Is.EqualTo(200));
            Assert.That(actionResult.Value, Is.EqualTo(expectedTotalStories));
        }
    }
}