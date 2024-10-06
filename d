warning: in the working copy of 'canvas/bookSrore/.obsidian/workspace.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'canvas/bookSrore/بدون عنوان.canvas', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'package.json', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/app.js b/app.js[m
[1mindex 2ac7be3..fd7e5c1 100644[m
[1m--- a/app.js[m
[1m+++ b/app.js[m
[36m@@ -11,15 +11,10 @@[m [mconst app = express();[m
 app.use(express.json());[m
 // 4) Secury[m
 // 5) Routes[m
[31m-app.use((req, res, next) => {[m
[31m-  console.log('from app');[m
[31m-  next();[m
[31m-});[m
[31m-[m
[32m+[m[32mapp.use('/api/v1/book', bookRoutes);[m
 app.use('/api/v1/user', userRoutes);[m
 app.use('/api/v1/sale', saleRoutes);[m
 app.use('/api/v1/review', reviewRoutes);[m
[31m-app.use('/api/v1/book', bookRoutes);[m
 [m
 // 6) Path error handle[m
 // 7) export the mudel[m
[1mdiff --git a/canvas/bookSrore/.obsidian/workspace.json b/canvas/bookSrore/.obsidian/workspace.json[m
[1mindex 35121d5..915fd06 100644[m
[1m--- a/canvas/bookSrore/.obsidian/workspace.json[m
[1m+++ b/canvas/bookSrore/.obsidian/workspace.json[m
[36m@@ -45,9 +45,9 @@[m
               "state": {[m
                 "file": "بدون عنوان.canvas",[m
                 "viewState": {[m
[31m-                  "x": -449.99279409173425,[m
[31m-                  "y": -450.15491465966363,[m
[31m-                  "zoom": -0.5555555216471355[m
[32m+[m[32m                  "x": -409.5558117630404,[m
[32m+[m[32m                  "y": -388.07398096694334,[m
[32m+[m[32m                  "zoom": -0.5555555216471356[m
                 }[m
               }[m
             }[m
[1mdiff --git "a/canvas/bookSrore/\330\250\330\257\331\210\331\206 \330\271\331\206\331\210\330\247\331\206.canvas" "b/canvas/bookSrore/\330\250\330\257\331\210\331\206 \330\271\331\206\331\210\330\247\331\206.canvas"[m
[1mindex ba45897..98be392 100644[m
[1m--- "a/canvas/bookSrore/\330\250\330\257\331\210\331\206 \330\271\331\206\331\210\330\247\331\206.canvas"[m	
[1m+++ "b/canvas/bookSrore/\330\250\330\257\331\210\331\206 \330\271\331\206\331\210\330\247\331\206.canvas"[m	
[36m@@ -1,91 +1,102 @@[m
 {[m
 	"nodes":[[m
[31m-		{"id":"84da636e7b2ad498","type":"text","text":"<h1>books</h1>\nauthor\nreviews","x":-180,"y":-443,"width":160,"height":163},[m
[31m-		{"id":"a1b8157847fc3db4","type":"text","text":"<h1>user</h1>\nseles\n","x":-620,"y":-433,"width":123,"height":143},[m
[31m-		{"id":"bb9dee808d557480","type":"text","text":"methodes","x":60,"y":-386,"width":136,"height":50},[m
[32m+[m		[32m{"id":"a1b8157847fc3db4","type":"text","text":"<h1>user</h1>\nseles\n","x":-620,"y":-433,"width":123,"height":143,"color":"2"},[m
 		{"id":"66966b78be2a2126","type":"text","text":"create","x":260,"y":-569,"width":120,"height":60,"color":"1"},[m
 		{"id":"3a4670d36d4576c0","type":"text","text":"delete","x":287,"y":-496,"width":153,"height":60,"color":"1"},[m
 		{"id":"8e1ccb32d2dff566","type":"text","text":"update","x":298,"y":-423,"width":122,"height":60,"color":"1"},[m
 		{"id":"c63fbb78edf36e45","type":"text","text":"gitAll","x":302,"y":-240,"width":115,"height":53,"color":"6"},[m
 		{"id":"89287fbe93378384","type":"text","text":"getOne","x":299,"y":-330,"width":129,"height":50,"color":"6"},[m
[31m-		{"id":"73f2400757b127be","type":"text","text":"sorted","x":516,"y":-300,"width":124,"height":50},[m
[31m-		{"id":"719fe6d5d95f65a0","type":"text","text":"filter","x":524,"y":-195,"width":109,"height":50},[m
[31m-		{"id":"494f5a3f975c1570","type":"text","text":"pages","x":527,"y":-103,"width":113,"height":50},[m
[31m-		{"id":"d818569152102985","type":"text","text":"user interface ","x":-900,"y":-391,"width":185,"height":60,"color":"6"},[m
[31m-		{"id":"d5ff411acc5eee45","type":"text","text":"update","x":-522,"y":-829,"width":122,"height":60},[m
[31m-		{"id":"c7a96ab4e4335228","type":"text","text":"getOne","x":-521,"y":-736,"width":129,"height":50},[m
[31m-		{"id":"9ede774dbafa3e5e","type":"text","text":"gitAll","x":-522,"y":-669,"width":115,"height":53},[m
[31m-		{"id":"72018192b88b9a3a","type":"text","text":"create","x":-729,"y":-829,"width":120,"height":60},[m
[31m-		{"id":"8c578a47b3f8b105","type":"text","text":"delete","x":-867,"y":-724,"width":120,"height":55},[m
[31m-		{"id":"09c472f01c48a8bc","type":"text","text":"login","x":-878,"y":-600,"width":131,"height":56},[m
[31m-		{"id":"3d054ef502b3ba5a","type":"text","text":"singup","x":-1040,"y":-534,"width":125,"height":50},[m
[31m-		{"id":"fb0a07f9bdde115d","type":"text","text":"updateMe","x":-1227,"y":-411,"width":187,"height":50},[m
[31m-		{"id":"454dc00e4da57276","type":"text","text":"deleteMe","x":-1227,"y":-305,"width":160,"height":61},[m
[31m-		{"id":"2a3590e99eaf8752","type":"text","text":"showMe","x":-1147,"y":-170,"width":187,"height":60},[m
[31m-		{"id":"861d5924560ca6bb","type":"text","text":"methodes","x":-153,"y":-73,"width":147,"height":50},[m
[31m-		{"id":"4c6537aaf201720f","type":"text","text":"update","x":-28,"y":40,"width":122,"height":60},[m
[31m-		{"id":"4c9c301618e46b6a","type":"text","text":"create","x":-278,"y":40,"width":120,"height":60},[m
[31m-		{"id":"a09ace102ae39c8d","type":"text","text":"delete","x":-320,"y":-73,"width":120,"height":50},[m
[31m-		{"id":"f97569a59b464d14","type":"text","text":"getOne","x":30,"y":-73,"width":129,"height":50},[m
[31m-		{"id":"a1cdecc5c7b2b7f1","type":"text","text":"<h2>seles</h2>\nbookID\nUserID\n","x":-480,"y":-220,"width":120,"height":100},[m
[31m-		{"id":"a62ee6a6e2cd28e3","type":"text","text":"methodes","x":-717,"y":-53,"width":167,"height":55},[m
[31m-		{"id":"8ca2b4592e2349fd","type":"text","text":"bay","x":-984,"y":-53,"width":138,"height":52},[m
[31m-		{"id":"c3f7515ee842c85b","type":"text","text":"cancel","x":-765,"y":100,"width":145,"height":62},[m
[31m-		{"id":"93ca5f9f4c6bbbf8","type":"text","text":"trucking","x":-967,"y":100,"width":160,"height":55},[m
[31m-		{"id":"50042e1a17795a53","type":"text","text":"butInBasct","x":-574,"y":79,"width":154,"height":52},[m
[31m-		{"id":"b2a1d9380534c5ad","type":"text","text":"deleteBasct","x":-414,"y":137,"width":169,"height":50},[m
[31m-		{"id":"383721094bb12778","type":"text","text":"<h2> review</h2>\nuserID\nBookID","x":-399,"y":-449,"width":140,"height":173},[m
[31m-		{"id":"970baec0bacb3328","type":"text","text":"<h1>author</h1>\nbooksID","x":-325,"y":-622,"width":172,"height":101},[m
[31m-		{"id":"26f4e515de961212","type":"text","text":"delete","x":-348,"y":-774,"width":120,"height":50},[m
[31m-		{"id":"9f2f50c883d7141d","type":"text","text":"create","x":-315,"y":-881,"width":120,"height":60},[m
[31m-		{"id":"178a7eaf0c07578d","type":"text","text":"methodes","x":-170,"y":-774,"width":147,"height":50},[m
[31m-		{"id":"07086e366ceaf887","type":"text","text":"update","x":-23,"y":-876,"width":122,"height":60},[m
[31m-		{"id":"f5c39eec6d7054e7","type":"text","text":"getOne","x":63,"y":-774,"width":129,"height":50},[m
[31m-		{"id":"cf5a69ba79ab93be","type":"text","text":"gitAll","x":60,"y":-685,"width":115,"height":53},[m
[31m-		{"id":"0378c90875478b1b","type":"text","text":"Admin interfacemethodes","x":-703,"y":-572,"width":140,"height":50,"color":"1"}[m
[32m+[m		[32m{"id":"73f2400757b127be","type":"text","text":"sorted","x":516,"y":-300,"width":124,"height":50,"color":"3"},[m
[32m+[m		[32m{"id":"719fe6d5d95f65a0","type":"text","text":"filter","x":524,"y":-195,"width":109,"height":50,"color":"3"},[m
[32m+[m		[32m{"id":"494f5a3f975c1570","type":"text","text":"pages","x":527,"y":-103,"width":113,"height":50,"color":"3"},[m
[32m+[m		[32m{"id":"a1cdecc5c7b2b7f1","type":"text","text":"<h2>sales</h2>\nbookID\nUserID\n","x":-480,"y":-220,"width":151,"height":100,"color":"2"},[m
[32m+[m		[32m{"id":"a62ee6a6e2cd28e3","type":"text","text":"methodes","x":-717,"y":-53,"width":167,"height":55,"color":"5"},[m
[32m+[m		[32m{"id":"383721094bb12778","type":"text","text":"<h2> review</h2>\nuserID\nBookID","