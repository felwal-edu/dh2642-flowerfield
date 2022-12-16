

function SortView(props){

    function onSortChangeACB(evt) {
        props.onSort(evt);
    }

    return (
        <v-toolbar-items>
            <v-select
              class="pl-2 mt-2 mr-3"
              model-value={props.sort}
              items={["Genus A-Z", "Genus Z-A"]}
              onUpdate:modelValue={onSortChangeACB}
            ></v-select>
        </v-toolbar-items>
    );
}