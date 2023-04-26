import { v4 as UUIDV4 } from 'uuid';

class Category {
    id?: string;
    name: string;
    description: string;
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = UUIDV4();
        }
    }
}

export { Category };
