import SortView from "@/views/sortView.js";
import SearchView from "@/views/searchView.js";

function ToolBarView(props) {

    function onClearACB(evt) {
        props.resetSearch();
    }

    function onEnterACB(evt) {
        props.onSearch();
    }

    function onInputACB(query) {
        props.updateQuery(query);
    }

    function onSortACB(order) {
        props.onSort(order);
    }

    return (
        <v-toolbar color="#96c29f">
            <v-toolbar-title>
                <h2 class="header-font-collection">{props.username == "" ? "Your Collection" : props.username + "'s Collection"}</h2>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <SearchView
                updateQuery={onInputACB}
                onSearch={onEnterACB}
                resetSearch={onClearACB}
            />
            <v-toolbar-items>
                <SortView
                    sort={props.sortStatus}
                    onSort={onSortACB}
                />
            </v-toolbar-items>
        </v-toolbar>
    );
}

export default ToolBarView;
