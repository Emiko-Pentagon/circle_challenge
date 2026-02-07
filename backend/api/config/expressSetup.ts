import express from 'express';
import morgan from 'morgan';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import { renderFile } from 'ejs';
import cors from 'cors';
import { config } from '../config';
// import { APIErrorHandler, badDataErrorhandler, defaultErrorHandler, multerErrorHandler, routeNotFoundHandler } from '../middlewares/handleError';
import { apiRoutes } from '../routes';
import { sequelize } from '../config/sequelize';

export const PORT = config.port || 3000;
export const IS_DEV_MODE = config.mode === 'dev';

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.connectDatabase(); 
    this.routes();
    this.errorHandler();
  }

  private config(): void {
    this.app.set('port', PORT || 3000);
    this.app.use(morgan('combined'));
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname, '../../public')));
    this.app.use('/images', express.static(path.join(__dirname, '../../public/images2')));
    this.app.use(bodyParser.json({ limit: '10mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
    this.app.use(compression());
    this.app.engine('html', renderFile);
    this.app.set('view engine', 'ejs');
  }

  private async connectDatabase() {
    try {
      await sequelize.authenticate();
      console.log('✅ Connected to MySQL database');
      await sequelize.sync(); 
    } catch (err) {
      console.error('❌ Database connection failed:', err);
    }
  }

  private routes(): void {
    this.app.use('/api', apiRoutes);
  }

  private errorHandler(): void {
    // this.app.use(routeNotFoundHandler);
    // this.app.use(APIErrorHandler);
    // this.app.use(badDataErrorhandler);
    // this.app.use(multerErrorHandler);
    // this.app.use(defaultErrorHandler);
  }
}
