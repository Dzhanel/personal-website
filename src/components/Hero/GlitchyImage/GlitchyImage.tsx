import "./glitchy-image.css"


interface GlitchyImageProps {
  src: string;
}

export default function GlitchyImage({src}: GlitchyImageProps)
{
  console.log(src);
  return (
  <div className={`imgWrap absolute bottom-0 left-1/2 -translate-x-1/2 w-220 z-20 brightness-90`} >
    <img className="red absolute inset-0" src={src}/>
    <img className="green absolute inset-0" src={src}/>
    <img className="blue absolute inset-0" src={src}/>
    <p className="text"><span>Glitch effect!</span></p>
  </div>
  )
}