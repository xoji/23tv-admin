import { useState, useEffect } from 'react'
import Loader from '../../components/loader/loader.jsx'
import './style.css'
import st from './products.module.css'
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
	Input,
	FormGroup,
} from "reactstrap"
import Button from '@material-ui/core/Button'
import {api, Axios} from '../../service/index'

function Tables() {
	const [modal, setModal] = useState(false)
	const [ modal4, setModal4] = useState(false)
	const [ modal5, setModal5] = useState(false)
	const [file, setFile] = useState({})
	const [fileName, setFileName] = useState('')
	const [fileNameRu, setFileNameRu] = useState('')
	const [genres, setGenres] = useState([])
	const [videos, setVideos] = useState([])
	const [movie, setMovie] = useState({})
	const [genreSelect, setGenreSelect] = useState([])
	const [genreSelectName, setGenreSelectName] = useState([])
	const [genreSelectNameRu, setGenreSelectNameRU] = useState([])
	const [countrySelect, setCountrySelect] = useState()
	const [categorySelect, setCategorySelect] = useState([])
	const [actorSelect, setActorSelect] = useState([])
	const [directorSelect, setDirectorSelect] = useState([])
	const [country, setCountry] = useState([])
	const [categories, setCategories] = useState([])
	const [actors, setActors] = useState([])
	const [directors, setDirectors] = useState([])
	const [thubnailRes, setThubnailRes] = useState()
	const [screenshotRes, setScreenshotRes] = useState()
	const [videoLength, setVideoLength] = useState(0)
	const [videoBody, setVideoBody] = useState('')
	const [videoBodyRu, setVideoBodyRu] = useState('')
	const [videoPremeireDate, setVideoPremeireDate] = useState('')
	const [videoRate, setVideoRate] = useState('')
	const [serialCount, setSerialCount] = useState(0)
	const [video4K, setVideo4K] = useState(false)
	const [serialIs, setSerialIs] = useState(false)
	const [hashtag, setHashtag] = useState([])
	const [hashtagValue, setHashtagValue] = useState()
	const [deleteId, setDeleteId] = useState()
	const [movieAge, setMovieAge] = useState(0)
	const [loader, setLoader] = useState(false)
	const [movieTime, setMovieTime] = useState('')
	const [disabled, setDisabled] = useState(false)

	const [checkId, setCheckId] = useState('')
	const [unCheckId, setUnCheckId] = useState('')

	const [genreFind, setGenreFind] = useState([])
	const [categoriesFind, setCategoriesFind] = useState([])
	const [actorFind, setActorFind] = useState([])
	const [directorFind, setDirectorFind] = useState([])
	
	const [isNational, setIsNational] = useState(false);
	const [actorNames, setActorNames] = useState('')
	const [actorNamesRu, setActorNamesRu] = useState('')

	const [directorNames, setDirectorNames] = useState('')
	const [directorNamesRu, setDirectorNamesRu] = useState('')

	const [filterGenreSelect, setFilterGenreSelect] = useState([])

	
	const toggle = () => {
		setModal(!modal)
	}
	
	
	const toggle5 = async (e) => {
		await updateMovie(e)
		setModal5(!modal5)
	}

	const toggle4 = (e) => {
		setModal4(!modal4)
	  }

	async function deleteMovie() {
		try {
			const res = await Axios.post('/delete-movie', { id: deleteId })
			const data = res.data.data.movie_id
			setVideos(videos.filter(item => item.movie_id !== data))
			setDeleteId('')
			toggle4()
		} catch (error) {
			
		}
	}
	
	async function updateMovie(e) {
		try {
			if (!modal5) {
				const res = await Axios.get('/movie-one', {params: {movieId: e.target.id}})
				setMovie(res.data.data)
				console.log(res.data.data)
				setCountrySelect(res.data.data.country_id)
			}
		} catch (error) {
			console.log(error.message)
		}
	}
	
	let vid = document.createElement('video')
	async function fileUploadHandler(e) {
		let fileURL = URL.createObjectURL(e.target.files[0])
		vid.src = fileURL
		vid.ondurationchange = function() {
			const minutInHours = this.duration / 3600
			const minutInMinuts = ((minutInHours) - Math.floor(minutInHours)) * 60
			const hours = Math.floor(minutInHours)
			const minuts = Math.floor(minutInMinuts) 
			const seconds = Math.floor((minutInMinuts - minuts) * 60)
			setMovieTime(`${hours > 9 ? hours : '0'+ hours} : ${minuts > 9 ? minuts : '0'+ minuts} : ${seconds > 9 ? seconds : '0'+ seconds}`)
			setVideoLength(this.duration)
		}
		document.getElementById('file-chosen').textContent = e.target.files[0].name
		setFile(e.target.files[0])
	}
	
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

	async function fileUploadThubnailHandler1(e) {
		try {
			document.getElementById('file-chosen-thubnail1').textContent = e.target.files[0].name
			let data = new FormData()
			data.append('thubnail', e.target.files[0])
			const resThubnail = await Axios.post('/thubnail-upload', data)
			setThubnailRes(resThubnail.data.data)
		} catch (error) {
			
		}
	}

	async function fileUploadThubnailHandler123(e) {
		try {
			document.getElementById('file-chosen-thubnail123').textContent = e.target.files[0].name
			let data = new FormData()
			data.append('screen', e.target.files[0])
			const res = await Axios.post('/screen-upload', data)
			setScreenshotRes(res.data.data)
		} catch (error) {
			
		}
	}

	async function submitForm() {
		try {
			if (
				videoPremeireDate.length && videoRate.length && videoLength > 1 && disabled === true
			) {
				setDisabled(false)
				let data = new FormData()
				data.append('file', file)
				data.append('genres', genreSelect)
				data.append('videoPremeireDate', videoPremeireDate)
				data.append('videoBody', videoBody)
				data.append('videoBodyRu', videoBodyRu)
				data.append('videoRate', videoRate)
				data.append('videoLength', videoLength)
				data.append('video4K', video4K)
				data.append('isNational', isNational)
				data.append('country', countrySelect)
				data.append('category', categorySelect)
				data.append('actor', actorSelect)
				data.append('director', directorSelect)
				data.append('fileName', fileName)
				data.append('fileNameRu', fileNameRu)
				data.append('thubnail', thubnailRes)
				data.append('screenShot', screenshotRes)
				data.append('genreName', genreSelectName)
				data.append('genreNameRu', genreSelectNameRu)
				data.append('serialIs', serialIs)
				data.append('hashtag', hashtagValue)
				data.append('movieAge', movieAge)
				data.append('serialCount', serialCount)
				
				data.append('actorNames', actorNames)
				data.append('actorNamesRu', actorNamesRu)
				data.append('directorNames', directorNames)
				data.append('directorNamesRu', directorNamesRu)

				setLoader(true)
				const res = await Axios.post('/upload', data)
				// console.log(res.data.data)
				setVideos([res.data.data, ...videos])
				setLoader(false)
				setModal(false)
			}
		} catch (error) {
			console.log(error)
			setLoader(false)
		}
	}

	async function updateMovieHandler() {
		try {
			// const data = {
			// 	id: movie.movie_id,
			// 	videoPremeireDate: videoPremeireDate || movie.movie_premeire_date,
			// 	videoBody: videoBody || movie.movie_body,
			// 	videoRate: videoRate || movie.movie_rate,
			// 	video4K: video4K || movie.movie_4k_is,
			// 	country: countrySelect || movie.movie_country,
			// 	fileName: fileName || movie.movie_name,
			// 	fileNameRu: fileNameRu || movie.movie_name_ru,
			// 	thubnail: thubnailRes,
			// 	screen: screenshotRes,
			// 	oldthubnail: movie.movie_thumnail_path,
			// 	oldscreen: movie.movie_screen
			// }
			let data = new FormData()
			data.append('id', movie.movie_id)
			data.append('videoPremeireDate', videoPremeireDate || movie.movie_premeire_date)
			data.append('videoBody', videoBody || movie.movie_body)
			data.append('videoBodyRu', videoBodyRu || movie.movie_body_ru)
			data.append('videoRate', videoRate || movie.movie_rate)
			data.append('video4K', video4K || movie.movie_4k_is)
			data.append('country', countrySelect ? countrySelect : movie.movie_country)
			data.append('fileName', fileName || movie.movie_name)
			data.append('fileNameRu', fileNameRu || movie.movie_name_ru)
			data.append('thubnail', thubnailRes)
			data.append('screen', screenshotRes)
			data.append('oldthubnail', movie.movie_thumnail_path)
			data.append('oldscreen', movie.movie_screen)


			const res = await Axios.post(api + '/update-movie', data)
			console.log(res)

			const videoId = res.data.data.movie_id
			setVideos([...videos.filter(item => item.movie_id !== videoId), res.data.data])
			setModal5(false)
		} catch (error) {
			console.log(error)
		}
	}


	async function getActor(){
		const res = await Axios.get('/actors')
		setActors(res.data.data)
	}


	async function getDirector(){
		const res = await Axios.get('/directors')
		setDirectors(res.data.data)
	}

	async function getHashtag(){
		const res = await Axios.get('/movies-hashtag')
		setHashtag(res.data.data)
		// console.log(res.data.data)
	}


	async function getGenre(){
		const res = await Axios.get('/genres')
		setGenres(res.data.data)
	}

	async function getAllMovie(){
		const res = await Axios.get('/movie-all')
		setVideos(res.data.data)
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
		try {
				getActor()
				getDirector()
				getGenre()
				getHashtag()
				getAllMovie()
				getCategory()
				getCountry()
		} catch (error) {
		}
	},[])
	
	function SelectGenre(e) {
		if (e.target.checked) {
			setCheckId(e.target.id)
			setUnCheckId('')
			setGenres([...genres.filter(i => i.genre_id !== e.target.id)])
			setGenreFind([...genreFind.filter(i => i.genre_id !== e.target.id)])
			setGenreSelect([e.target.id, ...genreSelect])
			setGenreSelectName([e.target.getAttribute('data_genre'), ...genreSelectName])
			setGenreSelectNameRU([e.target.getAttribute('data_genre_ru'), ...genreSelectNameRu])
			setFilterGenreSelect([{
				id: e.target.id,
				name: e.target.getAttribute('data_genre'),
				nameRu: e.target.getAttribute('data_genre_ru')
			}, ...filterGenreSelect])
		} else {
			setCheckId('')
			for( let i = 0; i < genreSelect.length; i++){
				if ( genreSelect[i] === e.target.id) { 
					// genreSelect.splice(i, 1)
					setGenreSelect([...genreSelect.filter(i => i !== e.target.id)])
				}
			}
			
			// eslint-disable-next-line no-redeclare
			for( let i = 0; i < filterGenreSelect.length; i++){
				if ( filterGenreSelect[i].id === e.target.id) { 
					setUnCheckId(e.target.id)
					// genreSelect.splice(i, 1)
					setFilterGenreSelect([...filterGenreSelect.filter(i => i.id !== e.target.id)])
					const data = []
					const x = filterGenreSelect.map(i => {
						return (i.id === e.target.id) && { genre_id: i.id, genre_name: i.name, genre_name_ru: i.nameRu }
					})
					for (const i of x) {
						if (i) {
							data.push(i)
						}
					}
					setGenres([...genres, ...data])
				}
			}
			for( let j = 0; j < genreSelectName.length; j++){
				if ( genreSelectName[j] === e.target.getAttribute('data_genre')) { 
					// genreSelectName.splice(j, 1); 
					setGenreSelectName([...genreSelectName.filter(i => i !== e.target.getAttribute('data_genre'))])
				}
			}
			for( let k = 0; k < genreSelectNameRu.length; k++){
				if ( genreSelectNameRu[k] === e.target.getAttribute('data_genre_ru')) { 
					// genreSelectNameRu.splice(k, 1); 
					setGenreSelectNameRU([...genreSelectNameRu.filter(i => i !== e.target.getAttribute('data_genre_ru'))])
				}
			}
		}
	}

	const [selectFilterCategory, setSelectFilterCategory] = useState([])
	const [checkCatId, setCheckCatId] = useState('')
	const [unCheckCatId, setUnCheckCatId] = useState('')

	function SelectCategory(e) {
		if (e.target.checked) {
			setCheckCatId(e.target.id)
			setUnCheckCatId('')
			setCategorySelect([e.target.id, ...categorySelect])
			setCategories([...categories.filter(i => i.category_id !== e.target.id)])
			setCategoriesFind([...categoriesFind.filter(i => i.category_id !== e.target.id)])
			setSelectFilterCategory([{
				id: e.target.id,
				name: e.target.getAttribute('data_category'),
				nameRu: e.target.getAttribute('data_category_ru')
			}, ...selectFilterCategory])

		} else {
			setCheckCatId('')
			for( let i = 0; i < categorySelect.length; i++){
				if ( categorySelect[i] === e.target.id) { 
					// categorySelect.splice(i, 1)
					setCategorySelect([...categorySelect.filter(i => i !== e.target.id)])
				}
			}

			// eslint-disable-next-line no-redeclare
			for( let i = 0; i < selectFilterCategory.length; i++){
				if ( selectFilterCategory[i].id === e.target.id) { 
					setUnCheckCatId(e.target.id)
					// genreSelect.splice(i, 1)
					setSelectFilterCategory([...selectFilterCategory.filter(i => i.id !== e.target.id)])
					const data = []
					const x = selectFilterCategory.map(i => {
						return (i.id === e.target.id) && { category_id: i.id, category_name: i.name, category_name_ru: i.nameRu }
					})
					for (const i of x) {
						if (i) {
							data.push(i)
						}
					}
					setCategories([...categories, ...data])
				}
			}
		}
	}
	
	// useEffect(()=>{
	// 	console.log(selectFilterCategory)
	// },[selectFilterCategory])


	const [selectFilterAct, setSelectFilterAct] = useState([])
	const [checkActId, setCheckActId] = useState('')
	const [unCheckActId, setUnCheckActId] = useState('')

	function SelectActors(e) {
		if (e.target.checked) {
			setCheckActId(e.target.id)
			setUnCheckActId('')
			setActors([...actors.filter(i => i.actor_id !== e.target.id)])
			setActorFind([...actorFind.filter(i => i.actor_id !== e.target.id)])
			setActorSelect([e.target.id, ...actorSelect])
			setSelectFilterAct([{
				id: e.target.id,
				name: e.target.getAttribute('data_actor_name'),
				nameRu: e.target.getAttribute('data_actor_name_ru')
			}, ...selectFilterAct])

		} else {
			setCheckActId('')
			for( let i = 0; i < actorSelect.length; i++){
				if ( actorSelect[i] === e.target.id) { 
					// actorSelect.splice(i, 1)
					setActorSelect([...actorSelect.filter(i => i !== e.target.id)])
				}
			}

			// eslint-disable-next-line no-redeclare
			for( let i = 0; i < selectFilterAct.length; i++){
				if ( selectFilterAct[i].id === e.target.id) { 
					setUnCheckActId(e.target.id)
					// genreSelect.splice(i, 1)
					setSelectFilterAct([...selectFilterAct.filter(i => i.id !== e.target.id)])
					const data = []
					const x = selectFilterAct.map(i => {
						return (i.id === e.target.id) && { actor_id: i.id, actor_name: i.name, actor_name_ru: i.nameRu }
					})
					for (const i of x) {
						if (i) {
							data.push(i)
						}
					}
					setActors([...actors, ...data])
				}
			}
		}
	}


	const [selectFilterDer, setSelectFilterDer] = useState([])
	const [checkDerId, setCheckDerId] = useState('')
	const [unCheckDerId, setUnCheckDerId] = useState('')

	
	function SelectDirector(e) {
		if (e.target.checked) {
			setCheckDerId(e.target.id)
			setUnCheckDerId('')
			setDirectors([...directors.filter(i => i.director_id !== e.target.id)])
			setDirectorFind([...directorFind.filter(i => i.director_id !== e.target.id)])
			setDirectorSelect([e.target.id, ...directorSelect])
			setSelectFilterDer([{
				id: e.target.id,
				name: e.target.getAttribute('data_director_name'),
				nameRu: e.target.getAttribute('data_director_name_ru')
			}, ...selectFilterDer])
		} else {
			setCheckDerId('')
			for( let i = 0; i < directorSelect.length; i++){
				if ( directorSelect[i] === e.target.id) { 
					// directorSelect.splice(i, 1); 
					setDirectorSelect([...directorSelect.filter(i => i !== e.target.id)])
				}
			}


			// eslint-disable-next-line no-redeclare
			for( let i = 0; i < selectFilterDer.length; i++){
				if ( selectFilterDer[i].id === e.target.id) { 
					setUnCheckDerId(e.target.id)
					// genreSelect.splice(i, 1)
					setSelectFilterDer([...selectFilterDer.filter(i => i.id !== e.target.id)])
					const data = []
					const x = selectFilterDer.map(i => {
						return (i.id === e.target.id) && { director_id: i.id, director_name: i.name, director_name_ru: i.nameRu }
					})
					for (const i of x) {
						if (i) {
							data.push(i)
						}
					}
					setDirectors([...directors, ...data])
				}
			}
		}
	}
	const HideMovie = async (id, value) => {
		setLoader(true)
		await Axios.post('/movie_hide', {id, value: !value})
		const res = await Axios.get('/movie-all')
		setVideos(res.data.data)
		setLoader(false)
	}
	const setPaid = async (id, value) => {
		try {
			setLoader(true)
			await Axios.post('/set-paid', {movie_id: id, value: !value})
			const res = await Axios.get('/movie-all')
			setVideos(res.data.data)
			setLoader(false)
		} catch (e) {
			console.log(e)
			setLoader(false)
		}
	}
	const searchHandler = async (value) => {
		try {
			if (!value.trim()) {
				setLoader(true)
				const res = await Axios.get('/movie-all')
				setVideos(res.data.data)
				setLoader(false)
			} else {
				const res = await Axios.post('/search-byName', {
					value
				})
				setVideos(res.data.data)
			}
		} catch (e) {
			console.log(e)
		}
	}
	// useEffect(() => {
	// 	console.log(movie)
	// }, [movie])
	return (
		<>
		{loader && <Loader />}
		<div className="content">
		<Row>
		<Col md="12">
		<div className={st.actionsDiv}>
			<MatButton color="primary" onClick={toggle}>Add new movie</MatButton>
			<input
				type="text"
				className={st.searchInput}
				placeholder="Поиск"
				onChange={(event) => searchHandler(event.target.value)}
			/>
		</div>
		<Card className="card-plain">
		<CardHeader>
		<CardTitle tag="h4">
		Movies table
		</CardTitle>
		</CardHeader>
		<CardBody>
		<Table className="tablesorter" responsive>
		<thead className="text-primary">
		<tr>
		<th>#</th>
		<th>movie name</th>
		<th>Edit movie</th>
		<th>Delete movie</th>
		<th>Hide movie</th>
		<th>Payment</th>
		</tr>
		</thead>
		<tbody>
		{
			videos && videos.map((value, i)=> <tr key={i}>
			<td>
			<a href={`${api}/${value.movie_thumnail_path}`} rel="noreferrer" target="_blank">
			<img src={`${api}/` + value.movie_thumnail_path} alt="" width="100" height="40" />
			</a>
			</td>
			<td>{value.movie_name_ru}</td>
			<td><MatButton onClick={toggle5} id={value.movie_id}>Details</MatButton></td>
			<td>
			<button onClick={e => {
				toggle4()
				setDeleteId(e.target.id)
			}}
			style={{background: 'red', outline:'none'}}
			id={value.movie_id}
			className={`${st.btn} ${st.hidden}`}
			>Delete</button></td>
			<td>
				<button
					className={value.hidden ? `${st.hidden} ${st.btn}` : `${st.visible} ${st.btn}`}
					onClick={() => HideMovie(value.movie_id, value.hidden)}>
					{value.hidden ? 'Показать' : 'Скрыть'}
				</button>
			</td>
			<td>
				<button
					className={value.paid ? `${st.hidden} ${st.stBtn}` : `${st.visible} ${st.stBtn}`}
					onClick={() => setPaid(value.movie_id, value.paid)}
				>
					{value.paid ? 'Платный' : 'Бесплатный'}
				</button>
			</td>
			</tr>
			)
		}
		</tbody>
		</Table>
		</CardBody>
		</Card>
		</Col>
		</Row>
		<div className="modal-product" style={{display: modal ? 'block' : 'none'}}>
			<div className="modal-body">
				{
					loader && <Loader />
				}
			<FormGroup>
				<form encType="multipart/form-data">
				<ModalHeader toggle={toggle}>Category title</ModalHeader>
				<ModalBody>
				<Input
				placeholder='Movie name (uz)' id="" style={{"width": "100%", "color": "black", fontStyle: "bold"}} onKeyUp={async e => {
					if (e.target.value !== '') {
						const res = await Axios.post('/search-movie-admin', { searchValue: e.target.value })
						if(res.data.data.length > 0) {
							e.target.style.color = 'red'
						} else {
							e.target.style.color = 'green'
						}
						setFileName(e.target.value)
					} else {
						e.target.style.color = 'green'
					}
					}} type="text"/>

				<Input placeholder='Movie name (ru)' id="" style={{"width": "100%", "color": "black", marginTop: '10px'}} onKeyUp={async e => {
						if (e.target.value !== '') {
							const res = await Axios.post('/search-movie-admin', { searchValue: e.target.value })
							if(res.data.data.length > 0) {
								e.target.style.color = 'red'
							} else {
								e.target.style.color = 'green'
							}
							setFileNameRu(e.target.value)
						} else {
							e.target.style.color = 'green'
						}
						}} type="text"/>

				<span>
					<input type="file" id="actual-btn" accept="video/mp4,video/x-m4v,video/*, video/ts" hidden onChange={fileUploadHandler}/>
					<label className="fileUpload" htmlFor="actual-btn">Choose video</label>
					<span id="file-chosen">No file chosen</span>
					&nbsp;&nbsp;&nbsp;&nbsp;<b>{movieTime}</b>
				</span>
				<div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>

					<span style={{display: 'flex', alignItems: 'center'}}>
						<input type="checkbox" id="movieIs4k" onChange={()=>setVideo4K(!video4K)} />
						<label htmlFor="movieIs4k"><b>4K</b></label>
					</span>
					<span>
						<input type="checkbox" id="setSerialIs" onChange={()=>setSerialIs(!serialIs)} />
						<label htmlFor="setSerialIs"><b>is serial</b></label>
					</span>
					<span>
						<input checked={isNational} type="checkbox" id="setNational" onChange={()=>setIsNational(!isNational)} />
						<label htmlFor="setNational"><b>is national</b></label>
					</span>
				</div>
				<div className="genres">
				<h3 style={{width: '100%', margin: '0'}}>Movies Genre</h3>
				<div>
				</div>
				{
					filterGenreSelect && filterGenreSelect.map((data, i) => <label htmlFor={data.id} key={i}>
					{data.nameRu}<input
					value={data.genre_name_ru}
					data_genre_ru={data.nameRu}
					data_genre={data.name}
					type="checkbox"
					defaultChecked
					checked={data.id !== unCheckId}
					onChange={SelectGenre}
					id={data.id}
					name="genre" />
					</label>)
				}
				<div style={{width: '100%', margin: '0'}}>
				<input
			 	onKeyUp={e => {
					let val = e.target.value.toLowerCase()
					const x = genres.filter(v => v.genre_name_ru.toLowerCase().includes(val))
					if (x.length) {
						setGenreFind(x)
					} else {
						setGenreFind([])
					}
				}}
				type="text" placeholder="search input" style={{width: '100%', margin: '0'}} />
				</div>
				<br />
				<br />
				{
					genreFind.length > 0 ? <>

					{
						genreFind && genreFind.map((data, i) => <label htmlFor={data.genre_id} key={i}>
						{data.genre_name_ru}<input
						value={data.genre_name_ru}
						data_genre_ru={data.genre_name_ru}
						data_genre={data.genre_name}
						type="checkbox"
						checked={checkId === data.genre_id}
						onChange={SelectGenre}
						id={data.genre_id}
						name="genre" />
						</label>)
					}

					</> : <>
					{
						genres && genres.map((data, i) => <label htmlFor={data.genre_id} key={i}>
						{data.genre_name_ru}<input
						value={data.genre_name_ru}
						data_genre_ru={data.genre_name_ru}
						data_genre={data.genre_name}
						type="checkbox"
						checked={checkId === data.genre_id}
						onChange={SelectGenre}
						id={data.genre_id}
						name="genre" />
						</label>)
					}
					</>
				}
				</div>
				<div className="genres">
				<h3 style={{width: '100%', margin: '0'}}>Movies Categories</h3>
					{
						selectFilterCategory && selectFilterCategory.map((data, i) => <label htmlFor={data.id} key={i}>
						{data.nameRu}<input type="checkbox"
						data_category_ru={data.nameRu}
						data_category={data.name}
						defaultChecked
						checked={data.id !== unCheckCatId}
						onChange={SelectCategory} id={data.id} name="category"
						value={data.nameRu}
						/>
						</label>)
					}
				<div>
				</div>
				<div style={{width: '100%', margin: '0'}}>
				<input onKeyUp={e => {
					let val = e.target.value.toLowerCase()
					const x = categories.filter(v => v.category_name_ru.toLowerCase().includes(val))
					if (x.length) {
						setCategoriesFind(x)
					} else {
						setCategoriesFind([])
					}
				}}
				type="text" placeholder="search input" style={{width: '100%', margin: '0'}} />
				</div>
				<br />
				<br />
				{
					categoriesFind.length > 0 ? <>

					{
						categoriesFind && categoriesFind.map((data, i) => <label htmlFor={data.category_id} key={i}>
						{data.category_name_ru}<input type="checkbox"
						data_category_ru={data.category_name_ru}
						checked={checkCatId === data.category_id}
						data_category={data.category_name}
						onChange={SelectCategory} id={data.category_id} name="category" />
						</label>)
					}

					</> : <>
					{
						categories && categories.map((data, i) => <label htmlFor={data.category_id} key={i}>
						{data.category_name_ru}<input
						data_category_ru={data.category_name_ru}
						checked={checkCatId === data.category_id}
						data_category={data.category_name}
						type="checkbox" onChange={SelectCategory} id={data.category_id} name="category" />
						</label>)
					}
					</>
				}
				</div>

				<Input placeholder='Movie age' id="" style={{"width": "100%", "color": "black", marginTop: '10px'}} onKeyUp={e => setMovieAge(e.target.value)} type="text"/>

				{
					serialIs &&  <>
					<Input placeholder='Serial count' id="" style={{"width": "100%", "color": "black", marginTop: '10px'}} onKeyUp={e => setSerialCount(e.target.value)} type="text"/>
					</>
				}

				{
					serialIs &&  <>
					<select className="select_value" onChange={e => setHashtagValue(e.target.value)} style={{margin: '20px 0'}}>
					<option value="">select unique name</option>
					{
						hashtag && hashtag.map((v, i) => <option key={i} value={v.movie_unique_name}>{v.movie_unique_name}</option>)
					}
					</select>
					<br />
					<Input placeholder='Unique name' id="" style={{"width": "100%", "color": "black", marginTop: '10px'}} onKeyUp={e => setHashtagValue(e.target.value)} type="text"/>
					</>
				}


				<select className="select_value" onChange={e => setCountrySelect(e.target.value)} style={{margin: '20px 0'}}>
				<option value="">select country</option>
				{
					country && country.map((v, i) => <option key={i} value={v.country_id}>{v.country_name_ru}</option>)
				}
				</select>

				<div className="genres">
				<h3 style={{width: '100%', margin: '0'}}>Movies Actors</h3>
				{/* selectFilterAct */}
				{
					selectFilterAct && selectFilterAct.map((data, i) => <label htmlFor={data.id} key={i}>
					{data.nameRu}<input type="checkbox"
					data_actor_name_ru={data.nameRu}
					data_actor_name={data.name}
					checked={unCheckActId !== data.id}
					defaultChecked
					onChange={SelectActors} id={data.id} name="genre" />
					</label>)
				}
				<div style={{width: '100%', margin: '0'}}>
				<input onKeyUp={e => {
					let val = e.target.value.toLowerCase()
					const x = actors.filter(v => v.actor_name_ru.toLowerCase().includes(val))
					if (x.length) {
						setActorFind(x)
					} else {
						setActorFind([])
					}
				}}
				type="text" placeholder="search input" style={{width: '100%', margin: '0'}} />
				</div>
				<br />
				<br />
				{
					actorFind.length > 0 ? <>
					{
						actorFind && actorFind.map((data, i) => <label htmlFor={data.actor_id} key={i}>
						{data.actor_name_ru}<input type="checkbox"
						data_actor_name_ru={data.actor_name_ru}
						data_actor_name={data.actor_name}
						checked={checkActId === data.actor_id}
						onChange={SelectActors} id={data.actor_id} name="genre" />
						</label>)
					}
					</> : <>
					{
						actors && actors.map((data, i) => <label htmlFor={data.actor_id} key={i}>
						{data.actor_name_ru}<input type="checkbox"
						data_actor_name_ru={data.actor_name_ru}
						data_actor_name={data.actor_name}
						checked={checkActId === data.actor_id}
						onChange={SelectActors} id={data.actor_id} name="genre" />
						</label>)
					}
					</>
				}
				</div>

				<div className="genres">
				<h3 style={{width: '100%', margin: '0'}}>Movies Directors</h3>
				{
					selectFilterDer && selectFilterDer.map((data, i) => <label htmlFor={data.id} key={i}>
					{data.nameRu}<input type="checkbox"
					data_director_name_ru={data.nameRu}
					data_director_name={data.name}
					defaultChecked
					checked={unCheckDerId !== data.id}
					onChange={SelectDirector} id={data.id} name="genre" />
					</label>)
				}
				<div style={{width: '100%', margin: '0'}}>
				<input onKeyUp={e => {
					let val = e.target.value.toLowerCase()
					const x = directors.filter(v => v.director_name_ru.toLowerCase().includes(val))
					if (x.length) {
						setDirectorFind(x)
					} else {
						setDirectorFind([])
					}
				}}
				type="text" placeholder="search input" style={{width: '100%', margin: '0'}} />
				</div>
				<br />
				<br />
				{
					directorFind.length > 0 ? <>
					{
						directorFind && directorFind.map((data, i) => <label htmlFor={data.director_id} key={i}>
						{data.director_name_ru}<input type="checkbox"
						data_director_name_ru={data.director_name_ru}
						data_director_name={data.director_name}
						checked={checkDerId === data.director_id}
						onChange={SelectDirector} id={data.director_id} name="genre" />
						</label>)
					}</> : <>
					{
						directors && directors.map((data, i) => <label htmlFor={data.director_id} key={i}>
						{data.director_name_ru}<input type="checkbox"
						data_director_name_ru={data.director_name_ru}
						data_director_name={data.director_name}
						checked={checkDerId === data.director_id}
						onChange={SelectDirector} id={data.director_id} name="genre" />
						</label>)
					}
					</>
				}
				</div>
				<div>
					<textarea onKeyUp={e=>setActorNames(e.target.value)}  placeholder="(uz) Actorlani ismini yozib qushish ..." rows="10" style={{width: '100%', resize: 'none'}} />
				</div>
				<br />
				<div>
					<textarea onKeyUp={e=>setActorNamesRu(e.target.value)}  placeholder="(ru) Actorlani ismini yozib qushish ..." rows="10" style={{width: '100%', resize: 'none'}} />
				</div>
				<br />
				<div>
					<textarea onKeyUp={e=>setDirectorNames(e.target.value)}  placeholder="(uz) Rejissorlani ismini yozib qushish ..." rows="10" style={{width: '100%', resize: 'none'}} />
				</div>
				<br />
				<div>
					<textarea onKeyUp={e=>setDirectorNamesRu(e.target.value)}  placeholder="(ru) Rejissorlani ismini yozib qushish ..." rows="10" style={{width: '100%', resize: 'none'}} />
				</div>
				<br />
				<div>
					<textarea onKeyUp={e=>setVideoBody(e.target.value)}  placeholder="(uz) Text body ..." rows="10" style={{width: '100%', resize: 'none'}} />
				</div>
				<br />
				<div>
					<textarea onKeyUp={e=>setVideoBodyRu(e.target.value)}  placeholder="(ru) Text body ..." rows="10" style={{width: '100%', resize: 'none'}} />
				</div>
				<br />
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
				</ModalBody>
				<ModalFooter>
				<MatButton
				onClick={()=>{
					setDisabled(true)
					submitForm()
				}}
				style={{"margin": "0 auto", "marginTop": "10px", "marginBottom": "40px", "width": "90%"}} color="primary">Upload</MatButton>
				</ModalFooter>
				</form>
			</FormGroup>
			</div>

		</div>
		<Modal isOpen={modal5} toggle={toggle5}>
			<input type="text" value={movie.movie_id}/>
			<h1 className={st.filmId}>{movie.movie_serial_is ? 'Сериал' : 'фильм'}</h1>
			<FormGroup>
				<ModalHeader toggle={toggle5}>Movie UPDATE</ModalHeader>
				<ModalBody>
				<ul className="update-panel--modal">
					{
						movie && <li style={{display: 'flex', flexDirection: 'column'}}>
							<div className="update_input">
								<label htmlFor="ruInput">
									(ru)<input onKeyUp={e=>setFileNameRu(e.target.value)}
									id="ruInput" defaultValue={movie.movie_name_ru} />
								</label>
							</div>
							<div className="update_input">
								<label htmlFor="uzInput">
									(uz)<input onKeyUp={e=>setFileName(e.target.value)}
									id="uzInput" defaultValue={movie.movie_name} />
								</label>
							</div>
							<select
								className="select_value" onChange={e => setCountrySelect(e.target.value)} style={{margin: '20px 0'}}
								value={movie.country_id}
							>
							{
								country && country.map((v, i) => <option key={i} value={v.country_id}>{v.country_name_ru}</option>)
							}
							</select>
							<div style={{color: '#000'}}>
								<input
								type="file"
								id="actual-btn23"
								accept="image/png, image/gif, image/jpeg" hidden onChange={fileUploadThubnailHandler1} />
								<label className="fileUpload" htmlFor="actual-btn23">Choose thubnail</label>
								<span id="file-chosen-thubnail1">No file chosen</span>
							</div>

							<div style={{color: '#000'}}>
								<input
								type="file"
								id="actual-btn22"
								accept="image/png, image/gif, image/jpeg" hidden onChange={fileUploadThubnailHandler123} />
								<label className="fileUpload" htmlFor="actual-btn22">Choose screenshot</label>
								<span id="file-chosen-thubnail123">No file chosen</span>
							</div>

							<div style={{color: '#000'}}>
								(uz)
								<textarea
								defaultValue={movie.movie_body}
								onKeyUp={e=>setVideoBody(e.target.value)}
								placeholder="(uz) Text body ..."
								rows="10"
								style={{width: '100%', resize: 'none'}} />
							</div>

							<div style={{color: '#000'}}>
								(ru)
								<textarea
								defaultValue={movie.movie_body_ru}
								onKeyUp={e=>setVideoBodyRu(e.target.value)}
								placeholder="(ru) Text body ..."
								rows="10"
								style={{width: '100%', resize: 'none'}} />
							</div>
							<div>
								<input
								defaultValue={movie.movie_premeire_date}
								type="text"
								onKeyUp={e=>setVideoPremeireDate(e.target.value)} placeholder="Premeire date" style={{width: '100%'}} />
							</div>
							<div>
								<input defaultValue={movie.movie_rate}
								type="text" onKeyUp={e=>setVideoRate(e.target.value)} placeholder="Movie rate (example: 90)" style={{width: '100%', marginTop: '10px'}} />
							</div>
							<span>ß
								<div style={{width: '10%' ,color: '#000', display: 'flex', alignItems: 'center'}}>
								<input defaultChecked={movie.movie_4k_is} disabled={!movie.movie_4k_is} type="checkbox" id="movieIs4k" onChange={()=>setVideo4K(!video4K)} />
								<label htmlFor="movieIs4k"><b>4K</b></label>
								</div>
							</span>
						</li>
					}
				</ul>
				</ModalBody>
				<ModalFooter>
				<Col>
					<MatButton onClick={updateMovieHandler}>Update</MatButton>
				</Col>
				</ModalFooter>
			</FormGroup>
		</Modal>







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
		</div>
		</>
		)
	}
	
export default Tables
