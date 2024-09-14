import {useState} from 'react';
import {useForm} from "react-hook-form";
import {Box, Button, Paper, TextField} from "@mui/material";
import Card from './../Cards/Card/Card';
const Form = () => {
    const { register, handleSubmit } = useForm();
    const [GBQ,setGBQ]=useState(0);
    const [DEQ,setDEQ]=useState(0);
    const [ZSQ,setZSQ]=useState(0);
    const [DFQ]=useState(0);
    const [DSQ,setDSQ]=useState(0);
    const [DBQ,setDBQ]=useState(0);
    const [isSubmitting,setIsSubmitting]=useState(false)
    const onSubmit = data =>{
        console.log(data);
        setIsSubmitting(true)
      console.log(process.env);
        fetch(process.env.REACT_APP_BASE_URL,{method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)})
            .then(res=>res.json()).then(res=>{
              setIsSubmitting(false)
                setDBQ(res.DBQ);
                setDSQ(res.DSQ);
                setZSQ(res.ZSQ);
                setDEQ(res.DEQ);
                setGBQ(res.GBQ);
                console.log('res:',res);
        })
    }
    const filterFields=(e)=>{
        if (!["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab","Enter"].includes(e.key)) e.preventDefault()
    }
    return (
        <>
            <Paper
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                sx={{
                    maxWidth:600,
                    margin:"10px auto",
                    padding:"10px",
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    onKeyDown={filterFields}
                    type={"number"} min={"0"} sx={{mb:1}}
                    fullWidth {...register("L",{valueAsNumber:true,required:true})} id="outlined-basic" label="Provide Glutter Length" variant="outlined" />
                <TextField
                  onKeyDown={filterFields}
                  type={"number"} min={"0"} sx={{mb:1}} fullWidth {...register("O",
                    {valueAsNumber:true,required:true})} id="outlined-basic" label="Provide Downspout Quantity" variant="outlined" />
                <TextField
                  onKeyDown={filterFields}
                  type={"number"} min={"0"} sx={{mb:1}}
                           fullWidth {...register("D",{valueAsNumber:true,required:true})} id="outlined-basic" label="Provide Downspout Height" variant="outlined" />
                <TextField
                  onKeyDown={filterFields}
                  type={"number"} min={"0"} sx={{mb:1}} fullWidth {...register("H",
                    {valueAsNumber:true,required:true})} id="outlined-basic" label="Provide Gutter Height" variant="outlined" />
                <Box>
                    <Button fullWidth
                            disabled={isSubmitting}
                            type={"submit"} variant={"contained"}>{isSubmitting  ?
                      "Submitting": "Submit"}</Button>
                </Box>
            </Paper>
            {ZSQ ? <Card GBQ={GBQ}
                          DEQ={DEQ}
                          ZSQ={ZSQ}
                          DFQ={DFQ}
                          DSQ={DSQ}
                          DBQ={DBQ}  />:""}
        </>
    );
};

export default Form;
