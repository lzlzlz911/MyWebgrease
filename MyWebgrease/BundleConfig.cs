using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Web.Optimization;

namespace MyWebgrease
{
    public class BundleConfig
    {

        public static void RegisterBundles(BundleCollection bundles){
            bundles.Add(new StyleBundle("~/Content/Css").Include("~/Content/Css/s1.css"));
            bundles.Add(new Bundle("~/Images").IncludeDirectory("~/Content/Images/", "*.png"));
        }
    }
}