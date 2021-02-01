import { AxiosResponse } from "axios";
import { Ref } from "vue";
import axios from "../Http";
import URLS from '../Http/URLS';
import { IGoodsListResult, TableItem } from '../js/commType';
export async function getData(Table: Ref<Array<TableItem>>, total: Ref<number>, page: Ref<number>, size: Ref<number>) {

    const res: AxiosResponse<IGoodsListResult> = await axios.get(URLS.getGoodsAll, {
        params: {
            page: page.value,
            size: size.value
        }
    });
    Table.value = res.data.data.data;
    total.value = res.data.data.total;
    return res;
}