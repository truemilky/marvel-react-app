import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import MarvelService from "../../services/MarvelService";
import "./charInfo.scss";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { charId } = this.props;

    if (!charId) {
      return;
    }

    this.onCharLoading();
    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onCharLoading = () => {
    this.setState({ loading: true });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  render() {
    const { char, loading, error } = this.state;

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? (
      <VisibleContent char={char} />
    ) : null;

    return (
      <div className='char__info' style={!skeleton ? {overflowY: 'scroll', height: 450} : null}>
        <div className='char__info-wrapper'>
          {skeleton}
          {errorMessage}
          {spinner}
          {content}
        </div>
      </div>
    );
  }
}

const VisibleContent = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const notAvailableImg =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  return (
    <>
      <div className='char__basics'>
        <img
          src={thumbnail}
          alt={name}
          style={thumbnail === notAvailableImg ? { objectFit: "unset" } : null}
        />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a href={homepage} className='button button__main char__info-btn'>
              <div className='inner'>homepage</div>
            </a>
            <a href={wiki} className='button button__secondary'>
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>{description}</div>
      <div className='char__comics'>
        {comics.length === 0
          ? "There is no any comics with this character =("
          : "Comics:"}
      </div>
      <ul className='char__comics-list'>
        {comics.map((item, i) => {
          if (i >= 10) {
            return null;
          }
          return (
            <li key={i} className='char__comics-item'>
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
