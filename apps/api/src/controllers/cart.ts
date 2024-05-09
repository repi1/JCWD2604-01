import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '..';
import Decimal from 'decimal.js';

export const cartController = {
  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const cartItems = await prisma.carts.findMany({
        where: {
          userId: req.params.id,
        },
        include: {
          products: {
            include: {
              productPhotos: {
                take: 1, // Take only the first photo
              },
            },
          },
        },
      });

      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ error: 'Failed to fetch cart items' });
    } finally {
      await prisma.$disconnect();
    }
  },

  async createCartProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, quantity, userId } = req.body;

      let cartProduct = await prisma.carts.findFirst({
        where: {
          productId,
          userId,
        },
      });

      // If the product is already in the cart, update quantity
      if (cartProduct) {
        cartProduct = await prisma.carts.update({
          where: {
            userId_productId: {
              userId: userId,
              productId: productId,
            },
          },
          data: {
            qty: {
              increment: quantity,
            },
          },
        });
        res
          .status(200)
          .json({ message: 'Cart product updated successfully', cartProduct });
      } else {
        cartProduct = await prisma.carts.create({
          data: {
            productId,
            userId,
            qty: quantity,
          },
        });
        res
          .status(200)
          .json({ message: 'Product added to cart successfully', cartProduct });
      }
    } catch (error) {
      console.error('Error creating/updating cart product:', error);
      res.status(500).json({ error: 'Failed to create/update cart product' });
    } finally {
      await prisma.$disconnect();
    }
  },

  // delete Cart
  async deleteCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.query.userId as string;
      const { productId } = req.params;

      if (!productId || !userId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const cartEntry = await prisma.carts.findFirst({
        where: {
          productId,
          userId,
        },
      });

      if (!cartEntry) {
        return res.status(404).json({ error: 'Cart entry not found' });
      }

      await prisma.carts.delete({
        where: {
          userId_productId: {
            productId: productId,
            userId: userId,
          },
        },
      });

      res.status(200).json({ message: 'Cart entry deleted successfully' });
    } catch (error) {
      console.error('Error deleting cart entry:', error);
      res.status(500).json({ error: 'Failed to delete cart entry' });
    } finally {
      await prisma.$disconnect();
    }
  },
};
