import { useEffect, useState } from 'react'
import './App.css'
import useFetchApi from './hoocks/useFechApi'
import './App.scss'

const users = 'https://users-crud-api-production-9c59.up.railway.app/api/v1/users'

function App() {

 const {data,pending,error,request} = useFetchApi()

 const [firstName,setFirstName] = useState('')
 const [LastName,setLastName] = useState('')
 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('')
 const [birthday,setBirthday] = useState('')
 const [imageUrl,setImageUrl] = useState('')
 const [isEditing,setIsEditing] = useState(false)
 const [useId,setUseId]= useState('')

 const add = async (e) => {
  e.preventDefault()
   await request({
  url: users,
  method: 'POST',
  body: {
    first_name: firstName,
    last_name: LastName,
    email: email,
    password: password,
    birthday: birthday,
    image_url: imageUrl
  }})
 }
 
const editUser = async(id,newData) => {
 
  setIsEditing(true)
  setFirstName(newData.first_name)
  setBirthday(newData.birthday.split('T')[0])
  setEmail(newData.email)
  setImageUrl(newData.image_url)
  setPassword(newData.password)
  setLastName(newData.last_name)
  setUseId(id)
}

const edit = async(e)=>{
    e.preventDefault()
    await request({
    url: users + '/' + useId,
    method: 'PUT',
    body: {
      first_name: firstName,
      last_name: LastName,
      email: email,
      password: password,
      birthday: birthday,
      image_url: imageUrl
    },
     id:useId
    })} 

 const elim = async (id) => {
   await request({
     url: `${users}/${id}`,
     method: 'DELETE',
     body: null,
     id: id
    })
  }
  

 useEffect(() => {
    request({ url: users,
              method: 'GET' })
 },[])


  return (
    <div className='all'>
      <div className='container_form'>
       <form className='form' 
            onSubmit={(e)=>{if (isEditing) {edit(e)}else {add(e)}}}>

        <div className='text_form'>
        <h2>New User</h2>
        
        <div className='inputs'>
        
        <div>
         <label>First Name </label>
         <br />
         <input type="text"
         className='first_name'
         placeholder='First Name'
         value={firstName}
         onChange={(e)=>setFirstName(e.target.value)}/>
        </div>

        <div>
         <label>Last Name </label>
         <br />
         <input type="text" 
         className='last_name'
         placeholder='Last Name'
         value={LastName}
         onChange={(e)=>setLastName(e.target.value)}/>
        </div>
        
        <div>
         <label>Email </label>
         <br />
         <input type="email" 
         className='email'
         placeholder='Email'
         value={email}
         onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        
        <div>
         <label>Password </label>
         <br />
         <input type="password"
         className='password'
         placeholder='Password' 
         value={password}
         onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        
        <div>
         <label>Happy Birthday </label>
         <br />
         <input type="date"
          className='birthday'
         placeholder='Birthday'
         value={birthday}
         onChange={(e)=>setBirthday(e.target.value)} />
        </div>
        
        <div>
         <label>Image Url </label>
         <br />
         <input type="text" 
          className='image_url'
         placeholder='Image Url'
         value={imageUrl}
         onChange={(e)=>setImageUrl(e.target.value)}/>
        </div>
        
        </div>

        <button 
        className='btn_create'
        type='submit' >
          {isEditing?'Editar Usuario':'Crear Usuario'}</button>

      </div>
      </form>
      </div>



<div className='container_users'>

{data?.map((data2)=>{return(
 <div className='userss'> 
   <div className='container_res' key={data2.id}>
    <h2>Name: <h5>{data2.first_name}</h5></h2>
    <h2>Last Name: <h5>{data2.last_name}</h5></h2>
    <h2>Email: <h5>{data2.email}</h5></h2>
    <h2>Password: <h5>{data2.password}</h5></h2>
    <h2>Birthday: <h5>{data2.birthday}</h5></h2>
    <img src={data2.image_url} alt={data2.first_name}/>
   </div>

   <button className='btn_edit'
   onClick={()=>{editUser(data2.id,data2)}}>Edit</button>
   <button className='btn_delate'  
   onClick={()=>elim(data2.id)}>Delate</button>
  
  </div>
)} 
  
)}
  </div>

</div>

  )}

export default App
