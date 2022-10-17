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
  Button as MatButton,
  FormGroup
} from "reactstrap"
import {api, Axios} from "../../service"

export default function Ads () {
    const [ file, setFile] = useState()
    const [ adsName, setAdsName] = useState('')
    const [ adsLink, setAdsLink] = useState('')
    const [ modal, setModal] = useState(false)
	const [modal1, setModal1] = useState(false)
    const [ modal2, setModal2] = useState(false)
    const [ads, setADS] = useState([])
    const [adsSingle, setAdsSingle] = useState({})
	const [deleteId, setDeleteId] = useState()
	const toggle1 = () => setModal1(!modal1)
	const toggle = () => {
		setModal(!modal)
	}


	const toggle2 = (e) => {
		setModal2(!modal2)
		updateAds(e)
	}


	async function deleteAds() {
		const res = await Axios.post('/delete-ads', { id: deleteId })
		const data = res.data.data.ads_id
		setADS(ads.filter(item => item.ads_id !== data))
		setDeleteId('')
	}

	async function updateAds(e) {
		const res = await Axios.get('/ads-one', {params: {id: e.target.id}})
		setAdsSingle(res.data.data)
	}

	async function fileUploadHandler(e) {
		document.getElementById('file-chosen').textContent = e.target.files[0].name
		setFile(e.target.files[0])
	}

  async function fileUpdateUploadHandler(e) {
    document.getElementById('file-chosen1').textContent = e.target.files[0].name
    setFile(e.target.files[0])
  }

  async function submitUpdateForm() {
    let data = new FormData()
    data.append('file', file || {})
    data.append('id', adsSingle.ads_id)
    data.append('oldFile', adsSingle.ads_path)
    data.append('adsName', adsName || (adsSingle.ads_path && adsSingle.ads_path.split('/')[1].split('.')[0].split('-')[1]))
    data.append('link', adsLink || adsSingle.ads_link)
    const res = await Axios.post('/update-ads', data)
	const adsId = res.data.data.ads_id
	setADS([...ads.filter(item => item.ads_id !== adsId), res.data.data])
	setModal2(false)
  }

  async function submitForm(e) {
	e.preventDefault()
    let data = new FormData()
    data.append('file', file)
    data.append('adsName', adsName)
    data.append('link', adsLink)
    const res = await Axios.post('/ads-upload', data)
	setADS([res.data.data, ...ads])
	setModal(false)
  }

  async function getAds(){
	const res = await Axios.get('/ads-all')
	setADS(res.data.data)
}

  useEffect(()=>{
		try {
			getAds()
		} catch (error) {
			
		}
	},[])

    return (
        <>
            <div className="content">

        <Row>
          <Col md="12">
          </Col>
          <Col md="12">
		  <MatButton color="primary" onClick={toggle}>Add new ads</MatButton>
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">
                  ADS table
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                        <th>#</th>
                        <th>ads name</th>
                        <th>Edit ads</th>
                        <th>Delete ads</th>
                      </tr>
                    </thead>
					<tbody>
						{
							ads && ads.map((value, i)=> <tr key={i}>
								<td>
									<a href={value.ads_link} rel="noreferrer" target="_blank">
										<img src={`${api}/` + value.ads_path} alt="" width="100" height="40" />
									</a>
								</td>
								<td>{value.ads_path.split('/')[1].split('.')[0]}</td>
								<td><MatButton onClick={toggle2} id={value.ads_id}>Details</MatButton></td>
								<td>
									<button onClick={e => {
										toggle1()
										setDeleteId(e.target.id)
									}}
									id={value.ads_id}
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
		<Modal isOpen={modal} toggle={toggle}>
			<form encType="multipart/form-data" onSubmit={submitForm}>
				<ModalHeader toggle={toggle}>ADS title</ModalHeader>
				<ModalBody className="modal_body">
				{/* <Input placeholder='ADS name' id=""  type="text" onKeyUp={e => } /> */}
					<Col>
					<input type="text" placeholder="ADS name" onKeyUp={e => setAdsName(e.target.value)} style={{width: "100%"}}/>
					</Col>
					<Col>
					<input type="text" placeholder="ADS link" onKeyUp={e => setAdsLink(e.target.value)} style={{width: "100%"}}/>
					</Col>
					<input type="file" id="actual-btn" accept=".jpg, .jpeg, .png" hidden onChange={fileUploadHandler} />
					<label className="fileUpload" htmlFor="actual-btn">Choose File</label>
					<span id="file-chosen">No file chosen</span>
				</ModalBody>
				<ModalFooter>
				<MatButton
				style={{"margin": "0 auto", "marginTop": "10px", "marginBottom": "40px", "width": "90%"}} color="primary">Upload</MatButton>
				</ModalFooter>
			</form>
		</Modal>

		<Modal isOpen={modal2} toggle={toggle2}>
			<FormGroup>
				<ModalHeader toggle={toggle2}>Genre UPDATE</ModalHeader>
				<ModalBody>
				<ul className="update-panel--modal">
					{
						adsSingle && <li style={{display: 'flex', flexDirection: 'column'}}>
							<div className="update_input">
								<label htmlFor="ruInput" style={{color: "#000", width: "104%", display: "flex"}}>
									(link) <input onKeyUp={e=>setAdsLink(e.target.value)}
									id="ruInput" defaultValue={adsSingle.ads_link} />
								</label>
							</div>
							<div className="update_input" >
								<label htmlFor="nameInput" style={{color: "#000", width: "104%", display: "flex"}}>
									(name) <input onKeyUp={e=>setAdsName(e.target.value)}
									id="nameInput" defaultValue={adsSingle.ads_path && adsSingle.ads_path.split('/')[1].split('.')[0].split('-')[1]} />
								</label>
							</div>
								<div style={{color: "#000"}}>
									<input type="file" id="actual-btn1" accept=".jpg, .jpeg, .png" hidden onChange={fileUpdateUploadHandler} />
									<label className="fileUpload" htmlFor="actual-btn1">Choose File</label>
									<span id="file-chosen1">No file chosen</span>
								</div>
						</li>
					}
				</ul>
				</ModalBody>
				<ModalFooter>
				<Col>
					<MatButton onClick={submitUpdateForm}>Update</MatButton>
				</Col>
				</ModalFooter>
			</FormGroup>
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
			deleteAds()
		}}>Yes</Button>
		</ModalFooter>
		</Modal>
            </div>
        </>
    )
}
