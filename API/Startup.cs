using API.Extensions;
using API.Middleware;
using API.SignalR;
using Application.MusicEvents;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using System.IdentityModel.Tokens.Jwt;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration config)
        {
            this._config = config;
        }



        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers(opt =>
            {
                // Every single endpoint in our API requires authentication unless we explicitly state otherwise.
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
                    .AddFluentValidation(config =>
                    {   // where our validators are coming from
                        config.RegisterValidatorsFromAssemblyContaining<Create>();
                    });
            services.AddApplicationServices(_config);
            services.AddIdentityServices(_config);


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
            }

           // app.UseHttpsRedirection();

            app.UseRouting();

            // Will check files under wwwroot
            app.UseDefaultFiles();
            // Serve static files under wwwroot
            app.UseStaticFiles();

            app.UseCors("CorsPolicy");

            
            // First authenticate
            app.UseAuthentication();
            // Then get authorization
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<MessageHub>("/chat");
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
