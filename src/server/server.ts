import  express, { Express, Response, Request} from 'express';
import path from 'path';

const server: Express = express(); 
server.engine('js', require('ejs').renderFile);

server.get('/', function (req: Request, res: Response) {
    res.render(path.resolve('dist/client/tracker.js'));
});

server.post('/track', function (req: Request, res: Response) {
    console.log('===============================================');

    console.log(new Date().toISOString());
    

    console.log('===============================================');
});


export { server };
 