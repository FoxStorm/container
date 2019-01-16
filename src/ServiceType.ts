interface ServiceSupportable {
  readonly serviceSupports: any[],
}

export interface ServiceType<U> {
  makeService (str: string): U
}

export class BaseServiceType implements ServiceSupportable {
  readonly serviceSupports: any[] = []
}
