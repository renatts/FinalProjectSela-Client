import { AirPlane } from './airPlane';

export class SpotData {
  Spot: string;
  IsAvailable: boolean;
  PlaneOnSpot: AirPlane;
  OccupiedSince: Date;
  IsEmergency: boolean; // added

  constructor() {}
}
