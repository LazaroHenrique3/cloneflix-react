//React Hooks
import { useEffect, useState } from "react"

//Styles
import './App.css'

//Services
import tmdb from "./services/tmdb"

//Components
import MovieRow from "./components/MovieRow"
import FeaturedMovie from "./components/FeaturedMovie"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Loading from "./components/Loading"

const App = () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista total
      let list = await tmdb.getHomeList()
      setMovieList(list)

      //Pegando o featured
      let originals = list.filter(item => item.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv')

      setFeaturedData(chosenInfo)
    }

    loadAll()
  }, [])

  //Monitorando o scroll da página
  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    //Sempre que houver algum evento de scroll ele executa a função
    window.addEventListener('scroll', scrollListener)

    //Remove o evento quando sai da página
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className="page">
      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((movies, key) => (
          <MovieRow key={key} title={movies.title} items={movies.items} />
        ))}
      </section>

      <Footer/>

      {movieList.length <= 0 && <Loading/>}
    </div>
  )
}

export default App