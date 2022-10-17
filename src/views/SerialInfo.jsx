import {useEffect, useState} from 'react'
import React from "react";
import './Products/style.css'
import Loader from '../components/loader/loader.jsx'
import {
	Button as MatButton,
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Col,
	Input,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
	Table
} from "reactstrap"
// import Button from '@material-ui/core/Button'
import {api, Axios} from '../service'
import {useParams} from 'react-router-dom'

function SerialsInfo() {
	const [modal, setModal] = useState(false)
	const [file, setFile] = useState({})
	const [fileName, setFileName] = useState('')
	const [fileNameRu, setFileNameRu] = useState('')
	const [videos, setVideos] = useState([])
	const [newSeason, setNewSeason] = useState()
	// const [trillers, setTrillers] = useState([])
    const [videoLength, setVideoLength] = useState()
	// const [serial, setSerial] = useState()
	const [seasons, setSeasons] = useState([])
	// const [movieId, setMovieId] = useState()
	const [video4K, setVideo4K] = useState(false)
	const [loader, setLoader] = useState((JSON.parse(localStorage.getItem('triller_loader'))))
	const [seasonModel, setSeasonModel] = useState()
	const [serialSeason, setSerialSeason] = useState()
	const toggle = () => {
        setModal(!modal)
	}
	const seasonToggle = () => {
	  setSeasonModel(!seasonModel)
	}
    const { movieId } = useParams()
	// const openModalHandler = async (id) => {
	// 	console.log(movieId)
	// }

    let vid = document.createElement('video')
	async function fileUploadHandler(e) {
		vid.src = URL.createObjectURL(e.target.files[0])
		vid.ondurationchange = function() {
			setVideoLength(this.duration)
		}
		document.getElementById('file-chosen').textContent = e.target.files[0].name
		setFile(e.target.files[0])
	}

	const seasonSubmit = async (e) => {
	  	try {
			e.preventDefault()
			if (newSeason){
				let data = new FormData()
				data.append('season', newSeason)
				data.append('movieId', movieId)
				setLoader(true)
				const createdS = await Axios.post('/new-season', data)
				setSeasons([...seasons, createdS.data.created[0]])
				setLoader(false)
				setSeasonModel(false)
			}
		} catch (e) {
			console.log(e)
		}
	}
	async function submitForm(e) {
		e.preventDefault()
		if (file) {
			let data = new FormData()
			data.append('movieId', movieId && movieId)
			data.append('file', file)
			data.append('fileName', fileName)
			data.append('fileNameRu', fileNameRu)
			data.append('video4K', video4K)
			data.append('videoLength', videoLength)
			data.append('season_id', serialSeason)
			setLoader(true)
			await Axios.post('/add-serial', data)
			setLoader(false)
			setModal(false)
		}
	}
	useEffect(() => {
		if(movieId){
			;(async()=>{
				const seasons = await Axios.get(`/get-seasons?movieId=${movieId}`)
				setSeasons(seasons.data.data)
				setSerialSeason(seasons.data.data[0].season_id)
			})()
		}
	}, [movieId])
	useEffect(()=>{
		if (movieId) {
			;(async()=>{
				try {
					const res = await Axios.get('/serials', {
						params: {
							movieId: movieId
						}
					})
					setVideos(res.data.data)
				} catch (e) {
					console.log(e)
				}
			})()
		}
	},[movieId])
	return (
		<div style={{padding: '30px'}}>
		<div className="content">
		<Row>
		<Col md="12">
		<MatButton color="primary" onClick={toggle}>Add new serials</MatButton>
		<MatButton color="primary" onClick={seasonToggle}>Add new season</MatButton>
		<Card className="card-plain">
		<CardHeader>
		<CardTitle tag="h4">
			Serials table
		</CardTitle>
		</CardHeader>
		<CardBody>
			{

			}
		<Table className="tablesorter" responsive>
		<thead className="text-primary">
		<tr>
		<th>#</th>
		<th>serial name</th>
		<th>update</th>
		<th>delete</th>
		</tr>
		</thead>
		<tbody>
		{
			seasons ? seasons.map((val, key) => {
				return (
					<React.Fragment key={key}>
						<tr key={val.season_id}><td><h2>{`${val.season_num} Сезон`}</h2></td></tr>
						{
						videos && videos.serials && videos.serials.map((value) => {
							if (val.season_id === value.season_id){
								return (
									<tr key={value.movie_serial_id}>
										<td>
											<a href={`${api}/stream/movie/${value.movie_path}/720p`} rel="noreferrer"
											   target="_blank">
												<img
													src={`${api}/` + value.movie_thumnail_path}
													alt=""
													width="100"
													height="40"/>
											</a>
										</td>
										<td>{value.movie_name}</td>
										<td><MatButton onClick={() => console.log(value)}>Details</MatButton></td>
										<td>
											<button
												style={{background: 'red', outline: 'none'}}
											>
												Delete
											</button>
										</td>
									</tr>
								)
							} else {
								return <></>
							}
							}
						)
						}
					</React.Fragment>
				)
			}) : (<></>)}
		{
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
		<Input
			placeholder='Serial name (uz)'
			id=""
			style={{"width": "100%", "color": "black"}}
			onKeyUp={e => setFileName(e.target.value)}
			type="text"
		/>

		<Input
			placeholder='Serial name (ru)'
			id=""
			style={{"width": "100%", "color": "black", marginTop: '10px'}}
			onKeyUp={e => setFileNameRu(e.target.value)}
			type="text"
		/>
		<span>
			Your video is:
			<label htmlFor="movieIs4k"><b style={{marginLeft: '10px'}}>4K</b></label>
			<input type="checkbox" id="movieIs4k" onChange={()=>setVideo4K(!video4K)} />
		</span>
		<div />
		<input type="file" id="actual-btn" accept="video/mp4,video/x-m4v,video/*" hidden onChange={fileUploadHandler}/>
		<label className="fileUpload" htmlFor="actual-btn">Choose serial</label>
		<span id="file-chosen">No file chosen</span>
		<div>
			<span>Выберите сезон</span>
			<select
				name="season"
				id="ses"
				onChange={(e) => setSerialSeason(e.target.value)} style={{marginLeft: 10}}
				value={serialSeason}
			>
				{
					seasons.map((item) => {
						return (
							<React.Fragment key={item.season_id}>
								<option value={item.season_id}>{item.season_num}</option>
							</React.Fragment>
						)
					})
				}
			</select>
		</div>
		</ModalBody>
		<ModalFooter>
		<MatButton
		style={{"margin": "0 auto", "marginTop": "10px", "marginBottom": "40px", "width": "90%"}}
		color="primary"
		>
			Upload
		</MatButton>
		</ModalFooter>
		</form>
		</Modal>
		<Modal isOpen={seasonModel} toggle={seasonToggle}>
			{
				loader && <Loader margin={-150} />
			}
			<form encType="multipart/form-data" onSubmit={e => seasonSubmit(e)}>
				<ModalHeader toggle={seasonToggle}>Добавить сезон</ModalHeader>
				<ModalBody>
					<Input
						placeholder='Номер сезона'
						id=""
						style={{"width": "100%", "color": "black"}}
						onKeyUp={e => setNewSeason(e.target.value)}
						type="number"/>
				</ModalBody>
				<ModalFooter>
					<MatButton
						style={{"margin": "0 auto", "marginTop": "10px", "marginBottom": "40px", "width": "90%"}}
						color="primary"
					>
						Добавить
					</MatButton>
				</ModalFooter>
			</form>
		</Modal>
		</div>
		</div>
		)
	}
	
export default SerialsInfo