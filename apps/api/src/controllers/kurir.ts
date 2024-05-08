import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import querystring from 'querystring';
import { Prisma } from '@prisma/client';
import { prisma } from '..';
import { v4 as uuidv4 } from 'uuid';
interface City {
  city_id: string;
  city_name: string;
  // Define other properties if needed
}

export const kurirController = {
  async getKurirPrice(req: Request, res: Response, next: NextFunction) {
    const { weight, userCity, storeCity, kurir } = req.body;
    try {
      const response = await axios.get(
        'https://api.rajaongkir.com/starter/city',
        {
          headers: {
            key: 'e3c1c510dc880c4c0e7adde76b0639db',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      const cities: City[] = response.data.rajaongkir.results;
      let userAddress = userCity;
      let storeAddress = storeCity;

      if (userCity == 'Special Region of Jakarta') {
        userAddress = 'Jakarta Pusat';
      }
      if (storeCity == 'Special Region of Jakarta') {
        storeAddress = 'Jakarta Pusat';
      }

      let userCityId = cities.filter((city) => city.city_name == userAddress);
      let storeCityId = cities.filter((city) => city.city_name == storeAddress);

      let userKota;
      let storeKota;
      if (userCityId.length > 1) {
        userKota = userCityId[1];
      } else {
        userKota = userCityId[0];
      }
      if (storeCityId.length > 1) {
        storeKota = storeCityId[1];
      } else {
        storeKota = userCityId[0];
      }

      const data = querystring.stringify({
        origin: storeKota.city_id,
        destination: userKota.city_id,
        weight: weight,
        courier: kurir,
      });

      const config = {
        headers: {
          key: 'e3c1c510dc880c4c0e7adde76b0639db',
          'content-type': 'application/x-www-form-urlencoded',
        },
      };

      let kurirCostRes = await axios.post(
        'https://api.rajaongkir.com/starter/cost',
        data,
        config,
      );

      res
        .status(200)
        .json(kurirCostRes.data.rajaongkir.results[0].costs[0].cost[0]);
    } catch (error) {
      console.error('Error getting city:', error);
      res.status(500).json({ error: error });
    }
  },
};
