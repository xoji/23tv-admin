import { useState, useEffect } from 'react'
import {Axios} from '../../service'
import Button from '@material-ui/core/Button'
import './styleCategory.css'
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


function Tables() {
	const [modal, setModal] = useState(false)
	const [ modal2, setModal2] = useState(false)
	const [ modal3, setModal3] = useState(false)
	const [categories, setCategories] = useState([])
	const [category, setCategory] = useState({})
	const [categoryNameUz, setCategoryNameUz] = useState('')
	const [categoryNameRu, setCategoryNameRu] = useState('')
	const [deleteId, setDeleteId] = useState()
	
	const toggle = () => setModal(!modal)
	
	const toggle2 = () => {
		setModal2(!modal2)
	}
	
	const toggle3 = (e) => {
		setModal3(!modal3)
		if (e) {
			updateCategory(e)
		}
	}

	async function deleteCategory() {
		try {
			const res = await Axios.post('/delete-category', { id: deleteId })
			const data = res.data.data.rows[0].category_id
			console.log(data)
			setCategories(categories.filter(item => item.category_id !== data))
			setDeleteId('')
		} catch (error) {
			return error.message
		}
	}
	
	async function updateCategory(e) {
		try {
			setCategory({})
			// console.log(e.target.id)
			const res = await Axios.get('/category-one', {params: {id: e.target.id}})
			setCategory(res.data.data)
			// console.log(res.data.data)
		} catch (error) {
			
		}
	}

	async function getCategory() {
		// console.log(localStorage.getItem('token'))
		const res = await Axios.get('/categories', {
			headers: {
				Authorization: localStorage.getItem('token')
			}
		})
		setCategories(res.data.data)
	}

	
	useEffect(()=>{
		try {
				getCategory()
		} catch (error) {
			
		}
	},[])

	async function updateCategoryHandler() {
		try {
			const data = {
				id: category.category_id,
				categoryName: categoryNameUz || category.category_name,
				categoryNameRu: categoryNameRu || category.category_name_ru
			}
			const res = await Axios.post('/update-category', data)
			const catId = res.data.data.category_id
			setCategories([...categories.filter(item => item.category_id !== catId), res.data.data])
			setModal3(false)
		} catch (error) {
			
		}
	}
	
	async function addCategoryHandler() {
		try {
			const data = {
				category_name: categoryNameUz,
				category_name_ru: categoryNameRu
			}
		
			const res = await Axios.post('/new-category', data)
			setCategories([res.data.data, ...categories])
			setModal2(false)
		} catch (error) {
			
		}
	}
	
	return (
		<>
		<div className="content">
		<Row>
		<Col md="12">
		<MatButton onClick={toggle2} color="primary">Add new category</MatButton>
		<Card className="card-plain">
		<CardHeader>
		<CardTitle tag="h4">
		Category Table
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
			categories && categories.map((value, key) => (<tr style={{color: 'white'}} key={key}>
			<td>{'# '+(key+1)}</td>
			<td>{value.category_name_ru}</td>
			<td><MatButton onClick={toggle3} id={value.category_id}>Details</MatButton></td>
			<td>
				<button onClick={e => {
					toggle()
					setDeleteId(e.target.id)
				}} id={value.category_id}
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
		<ModalHeader toggle={toggle2}>Create Category</ModalHeader>
		<ModalBody className="modal_body">
		<Col>
		<input placeholder="Category name (uz)" type="text" className="create-input" 
		onKeyUp={e=>setCategoryNameUz(e.target.value)} />
		</Col>
		<Col>
		<input placeholder="Category name (ru)" type="text" className="create-input"
		onKeyUp={e=>setCategoryNameRu(e.target.value)} />
		</Col>
		</ModalBody>
		<ModalFooter>
		<Col>
		<MatButton onClick={addCategoryHandler}>Create category</MatButton>
		</Col>
		</ModalFooter>
		</FormGroup>
		</Modal>
		
		
		<Modal isOpen={modal3} toggle={toggle3}>
		<FormGroup>
		<ModalHeader toggle={toggle3}>Category UPDATE</ModalHeader>
		<ModalBody>
		<ul className="update-panel--modal">
		{
			category && <li style={{display: 'flex', flexDirection: 'column'}}>
			<div className="update_input">
			<label htmlFor="ruInput">
			(ru)<input onKeyUp={e=>setCategoryNameRu(e.target.value)}
			id="ruInput" defaultValue={category.category_name_ru} />
			</label>
			</div>
			<div className="update_input">
			<label htmlFor="uzInput">
			(uz)<input onKeyUp={e=>setCategoryNameUz(e.target.value)}
			id="uzInput" defaultValue={category.category_name} />
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
	
	export default Tables
