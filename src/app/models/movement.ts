export class Movement {
  id: Number;
  src_spot: number;
  src_dst: number;
  dst_arrivalOn: Date;

  constructor(
    id: Number,
    src_spot: number,
    src_dst: number,
    dst_arrivalOn: Date
  ) {
    this.id = id;
    this.src_spot = src_spot;
    this.src_dst = src_dst;
    this.dst_arrivalOn = dst_arrivalOn;
  }
}
