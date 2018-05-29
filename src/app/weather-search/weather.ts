export class Weather {
  constructor(
    public city?: number,
    public state?: string
  ) {

  }

  isValid() {
    return (this.city && this.state)
  }
}
