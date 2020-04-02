interface SchoolDiggerResponseInterface {
  schoolMatches: any[];
}

export default class SchoolDiggerResponse
  implements SchoolDiggerResponseInterface {
  public schoolMatches: any[];

  constructor({ schoolMatches = [] }: { schoolMatches: any[] }) {
    this.schoolMatches = schoolMatches;
  }
}
