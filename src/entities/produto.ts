import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./category";

@Entity("produto")
export class Produto {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    category_id: string;

    @Column()
    quantidade: number;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP + INTERVAL '40 days'",
    })
    validade: Date;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    };

}