import SortView from "@/views/sortView.js";
import SearchView from "@/views/searchView.js";

function ToolbarView(props) {
  function onResetSearchACB(evt) {
    props.resetSearch();
  }

  function onEnterACB(evt) {
    props.onSearch();
  }

  function onQueryChangeACB(query) {
    props.onQueryChange(query);
  }

  function onSortACB(order) {
    props.onSort(order);
  }

  return (
    <v-toolbar color="var(--color-green-light)">
      <v-toolbar-title>
        <h2 class="header-font-collection">{props.userName == "" ? "Your Collection" : props.userName + "'s Collection"}</h2>
      </v-toolbar-title>
      <SearchView
        updateQuery={onQueryChangeACB}
        onSearch={onEnterACB}
        resetSearch={onResetSearchACB} />
      <v-toolbar-items>
        <SortView
          sort={props.sortStatus}
          onSort={onSortACB} />
      </v-toolbar-items>
    </v-toolbar>
  );
}

export default ToolbarView;
