import { useState, useEffect } from 'react'
import './Products/style.css'
import Loader from '../components/loader/loader.jsx'
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Table,
	Row,
	Col,
	Button as MatButton,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input
} from "reactstrap"
import {api, Axios} from '../service'
import Button from '@material-ui/core/Button'

function Triller() {
	const [modal, setModal] = useState(false)
	const [file, setFile] = useState({})
	const [fileName, setFileName] = useState('')
	const [fileNameRu, setFileNameRu] = useState('')
	const [videos, setVideos] = useState([])
	const [trillers, setTrillers] = useState([])
	const [videoBody, setVideoBody] = useState('')
	const [videoBodyRu, setVideoBodyRu] = useState('')
	const [thubnailRes, setThubnailRes] = useState()
	const [screenshotRes, setScreenshotRes] = useState()
	const [videoPremeireDate, setVideoPremeireDate] = useState('')
	const [videoRate, setVideoRate] = useState('')
	const [movieAge, setMovieAge] = useState(0)
	const [genreSelect, setGenreSelect] = useState([])
	const [genreSelectName, setGenreSelectName] = useState([])
	const [genreSelectNameRu, setGenreSelectNameRU] = useState([])
	const [countrySelect, setCountrySelect] = useState('')
	const [categorySelect, setCategorySelect] = useState([])
	const [actorSelect, setActorSelect] = useState([])
	const [directorSelect, setDirectorSelect] = useState([])
	const [country, setCountry] = useState([])
	const [categories, setCategories] = useState([])
	const [actors, setActors] = useState([])
	const [directors, setDirectors] = useState([])
	const [genres, setGenres] = useState([])
	const [deleteId, setDeleteId] = useState()
	const [ modal4, setModal4] = useState(false)
	
	
	
	const [movieId, setMovieId] = useState('')
	const [video4K, setVideo4K] = useState(false)
	const [loader, setLoader] = useState((JSON.parse(localStorage.getItem('triller_loader'))))



	const toggle4 = (e) => {
		setModal4(!modal4)
	  }


	async function deleteMovie() {
		try {
			const res = await Axios.post('/delete-triller', { id: deleteId })
			const data = res.data.data.movie_id
			// console.log(videos.filter(item => item.movie_id !== data))
			setVideos(videos.filter(item => item.movie_id !== data))
			setDeleteId('')
			toggle4()
		} catch (error) {
			
		}
	}
	
	
	const toggle = () => {
		setModal(!modal)
	}
	
	async function fileUploadHandler(e) {
		document.getElementById('file-chosen').textContent = e.target.files[0].name
		setFile(e.target.files[0])
	}
	
	async function submitForm(e) {
		e.preventDefault()
		if (file) {
			try {
				let data = new FormData()
				data.append('id', movieId)
				data.append('file', file)
				data.append('fileName', fileName)
				data.append('fileNameRu', fileNameRu)
				data.append('video4K', video4K)
				data.append('genres', genreSelect)
				data.append('movieAge', movieAge)
				data.append('category', categorySelect)
				data.append('country', countrySelect)
				data.append('actor', actorSelect)
				data.append('director', directorSelect)
				data.append('videoBody', videoBody)
				data.append('videoBodyRu', videoBodyRu)
				data.append('videoPremeireDate', videoPremeireDate)
				data.append('videoRate', videoRate)
				data.append('thubnail', thubnailRes)
				data.append('screenShot', screenshotRes)
				data.append('genreName', genreSelectName)
				data.append('genreNameRu', genreSelectNameRu)
				setLoader(true)
				const res = await Axios.post('/upload-triller', data)
				setLoader(false)
				setVideos([res.data.data, ...videos])
				setModal(false)
			} catch (e) {
				console.log('Не обработанная ошибка', e.message)
			}
		}
	}
	async function specialMovie(){
		const res = await Axios.get('/special-movies')
		setVideos(res.data.data)
	}
	
	async function allTriller(){
		const res = await Axios.get('/movie-trillers-all')
		setTrillers(res.data.data)
	}
	
	
	
	async function getActor(){
		const res = await Axios.get('/actors')
		setActors(res.data.data)
	}
	
	
	async function getDirector(){
		const res = await Axios.get('/directors')
		setDirectors(res.data.data)
	}
	
	
	async function getGenre(){
		const res = await Axios.get('/genres')
		setGenres(res.data.data)
	}
	
	async function getCategory() {
		const res = await Axios.get('/categories', {
			headers: {
				Authorization: localStorage.getItem('token')
			}
		})
		setCategories(res.data.data)
	}
	
	
	async function getCountry(){
		const res = await Axios.get('/countries')
		setCountry(res.data.data)
	}
	
	
	
	useEffect(()=>{
		specialMovie()
		allTriller()
		getActor()
		getDirector()
		getGenre()
		getCategory()
		getCountry()
	},[])
	
	
	
	
	async function fileUploadThubnailHandler(e) {
		try {
			document.getElementById('file-chosen-thubnail').textContent = e.target.files[0].name
			
			let data = new FormData()
			data.append('thubnail', e.target.files[0])
			const resThubnail = await Axios.post('/thubnail-upload', data)
			setThubnailRes(resThubnail.data.data)
		} catch (error) {
			
		}
	}
	
	
	
	async function fileUploadThubnailHandlerScreenshot(e) {
		try {
			document.getElementById('file-chosen-screenshot').textContent = e.target.files[0].name
			let data = new FormData()
			data.append('screen', e.target.files[0])
			const res = await Axios.post('/screen-upload', data)
			setScreenshotRes(res.data.data)
		} catch (error) {
			
		}
	}
	
	
	
	
	
	
	function SelectGenre(e) {
		if (e.target.checked) {
			setGenreSelect([e.target.id, ...genreSelect])
			setGenreSelectName([e.target.getAttribute('data_genre'), ...genreSelectName])
			setGenreSelectNameRU([e.target.getAttribute('data_genre_ru'), ...genreSelectNameRu])
		} else {
			for( var i = 0; i < genreSelect.length; i++){ 
				if ( genreSelect[i] === e.target.id) { 
					genreSelect.splice(i, 1); 
				}
			}
			for( var j = 0; j < genreSelectName.length; j++){ 
				if ( genreSelectName[j] === e.target.getAttribute('data_genre')) { 
					genreSelectName.splice(j, 1); 
				}
			}
			for( var k = 0; k < genreSelectNameRu.length; k++){ 
				if ( genreSelectNameRu[k] === e.target.getAttribute('data_genre_ru')) { 
					genreSelectNameRu.splice(k, 1); 
				}
			}
		}
	}
	
	function SelectCategory(e) {
		if (e.target.checked) {
			setCategorySelect([e.target.id, ...categorySelect])
		} else {
			for( var i = 0; i < categorySelect.length; i++){ 
				if ( categorySelect[i] === e.target.id) { 
					categorySelect.splice(i, 1); 
				}
			}
		}
	}
	
	function SelectActors(e) {
		if (e.target.checked) {
			setActorSelect([e.target.id, ...actorSelect])
		} else {
			for( var i = 0; i < actorSelect.length; i++){ 
				if ( actorSelect[i] === e.target.id) { 
					actorSelect.splice(i, 1); 
				}
			}
		}
	}
	
	function SelectDirector(e) {
		if (e.target.checked) {
			setDirectorSelect([e.target.id, ...directorSelect])
		} else {
			for( var i = 0; i < directorSelect.length; i++){ 
				if ( directorSelect[i] === e.target.id) { 
					directorSelect.splice(i, 1); 
				}
			}
		}
	}
	
	
	
	return (
		<>
		<div className="content">
		<Row>
		<Col md="12">
		<MatButton color="primary" onClick={toggle}>Add new triller</MatButton>
		<Card className="card-plain">
		<CardHeader>
		<CardTitle tag="h4">
		Trillers table
		</CardTitle>
		</CardHeader>
		<CardBody>
		<Table className="tablesorter" responsive>
		<thead className="text-primary">
		<tr>
		<th>#</th>
		<th>triller name</th>
		<th>Edit triller</th>
		<th>Delete triller</th>
		</tr>
		</thead>
		<tbody>
		{
			trillers && trillers.map((value, i)=> <tr key={i}>
			<td>
			<a href={`${api}/stream/triller/${value.triller_path}/720p`} rel="noreferrer" target="_blank">
			<img src={`${api}/` + value.movie_thumnail_path} alt="" width="100" height="40" />
			</a>
			</td>
			<td>{value.triller_name}</td>
			<td><MatButton>Details</MatButton></td>
			<td><button id={value.triller_id} onClick={(e)=>{
				console.log(value)
				toggle4()
				setDeleteId(e.target.id)
				console.log(e.target.id)
			}}
			style={{background: 'red', outline:'none'}}>Delete</button></td>
			</tr>
			)
		}
		</tbody>
		</Table>
		</CardBody>
		</Card>
		</Col>
		</Row>
		<Modal isOpen={modal} toggle={toggle}>
		{
			loader && <Loader margin={-150} />
		}
		<form encType="multipart/form-data" onSubmit={submitForm}>
		<ModalHeader toggle={toggle}>Category title</ModalHeader>
		<ModalBody>
		<Input placeholder='Triller name (uz)' id="" style={{"width": "100%", "color": "black"}} onKeyUp={e => setFileName(e.target.value)} type="text"/>
		
		<Input placeholder='Triller name (ru)' id="" style={{"width": "100%", "color": "black", marginTop: '10px'}} onKeyUp={e => setFileNameRu(e.target.value)} type="text"/>
		<span>
		Your video is:
		<label htmlFor="movieIs4k"><b style={{marginLeft: '10px'}}>4K</b></label>
		<input type="checkbox" id="movieIs4k" onChange={()=>setVideo4K(!video4K)} />
		</span>
		<select className="select_value" onChange={e => setMovieId(e.target.value)} style={{margin: '20px 0'}}>
		<option value="">select movie</option>
		{
			videos && videos.map((v, i) => <option key={i} value={v.movie_id}>{v.movie_name_ru}</option>)
		}
		</select>
		
		
		{
			(movieId.length === 0) && <>
			<div className="genres">
			<h3 style={{width: '100%', margin: '0'}}>Movies Genre</h3>
			<br />
			{
				genres && genres.map((data, i) => <label htmlFor={data.genre_id} key={i}>
				{data.genre_name_ru}<input
				value={data.genre_name_ru}
				data_genre_ru={data.genre_name_ru}
				data_genre={data.genre_name}
				type="checkbox"
				onChange={SelectGenre}
				id={data.genre_id}
				name="genre" />
				</label>)
			}
			</div>
			<Input placeholder='Movie age' id="" style={{"width": "100%", "color": "black", marginTop: '10px'}} onKeyUp={e => setMovieAge(e.target.value)} type="text"/>
			
			<div className="genres">
			<h3 style={{width: '100%', margin: '0'}}>Movies Categories</h3>
			<br />
			{
				categories && categories.map((data, i) => <label htmlFor={data.category_id} key={i}>
				{data.category_name_ru}<input type="checkbox" onChange={SelectCategory} id={data.category_id} name="category" />
				</label>)
			}
			</div>
			<select className="select_value" onChange={e => setCountrySelect(e.target.value)} style={{margin: '20px 0'}}>
			<option value="">select country</option>
			{
				country && country.map((v, i) => <option key={i} value={v.country_id}>{v.country_name_ru}</option>)
			}
			</select>
			
			<div className="genres">
			<h3 style={{width: '100%', margin: '0'}}>Movies Actors</h3>
			<br />
			{
				actors && actors.map((data, i) => <label htmlFor={data.actor_id} key={i}>
				{data.actor_name_ru}<input type="checkbox" onChange={SelectActors} id={data.actor_id} name="genre" />
				</label>)
			}
			</div>
			
			<div className="genres">
			<h3 style={{width: '100%', margin: '0'}}>Movies Directors</h3>
			<br />
			{
				directors && directors.map((data, i) => <label htmlFor={data.director_id} key={i}>
				{data.director_name_ru}<input type="checkbox" onChange={SelectDirector} id={data.director_id} name="genre" />
				</label>)
			}
			</div>
			<div>
			<textarea onKeyUp={e=>setVideoBody(e.target.value)}  placeholder="(uz) Text body ..." rows="10" style={{width: '100%', resize: 'none'}}></textarea>
			</div>
			<div>
			<textarea onKeyUp={e=>setVideoBodyRu(e.target.value)}  placeholder="(ru) Text body ..." rows="10" style={{width: '100%', resize: 'none'}}></textarea>
			</div>
			
			<div>
			<input type="text" onKeyUp={e=>setVideoPremeireDate(e.target.value)} placeholder="Premeire date" style={{width: '100%'}} />
			</div>
			<div>
			<input type="text" onKeyUp={e=>setVideoRate(e.target.value)} placeholder="Movie rate (example: 90)" style={{width: '100%', marginTop: '10px'}} />
			</div>
			
			<input type="file" id="actual-btn1" accept="image/png, image/gif, image/jpeg" hidden onChange={fileUploadThubnailHandler} />
			<label className="fileUpload" htmlFor="actual-btn1">Choose thubnail</label>
			<span id="file-chosen-thubnail">No file chosen</span>
			
			<div>
			<input type="file" id="actual-3" accept="image/png, image/gif, image/jpeg" hidden onChange={fileUploadThubnailHandlerScreenshot} />
			<label className="fileUpload" htmlFor="actual-3">Choose screenshot</label>
			<span id="file-chosen-screenshot">No file chosen</span>
			</div>	
			</>
		}
		<br />
		
		
		
		
		
		
		
		
		
		
		<input type="file" id="actual-btn" accept="video/mp4,video/x-m4v,video/*" hidden onChange={fileUploadHandler}/>
		<label className="fileUpload" htmlFor="actual-btn">Choose triller</label>
		<span id="file-chosen">No file chosen</span>
		</ModalBody>
		<ModalFooter>
		<MatButton
		style={{"margin": "0 auto", "marginTop": "10px", "marginBottom": "40px", "width": "90%"}} color="primary">Upload</MatButton>
		</ModalFooter>
		</form>
		</Modal>
		</div>


		<Modal isOpen={modal4} toggle={toggle4}>
		<ModalHeader toggle={toggle4}>Modal title</ModalHeader>
		<ModalBody>
		Do you really want to delete?
		</ModalBody>
		<ModalFooter>
		<Button color="primary" onClick={() => {
			toggle4()
		}}>No</Button>
		<Button color="secondary" onClick={() => {
			deleteMovie()
		}}>Yes</Button>
		</ModalFooter>
		</Modal>

		</>
		)
	}
	
	export default Triller
