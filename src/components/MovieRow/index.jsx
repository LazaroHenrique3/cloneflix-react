import { useState } from 'react';

//Styles
import './style.css'

//Icons
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const MovieRow = ({ title, items }) => {
    const [scrollX, setScrollX] = useState(0)

    const handleLeftArrow = () => {
        //A distancia vai ser de acordo com a tela do user
        let x = scrollX + Math.round(window.innerWidth / 2)
        if(x > 0){
            x = 0
        }
        setScrollX(x)
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2)
        let listW = items.results.length * 150
        //Calculando a diferença, verificando se é mais do que o quanto eu quero ir
        if((window.innerWidth - listW) > x){
            //Se for maior eu devo voltar um pouco
            x = (window.innerWidth - listW) - 60
        }
        setScrollX(x)
    }

    return (
        <div className='movieRow'>
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}}/>
            </div>

            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}}/>
            </div>

            <div className='movieRow--listarea'>
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((movie, key) => (
                        <div key={key}  className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={title.original_title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieRow