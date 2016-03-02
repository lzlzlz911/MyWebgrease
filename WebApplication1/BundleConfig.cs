using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Web.Optimization;

namespace WebApplication1
{
    public class BundleConfig
    {

        public static void RegisterBundles(BundleCollection bundles){
            StyleBundle stylebundle = new StyleBundle("~/Content/Cssoo");
            stylebundle.Include("~/Content/Css/s1.css");
            stylebundle.Transforms.Add(new CssMinify());

            ScriptBundle scriptbundle = new ScriptBundle("~/Script/Judgetdoc");
            scriptbundle.Include("~/Scripts/judgetdocscript.js");
            scriptbundle.Transforms.Add(new JsMinify());

            bundles.Add(stylebundle);
            bundles.Add(scriptbundle);

            BundleTable.EnableOptimizations = true;
        }
    }
}