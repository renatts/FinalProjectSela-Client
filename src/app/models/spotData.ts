import { AirPlane } from './airPlane';

export class SpotData {
  Spot: string;
  IsAvailable: boolean;
  PlaneOnSpot: AirPlane;
  OccupiedSince: Date;
  IsActive: boolean; // added

  constructor() {}
}
