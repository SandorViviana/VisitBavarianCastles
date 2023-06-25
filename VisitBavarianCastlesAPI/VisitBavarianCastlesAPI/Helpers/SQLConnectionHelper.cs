using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace VisitBavarianCastlesAPI.Helpers
{
    public static class SQLConnectionHelper
    {
        private static readonly string connectionString;

        static SQLConnectionHelper()
        {
            IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();

            connectionString = configuration.GetConnectionString("myConStr");
        }

        public static SqlConnection Connection
        {
            get
            {
                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder(connectionString);
                builder.TrustServerCertificate = true; // Disable SSL verification
                string modifiedConnectionString = builder.ToString();

                return new SqlConnection(modifiedConnectionString);
            }
        }
    }

}
