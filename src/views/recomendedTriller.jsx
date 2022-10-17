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
import {api, Axios} from "../service"
function Triller() {
	const [modal, setModal] = useState(false)
	const [modal1, setModal1] = useState(false)
	const [videos, setVideos] = useState([])
	const [trillers, setTrillers] = useState([])
	const [trillerSelect, setTrillerSelect] = useState([])
	const [deleteId, setDeleteId] = useState()
	const toggle1 = () => setModal1(!modal1)
	const toggle = () => {
		setModal(!modal)
	}
	

	async function deleteRTriller() {
		try {
			const res = await Axios.post('/delete-triller-t', { rTrillerId: deleteId })
			const data = res.data.data.recommended_triller_id
			setVideos(videos.filter(item => item.recommended_triller_id !== data))
		} catch (error) {
			
		}
	}

	async function submitForm(e) {
		try {
			e.preventDefault()
			await Axios.post('/add-recommended-t', trillerSelect)
			window.location.reload()
			setModal(false)
		} catch (error) {
			
		}
	}
	
	async function getRecommened(){
		const res = await Axios.get('/recommended-t')
		setVideos(res.data.data)
	}

	async function getMovieTriller(){
		const res = await Axios.get('/movie-trillers-all')
		setTrillers(res.data.data)
	}
	
	useEffect(()=>{
		try {
				getRecommened()
				getMovieTriller()
		} catch (error) {
			
		}
	},[])
	
	function SelectTriller(e) {
		if (e.target.checked) {
			setTrillerSelect([e.target.id, ...trillerSelect])
		} else {
			for( var i = 0; i < trillerSelect.length; i++){ 
				if ( trillerSelect[i] === e.target.id) { 
					trillerSelect.splice(i, 1); 
				}
			}
		}
	}
	
	return (
		<>
		<div className="content">
		<Row>
		<Col md="12">
		<MatButton color="primary" onClick={toggle}>Recommended new triller</MatButton>
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
			videos && videos.map((value, i)=> <tr key={i}>
			<td>
			<a href={`${api}/stream/triller/${value.triller_path}_360p.mp4`} rel="noreferrer" target="_blank">
			<img src={`${api}/` + value.movie_thumnail_path} alt="" width="100" height="40" />
			</a>
			</td>
			<td>{value.triller_name}</td>
			<td><Button onClick={() => {
				setDeleteId(value.recommended_triller_id)
				toggle1()
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
	<h3 style={{width: '100%', margin: '0'}}>Recommended Trillers</h3>
	<br />
	{
		trillers && trillers.map((data, i) => <label htmlFor={data.triller_id} key={i}>
		{data.triller_name}<input
		value={data.triller_name}
		type="checkbox"
		onChange={SelectTriller}
		id={data.triller_id}
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
			deleteRTriller()
		}}>Yes</Button>
		</ModalFooter>
		</Modal>
	</div>
	</>
	)
}

export default Triller
