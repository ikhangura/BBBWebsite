using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(BBBWebsite.Startup))]
namespace BBBWebsite
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
