import React, {Component} from "react";
import { TextField ,FormControl, Select, MenuItem, Box,Typography, InputAdornment} from "@mui/material";
import { Password } from "@mui/icons-material";

class Form extends Component{
    constructor(props){
        super(props)
        this.state = {country:[{Name:"India",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwiVvtWaAShEETOjaVPVkdZHXl-Y_iSQfX_g&s",code:"+91"},{Name:"Russia",img:"https://nationaltoday.com/wp-content/uploads/2022/06/Frame-18-min-1200x834.jpg",code:"+92"},{Name:"Taiwan",img:"https://t4.ftcdn.net/jpg/07/26/35/15/360_F_726351563_tiKpWBT3BIWg2Re5YEikbNSJ2bDiWiA3.jpg",code:"+93"},{Name:"Somalia",img:"https://i.pinimg.com/736x/de/11/4b/de114bdf992bbe4ca85c016372f4b5b4.jpg",code:"+94"}],PhCode:"", name:false,email:false, password:false}

    }

    nameCheck = (e)=>{
        console.log("naming checking")
        if(e.target.value === ""){
            this.setState({name:true})
        }else{
            this.setState({name:false})
        }
        
    }

    emailCheck = (e)=>{
        console.log("email checking", e.target.value)
     const valid = /(@gmail.com)/;
      const result = valid.test(e.target.value)
     
 console.log(result)
        if(e.target.value!== ""){
            if(!result){
                this.setState({email:true})
              }
              else {
                this.setState({email:false})
              }
        }
        // else{
        //     this.setState({email:false})
        // }
        

     
    }

    select = (e)=>{
        console.log(e.target.value)
        let codex = this.state.country.filter((item)=>(item.Name === e.target.value))
        // (e.target.value === "")?  this.setState({err:true}) : "" 
        this.setState({PhCode:codex[0].code})

        
         console.log(codex[0].Name)
    }


    render(){

      const{name, email, password} = this.state
        return(

            <>

<div className="w-[500px] h-[100vh] py-3 px-3 flex flex-col items-start justify-start gap-5 shaodow-2xl bg-white  rounded-xl">
    <FormControl fullWidth >
      <Typography sx={{display:'flex', flexDirection:"column",alignItems:"start", justifyContent:"start"}}>
      <h1 className="text-lg font-bold text-gray-600">Need an Account - Sign Up</h1>
      <p className="text-blue-400">Basic Information</p>
        </Typography>  

{/* Name */}
    <TextField  onChange={(e)=>this.nameCheck(e)} fullWidth id="outlined-basic" placeholder="Enter your name" color="success" size="small"  label="Full Name" variant="outlined" type="text" required  sx={{marginTop:2}}/>

   {name ? <Typography sx={{display:'flex', justifyContent:"end", fontSize:"0.600rem", color:"red"}}>Name is required</Typography> : null } 
    
   {/* Email */}
    <TextField  onChange={(e)=>this.emailCheck(e)} fullWidth id="outlined-basic" placeholder="Enter your Email" color="success" size="small" label="Email Address" variant="outlined" type="email" sx={{marginTop:2}} required />

    {email ? <Typography sx={{display:'flex', justifyContent:"end", fontSize:"0.600rem", color:"red"}}>Email is required</Typography> : null } 
{/* select country */}
   <Select fullWidth id="outlined-basic" onChange={(e)=>this.select(e)}  color="success" size="small" label="country" variant="outlined" sx={{marginTop:2}} required>
    {
        this.state.country.map((item,index)=> (
              <MenuItem key={index} value={item.Name} >
                <Box className="flex items-center justify-start gap-2 " >
                <Box component='img' src={item.img} sx={{ width: 50, marginLeft: 2 }}/>
      <Typography>{item.Name}</Typography>
    
                </Box>
              </MenuItem>
           
        )
        
    )
    }



   </Select>

   {/* phone number */}
   <TextField fullWidth id="outlined-basic" color="success" placeholder="-Phone Number" size="small" label="Phone number" variant="outlined"  type="number"
     InputProps={{
        startAdornment: <InputAdornment position="start">{this.state.PhCode}</InputAdornment>,
      }}
 sx={{marginTop:2}} required />
 
   <Typography sx={{display:'flex', justifyContent:"end", fontSize:"0.600rem", color:"red"}}>Phone number is required</Typography>

   {/* password */}
   <TextField fullWidth id="outlined-basic" placeholder="Enter your password" color="success" size="small" label="Password" variant="outlined" type="password" sx={{marginTop:2}} required />
   <Typography sx={{display:'flex', justifyContent:"end", fontSize:"0.600rem", color:"red"}}> Password is required</Typography>
    </FormControl>
    
</div>

            </>
        )
    }
}

export default Form;