using static VisitBavarianCastlesAPI.Enums.StatusEnum;

namespace VisitBavarianCastlesAPI.Models
{
    public class VisitRecord
    {
        public int Id { get; set; }
        public Castle Castle { get; set; }
        public DateTime? VisitDate { get; set; }
        public DateTime? AddDate { get; set; }
        public Status Status { get; set; }
    }
}
