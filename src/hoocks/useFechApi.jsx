import { useState } from 'react'
import axios from 'axios'

function useFetchApi () {
  const [data, setData] = useState(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null)

  const request = async ({ url, method = 'GET', body = null, id = null }) => {
    setPending(true)
    setError(null)

    try {
      const res = await axios({
        url,
        method,
        data: method !== 'GET' ? body : null,
      })
      console.log(res,'res');

      
      switch (method) {
        
        case 'POST':
          console.log(data,'data');
          console.log(res.data,'res.data');

          
          setData((prev) => [...prev, res.data])
          break;
          
        case 'patch':
        case 'PUT':
          setData((prev) => prev.map((item) => (item.id === id ? res.data : item)))
          break;

        case 'DELETE':
          setData((prev) => prev.filter((item) => item.id !== id))
          break;
      
        default:setData(res.data.results)
          break;
      }
  
    } catch (error) {
      setError(error)
    } finally {
      setPending(false)
    }
  }

  return { data, pending, error, request }
}
export default useFetchApi