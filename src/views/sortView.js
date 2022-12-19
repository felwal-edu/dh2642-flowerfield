function SortView(props) {

    function onSortChangeACB(order) {
        props.onSort(order);
    }

    return (
        <v-select
            class="pl-2 mt-2 mr-3"
            model-value={props.sort}
            items={["Name A-Z", "Name Z-A"]}
            onUpdate:modelValue={onSortChangeACB}
        ></v-select>
    );
}

export default SortView;
