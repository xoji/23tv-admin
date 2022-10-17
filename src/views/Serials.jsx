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

} from "reactstrap"

import {api, Axios} from '../service'

function Serials() {
	const [videos, setVideos] = useState([])

	async function serialAll(){
		const res = await Axios.get('/movie-all-serials')
		setVideos(res.data.data)
	}
	
	useEffect(()=>{
		serialAll()
	},[])
	
	
	return (
		<>
		<div className="content">
		<Row>
		<Col md="12">
		<Card className="card-plain">
		<CardHeader>
		<CardTitle tag="h4">
			Serials table
		</CardTitle>
		</CardHeader>
		<CardBody>
		<Table className="tablesorter" responsive>
		<thead className="text-primary">
		<tr>
		<th>#</th>
		<th>serial name</th>
		<th>go to</th>
		</tr>
		</thead>
		<tbody>
		{
			videos && videos.map((value, i)=> <tr key={i}>
			<td>
			<a href={`${api}/` + value.movie_thumnail_path} rel="noreferrer" target="_blank">
			    <img src={`${api}/` + value.movie_thumnail_path} alt="" width="100" height="40" />
			</a>
			</td>
			<td>{value.movie_name_ru}</td>
			<td><MatButton onClick={()=>{
                window.location.href = `/serials/${value.movie_id}`
            }}>Details</MatButton></td>
			</tr>
			)
		}
		</tbody>
		</Table>
		</CardBody>
		</Card>
		</Col>
		</Row>
		</div>
		</>
		)
	}
	
export default Serials