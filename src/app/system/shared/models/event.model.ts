export class NPEvent {
    constructor(
        public type: string,
        public amount: number,
        public category: number,
        public date: number,
        public description: string,
        public id?: number,
        public catName?: string,
        public key?: string
    ) {}
}
