import  express, { Express, Response, Request} from 'express';

const webServer: Express = express(); 
webServer.engine('html', require('ejs').renderFile);


const indexRoutes = ['/', '/1.html', '/2.html'];

indexRoutes.forEach((route) => {
  webServer.get(route, function (req: Request, res: Response) {
    res.render('../src/app/index.html');
  });
});

export { webServer };


 