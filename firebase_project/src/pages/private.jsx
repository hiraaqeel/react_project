import { signOut } from "firebase/auth"
import { auth } from "../firebase"


function Private() {
  const handleSignOut=()=>{
    signOut(auth)
    .then(()=>alert("Signed Out Successfully"))
    .catch(error=>{
      console.log(error)
      alert(error.message)
    })

  }
  return (
  <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
    <h1>private page</h1>
    <button onClick={handleSignOut}>SignOut</button>
    </div>
  )
}

export default Private
