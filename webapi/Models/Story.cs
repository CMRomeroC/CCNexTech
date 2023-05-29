﻿namespace webapi.Models
{
    [Serializable]
    public class Story
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Url { get; set; }
    }
}
