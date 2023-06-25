namespace VisitBavarianCastlesAPI.Models
{
    public class Castle
    {
        public Castle(int castleId, string name, string city, string description, string imageUrl, float latitude, float longitude)
        {
            CastleId = castleId;
            Name = name;
            City = city;
            Description = description;
            ImageUrl = imageUrl;
            Latitude = latitude;
            Longitude = longitude;
        }

        public int CastleId { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public float Latitude { get; set; }
        public  float Longitude { get; set; }

        
    }
}
