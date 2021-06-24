export class AirPlane {
  PlaneId: number;
  SerialID: number;
  Src: string;
  Dst: string;
  PlanesPurpose: string; 
  StartedProcess: boolean;
  CurrentSpot: string;
  SpotArrivalDateTime: Date;
  FinishedProcess: boolean;
  IsEmergency: boolean;

  constructor() {}
}
