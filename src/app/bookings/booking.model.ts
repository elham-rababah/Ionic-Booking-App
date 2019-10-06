export class Booking {
  constructor(
    public id: string,
    public userId: string,
    public placeId: string,
    public placeTitle: string,
    public placeImg: string,
    public FName: string,
    public LName: string,
    public guestNum: number,
    public dateTo: Date,
    public dateFrom: Date
  ) {}
}
