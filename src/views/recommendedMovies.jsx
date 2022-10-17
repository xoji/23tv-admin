import { useState, useEffect } from 'react'
import './Products/style.css'
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
} from "reactstrap"
import Button from '@material-ui/core/Button'
import {api, Axios} from '../service'

function RecommendedMovie() {
	const [modal, setModal] = useState(false)
	const [modal1, setModal1] = useState(false)
	const [videos, setVideos] = useState([])
	const [movies, setMovies] = useState([])
	const [movieSelect, setMovieSelect] = useState([])
	const [deleteId, setDeleteId] = useState()
	const toggle1 = () => setModal1(!modal1)
	const toggle = () => {
		setModal(!modal)
	}
	
	
	async function deleteRMovie() {
		try {
			const res = await Axios.post('/delete-triller-m', { rMovieId: deleteId })
			const data = res.data.data.recommended_movie_id
			setMovies(movies.filter(item => item.recommended_movie_id !== data))
		} catch (error) {
			
		}
	}
	
	async function submitForm(e) {
		try {
			e.preventDefault()
			await Axios.post('/add-recommended-m', movieSelect)
			window.location.reload()
			setModal(false)
		} catch (error) {
			
		}
	}
	
	async function specialMovie(){
		const res = await Axios.get('/special-movies')
		setVideos(res.data.data)
	}

	async function recomendedMovie(){
		const res = await Axios.get('/recommended-m')
		setMovies(res.data.data)
	}
	
	useEffect(()=>{
		try {
			specialMovie()
			recomendedMovie()
		} catch (error) {
			
		}
	},[])
	
	
	
	
	function SelectTriller(e) {
		if (e.target.checked) {
			setMovieSelect([e.target.id, ...movieSelect])
		} else {
			for( var i = 0; i < movieSelect.length; i++){ 
				if ( movieSelect[i] === e.target.id) { 
					movieSelect.splice(i, 1); 
				}
			}
		}
	}
	
	
	return (
		<>
		<div className="content">
		<Row>
		<Col md="12">
		<MatButton color="primary" onClick={toggle}>Recommended new movie</MatButton>
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
		<th>name</th>
		<th>Delete triller</th>
		</tr>
		</thead>
		<tbody>
		{
			movies && movies.map((value, i)=> <tr key={i}>
			<td>
			<a href={`${api}/stream/movie/${value.movie_path}/360p`} rel="noreferrer" target="_blank">
			<img src={`${api}/` + value.movie_thumnail_path} alt="" width="100" height="40" />
			</a>
			</td>
			<td>{value.movie_name_ru}</td>
			<td><Button onClick={ () => {
				toggle1()
				setDeleteId(value.recommended_movie_id)
			}}
			style={{background: 'red', outline:'none'}}>Delete</Button></td>
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
		<form encType="multipart/form-data" onSubmit={submitForm}>
		<ModalHeader toggle={toggle}>Recommended title</ModalHeader>
		<ModalBody>
		{/* <select className="select_value" onChange={e => setMovieId(e.target.value)} style={{margin: '20px 0'}}>
		<option value="">select movie</option>
		{
			videos && videos.map((v, i) => <option key={i} value={v.movie_id}>{v.movie_name_ru}</option>)
		}
	</select> */}
	<div className="genres">
	<h3 style={{width: '100%', margin: '0'}}>Recommended Movies</h3>
	<br />
	{
		videos && videos.map((data, i) => <label htmlFor={data.movie_id} key={i}>
		{data.movie_name_ru}<input
		value={data.movie_name_ru}
		type="checkbox"
		onChange={SelectTriller}
		id={data.movie_id}
		name="genre" />
		</label>)
	}
	</div>
	</ModalBody>
	<ModalFooter>
	<MatButton
	style={{"margin": "0 auto", "marginTop": "10px", "marginBottom": "40px", "width": "90%"}} color="primary">Upload</MatButton>
	</ModalFooter>
	</form>
	</Modal>



	<Modal isOpen={modal1} toggle={toggle1}>
		<ModalHeader toggle={toggle1}>Modal title</ModalHeader>
		<ModalBody>
		Do you really want to delete?
		</ModalBody>
		<ModalFooter>
		<Button color="primary" onClick={() => {
			toggle1()
		}}>No</Button>
		<Button color="secondary" onClick={() => {
			toggle1()
			deleteRMovie()
		}}>Yes</Button>
		</ModalFooter>
		</Modal>
	</div>
	</>
	)
}

export default RecommendedMovie