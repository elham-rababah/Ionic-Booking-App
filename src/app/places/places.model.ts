export class Place {
  constructor(
    public id: string,
    public title: string,
    public descriptions: string,
    public url: string,
    public price: number,
    public availableFrom: Date,
    public availableTo: Date,
    public userId: string
  ) {}
}
