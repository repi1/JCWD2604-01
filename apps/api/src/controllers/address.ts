import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '..';
import { v4 as uuidv4 } from 'uuid';

export const addressController = {
  // Read all Address of a user

  async getAllUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const addresses = await prisma.addresses.findMany({
        where: {
          userId: id,
        },
      });
      res.status(200).json(addresses);
    } catch (error) {
      console.error('Error fetching Address:', error);
      res.status(500).json({ error: 'Failed to fetch Address' });
    } finally {
      await prisma.$disconnect();
    }
  },

  // Read address based on id
  async getAnUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const address = await prisma.addresses.findMany({
        where: {
          userId: id,
        },
      });
      res.status(200).json(address);
    } catch (error) {
      console.error('Error fetching Address:', error);
      res.status(500).json({ error: 'Failed to fetch Address' });
    } finally {
      await prisma.$disconnect();
    }
  },

  // Create Address
  async createAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, latitude, longitude, city, streetName } = req.body;

      const addresses = await prisma.addresses.create({
        data: {
          id: uuidv4(),
          userId,
          latitude,
          longitude,
          streetName,
          city,
        },
      });
      res.status(201).json(addresses);
    } catch (error) {
      console.error('Error Creating Address:', error);
      res.status(500).json({ error: 'Failed to fetch Address' });
    } finally {
      await prisma.$disconnect();
    }
  },

  // Delete Address based on id
  async deleteAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { addressId } = req.params;

      const addresses = await prisma.addresses.delete({
        where: {
          id: addressId,
        },
      });
    } catch (error) {
      console.error('Error Creating Address:', error);
      res.status(500).json({ error: 'Failed to fetch Address' });
    } finally {
      await prisma.$disconnect();
    }
  },

  // Update Address
};
