type IMigration = {
  run(): void
}

export namespace IMigration {
  type Constructor<T> = {
    new (...args: any[]): T
    readonly prototype: T
  }
  const implementations: Constructor<IMigration>[] = []

  export function GetImplementations(): Constructor<IMigration>[] {
    return implementations
  }

  export function register<T extends Constructor<IMigration>>(ctor: T) {
    console.log('register', ctor)
    implementations.push(ctor)
    return ctor
  }
}
