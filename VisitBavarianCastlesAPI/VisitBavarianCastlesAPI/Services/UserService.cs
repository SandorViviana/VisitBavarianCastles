using Microsoft.Data.SqlClient;
using System.Data;
using VisitBavarianCastlesAPI.Helpers;
using VisitBavarianCastlesAPI.Models;

namespace VisitBavarianCastlesAPI.Services
{
    public class UserService
    {
        public async Task<bool> CreateUser(UserCreateUpdate model)
        {
            using (SqlConnection con = SQLConnectionHelper.Connection)
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("CreateUser", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@username", model.Username);
                    cmd.Parameters.AddWithValue("@password", model.Password);
                    cmd.Parameters.AddWithValue("@firstName", model.FirstName);
                    cmd.Parameters.AddWithValue("@lastName", model.LastName);

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

        public async Task<User?> GetUserById(Guid id)
        {
            using (SqlConnection con = SQLConnectionHelper.Connection)
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("GetUserById", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userId", id);

                    await con.OpenAsync();

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            User user = new User();
                            user.UserId = reader.GetGuid(0);
                            user.Username = reader.GetString(1);
                            user.Password = reader.GetString(2);
                            user.FirstName = reader.GetString(3);
                            user.LastName = reader.GetString(4);

                            return user;
                        }
                    }

                    return null; // User not found
                }
                finally
                {
                    con.Close();
                }
            }
        }

        public async Task<User?> GetUserByUsername(string username)
        {
            using (SqlConnection con = SQLConnectionHelper.Connection)
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("GetUserByUsername", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@username", username);

                    await con.OpenAsync();

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            User user = new User();
                            user.UserId = reader.GetGuid(0);
                            user.Username = reader.GetString(1);
                            user.Password = reader.GetString(2);
                            user.FirstName = reader.GetString(3);
                            user.LastName = reader.GetString(4);

                            return user;
                        }
                    }

                    return null; // User not found
                }
                finally
                {
                    con.Close();
                }
            }
        }


        public async Task<List<User>> GetAllUsers()
        {
            using (SqlConnection con = SQLConnectionHelper.Connection)
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("GetAllUsers", con);
                    List<User> users = new List<User>();
                    cmd.CommandType = CommandType.StoredProcedure;
                    await con.OpenAsync();

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            User user = new User();
                            user.UserId = reader.GetGuid(0);
                            user.Username = reader.GetString(1);
                            user.Password = reader.GetString(2);
                            user.FirstName = reader.GetString(3);
                            user.LastName = reader.GetString(4);

                            users.Add(user);
                        }
                    }

                    return users;
                }
                finally
                {
                    con.Close();
                }
            }
        }

    }
}
