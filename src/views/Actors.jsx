import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
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
	TabContent,
	TabPane,
	Nav,
	NavItem,
	FormGroup,
	NavLink,
	Button as MatButton,
} from "reactstrap"
import {api, Axios} from '../service'
import classnames from 'classnames'



export default function Actors () {
	const [modal, setModal] = useState(false)
	const [modal1, setModal1] = useState(false)
	const [modal3, setModal3] = useState(false)
	const [modal4, setModal4] = useState(false)
	const [modal5, setModal5] = useState(false)
	const [modal6, setModal6] = useState(false)
	
	const [file, setFile] = useState()
	const [file1, setFile1] = useState()
	const [actorNameUz, setActorNameUz] = useState('')
	const [actorNameRu, setActorNameRu] = useState('')
	const [directorNameUz, setDirectorNameUz] = useState('')
	const [directorNameRu, setDirectorNameRu] = useState('')
	const [actorProfiUz, setActorProfiUz] = useState('')
	const [actorProfiRu, setActorProfiRu] = useState('')
	const [directorProfiUz, setDirectorProfiUz] = useState('')
	const [directorProfiRu, setDirectorProfiRu] = useState('')
	const [actors, setActors] = useState([])
	const [directors, setDirectors] = useState([])
	const [actor, setActor] = useState({})
	const [director, setDirector] = useState({})
	const [activeTab, setActiveTab] = useState('1')
	const [deleteActorId, setDeleteActorId] = useState()
	const [deleteDirectorId, setDeleteDirectorId] = useState()
	
	const toggle = tab => {
		if(activeTab !== tab) setActiveTab(tab)
	}
	
	const toggle1 = () => {
		setModal1(!modal1)
	}
	
	const toggle2 = () => {
		setModal(!modal)
	}
	
	
	const toggle3 = (e) => {
		setModal3(!modal3)
		updateActor(e)
	}
	
	const toggle4 = (e) => {
		setModal4(!modal4)
		updateDirector(e)
	}
	
	const toggle5 = () => setModal5(!modal5)
	const toggle6 = () => setModal6(!modal6)
	
	async function deleteActor() {
		try {
			const res = await Axios.post('/delete-actor', { id: deleteActorId })
			const data = res.data.data.actor_id
			setActors(actors.filter(item => item.actor_id !== data))
			setDeleteActorId('')
		} catch (error) {
			
		}
	}
	
	
	async function deleteDirector() {
		try {
			const res = await Axios.post('/delete-director', { id: deleteDirectorId })
			const data = res.data.data.director_id
			setDirectors(directors.filter(item => item.director_id !== data))
			setDeleteDirectorId('')
		} catch (error) {
			
		}
	}
	
	async function updateActor(e) {
		try {
			setActor({})
			const res = await Axios.get('/actor-one', {params: {id: e.target.id}})
			setActor(res.data.data)
		} catch (error) {
			
		}
	}
	
	
	async function updateDirector(e) {
		try {
			setDirector({})
			const res = await Axios.get('/director-one', {params: {id: e.target.id}})
			setDirector(res.data.data)
		} catch (error) {
			
		}
	}
	
	
	async function fileUploadHandler(e) {
		document.getElementById('actor').textContent = e.target.files[0].name
		setFile(e.target.files[0])
	}
	
	async function fileUpdateUploadHandler(e) {
		document.getElementById('actor12').textContent = e.target.files[0].name
		setFile(e.target.files[0])
	}
	
	async function fileUploadHandlerDirector(e) {
		document.getElementById('director').textContent = e.target.files[0].name
		setFile1(e.target.files[0])
	}
	
	async function fileUpdateUploadHandlerDirector(e) {
		document.getElementById('director12').textContent = e.target.files[0].name
		setFile1(e.target.files[0])
	}
	
	async function updateActorHandler() {
		try {
			if (file) {
				let data = new FormData()
				data.append('id', actor.actor_id)
				data.append('file', file)
				data.append('oldPath', actor.actor_path)
				data.append('actorName', actorNameUz || actor.actor_name)
				data.append('actorNameRu', actorNameRu || actor.actor_name_ru)
				data.append('actorProfession', actorProfiUz || actor.actor_profession)
				data.append('actorProfessionRu', actorProfiRu || actor.actor_profession_ru)
				const res = await Axios.post('/update-actor', data)
				const actorId = res.data.data.actor_id
				setActors([...actors.filter(item => item.actor_id !== actorId), res.data.data])
				setModal3(false)
			}
		} catch (error) {
			
		}
	}
	
	async function updateDirectorHandler() {
		try {
			if (file1) {
				let data = new FormData()
				data.append('id', director.director_id)
				data.append('file', file1)
				data.append('oldPath', director.director_path)
				data.append('directorName', directorNameUz || director.director_name)
				data.append('directorNameRu', directorNameRu || director.director_name_ru)
				data.append('directorProfession', directorProfiUz || director.director_profession)
				data.append('directorProfessionRu', directorProfiRu || director.director_profession_ru)
				const res = await Axios.post('/update-director', data)
				const directorId = res.data.data.director_id
				setDirectors([...directors.filter(item => item.director_id !== directorId), res.data.data])
				setModal4(false)
			}
		} catch (error) {
			
		}
	}
	
	
	async function submitForm(e) {
		e.preventDefault()
		try {
			let data = new FormData()
			data.append('file', file)
			data.append('actorNameUz', actorNameUz)
			data.append('actorNameRu', actorNameRu)
			data.append('actorProfessionUz', actorProfiUz)
			data.append('actorProfessionRu', actorProfiRu)
			const res = await Axios.post('/actor-upload', data)
			setActors([res.data.data, ...actors])
			setModal(false)
		} catch (error) {
			
		}
	}
	
	async function submitFormDirector(e) {
		e.preventDefault()
		try {
			let data = new FormData()
			data.append('file', file1)
			data.append('directorNameUz', directorNameUz)
			data.append('directorNameRu', directorNameRu)
			data.append('directorProfessionUz', directorProfiUz)
			data.append('directorProfessionRu', directorProfiRu)
			const res = await Axios.post('/director-upload', data)
			setDirectors([res.data.data, ...directors])
			setModal1(false)
		} catch (error) {
			
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
	
	useEffect(()=>{
			getActor()
			getDirector()
	},[])
	
	return (
		<>
		<div className="content">
		<Nav tabs>
		<NavItem>
		<NavLink
		className={classnames({ active: activeTab === '1' })}
		onClick={() => { toggle('1') }}
		>
		Actors
		</NavLink>
		</NavItem>
		<NavItem>
		<NavLink
		className={classnames({ active: activeTab === '2' })}
		onClick={() => { toggle('2') }}
		>
		Directors
		</NavLink>
		</NavItem>
		</Nav>
		
		<TabContent activeTab={activeTab}>
		<TabPane tabId="1">
		<Row>
		<Col md="12" className="mt-5">
		<MatButton color="primary" onClick={toggle2}>Add new actor</MatButton>
		<Card className="card-plain">
		<CardHeader>
		<CardTitle tag="h4">
		Actor table
		</CardTitle>
		</CardHeader>
		<CardBody>
		<Table className="tablesorter" responsive>
		<thead className="text-primary">
		<tr>
		<th>#</th>
		<th>Actor name</th>
		<th>Edit actor</th>
		<th>Delete actor</th>
		</tr>
		</thead>
		<tbody>
		{
			actors && actors.map((value, i)=> <tr key={i}>
			<td>
			<a href={`${api}/` + value.actor_path} rel="noreferrer" target="_blank">
			<img src={`${api}/` + value.actor_path} alt="" width="100" height="100" style={{borderRadius: '50%'}} />
			</a>
			</td>
			<td>{value.actor_name_ru}</td>
			<td><MatButton onClick={toggle3} id={value.actor_id}>Details</MatButton></td>
			<td>
			<button onClick={e=>{
				toggle5()
				setDeleteActorId(e.target.id)
			}}
			id={value.actor_id}
			style={{background: 'red', outline:'none'}}>Delete</button>
			</td>
			</tr>)
		}
		</tbody>
		</Table>
		</CardBody>
		</Card>
		</Col>
		</Row>
		</TabPane>
		<TabPane tabId="2">
		<Row>
		<Col md="12" className="mt-5">
		<MatButton color="primary" onClick={toggle1}>Add new Directors</MatButton>
		<Card className="card-plain">
		<CardHeader>
		<CardTitle tag="h4">
		Director table
		</CardTitle>
		</CardHeader>
		<CardBody>
		<Table className="tablesorter" responsive>
		<thead className="text-primary">
		<tr>
		<th>#</th>
		<th>director name</th>
		<th>Edit director</th>
		<th>Delete director</th>
		</tr>
		</thead>
		<tbody>
		{
			directors && directors.map((value, i)=> <tr key={i}>
			<td>
			<a href={`${api}/` + value.director_path} rel="noreferrer" target="_blank">
			<img src={`${api}/` + value.director_path} alt="" width="100" height="100" style={{borderRadius: '50%'}}/>
			</a>
			</td>
			<td>{value.director_name_ru}</td>
			<td><MatButton onClick={toggle4} id={value.director_id}>Details</MatButton></td>
			<td>
			<button
			onClick={e=>{
				toggle6()
				setDeleteDirectorId(e.target.id)
			}}
			id={value.director_id}
			style={{background: 'red', outline:'none'}}
			>Delete</button>
			</td>
			</tr>)
		}
		</tbody>
		</Table>
		</CardBody>
		</Card>
		</Col>
		</Row>
		</TabPane>
		</TabContent>
		
		
		
		
		<Modal isOpen={modal} toggle={toggle2}>
		<form encType="multipart/form-data" onSubmit={submitForm}>
		<ModalHeader toggle={toggle2}>actor title</ModalHeader>
		<ModalBody className="modal_body">
		<Col>
		<input placeholder="Actor name (uz)" type="text" className="create-input"
		onKeyUp={e=>{
			if (e.target.value !== '') {
				const data = []
				const val = actors.map(i => {
					if (i.actor_name.includes(e.target.value)) {
						return i
					}
					return ''
				})
				for (const i of val) {
					if (i !== '') {
						data.push(i)
					}
				}		
				
				if(data.length > 0) {
					e.target.style.color = 'red'
				} else {
					e.target.style.color = 'green'
					setActorNameUz(e.target.value)
				}
			} else {
				e.target.style.color = 'green'
			}
		}} />
		</Col>
		<Col>
		<input placeholder="Actor name (ru)" type="text" className="create-input"
		onKeyUp={e=>{
			if (e.target.value !== '') {
				const data = []
				const val = actors.map(i => {
					if (i.actor_name_ru.includes(e.target.value)) {
						return i
					}
					return ''
				})
				for (const i of val) {
					if (i !== '') {
						data.push(i)
					}
				}		
				
				if(data.length > 0) {
					e.target.style.color = 'red'
				} else {
					e.target.style.color = 'green'
					setActorNameRu(e.target.value)
				}
			} else {
				e.target.style.color = 'green'
			}
			}} />
		</Col>
		<Col>
		<input placeholder="Profession (uz)" type="text" className="create-input"
		onKeyUp={e=>setActorProfiUz(e.target.value)} />
		</Col>
		<Col>
		<input placeholder="Profession (ru)" type="text" className="create-input"
		onKeyUp={e=>setActorProfiRu(e.target.value)} />
		</Col>
		<div>
		<input type="file" id="actorInput" accept=".jpg, .jpeg, .png" hidden onChange={fileUploadHandler} />
		<label className="fileUpload" htmlFor="actorInput">Choose File</label>
		<span id="actor">No file chosen</span>
		</div>
		</ModalBody>
		<ModalFooter>
		<Col>
		<MatButton>Create</MatButton>
		</Col>
		</ModalFooter>
		</form>
		</Modal>
		
		<Modal isOpen={modal1} toggle={toggle1}>
		<form encType="multipart/form-data" onSubmit={submitFormDirector}>
		<ModalHeader toggle={toggle1}>Director title</ModalHeader>
		<ModalBody className="modal_body">
		<Col>
		<input placeholder="Director name (uz)" type="text" className="create-input"
		onKeyUp={e=>{
			if (e.target.value !== '') {
				const data = []
				const val = directors.map(i => {
					if (i.director_name.includes(e.target.value)) {
						return i
					}
					return ''
				})
				for (const i of val) {
					if (i !== '') {
						data.push(i)
					}
				}		
				
				if(data.length > 0) {
					e.target.style.color = 'red'
				} else {
					e.target.style.color = 'green'
					setDirectorNameUz(e.target.value)
				}
			} else {
				e.target.style.color = 'green'
			}
			}} />
		</Col>
		<Col>
		<input placeholder="Director name (ru)" type="text" className="create-input"
		onKeyUp={e=>{
			if (e.target.value !== '') {
				const data = []
				const val = directors.map(i => {
					if (i.director_name_ru.includes(e.target.value)) {
						return i
					}
					return ''
				})
				for (const i of val) {
					if (i !== '') {
						data.push(i)
					}
				}		
				
				if(data.length > 0) {
					e.target.style.color = 'red'
				} else {
					e.target.style.color = 'green'
					setDirectorNameRu(e.target.value)
				}
			} else {
				e.target.style.color = 'green'
			}
			}} />
		</Col>
		<Col>
		<input placeholder="Profession (uz)" type="text" className="create-input"
		onKeyUp={e=>setDirectorProfiUz(e.target.value)} />
		</Col>
		<Col>
		<input placeholder="Profession (ru)" type="text" className="create-input"
		onKeyUp={e=>setDirectorProfiRu(e.target.value)} />
		</Col>
		<div>
		<input type="file" id="directorInput" accept=".jpg, .jpeg, .png" hidden onChange={fileUploadHandlerDirector} />
		<label className="fileUpload" htmlFor="directorInput">Choose File</label>
		<span id="director">No file chosen</span>
		</div>
		</ModalBody>
		<ModalFooter>
		<Col>
		<MatButton>Create</MatButton>
		</Col>
		</ModalFooter>
		</form>
		</Modal>
		
		
		<Modal isOpen={modal3} toggle={toggle3}>
		<FormGroup>
		<ModalHeader toggle={toggle3}>Actor UPDATE</ModalHeader>
		<ModalBody>
		<ul className="update-panel--modal">
		{
			actor && <li style={{display: 'flex', flexDirection: 'column'}}>
			<img src={`${api}/` + actor.actor_path} style={{borderRadius: '50%'}} className="update_img" alt="actor_img" width="100px" height="100px" />
			<div className="update_input">
			<label htmlFor="ruInput">
			(ru)<input onKeyUp={e=>setActorNameRu(e.target.value)}
			id="ruInput" defaultValue={actor.actor_name_ru} />
			</label>
			</div>
			<div className="update_input">
			<label htmlFor="uzInput">
			(uz)<input onKeyUp={e=>setActorNameUz(e.target.value)}
			id="uzInput" defaultValue={actor.actor_name} />
			</label>
			</div>
			<div className="update_input">
			<label htmlFor="uzInputProfRu">
			(ru)<input onKeyUp={e=>setActorProfiRu(e.target.value)}
			id="uzInputProfRu" defaultValue={actor.actor_profession_ru} />
			</label>
			</div>
			<div className="update_input">
			<label htmlFor="uzInputProfUz">
			(uz)<input onKeyUp={e=>setActorProfiUz(e.target.value)}
			id="uzInputProfUz" defaultValue={actor.actor_profession} />
			</label>
			</div>
			<div>
			<input
			type="file"
			id="actorInputupdate"
			accept=".jpg, .jpeg, .png"
			hidden onChange={fileUpdateUploadHandler} />
			<label
			className="fileUpload"  htmlFor="actorInputupdate">Choose File</label>
			<span id="actor12" style={{color: '#000'}}>No file chosen</span>
			</div>
			</li>
		}
		</ul>
		</ModalBody>
		<ModalFooter>
		<Col>
		<MatButton onClick={updateActorHandler}>Update</MatButton>
		</Col>
		</ModalFooter>
		</FormGroup>
		</Modal>
		
		<Modal isOpen={modal4} toggle={toggle4}>
		<FormGroup>
		<ModalHeader toggle={toggle4}>Actor UPDATE</ModalHeader>
		<ModalBody>
		<ul className="update-panel--modal">
		{
			director && <li style={{display: 'flex', flexDirection: 'column'}}>
			<img src={`${api}/` + director.director_path} style={{borderRadius: '50%'}} className="update_img" height="100px" alt="director_img" width="100px" />
			<div className="update_input">
			<label htmlFor="ruInput#1">
			(ru)<input onKeyUp={e=>setDirectorNameRu(e.target.value)}
			id="ruInput#1" defaultValue={director.director_name_ru} />
			</label>
			</div>
			<div className="update_input">
			<label htmlFor="uzInput#1">
			(uz)<input onKeyUp={e=>setDirectorNameUz(e.target.value)}
			id="uzInput#1" defaultValue={director.director_name} />
			</label>
			</div>
			<div className="update_input">
			<label htmlFor="uzInputProfRu#1">
			(ru)<input onKeyUp={e=>setDirectorProfiRu(e.target.value)}
			id="uzInputProfRu#1" defaultValue={director.director_profession_ru} />
			</label>
			</div>
			<div className="update_input">
			<label htmlFor="uzInputProfUz#1">
			(uz)<input onKeyUp={e=>setDirectorProfiUz(e.target.value)}
			id="uzInputProfUz#1" defaultValue={director.director_profession} />
			</label>
			</div>
			<div>
			<input
			type="file"
			id="directorInputupdate"
			accept=".jpg, .jpeg, .png"
			hidden onChange={fileUpdateUploadHandlerDirector} />
			<label
			className="fileUpload"  htmlFor="directorInputupdate">Choose File</label>
			<span id="director12" style={{color: '#000'}}>No file chosen</span>
			</div>
			</li>
		}
		</ul>
		</ModalBody>
		<ModalFooter>
		<Col>
		<MatButton onClick={updateDirectorHandler}>Update</MatButton>
		</Col>
		</ModalFooter>
		</FormGroup>
		</Modal>
		
		
		
		
		<Modal isOpen={modal5} toggle={toggle5}>
		<ModalHeader toggle={toggle5}>Modal title</ModalHeader>
		<ModalBody>
		Do you really want to delete actors?
		</ModalBody>
		<ModalFooter>
		<Button color="primary" onClick={() => {
			toggle5()
		}}>No</Button>
		<Button color="secondary" onClick={() => {
			toggle5()
			deleteActor()
		}}>Yes</Button>
		</ModalFooter>
		</Modal>
		
		
		
		<Modal isOpen={modal6} toggle={toggle6}>
		<ModalHeader toggle={toggle6}>Modal title</ModalHeader>
		<ModalBody>
		Do you really want to delete director?
		</ModalBody>
		<ModalFooter>
		<Button color="primary" onClick={() => {
			toggle6()
		}}>No</Button>
		<Button color="secondary" onClick={() => {
			toggle6()
			deleteDirector()
		}}>Yes</Button>
		</ModalFooter>
		</Modal>
		</div>
		</>
		)
	}