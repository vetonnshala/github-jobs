import React, {useState} from 'react';
import { Container } from 'react-bootstrap';
import useFetchJobs from './useFetchJobs'
import JobsPagination from './JobsPagination'
import Job from './Job';
import SearchForm from './SearchForm';

function App() {
const [params, setParams] =useState({})
const [page, setPage] = useState(1)
const {jobs, loading, error, hasNextPage} = useFetchJobs(params, page)

function handleParamChange(e) {

  const param = e.target.name
  const value = e.target.value
  setPage(1)
  setParams(prevParams => {
    return { ...prevParams, [param]: value }
  })
}

  return (
    <Container className="my-4">
     <h2 className="mb-4 text-light ">GitHub Jobs</h2>
      
      <SearchForm params={params} onParamChange={handleParamChange}/>

      <JobsPagination page={page} setPage={setPage} hasNextPage ={hasNextPage} /> 
       { loading && <h3 className="text-light">Loading...</h3>}
       { error && <h3  className="text-light" >Error. Try refreshing or request access on console</h3>}
      {jobs.map(job =>{
        return <Job key={job.id} job={job} />
      })}
     <JobsPagination page={page} setPage={setPage} hasNextPage ={hasNextPage}/> 
    </Container>
    
  )
}

export default App;
