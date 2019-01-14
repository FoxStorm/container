interface ServiceSupportable {
  readonly serviceSupports: any[],
}

export interface ServiceType extends ServiceSupportable {
  makeService(): this
}

export class BaseServiceType implements ServiceSupportable {
  readonly serviceSupports: any[] = []
}
