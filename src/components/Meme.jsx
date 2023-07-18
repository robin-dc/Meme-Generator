import { useEffect } from "react";
import { useState } from "react";
import Card from "./Card";

function Meme() {
    const [allMemes, setAllMemes] = useState(null)
    const [meme, setMeme] = useState({
        topText: '',
        bottomText: '',
        memeImage: 'https://imgflip.com/s/meme/X-X-Everywhere.jpg'
    })
    const [randomNumber, setRandomNumber] = useState(0)

    useEffect(() => {

        async function fetchData(){
            const response = await fetch('https://api.imgflip.com/get_memes')
            const data = await response.json()
            setAllMemes(data.data.memes)
        }
        fetchData()

    }, [randomNumber])

    function handleSubmit(e){
        e.preventDefault()
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        setRandomNumber(randomNumber)
        const newUrl = allMemes[randomNumber].url
        setMeme(prevMeme => ({...prevMeme, memeImage: newUrl}))
    }
    function handleChange(e){
        const {name, value} = e.target
        setMeme(prevMeme => ({...prevMeme, [name]: value}))
    }

    const {topText, bottomText, memeImage} = meme

    return (
        <main className="meme">
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <input
                        type="text"
                        placeholder="Text on top."
                        name="topText"
                        value={topText}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Text on bottom."
                        name="bottomText"
                        value={bottomText}
                        onChange={handleChange}
                    />
                </div>
                <button>Get a new meme image</button>
            </form>
            <Card url={memeImage} topText={topText} bottomText={bottomText}/>
        </main>
     );
}

export default Meme;
