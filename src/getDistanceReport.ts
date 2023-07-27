import {Client} from '@googlemaps/google-maps-services-js';
import {assertMode} from './assertMode.ts';
import type {Travel} from './schema';

export async function getDistanceReport({origin, destination, mode}: Travel): Promise<string> {
  const key = `${process.env.GOOGLE_MAPS_API_KEY}`;
  const client = new Client();

  assertMode(mode);

  const response = await client.distancematrix({
    params: {
      key,
      origins: [origin],
      destinations: [destination],
      mode,
    },
  });

  const data = response.data;

  if (data.status === 'OK') {
    const {distance, duration} = data.rows[0].elements[0];
    return `The distance is ${distance.text} and it will take you ${duration.text}.`;
  }
  throw new Error('Unable to calculate distance.');
}
