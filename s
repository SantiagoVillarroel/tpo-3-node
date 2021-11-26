[33mcommit 3f7772d52c223a9ee7c8fb0175a868b794975f87[m[33m ([m[1;36mHEAD -> [m[1;32mmaster[m[33m)[m
Merge: a239b9e 0b0a3a7
Author: limon <daniel.campos@est.fi.uncoma.edu.ar>
Date:   Fri Nov 26 15:08:03 2021 -0300

    2611charlie1.1

[1mdiff --cc api.js[m
[1mindex 9c45223,6f07d64..952d611[m
[1m--- a/api.js[m
[1m+++ b/api.js[m
[36m@@@ -31,8 -27,10 +31,8 @@@[m [mrouter.post('/inicio/:id/:nombre/:venta[m
  router.put('/inicio', function(req, res) {[m
     res.send();[m
  });[m
[31m- */[m
[32m+ [m
[31m -router.get('/dolares', function(req, res){[m
[31m -   //dolares?tipo=blue&cantidad=10&desde=0[m
[31m -   //librerias para validar - joi[m
[32m +/*router.get('/historico/:id', function(req, res){[m
     const cantidad=req.query.cantidad;[m
     const desde=req.query.desde;[m
     res.send((datosHistorico[req.params.id]).slice[desde, desde+cantidad]);[m
[1mdiff --cc index.js[m
[1mindex 2f4e9f3,3b20e9e..45f9ead[m
[1m--- a/index.js[m
[1m+++ b/index.js[m
[36m@@@ -10,8 -10,10 +10,10 @@@[m [mvar api = require('./api.js')[m
  [m
  app.use('/api', api);[m
  [m
[31m- const port=3000;[m
[31m- app.listen(port, () => console.log('server on port ',port));[m
[32m+ const port = process.env.PORT || 3000;[m
  [m
[31m- //Santi gato (charly gil). probando commit desde la bitacora de charlie[m
[31m- //Comment de prueba PRUEBA CLONE[m
[32m+ app.listen(port);[m
[32m+ [m
[32m+ //Comment de prueba PRUEBA CLONE[m
[32m+ [m
[31m -//const y let, no var - variable de entorno nro de puerto[m
[32m++//const y let, no var - variable de entorno nro de puerto[m
[33mcommit 3f7772d52c223a9ee7c8fb0175a868b794975f87[m[33m ([m[1;36mHEAD -> [m[1;32mmaster[m[33m)[m
Merge: a239b9e 0b0a3a7
Author: limon <daniel.campos@est.fi.uncoma.edu.ar>
Date:   Fri Nov 26 15:08:03 2021 -0300

    2611charlie1.1

[33mcommit a239b9eb0005cf72b0be2442b62981fdd7a7f17c[m
Author: limon <daniel.campos@est.fi.uncoma.edu.ar>
Date:   Fri Nov 26 15:01:20 2021 -0300

    2611charlie

[33mcommit 0b0a3a700dc9e05d66970f9acc156ca6e3d646ab[m[33m ([m[1;31morigin/master[m[33m, [m[1;31morigin/HEAD[m[33m)[m
Author: Santiago Villarroel <santigibsonsg@gmail.com>
Date:   Fri Nov 26 10:12:04 2021 -0300

    correcciones clase

[33mcommit dfbc3179010e17600e8e60d2cd861f828e791d2a[m
Author: Santiago Villarroel <santigibsonsg@gmail.com>
Date:   Wed Nov 24 23:47:45 2021 -0300

    ultimo commit

[33mcommit 0e1da1be29e0196055653c45335d65797ae4d52a[m
Author: Santiago Villarroel <santigibsonsg@gmail.com>
Date:   Wed Nov 24 22:46:34 2021 -0300

    reordeno archivos - agrego endpoints para GET datos en inicio.html e historico.html

[33mcommit 5c3ac0f71780c026036775bd561236286e289f7f[m
Author: Santiago Villarroel <santigibsonsg@gmail.com>
Date:   Sun Nov 21 19:30:20 2021 -0300

    sirvo static files

[33mcommit edd55ff6f0648ae51ccea3bd411bf0f22ad90a97[m
Merge: 566247b c86c6a3
Author: Santiago Villarroel <santigibsonsg@gmail.com>
Date:   Sun Nov 21 00:03:07 2021 -0300

    Merge branch 'master' of https://github.com/SantiagoVillarroel/tpo-3-node

[33mcommit 566247b3425180521d09a9ee34d72b83ab927202[m
Author: Santiago Villarroel <santigibsonsg@gmail.com>
Date:   Sun Nov 21 00:03:02 2021 -0300

    agrego routes para archivos html

[33mcommit c86c6a37bca829a889749dd547f0bd0cd3424ec5[m
Author: limon <daniel.campos@est.fi.uncoma.edu.ar>
Date:   Sat Nov 20 23:36:21 2021 -0300

    testcharliee

[33mcommit 1139408a8c06b3fa567afad4462ca2d62fbfac2d[m
Author: Santiago Villarroel <santigibsonsg@gmail.com>
Date:   Sat Nov 20 23:27:27 2021 -0300

    prueba clone2

[33mcommit adb4ca50b4466600c0b4af9e5d4bca706b95fe43[m
Author: Santiago Villarroel <santigibsonsg@gmail.com>
Date:   Sat Nov 20 23:25:12 2021 -0300

    prueba clone

[33mcommit 0b0d4fa70f7c92849f8c8517d1516f70d57194f5[m
Author: Santiago Villarroel <santigibsonsg@gmail.com>
Date:   Sat Nov 20 23:13:36 2021 -0300

    agrego más routes

[33mcommit 5b1c823e22d3ff784c5992f4d91a6125fd7ee9e2[m
Author: Santiago Villarroel <santigibsonsg@gmail.com>
Date:   Sat Nov 20 22:27:30 2021 -0300

    tpo3 agrego index.js y things.js
