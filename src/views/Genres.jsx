import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import {Axios} from '../service'
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Table,
	Row,
	Col,
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter,
	FormGroup,
	Button as MatButton,
} from "reactstrap"


function Genres() {
	const [modal, setModal] = useState(false)
	const [ modal2, setModal2] = useState(false)
	const [ modal3, setModal3] = useState(false)
	const [genreNameUz,setGenreNameUZ] = useState('')
	const [genreNameRu,setGenreNameRu] = useState('')
	const [genres, setGenres] = useState([])
	const [genre, setGenre] = useState({})
	const [deleteId, setDeleteId] = useState()
	const toggle = () => setModal(!modal)
	const toggle2 = () => setModal2(!modal2)
	
	const toggle3 = (e) => {
		setModal3(!modal3)
		updateGenre(e)
	}
	
	
	async function deleteCategory() {
		const res = await Axios.post('/delete-genre', { id: deleteId })
		const data = res.data.data.genre_id
		setGenres(genres.filter(item => item.genre_id !== data))
		setDeleteId('')
	}
	
	async function updateGenre(e) {
		setGenre({})
		const res = await Axios.get('/genre-one', {params: {id: e.target.id}})
		setGenre(res.data.data)
	}

	async function getGenre(){
		const res = await Axios.get('/genres')
		setGenres(res.data.data)
	}
	
	useEffect(()=>{
		try {
			getGenre()
		} catch (error) {
		}
	},[])
	
	async function updateCategoryHandler() {
		const data = {
			id: genre.genre_id,
			genreName: genreNameUz || genre.genre_name,
			genreNameRu: genreNameRu || genre.genre_name_ru
		}
		const res = await Axios.post('/update-genre', data)
		const genId = res.data.data.genre_id
		setGenres([...genres.filter(item => item.genre_id !== genId), res.data.data])
		setModal3(false)
	}
	
	async function addCategoryHandler() {
		const data = {
			genreName: genreNameUz,
			genreNameRu: genreNameRu
		}
		
		const res = await Axios.post('/new-genre', data)
		setGenres([res.data.data, ...genres])
		setModal2(false)
	}
	
	return (
		<>
		<div className="content">
		<Row>
		<Col md="12">
		<MatButton onClick={toggle2} color="primary">Add new genre</MatButton>
		<Card className="card-plain">
		<CardHeader>
		<CardTitle tag="h4">
		Genre Table
		</CardTitle>
		</CardHeader>
		<CardBody>
		<Table className="tablesorter text-center" responsive>
		<thead>
		<tr>
		<th>#</th>
		<th>Name</th>
		<th>INFO</th>
		<th>Delete</th>
		</tr>
		</thead>
		<tbody>
		{
			genres && genres.map((value, key) => (<tr style={{color: 'white'}} key={key}>
			<td>{'# '+(key+1)}</td>
			<td>{value.genre_name_ru}</td>
			<td><MatButton onClick={toggle3} id={value.genre_id}>Details</MatButton></td>
			<td>
			<button onClick={e => {
				toggle()
				setDeleteId(e.target.id)
			}}
			id={value.genre_id}
			style={{background: 'red', outline:'none'}}>Delete</button>
			</td>
			</tr>)
			)
		}
		</tbody>
		</Table>
		</CardBody>
		</Card>
		</Col>
		</Row>
		
		<Modal isOpen={modal2} toggle={toggle2}>
		<FormGroup>
		<ModalHeader toggle={toggle2}>Create Genre</ModalHeader>
		<ModalBody className="modal_body">
		<Col>
		<input placeholder="Genre name (uz)" type="text" className="create-input" 
		onKeyUp={e=>setGenreNameUZ(e.target.value)} />
		</Col>
		<Col>
		<input placeholder="Genre name (ru)" type="text" className="create-input"
		onKeyUp={e=>setGenreNameRu(e.target.value)} />
		</Col>
		</ModalBody>
		<ModalFooter>
		<Col>
		<MatButton onClick={addCategoryHandler}>Create genre</MatButton>
		</Col>
		</ModalFooter>
		</FormGroup>
		</Modal>
		
		<Modal isOpen={modal3} toggle={toggle3}>
		<FormGroup>
		<ModalHeader toggle={toggle3}>Genre UPDATE</ModalHeader>
		<ModalBody>
		<ul className="update-panel--modal">
		{
			genre && <li style={{display: 'flex', flexDirection: 'column'}}>
			<div className="update_input">
			<label htmlFor="ruInput">
			(ru)<input id="ruInput" onKeyUp={e=>setGenreNameRu(e.target.value)}
			defaultValue={genre.genre_name_ru} />
			</label>
			</div>
			<div className="update_input">
			<label htmlFor="uzInput">
			(uz)<input id="uzInput" onKeyUp={e=>setGenreNameUZ(e.target.value)}
			defaultValue={genre.genre_name} />
			</label>
			</div>
			</li>
		}
		</ul>
		</ModalBody>
		<ModalFooter>
		<Col>
		<MatButton onClick={updateCategoryHandler}>Update</MatButton>
		</Col>
		</ModalFooter>
		</FormGroup>
		</Modal>
		
		<Modal isOpen={modal} toggle={toggle}>
		<ModalHeader toggle={toggle}>Modal title</ModalHeader>
		<ModalBody>
		Do you really want to delete?
		</ModalBody>
		<ModalFooter>
		<Button color="primary" onClick={() => {
			toggle()
		}}>No</Button>
		<Button color="secondary" onClick={() => {
			toggle()
			deleteCategory()
		}}>Yes</Button>
		</ModalFooter>
		</Modal>
		</div>
		</>
		)
	}
	
	export default Genres
	