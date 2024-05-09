import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import querystring from 'querystring';
import { Prisma } from '@prisma/client';
import { prisma } from '..';
import { v4 as uuidv4 } from 'uuid';

export const storeController = {
  async getAllStoreAddress(req: Request, res: Response, next: NextFunction) {
    const addresses = await prisma.stores.findMany();
    res.status(200).json(addresses);
  },
};
