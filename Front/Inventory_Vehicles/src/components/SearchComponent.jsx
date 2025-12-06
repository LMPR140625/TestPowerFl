import ButtonSearch from "./ButtonSearch";
import InputSearch from "./InputSearch";

const SearchComponent = (props) => {
    return(
        <>
            <div className="flex pt-5 pb-10">
                <InputSearch textHolder={props.textHolder} onInputChange={props.onInputChange}/>
                <ButtonSearch onClickButton={props.onClickButton} />
            </div>
        </>
    );
}

export default SearchComponent;