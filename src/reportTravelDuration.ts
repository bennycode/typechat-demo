import {Client} from '@googlemaps/google-maps-services-js';
import {assertMode} from './assertMode.js';
import type {Travel} from './schema.js';

export async function reportTravelDuration({origin, destination, mode}: Travel) {
  const key = `${process.env.GOOGLE_MAPS_API_KEY}`;
  const client = new Client();

  assertMode(mode);

  const response = await client.distancematrix({
    params: {
      destinations: [destination],
      key,
      mode,
      origins: [origin],
    },
  });

  const data = response.data;

  if (data.status === 'OK') {
    const {distance, duration} = data.rows[0].elements[0];
    return `The distance is ${distance.text} and it will take you ${duration.text}.`;
  }
  throw new Error('Unable to calculate distance.');
}
