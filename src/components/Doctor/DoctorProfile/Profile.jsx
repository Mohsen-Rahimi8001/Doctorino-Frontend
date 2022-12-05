import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  FormControlLabel,
  Collapse,
  Button,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import { useParams } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const useStyles = makeStyles({
  container: {
    marginTop: "100px",
    paddingTop: "30px",
  },
  card: {
    display: 'fix',
    paddingInline: "13px",
    marginBottom: "20px",
    // border: '1px solid #000',
    // borderRadius: '5px',
  },
  doctor_image: {
    width: "100%",
    height: "100%",
    margin: "20px",
    border: "7px solid #ccc",
    borderRadius: "250px",
    maxHeight: "250px",
    maxWidth: "250px",
    position: "static",
    display: "inline-table",
  }
});



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 5 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




const Profile = () => {

  const [value, setValue] = React.useState(0);

  const secondaryHandleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [checked, setChecked] = React.useState(false);

  const thiredHandleChange = () => {
    setChecked((prev) => !prev);
  };


  const { id } = useParams();
  const [doctor, setDoctor] = useState();
  const [loading, setLoading] = useState(true);
  const classes = useStyles();


  function fetchData() {
    axios.get(`http://188.121.113.74/api/doctor/1/`)
      .then(res => {
        setDoctor(res.data);
        console.log(res.data)
      })
      .catch(err => console.log(err))

    setLoading(false);
  }

  useEffect(() => {

    if (loading) {
      fetchData();
    }

  }, [loading, doctor])


  return (
    <Container className={classes.container} >
      <Card className={classes.card}>
        <Grid container sx={{ marginTop: "10px" }}>
          <Grid item xs={12} lg={6} sx={{ display: 'flex', position: "sticky", justifyContent: 'center' }}>
            <CardMedia
              component="img"
              className={classes.doctor_image}
              image={doctor?.image}
              alt="doctor image"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CardContent sx={{ marginTop: "20px" }}>
              <Grid container spacing={3.5}>
                <Grid item xs={12} md={12}>
                  <Typography variant="subtitle2" sx={{ fontSize: "30px" }}>
                    دکتر {doctor?.user.first_name} {doctor?.user.last_name}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Typography
                    variant="subtitle1"
                    color={'text.secondary'}
                    sx={{
                      fontSize: 20,
                    }}
                  >
                    متخصص {doctor?.specialties[0]}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Typography variant="body2" sx={{ fontSize: "20px" }}>
                    <PlaceOutlinedIcon color='primary' sx={{ marginBottom: "-7px" }} /><span>     </span>{doctor?.city}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={6}>

                  <Typography noWrap variant="subtitle2" sx={{ fontSize: "18px", display: "inline" }}>
                    <VerifiedIcon color='primary' sx={{ marginBottom: "-7px" }} />
                    <span>     </span> کد نظام پزشکی
                  </Typography>

                  <Typography noWrap variant='subtitle1' color={'text.secondary'} sx={{ fontSize: "17px", display: 'inline', marginLeft: '15px' }} >
                    {doctor?.medical_system_number}
                  </Typography>

                </Grid>

              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <Card>
        <Box sx={{ width: '100%', }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs variant="scrollable" scrollButtons="auto" value={value} onChange={secondaryHandleChange} aria-label="basic tabs example" >
              <Tab label="درباره پزشک" {...a11yProps(0)} sx={{ width: "auto" }} />
              <Tab label="اطلاعات تماس" {...a11yProps(1)} sx={{ width: "auto" }} />
              <Tab label="نظرات و امتیاز" {...a11yProps(2)} sx={{ width: "auto" }} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <h4 style={{ marginBottom: "10px" }}>درباره پزشک</h4>
            {/* info about doctor from back-end */}
            <Box>

              <Box
                sx={{
                  "& > :not(style)": {
                    display: "flex",
                    justifyContent: "space-around",
                    height: "auto",
                    width: "auto",
                    marginBottom: "10px",
                  }
                }}
              >
                <div>


                  <Collapse in={checked} collapsedSize={40}>
                    {/* example */}
                    <p>
                      <p>دکتر مژگان صیادی در سال 1379 موفق به دریافت مدرک دکترای پزشکی عمومی از دانشگاه علوم پزشکی شیراز شدند و سپس دکترای تخصصی زنان، زایمان و نازایی را در سال 1387 از دانشگاه علوم پزشکی شیراز اخذ نمودند. ایشان دارای فلوشیپ نازایی، IVF و لاپاراسکوپی از دانشگاه علوم پزشکی یزد می باشند.
                      </p>

                      <p> سوابق و افتخارات دکتر مژگان صیادی
                        تدریس در دانشگاه بوشهر در سالهای 1387 تا 1391
                        استاد نمونه دانشگاه بوشهر در سال 1390
                        سابقه نگارش و چاپ چندین مقاله در ISI
                        مسئول بخش علمی بیمارستان شهریار
                        عضو انجمن جراحان و متخصصین زنان، زایمان و نازایی ایران
                        عضو انجمن متخصصین زنان و زایمان شیراز

                      </p>


                      <p>
                        خدمات ارائه شده توسط دکتر مژگان صیادی
                        تشخیص و درمان انواع نازایی (IVF,IUI)
                        تعیین جنسیت (PGD)
                      </p>
                      <p>
                        بیمارستان‌های همکار
                        بیمارستان MRI
                        شهر
                        میر
                        شهریار
                        میرحسینی
                        بعثت
                      </p>
                    </p>
                  </Collapse>
                </div>

              </Box>
              <Box sx={{ height: "auto", left: "0px" }}>
                {/* how to mv it to lrft? */}
                <FormControlLabel
                  control={<Button onClick={thiredHandleChange} label="▾بیشتر">بیشتر▾</Button>}
                />
              </Box>

            </Box>

          </TabPanel>
          <TabPanel value={value} index={1}>
            <h4 style={{ marginBottom: "15px" }}>  شماره تماس</h4>
            <p>
              <PhoneEnabledIcon fontSize="small" style={{ marginBottom: "-5px", marginLeft: "5px" }} />
              {doctor?.office_number}
            </p>
            <br />
            <h4  style={{ marginBottom: "15px" }}> نشانی مطب</h4>
            <p>
              <LocationOnIcon fontSize="small" style={{ marginBottom: "-5px", marginLeft: "5px" }} />
              {`${doctor?.province}، ${doctor?.city}، ${doctor?.clinic_address}`}
            </p>
          </TabPanel>
          <TabPanel value={value} index={2}>
            نظرات و امتیاز
          </TabPanel>
        </Box>
      </Card>
      <br /><br /><br /><br />
    </Container>
  )
}

export default Profile;