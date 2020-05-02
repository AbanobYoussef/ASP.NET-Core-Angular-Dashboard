using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Advantage.API.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Advantage.API
{
    public class Startup
    {
    private string _SecretConection =null;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(opt => {

              opt.AddPolicy("CorsPolicy",
                c => c.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            });
            _SecretConection = Configuration["SecretConection"];
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

          services.AddEntityFrameworkSqlServer().AddDbContext<APIContext>(
          opt => opt.UseSqlServer(_SecretConection));


          services.AddTransient<DataSeed>();

    }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env , DataSeed seed)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors("CorsPolicy");
            }
            else
            {
                app.UseHsts();
            }
            seed.SeedData(20, 1000);
            app.UseHttpsRedirection();
            app.UseMvc(routes=> routes.MapRoute(
              "default","api/{controller}/{action}/{id?}"

              ));
        }
    }
}
