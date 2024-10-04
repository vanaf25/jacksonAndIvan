import { Grid, Typography } from '@mui/material';
import CustomerDetails from '../../../components/global/CustomerDetails/CustomerDetails';
import SignaturesSection from '../../../components/letters/signatureSection/signatureSection';
import Box from '@mui/material/Box';
const gridItemStyles = {
  border: '1px solid black',
  padding: '8px',
  textAlign: 'center',
};
const PunchOutOf15 = () => {
  const data=[{main:"Some data added"},]
  return (
    <div>
      <Typography variant={"h3"}> 15 item Punch out</Typography>
      <CustomerDetails withOutTitle customer={{
        companyPhone:"0990930450",email:"vana@gmail.com",companyAddress:"24 rue de vignes"}}/>
      <CustomerDetails
        withOutTitle
        customer={{Estimator:"ivan",Email:"vanay@gmail.com",Phone:"0990930450",Address:"Some Adress"}}/>
      <Typography sx={{mb:1}}>
        The items listed below were submitted to us by the customer and at the customers request the company will repair, refinish, refine,
        touch up or bring up to standard the items listed below. Any items listed that do not pertain to the contract or
        are not clearly described in the contract language will be charged to the customer as additional work.
      </Typography>
      <Grid container sx={{mb:2}}>
        {data.map((el,index)=>{
          return (<>
            <Grid item xs={1}>
              <Box sx={gridItemStyles}>{index}</Box>
            </Grid>
            <Grid item xs={10}>
              <Box sx={{...gridItemStyles,background:"lightblue"}}>{el.main}</Box>
            </Grid>
            <Grid item xs={1}>
              <Box sx={gridItemStyles}>Ok</Box>
            </Grid>
          </>)
        })
        }
      </Grid>
      <Typography sx={{mb:1}}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        As with all punch out item's although we will always do our best to make sure that the work performed is of good quality
        we do not have the ability to fully complete items to your personal tastes on this standard punch out list. To help us
        better perform to your expectations please attach a picture and brief description of the items you would like us to bring
        up to your standards.
      </Typography>
      <Typography sx={{mb:1}}>
        By signing this punch out list you agree that upon completion of the items listed all contractual obligations by the company
        have been completed. Furthermore you agree that any items listed that are not part of your contract will incur additional charges.
      </Typography>
      <SignaturesSection client={"signature"}/>
    </div>
  );
};

export default PunchOutOf15;
