import axios from "axios";
import { useRef, useState } from "react";
import { youtube_parser } from "./utils";


function App() {
  const inputUrlRef = useRef<HTMLInputElement>(null!);
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    const youTubeID = youtube_parser(inputUrlRef.current.value);
    

    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youTubeID
      }
    }
    axios(options)
    .then(res => setUrlResult(res.data.link))
    .catch(err => console.log(err))

    inputUrlRef.current.value = '';
  }

  return (
    <div className="max-w-[900px] mx-auto my-0 px-4 py-0 md:mt-40">
      <section className="flex flex-col items-center mt-60">
        <h1 className=" font-bold text-5xl  text-center mb-4 md:text-[40px]">Youtube MP3 Downloader</h1>
        <p className="font-normal text-xl opacity-90 text-center mb-4">
          Download your preferred music in just a few clicks!
        </p>

        <form 
        onSubmit={handleSubmit}
        className="flex flex-col items-center">
          <input
          ref={inputUrlRef} 
          className="
          flex
          w-full
          rounded-full
          bg-neutral-700
          border
          border-transaparent
          px-3
          py-3
          text-sm
          file:border-0
          file:bg-transparent
          file:text-sm
          file:font-medium
          placeholder:text-neutral-400
          disabled:cursor-not-allowed
          disabled:opacity-50
          focus:outline-none
          max-w-[600px] 
          min-w-[400px]
          mb-4
          hover:opacity-75
          " 
          type="text" 
          placeholder="Paste Youtube URL link here..." />
          <button 
          className="
          w-[100px]
          rounded-full
          bg-green-500
          border
          border-transparent
          px-3
          py-3
          disabled:cursor-not-allowed
          disabled:opacity-50
          text-black
          font-bold
          hover:opacity-75
          transition
          mb-12
          " type="submit">Search</button>
        </form>
        {urlResult ?
        <button 
        type="submit" 
        className="
        bg-transparent
      hover:bg-green-500
      hover:text-black
      text-green-500 
      border-green-500
        border
        font-bold 
        py-2
        px-4 
        rounded 
        inline-flex 
        items-center
        "
        >
        <svg 
        className="
        fill-current w-4 h-4 mr-2 mb-1" 
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
        <a target="_blank" rel="noreferrer" href={urlResult}>Download Mp3</a>
        </button> : ''}
      </section>
    </div>
  )
}

export default App;
