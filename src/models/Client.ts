export class Client {
    constructor(
        public readonly id: number,
        public readonly workspaceId: number,
        public readonly name: string,
        public readonly at: string,
        public readonly notes: string,
        public readonly hourlyRate: number,
        public readonly currency: string,
    ) {}
}
