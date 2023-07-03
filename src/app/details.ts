export class Details {
    constructor(
        public name: string,
        public phone: string,
        public email: string,
        public comments: string,
        public timeslot: string | null = null,
        public date: string | null = null,
        public service: string,
        public selectedService: string
    ) {}
}
