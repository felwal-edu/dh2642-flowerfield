import log from "@/utils/logUtils";


function SearchView(props){

    function onIconClickACB(evt){
        if (props.searchStatus){ //FIX (cant check searchstatus before doing searchACB)
          props.onSearch();
        } else {
          log.d(props.searchStatus);
        }
    }

    function onInputACB(evt){
        props.updateQuery(evt);
    }

    return (
        <v-text-field
            class="mt-8 mr-2"
            loading={props.searchStatus}
            append-icon={props.icon}
            onClick:append={onIconClickACB}
            onUpdate:modelValue={onInputACB}
        ></v-text-field>
    );
}
