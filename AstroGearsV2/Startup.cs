using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AstroGearsV2.Startup))]
namespace AstroGearsV2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
