import { useState, useEffect } from 'react'
import {Axios} from '../service'
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
  FormGroup,
  Button as MatButton,
  
} from "reactstrap"


function Country() {
	const [modal, setModal] = useState(false)
  const [ modal2, setModal2] = useState(false)
  const [ modal3, setModal3] = useState(false)
  const [countryNameRu,setCountryNameRu] = useState('')
  const [countryNameUz,setCountryNameUZ] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState({})

  const [deleteId, setDeleteId] = useState()
  const toggle = () => setModal(!modal)
  const toggle2 = () => {
    setModal2(!modal2)
  }


  const toggle3 = (e) => {
    setModal3(!modal3)
	updateCountry(e)
  }


	async function deleteCountry() {
		const res = await Axios.post('/delete-country', { id: deleteId })
		const data = res.data.data.country_id
		setCountries(countries.filter(item => item.country_id !== data))
		setDeleteId('')
	}

  async function updateCountry(e) {
	const res = await Axios.get('/country-one', {params: {id: e.target.id}})
	setCountry(res.data.data)
  }

  async function getCountry(){
	const res = await Axios.get('/countries')
	setCountries(res.data.data)
}

  	useEffect(()=>{
		getCountry()
	},[])


	async function updateountryHandler() {
		const data = {
			id: country.country_id,
			countryName: countryNameUz || country.country_name,
			countryNameRu: countryNameRu || country.country_name_ru
		}
		const res = await Axios.post('/update-country', data)
		const counId = res.data.data.country_id
		setCountries([...countries.filter(item => item.country_id !== counId), res.data.data])
		setModal3(false)
	}
   
    async function addCategoryHandler() {
        const data = {
			countryName: countryNameUz,
			countryNameRu: countryNameRu
		}
       const res = await Axios.post('/new-country', data)
	   setCountries([res.data.data, ...countries])
	   setModal2(false)
    }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
		  <MatButton onClick={toggle2} color="primary">Add new country</MatButton>
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">
                  Country Table
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
							countries && countries.map((value, key) => (<tr style={{color: 'white'}} key={key}>
								<td>{'# '+(key+1)}</td>
								<td>{value.country_name_ru}</td>
								<td><MatButton onClick={toggle3} id={value.country_id}>Details</MatButton></td>
								<td>
									<button onClick={e => {
										toggle()
										setDeleteId(e.target.id)
									}}
									id={value.country_id}
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
				<ModalHeader toggle={toggle2}>Country</ModalHeader>
				<ModalBody className="modal_body">
					<Col>
						<input placeholder="Country name (uz)" type="text" className="create-input" 
						onKeyUp={e=>setCountryNameUZ(e.target.value)} />
					</Col>
					<Col>
						<input placeholder="Country name (ru)" type="text" className="create-input"
						onKeyUp={e=>setCountryNameRu(e.target.value)} />
					</Col>
				</ModalBody>
				<ModalFooter>
						<Col>
							<MatButton onClick={addCategoryHandler}>Create Country</MatButton>
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
						country && <li style={{display: 'flex', flexDirection: 'column'}}>
							<div className="update_input">
								<label htmlFor="ruInput">
									(ru)<input onKeyUp={e=>setCountryNameRu(e.target.value)}
									id="ruInput" defaultValue={country.country_name_ru} />
								</label>
							</div>
							<div className="update_input">
								<label htmlFor="uzInput">
									(uz)<input onKeyUp={e=>setCountryNameUZ(e.target.value)}
									id="uzInput" defaultValue={country.country_name} />
								</label>
							</div>
						</li>
					}
				</ul>
				</ModalBody>
				<ModalFooter>
				<Col>
					<MatButton onClick={updateountryHandler}>Update</MatButton>
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
			deleteCountry()
		}}>Yes</Button>
		</ModalFooter>
		</Modal>
      </div>
    </>
  )
}

export default Country
