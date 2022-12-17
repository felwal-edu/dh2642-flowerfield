
function SearchView(props) {

    function onClearACB(evt) {
        props.resetSearch();
    }

    function onIconClickACB(evt) {
        props.onSearch();
    }

    function onInputACB(evt) {
        props.updateQuery(evt);
    }

    return (
        <v-text-field
            class="mt-8 mr-2"
            append-icon="mdi-magnify"
            placeholder="Search"
            clearable
            onClick:clear={onClearACB}
            onClick:append={onIconClickACB}
            onUpdate:modelValue={onInputACB}
        ></v-text-field>
    );
}

export default SearchView;
