import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length ,setlength] = useState(6)
  const [addnumber,setaddnumber] = useState(false)
  const [addchar,setaddchar] = useState(false)
  const [password,setpassword] = useState("")
  const passref=useRef(null)
  const Passwordgenerator = useCallback(()=>{
    let pass="";
    let str="qwertyuiopasdfghjklzxcvbnmWERTYUIOPASDFGHJKLZXCVBNM"
    if(addnumber) str+="1234567890"
    if(addchar) str+="!@#$%^&*()_+<>][}{=-"

    for(let i=1;i<=length;i++){
      const temp= Math.floor(Math.random() * str.length +1)
      pass+=str.charAt(temp)
    }
    setpassword(pass)
  },[length,addchar,addnumber,setpassword])

  const copypassword = useCallback(()=>{
    passref.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    Passwordgenerator()
  },[length,addchar,addnumber,Passwordgenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-12 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-1'> Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text" 
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passref}
          />
          <button 
          onClick={copypassword}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setlength(e.target.value)}}
            />
            <label>length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={addnumber}
            id='numberInput'
            onChange={()=>{setaddnumber((prev)=>!prev)}}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={addchar}
            id='characterInput'
            onChange={()=>{setaddchar((prev)=>!prev)}}
            />
            <label htmlFor='characterInput'>Characters</label>
          </div>
        </div>
        <img src="https://wallpapercave.com/download/enter-password-wallpapers-wp13081853" alt="Password" class="w-full h-auto"/>

      </div>
      
    </>
  )
}
export default App