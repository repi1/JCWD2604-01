/** @format */

import express, {
  Application,
  Response,
  Request,
  NextFunction,
  request,
  response,
} from 'express';
import { PrismaClient } from '@prisma/client';
import { routes } from './routes';
import cors from 'cors';
import { config } from 'dotenv';
import path from 'path';
config();

export const prisma = new PrismaClient();

export const secretKey = String(process.env.secretKey);
const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(
  '/public/events',
  express.static(`${__dirname}/public/images/event_images`),
);

const PORT = process.env.PORT;

//routes
app.use('/users', routes.userRoutes);
app.use('/products', routes.productRoutes);
app.use('/productPhotos', routes.productPhotosRoutes, (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.json({ status: 'Files Received' });
});
app.use('/categories', routes.categoryRoutes);
app.use('/summaries', routes.summarryRoutes);
app.use('/sales', routes.salesReportRoutes);
// app.use('/transactions', routes.transactionRoutes);
app.use('/profile', routes.profileRoutes);
app.use('/cart', routes.cartRoutes);
app.use('/address', routes.addressRoutes);
app.use('/order', routes.cartRoutes);
app.use(express.static(path.join(__dirname, 'images')));

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: error.message || 'internal server error' });
}); //error handler

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('page not found'); //page not found handler
});

app.listen(PORT, () => {
  console.log('api is running on port', PORT);
});

//geolocation
// const opencage = require('opencage-api-client');

// opencage
//   .geocode({ q: '37.4396, -122.1864', language: 'fr' })
//   .then((data) => {
//     // console.log(JSON.stringify(data));
//     if (data.status.code === 200 && data.results.length > 0) {
//       const place = data.results[0];
//       console.log(place.formatted);
//       console.log(place.components.road);
//       console.log(place.annotations.timezone.name);
//     } else {
//       console.log('status', data.status.message);
//       console.log('total_results', data.total_results);
//     }
//   })
//   .catch((error) => {
//     console.log('error', error.message);
//     if (error.status.code === 402) {
//       console.log('hit free trial daily limit');
//       console.log('become a customer: https://opencagedata.com/pricing');
//     }
//   });

// ... prints
// 1330 Middle Avenue, Menlo Park, Californie 94025, États-Unis d'Amérique
// Middle Avenue
// America/Los_Angeles
