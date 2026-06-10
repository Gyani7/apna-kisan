exports.id=550,exports.ids=[550],exports.modules={2339:(a,b,c)=>{"use strict";var d=c(60547);d.qg,d.lK},9587:(a,b,c)=>{"use strict";c(19959)},19959:(a,b,c)=>{"use strict";c(2339);let d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),e=" 	\n\r=".split("");(()=>{let a=Array(128);for(let b=0;b<a.length;b+=1)a[b]=-1;for(let b=0;b<e.length;b+=1)a[e[b].charCodeAt(0)]=-2;for(let b=0;b<d.length;b+=1)a[d[b].charCodeAt(0)]=b})()},40897:()=>{},64498:(a,b,c)=>{"use strict";c(9587),c(2339)},80299:(a,b,c)=>{"use strict";c(19959),c(9587)},97550:(a,b,c)=>{"use strict";c(80299),c(64498);var d=c(40897);if(c.o(d,"createServerActionClient")&&c.d(b,{createServerActionClient:function(){return d.createServerActionClient}}),c(19959),"undefined"!=typeof process&&process.env?.npm_package_name){let a=process.env.npm_package_name;["@supabase/auth-helpers-nextjs","@supabase/auth-helpers-react","@supabase/auth-helpers-remix","@supabase/auth-helpers-sveltekit"].includes(a)&&console.warn(`
╔════════════════════════════════════════════════════════════════════════════╗
║ ⚠️  IMPORTANT: Package Consolidation Notice                                ║
║                                                                            ║
║ The ${a.padEnd(35)} package name is deprecated.  ║
║                                                                            ║
║ You are now using @supabase/ssr - a unified solution for all frameworks.  ║
║                                                                            ║
║ The auth-helpers packages have been consolidated into @supabase/ssr       ║
║ to provide better maintenance and consistent APIs across frameworks.      ║
║                                                                            ║
║ Please update your package.json to use @supabase/ssr directly:            ║
║   npm uninstall ${a.padEnd(42)} ║
║   npm install @supabase/ssr                                               ║
║                                                                            ║
║ For more information, visit:                                              ║
║ https://supabase.com/docs/guides/auth/server-side                         ║
╚════════════════════════════════════════════════════════════════════════════╝
    `)}}};