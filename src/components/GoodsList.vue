<template>
  <a-table :data-source="Table" :pagination="false">
    <a-table-column key="ID" data-index="id" ellipsis align="center">
      <template #title><span>ID</span></template>
    </a-table-column>
    <a-table-column key="title" data-index="title" ellipsis align="center">
      <template #title><span>标题</span></template>
    </a-table-column>
    <a-table-column key="desc" dataIndex="desc" ellipsis align="center">
      <template #title><span>描述</span></template>
    </a-table-column>
    <a-table-column key="category" dataIndex="category" ellipsis align="center">
      <template #title><span>类目</span></template>
    </a-table-column>
    <a-table-column
      key="price"
      title="预售价格"
      dataIndex="price"
      ellipsis
      align="center"
    >
      <template #default="{ text: price }">
        <span>{{ price }}</span>
      </template>
    </a-table-column>

    <a-table-column
      key="price_off"
      title="折扣价格"
      dataIndex="price_off"
      ellipsis
      align="center"
    >
      <template #default="{ text: price_off }">
        <span>{{ price_off }}</span>
      </template>
    </a-table-column>

    <a-table-column
      key="tags"
      title="标签"
      dataIndex="tags"
      align="center"
      width="200px"
    >
      <template #default="{ text: tags }">
        <span
          ><a-tag color="green" v-for="tag in tags" :key="tag">
            {{ tag }}
          </a-tag></span
        >
      </template>
    </a-table-column>

    <a-table-column
      key="inventory"
      dataIndex="inventory"
      ellipsis
      align="center"
    >
      <template #title><span>限制购买数量</span></template>
    </a-table-column>

    <a-table-column
      key="title"
      title="上架状态"
      dataIndex="status"
      ellipsis
      align="center"
    >
      <template #default="{ text: status }">
        <span>{{ status === 1 ? "上架" : "下架" }}</span>
      </template>
    </a-table-column>

    <a-table-column key="ctrl" title="操作" ellipsis align="center">
      <template #default="{ text: table }">
        <a-popconfirm
          title="确定是否删除"
          ok-text="删除"
          cancel-text="返回"
          @confirm="onDelete(table.id)"
        >
          <a-button type="danger" size="small" class="deleteBtn">
            <template #icon><DeleteFilled /></template>
          </a-button>
        </a-popconfirm>

        <a-button type="primary" size="small">
          <template #icon><EditFilled /></template>
        </a-button>
      </template>
    </a-table-column>
  </a-table>
</template>

<script lang="ts">
interface IState {
  Table: Ref<TableItem[]>;
  total: Ref<number>;
  page: Ref<number>;
  size: Ref<number>;
  onDelete: (id: number) => void;
}
import { defineComponent, Ref, ref, h } from "vue";
import { getData } from "../js/goodsList";
import { TableItem } from "../js/commType";
import { DeleteFilled, EditFilled } from "@ant-design/icons-vue";

const Table: Ref<Array<TableItem>> = ref([]); // b表格数据
const total: Ref<number> = ref(0); // 总数
const page: Ref<number> = ref(1); // 当前页数
const size: Ref<number> = ref(10); // 每页条数

export default defineComponent({
  components: {
    DeleteFilled,
    EditFilled,
  },
  setup(): IState {
    /**
     * 根据id删除某一项
     */
    const onDelete = (id: number) => {
      // 还没写 现在能获取到id
      console.log(id);
    };
    getData(Table, total, page, size);
    return {
      Table,
      total,
      page,
      size,
      onDelete,
    };
  },
});
</script>

<style scoped>
.deleteBtn {
  margin-right: 10px;
}
</style>