export type TableItem = {
    id: number;
    title: string;
    desc: string;
    category: number;
    price: number;
    price_off: number;
    tags: string[];
    inventory: number;
    status: 0 | 1; // 0是上架 1是下架
};

export interface IGoodsListResult {
    data: {
        data: Array<TableItem>,
        total: number
    },
    msg: string,
    status: string
}