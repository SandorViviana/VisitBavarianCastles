namespace VisitBavarianCastlesAPI.Enums
{
    public static class StatusEnum
    {
        public enum Status
        {
            Visited,
            PlannedVisit,
            WantToVisit
        }
        public static Status GetStatusFromString(string s)

        {
            switch (s)
            {
                case "Visited": return Status.Visited;
                case "PlannedVisit": return Status.PlannedVisit;
                case "WantToVisit": return Status.WantToVisit;
                default: return Status.Visited;
            }
        }
    }
}
