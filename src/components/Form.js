import React, { Component } from "react";
import { TextField, FormControl, Select, MenuItem, Box, Typography, InputAdornment, FormControlLabel, Checkbox, Link, Button , Grid} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { isVisible } from "@testing-library/user-event/dist/utils";

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = { country: [{ Name: "India", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwiVvtWaAShEETOjaVPVkdZHXl-Y_iSQfX_g&s", code: "+91" }, { Name: "Russia", img: "https://nationaltoday.com/wp-content/uploads/2022/06/Frame-18-min-1200x834.jpg", code: "+92" }, { Name: "Taiwan", img: "https://t4.ftcdn.net/jpg/07/26/35/15/360_F_726351563_tiKpWBT3BIWg2Re5YEikbNSJ2bDiWiA3.jpg", code: "+93" }, { Name: "Somalia", img: "https://i.pinimg.com/736x/de/11/4b/de114bdf992bbe4ca85c016372f4b5b4.jpg", code: "+94" }], PhCode: "", name: "", email: "", countr: "", phone: "", password: "", nameErr: false, emailErr: false, emailValidate: false, phoneErr: false, passwordReq: false, passwordUppercase: false, passwordLowercase: false, passwordOnedigit: false, passwordEightChar: false, isVisible: false, passType: false }


  }

  nameCheck = (e) => {
    console.log("naming checking")
    if (e.target.value === "") {
      this.setState({ name: e.target.value })
      this.setState({ nameErr: true })
    } else {
      this.setState({ nameErr: null })
    }

  }

  emailCheck = (e) => {
    console.log("email checking", e.target.value)
    const valid = /(@gmail.com)/;
    const result = valid.test(e.target.value)

    console.log(result)
    if (e.target.value !== "") {
      if (!result) {
        this.setState({ emailValidate: true })
        this.setState({ emailErr: null })
      }
      else {
        this.setState({ emailValidate: false })
        this.setState({ emailErr: false })

      }
    }
    else {
      this.setState({ emailErr: true })
      this.setState({ emailValidate: null })
    }



  }

  select = (e) => {


    let codex = this.state.country.filter((item) => (item.Name === e.target.value))
    // (e.target.value === "")?  this.setState({err:true}) : "" 
    this.setState({ PhCode: codex[0].code })


    //  console.log(codex[0].Name)
  }

  phoneNumberCheck = (e) => {
    if (e.target.value === "") {
      this.setState({ phoneErr: true })
    } else {
      this.setState({ phoneErr: null })
    }
  }

  passwordCheck = (e) => {
    const value = e.target.value;
    const eightChar = value.length >= 8;
    const upperCase = /[A-Z]/.test(value);
    const lowerCase = /[a-z]/.test(value);
    const oneDigit = /[0-9]/.test(value);

    if(value!== ""){
      this.setState({
        password: value,
        passwordReq: false,
        passwordEightChar: !eightChar,
        passwordUppercase: !upperCase,
        passwordLowercase: !lowerCase,
        passwordOnedigit: !oneDigit
      });
    } 
    else{
      this.setState({
        password: value,
        passwordReq: true,
        passwordEightChar: false,
        passwordUppercase: false,
        passwordLowercase: false,
        passwordOnedigit: false
      });
    }
 
  };

  passwordVisbility = () => {
    if (this.state.isVisible === false) {

      this.setState({ isVisible: true })
      this.setState({ passType: true })
    }
    else {
      this.setState({ isVisible: false })
      this.setState({ passType: false })
    }
  }

  formSubmit = (e)=>{
    e.preventDefault()
  
    const {name, email, phone, password} = this.state;
    const nameC = name === ""
    const emailC = email === ""
    const phoneC = phone === ""
    const passwordC = password === ""

    this.setState({nameErr:nameC, emailErr:emailC, passwordReq:passwordC, phoneErr:phoneC})
  }

  render() {

    const { nameErr, emailErr, emailValidate, phoneErr, passwordReq, passwordEightChar, passwordLowercase, passwordOnedigit, passwordUppercase, isVisible, passType } = this.state
    return (

      <>

      <div className="flex flex-col h-full mt-12 md:px-10 md:[w-80%] lg:flex-row lg:items-center lg:justify-center  ">
      <img src="https://warrantyapp-308736-react.b308736.dev.eastus.az.svc.builder.cafe/static/media/signup_left_image.016c1705.png"  alt="girl" className="hidden lg:block w-[500px] h-full "/>

{/*Registration form */}

<div className="w-[100%] lg:w-[500px] h-[auto]  py-3 px-6 flex flex-col items-start justify-start gap-5 shaodow-2xl bg-white   rounded-xl">
       
          <FormControl fullWidth  >
            <Typography sx={{ display: 'flex', flexDirection: "column", alignItems: "start", justifyContent: "start" }}>
              <h1 className="text-lg font-bold text-gray-600">Need an Account - Sign Up</h1>
              <p className="text-blue-400">Basic Information</p>
            </Typography>

            {/* Name */}
            <TextField onChange={(e) => this.nameCheck(e)} fullWidth id="outlined-basic" placeholder="Enter your name" color="success" size="small" label="Full Name" variant="outlined" type="text" required sx={{ marginTop: 4 }} />

            {nameErr ? <Typography sx={{ display: 'flex', justifyContent: "end", fontSize: "0.600rem", color: "red" }}>Name is required</Typography> : null}

            {/* Email */}
            <TextField onChange={(e) => this.emailCheck(e)} fullWidth id="outlined-basic" placeholder="Enter your Email" color="success" size="small" label="Email Address" variant="outlined" type="email" sx={{ marginTop: 4 }} required />

            {emailErr ? <Typography sx={{ display: 'flex', justifyContent: "end", fontSize: "0.600rem", color: "red" }}>Email is required</Typography> : null}
            {emailValidate ? <Typography sx={{ display: 'flex', justifyContent: "end", fontSize: "0.600rem", color: "red" }}>Please Enter a valid email address!</Typography> : null}
            {/* select country */}
            <Select fullWidth id="outlined-basic"  onChange={(e) => this.select(e)} color="success" size="small" label="country" variant="outlined" sx={{ marginTop: 4 }} required>
              {
                this.state.country.map((item, index) => (
                  <MenuItem key={index} value={item.Name} >
                    <Box className="flex items-center justify-start gap-2 " >
                      <Box component='img' src={item.img} sx={{ width: 50, marginLeft: 2 }} />
                      <Typography>{item.Name}</Typography>

                    </Box>
                  </MenuItem>

                )

                )
              }



            </Select>

            {/* phone number */}
            <TextField onChange={(e) => this.phoneNumberCheck(e)} fullWidth id="outlined-basic" color="success" placeholder="-Phone Number" size="small" label="Phone number" variant="outlined" type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">{this.state.PhCode}</InputAdornment>,
              }}
              sx={{ marginTop: 4 }} required />

            {phoneErr ? <Typography sx={{ display: 'flex', justifyContent: "end", fontSize: "0.600rem", color: "red" }}>Phone number is required</Typography> : null}

            {/* password */}
            <TextField onChange={(e) => this.passwordCheck(e)} fullWidth id="outlined-basic" placeholder="Enter your password" color="success" size="small" label="Password" variant="outlined" type={(passType ? "text" : "password")} InputProps={{
              endAdornment: (
                <InputAdornment onClick={this.passwordVisbility} position="end" sx={{ cursor: "pointer" }}>
                  {(isVisible) ? <Visibility /> : <VisibilityOff />}
                </InputAdornment>
              ),
            }} sx={{ marginTop: 4 }} required />
            {/* password errors */}
            {passwordReq ? <Typography sx={{ display: 'flex', justifyContent: "end", fontSize: "0.600rem", color: "red" }}> Password is required</Typography> : null}

            <Grid container spacing={1} sx={{ marginTop: 1 }}>
              {passwordEightChar && (
                <Grid item xs={6}>
                  <Typography sx={{ display: 'flex', justifyContent: "start", fontSize: "0.600rem", color: "red" }}>
                    8 character minimum
                  </Typography>
                </Grid>
              )}
              {passwordUppercase && (
                <Grid item xs={6}>
                  <Typography sx={{ display: 'flex', justifyContent: "end", fontSize: "0.600rem", color: "red" }}>
                    One uppercase character
                  </Typography>
                </Grid>
              )}
              {passwordOnedigit && (
                <Grid item xs={6}>
                  <Typography sx={{ display: 'flex', justifyContent: "start", fontSize: "0.600rem", color: "red" }}>
                    One number
                  </Typography>
                </Grid>
              )}
              {passwordLowercase && (
                <Grid item xs={6}>
                  <Typography sx={{ display: 'flex', justifyContent: "end ", fontSize: "0.600rem", color: "red" }}>
                    One lowercase character
                  </Typography>
                </Grid>
              )}
            </Grid>



            <Typography sx={{ marginTop: 2, display: "flex", alignItems: "center", justifyContent: "start" }}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="I agree to the" />
              <Link href="#" sx={{ color: "#004D74" }}>
                Terms & Conditions
              </Link>
            </Typography>
            <Button onClick={this.formSubmit}
            sx={{
              width: "14rem", height: "2.5rem", background: "#004D74", color: "white", fontFamily:"bold" ,borderRadius: "22px", margin: "20px auto", "&:hover": {
                backgroundColor: "#004D74"
              }
            }}
          >
            Sign Up
          </Button>

<Typography sx={{display:"flex", alignItems: "center", justifyContent: "center", gap:"8px", fontFamily:"bold" }}><p>Already have an account?


</p>  <Link href="#" sx={{ color: "#004D74" }}>
            Sign In
              </Link> </Typography>
          </FormControl>
        
     
        </div>
      </div>



      </>
    )
  }
}

export default Form;