import type {TravelMode} from '@googlemaps/google-maps-services-js';

export function assertMode(input: string): asserts input is TravelMode {
  if (!['walking', 'bicycling', 'driving'].includes(input)) {
    throw new Error(`Unsupported travel mode: ${input}`);
  }
}
