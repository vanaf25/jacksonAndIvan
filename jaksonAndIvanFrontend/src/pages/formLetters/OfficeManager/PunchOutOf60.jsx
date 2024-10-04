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
      <Typography variant={"h3"}> 60 item Punch out</Typography>
      <CustomerDetails withOutTitle customer={{
        companyPhone:"0990930450",email:"vana@gmail.com",companyAddress:"24 rue de vignes"}}/>
      <CustomerDetails
        withOutTitle
        customer={{Estimator:"ivan",Email:"vanay@gmail.com",Phone:"0990930450",Address:"Some Adress"}}/>
      <Typography sx={{mb:1}}>
        The items listed below were submitted to us by the customer, at the customers request and under the customers direct supervision
        the company will repair, refinish, refine, touch up or bring up to the customers standards the listed items below.
        All items listed whether pertain to the contract or not will be charged to the customer as additional work.
        The customer will be charged at an hourly rate of 89.00 per hour for one service person or
        124.00 per hour for 2 service persons as well as the cost for any extra material needed to complete the listed items.
        the customer agrees to take full responsibility for all work performed and hold the company blameless from any liability
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
      <SignaturesSection client={"signature"}/>
    </div>
  );
};

export default PunchOutOf15;
