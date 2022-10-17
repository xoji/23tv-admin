import Category from "views/Category/TableList"
import Genre from "views/Genres"
import Triller from "views/Products.jsx"
import Products from "views/Products/Products.jsx"
import Actors from "views/Actors"
import Ads from 'views/ADS/ads-add.jsx'
import Country from 'views/Country.jsx'
import RecomendedTriller from 'views/recomendedTriller'
import RecommendedMovie from "views/recommendedMovies"
import Serials from "views/Serials.jsx"

var routes = [
  {
    path: "/category",
    name: "Category",
    icon: "tim-icons icon-puzzle-10",
    component: Category,
    layout: "/admin",
  },
  {
    path: "/genre",
    name: "Genres",
    icon: "tim-icons icon-puzzle-10",
    component: Genre,
    layout: "/admin",
  },
  {
    path: "/country",
    name: "Country",
    icon: "tim-icons icon-puzzle-10",
    component: Country,
    layout: "/admin",
  },
  {
    path: "/actor",
    name: "Actors && Directors",
    icon: "tim-icons icon-bag-16",
    component: Actors,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Movie",
    icon: "tim-icons icon-bag-16",
    component: Products,
    layout: "/admin",
  },
  {
    path: "/trillers",
    name: "Triller",
    icon: "tim-icons icon-bag-16",
    component: Triller,
    layout: "/admin",
  },
  {
    path: "/serials",
    name: "Serials",
    icon: "tim-icons icon-bag-16",
    component: Serials,
    layout: "/admin",
  },
  {
    path: "/recomended-movie",
    name: "Recomended Movie",
    icon: "tim-icons icon-bag-16",
    component: RecommendedMovie,
    layout: "/admin",
  },
  {
    path: "/recomended-trillers",
    name: "Recomended Triller",
    icon: "tim-icons icon-bag-16",
    component: RecomendedTriller,
    layout: "/admin",
  },
  {
    path: "/ads",
    name: "Ads",
    icon: "tim-icons icon-bag-16",
    component: Ads,
    layout: "/admin",
  }
]
export default routes