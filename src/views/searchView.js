
function SearchView(props) {

    function onClearACB(evt) {
        props.resetSearch();
    }

    function onIconClickACB(evt) {
        props.onSearch();
    }

    function onEnterACB(evt) {
        if (evt.key === "Enter"){
            props.onSearch();
        }
    }

    function onInputACB(query) {
        props.updateQuery(query);
    }



    return (
        <v-text-field
            class="mt-8 mr-2"
            append-icon="mdi-magnify"
            placeholder="Search"
            clearable
            onClick:clear={onClearACB}
            onClick:append={onIconClickACB}
            onkeydown={onEnterACB}
            onUpdate:modelValue={onInputACB}
        ></v-text-field>
    );
}

export default SearchView;
