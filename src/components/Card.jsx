function Card({url, topText, bottomText}) {
    return (
        <div className="meme-img">
            <h1 className="top-text">{topText}</h1>
            <img src={url} alt="" />
            <h1 className="bottom-text">{bottomText}</h1>
        </div>
     );
}

export default Card;
