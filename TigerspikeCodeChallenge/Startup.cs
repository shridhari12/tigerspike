using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TigerspikeCodeChallenge.Repositories;
using TigerspikeDatabase.Data;

namespace TigerspikeCodeChallenge
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.AddDbContext<TigerspikeDbContext>(options =>
             options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<ITigerspikeRepository, TigerspikeRepository>();

            //Add service and create Policy with options
            RegisterCorsPolicies(services);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseCors("DevelopmentCorsPolicy");
                app.UseDeveloperExceptionPage();
            }
            else if (env.IsStaging())
            {
                app.UseCors("StagingCorsPolicy");
            }
            else
            {
                app.UseCors("ProductionCorsPolicy");
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });

        }

        private void RegisterCorsPolicies(IServiceCollection services)
        {
            string[] localHostOrigins = new string[]
            {
                "http://localhost:4200",
                "https://localhost:4200"
            };

            string[] stagingHostOrigins = new string[]
            {
                "http://localhost:4200",
                "https://localhost:4200"
            };

            string[] productionHostOrigins = new string[]
            {
                "https://yourdomain.net"
            };

            services.AddCors(options =>
            {
                options.AddPolicy("DevelopmentCorsPolicy", builder =>
                {
                    builder.WithOrigins(localHostOrigins)
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
                options.AddPolicy("StagingCorsPolicy", builder =>
                {
                    builder.WithOrigins(stagingHostOrigins)
                     .AllowAnyHeader()
                     .AllowAnyMethod();
                });
                options.AddPolicy("ProductionCorsPolicy", builder =>
                {
                    builder.WithOrigins(productionHostOrigins)
                     .AllowAnyHeader()
                     .AllowAnyMethod();
                });
            });
        }
    }
}
