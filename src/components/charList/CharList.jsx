import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
    newItemsLoading: false,
    offset: 210,
    noChars: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharsListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharsListLoaded)
      .catch(this.onError);
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  updateChars = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharsListLoaded)
      .catch(this.onError);
  };

  onCharsListLoading = () => {
    this.setState({
      newItemsLoading: true,
    });
  };

  onCharsListLoaded = (newChars) => {
    let noMoreChars = false;

    if (newChars.length < 9) {
      noMoreChars = true;
    }
    this.setState(({ chars, offset }) => ({
      chars: [...chars, ...newChars],
      loading: false,
      newItemsLoading: false,
      offset: offset + 9,
      noChars: noMoreChars,
    }));
  }; 

  itemRefs = [];

  setRef = (ref) => {
    this.itemRefs.push(ref);
  };

  focusOnItem = (id) => {
    this.itemRefs.forEach((item) => {
      console.log(item);
      item.classList.remove("char__item_selected");
    });
    this.itemRefs[id].classList.add("char__item_selected");
    this.itemRefs[id].focus();
  };

  render() {
    const { chars, loading, error, newItemsLoading, offset, noChars } =
      this.state;

    const listItem = chars.map((char, index) => {
      const { thumbnail, name, id } = char;

      const notAvailableImg =
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

      return (
        <li
          key={id}
          onClick={() => {
            this.props.onCharSelected(id);
            this.focusOnItem(index);
          }}
          ref={this.setRef}
          tabIndex={0}
          className={"char__item"}
          onKeyPress={(e) => {
            if (e.key === " " || e.key === "Enter") {
              this.props.onCharSelected(char.id);
              this.focusOnItem(index);
            }
          }}
        >
          <img
            src={thumbnail}
            style={
              thumbnail === notAvailableImg ? { objectFit: "unset" } : null
            }
            alt={name}
          />
          <div className='char__name'>{name}</div>
        </li>
      );
    });

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? listItem : null;

    return (
      <div className='char__list'>
        <ul
          className='char__flex'
          style={loading || error ? { display: "block" } : null}
        >
          {errorMessage}
          {spinner}
          {content}
        </ul>
        <button
          className='button button__main button__long'
          style={{ display: noChars ? "none" : "block" }}
          disabled={newItemsLoading}
          onClick={() => this.onRequest(offset)}
        >
          <div className='inner'>load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
