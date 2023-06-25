using System.Data;
using Microsoft.Data.SqlClient;
using VisitBavarianCastlesAPI.Enums;
using VisitBavarianCastlesAPI.Helpers;
using VisitBavarianCastlesAPI.Models;

namespace VisitBavarianCastlesAPI.Services
{
    public class VisitRecordService
    {
        public async Task<bool> AddVisitRecord(string username,VisitRecord model)
        {
            using (SqlConnection con = SQLConnectionHelper.Connection)
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("AddRecord", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@username", username);
                    cmd.Parameters.AddWithValue("@castle", model.Castle.CastleId);
                    cmd.Parameters.AddWithValue("@status", model.Status.ToString());
                    cmd.Parameters.AddWithValue("@visitDate", model.VisitDate);

                    await con.OpenAsync();
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();

                    if (rowsAffected > 0)
                    {
                        return true;
                    }
                }
                finally
                {
                    con.Close();
                }
            }

            return false;
        }

        public async Task<bool> DeleteRecord(int id)
        {
            using (SqlConnection con = SQLConnectionHelper.Connection)
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("deleteRecord", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@id", id);

                    await con.OpenAsync();
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();

                    if (rowsAffected > 0)
                    {
                        return true;
                    }
                }
                finally
                {
                    con.Close();
                }
            }

            return false;
        }

        public async Task<bool> EditVisitRecord(int id,VisitRecord model)
        {
            using (SqlConnection con = SQLConnectionHelper.Connection)
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("editRecord", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@castleId", model.Castle.CastleId);
                    cmd.Parameters.AddWithValue("@visitDate", model.VisitDate);
                    cmd.Parameters.AddWithValue("@status", model.Status.ToString());

                    await con.OpenAsync();
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();

                    if (rowsAffected > 0)
                    {
                        return true;
                    }
                }
                finally
                {
                    con.Close();
                }
            }

            return false;
        }
        
        public async Task<List<VisitRecord>> GetAllRecordsOfUser(string username)
        {
            using (SqlConnection con = SQLConnectionHelper.Connection)
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("GetRecordsOfUser", con);
                    List<VisitRecord> records = new List<VisitRecord>();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@username", username);
                    await con.OpenAsync();

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            float latitude = reader.IsDBNull(6) ? 0 : (float)reader.GetDouble(6);
                            float longitude = reader.IsDBNull(7) ? 0 : (float)reader.GetDouble(7); 
                            VisitRecord record = new VisitRecord();
                            record.Id = reader.GetInt32(0);
                            record.Castle = new Castle(
                                reader.GetInt32(1),
                                reader.GetString(2),
                                reader.GetString(3),
                                reader.GetString(4),
                                reader.GetString(5),                               
                                latitude,
                                longitude

                                );
                            record.VisitDate = reader.IsDBNull(8) ? null : reader.GetDateTime(8);
                            record.AddDate= reader.GetDateTime(9);
                            record.Status = StatusEnum.GetStatusFromString(reader.GetString(10));

                            records.Add(record);
                        }
                    }

                    return records;
                }
                finally
                {
                    con.Close();
                }
            }
        }
    }
}
