using System.Data;
using Microsoft.Data.SqlClient;
using VisitBavarianCastlesAPI.Helpers;
using VisitBavarianCastlesAPI.Models;

namespace VisitBavarianCastlesAPI.Services
{
    public class CastleService
    {
        public async Task<List<Castle>> GetAllCastles()
        {
            using (SqlConnection con = SQLConnectionHelper.Connection)
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("GetAllCastles", con);
                    List<Castle> castles = new List<Castle>();
                    cmd.CommandType = CommandType.StoredProcedure;
                    await con.OpenAsync();

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            Castle castle = new Castle(
                            reader.GetInt32(0),
                            reader.GetString(1),
                            reader.GetString(2),
                            reader.GetString(3),
                            reader.GetString(4),
                            (float)reader.GetDouble(5),
                            (float)reader.GetDouble(6)
                            );
                            castles.Add(castle);
                        }
                    }

                    return castles;
                }
                finally
                {
                    con.Close();
                }
            }
        }

    }
}
