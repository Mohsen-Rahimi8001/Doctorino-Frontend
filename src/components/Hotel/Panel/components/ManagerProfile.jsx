import React, { useContext, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Typography,
  Input,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { styled, border } from "@mui/system";
import useAxios from "../../../../utils/useAxios";
import AuthContext from "../../../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../../../../utils/useAxios";
import theme from "../../../../assets/theme/defaultTheme";
import { set } from "date-fns-jalali";

const SMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: theme.palette.hotel.light,
  },
  // style when selected
  "&.Mui-selected": {
    backgroundColor: theme.palette.hotel.light,
  },
  "&.Mui-selected:hover": {
    backgroundColor: "transparent",
  },
});

const SFormControl = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    // set the color of the input when focused
    "&:hover fieldset": {
      borderColor: theme.palette.hotel.main,
    },
  },

  // focused style
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.hotel.main,
    borderWidth: "1px",
  },
  // set the label color when focused
  "& .MuiInputLabel-root": {
    color: theme.palette.grey[500],
  },
  // style the dropdown icon
  "& .MuiSelect-icon": {
    color: theme.palette.hotel.contrastText,
    backgroundColor: theme.palette.hotel.main,
    borderRadius: "50%",
  },
});

const STextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: theme.palette.grey[500],
  },
  "& .MuiFilledInput-root": {
    background: theme.palette.background.paper,
  },
  "& .MuiOutlinedInput-root": {
    background: "#fefefe",
    "&:hover fieldset": {
      borderColor: theme.palette.hotel.main,
    },
  },
  // style when focused
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.hotel.main,
  },

  spellCheck: false,
});

const SSelect = styled(Select)({
  background: "#fefefe",
});

const formValue = {
  firstName: "",
  lastName: "",
  fatherName: "",
  national_code: "",
  sex: 0,
  firstPhoneNumber: "",
  secondPhoneNumber: "",
  areaCode: "", // code telephone shahrestan
  telephoneNumber: "", // telephone sabet
  address: "",
  //   birthYear: [],
  //   birthMonth: [],
  birthDay: [],
  shaba: "",
};

export default function ManagerProfile(props) {
  const [ownerInfos, setOwnerInfos] = useState({ ...formValue });
  const [hotel, setHotel] = useState([]);
  const [genders, setGenders] = useState([]);
  const [day, setDay] = useState([]);
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [loading, setLoading] = useState(true);

  let { user, authData, logoutUser } = useContext(AuthContext);
  let api = useAxios();

  useEffect(() => {
    function fetchData() {
      api
        .get(`api/hotel/owner/${authData["child-id"]}/`, {
          headers: {
            Authorization: "Bearer " + authData?.access,
          },
        })

        .then((response) => {
          console.log("hotel owner response", response.data);
          //   setHotel(response.data);
          setOwnerInfos({
            ...ownerInfos,
            firstName: response.data.user.first_name,
            lastName: response.data.user.last_name,
            fatherName: response.data.father_name,
            // identityNumber: response.data.user.identity_number,
            // socialNumber: response.data.social_number,
            // sex: response
            sex: response.data.gender,
            firstPhoneNumber: response.data.first_phone_number,
            secondPhoneNumber: response.data.second_phone_number,
            areaCode: response.data.area_code,
            telephoneNumber: response.data.telephone_number,
            address: response.data.address,
            // birthYear: response.data.birth_year,
            // birthMonth: response.data.birth_month,
            birthDay: response.data.birth_day,
            shaba: response.data.shaba_code,
            national_code: response.data.national_code,
          });
          console.log("this is the hotel owner: ", ownerInfos);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (loading) {
      fetchData();
    }

    const id = setInterval(() => {
      fetchData();
    }, 200000);

    return () => clearInterval(id);
  }, [api, authData, loading, ownerInfos]);

  const handleGender = (event) => {
    const {
      target: { value },
    } = event;
    setGenders(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const reHandleGender = (e) => {
    setGenders(e.target.value);
  };

  const handleDay = (event) => {
    const {
      target: { value },
    } = event;
    setDay(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const reHandleDay = (e) => {
    setDay(e.target.value);
  };

  const handleMonth = (event) => {
    const {
      target: { value },
    } = event;
    setMonth(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const reHandleMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleYear = (event) => {
    const {
      target: { value },
    } = event;
    setYear(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const reHandleYear = (e) => {
    setYear(e.target.value);
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("نام ضروری است"),
    lastName: Yup.string().required("نام خانوادگی ضروری است"),
    fatherName: Yup.string().required("نام پدر ضروری است"),
    identityNumber: Yup.string().required("شماره شناسنامه ضروری است"),
    socialNumber: Yup.string().required("کد ملی ضروری است"),
    // sex: Yup.string().required("جنسیت ضروری است"),
    firstPhoneNumber: Yup.string().required("تلفن همراه ضروری است"),
    secondPhoneNumber: Yup.string(),
    areaCode: Yup.string(),
    telephoneNumber: Yup.string(),
    address: Yup.string(),
    birthYear: Yup.string().required("سال تولد ضروری است"),
    // birthMonth: Yup.string().required("ماه تولد ضروری است"),
    // birthDay: Yup.string().required("روز تولد ضروری است"),
    shaba: Yup.string().required("شماره شبا ضروری است"),
  });

  const gender = ["مونث", "مذکر"];
  const days = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];
  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  const years = [
    "1300",
    "1301",
    "1302",
    "1303",
    "1304",
    "1305",
    "1306",
    "1307",
    "1308",
    "1309",
    "1310",
    "1311",
    "1312",
    "1313",
    "1314",
    "1315",
    "1316",
    "1317",
    "1318",
    "1319",
    "1320",
    "1321",
    "1322",
    "1323",
    "1324",
    "1325",
    "1326",
    "1327",
    "1328",
    "1329",
    "1330",
    "1331",
    "1332",
    "1333",
    "1334",
    "1335",
    "1336",
    "1337",
    "1338",
    "1339",
    "1340",
    "1341",
    "1342",
    "1343",
    "1344",
    "1345",
    "1346",
    "1347",
    "1348",
    "1349",
    "1350",
    "1351",
    "1352",
    "1353",
    "1354",
    "1355",
    "1356",
    "1357",
    "1358",
    "1359",
    "1360",
    "1361",
    "1362",
    "1363",
    "1364",
    "1365",
    "1366",
    "1367",
    "1368",
    "1369",
    "1370",
    "1371",
    "1372",
    "1373",
    "1374",
    "1375",
    "1376",
    "1377",
    "1378",
    "1379",
    "1380",
    "1381",
  ];

  const formik = useFormik({
    initialValues: formValue,

    onSubmit: (values) => {
      console.log("on formik");
      let formData = new FormData();
      formData.append("first_name", formValue.firstName);
      formData.append("last_name", formValue.lastName);
      // formData.append('fatherName', formValue.fatherName);
      // formData.append('identityNumber', formValue.identityNumber);
      // formData.append('socialNumber', formValue.socialNumber);
      // formData.append('sex', formValue.sex);
      formData.append("firstPhoneNumber", formValue.firstPhoneNumber);
      formData.append("secondPhoneNumber", formValue.secondPhoneNumber);
      formData.append("firstName", formValue.firstName);
      formData.append("areaCode", formValue.areaCode);
      formData.append("telephoneNumber", formValue.telephoneNumber);
      formData.append("address", formValue.address);
      formData.append(
        "birth_day",
        `${formValue.birthYear}-${formValue.birthMonth}-${formValue.birthDay}`
      );
      // formData.append('birthMonth', formValue.birthMonth);
      // formData.append('birthDay', formValue.birthDay);
      formData.append("shaba", formValue.shaba);

      console.log("formdata", formData);
      api
        .put(`/api/hotel/owner/${authData["child-id"]}/`, formData, {
          headers: {
            Authorization: "Bearer " + authData?.access,
          },
          // headers:
          // {
          //     'Content-Type': 'multipart/form-data',
          //     Authorization: `Bearer ${authData.access}`
          // }
        })
        .then((res) => {
          toast.success("اطلاعات با موفقیت ثبت شد", {
            position: "top-right",
            autoClose: 2000,
          });
        })
        .catch((err) =>
          toast.error("مشکلی پیش آمده", {
            position: "top-right",
            autoClose: 2000,
          })
        );
    },

    validationSchema: validationSchema,
  });

  function postHotel(hotel) {
    let formData = new FormData();
    formData.append("firstName", hotel.firstName);
    formData.append("lastName", hotel.lastName);
    formData.append("fatherName", hotel.fatherName);
    formData.append("identityNumber", hotel.identityNumber);
    formData.append("socialNumber", hotel.socialNumber);
    // formData.append('sex', hotel.sex);
    formData.append("firstPhoneNumber", hotel.firstPhoneNumber);
    formData.append("secondPhoneNumber", hotel.secondPhoneNumber);
    formData.append("firstName", hotel.firstName);
    formData.append("areaCode", hotel.areaCode);
    formData.append("telephoneNumber", hotel.telephoneNumber);
    formData.append("address", hotel.address);
    formData.append("birth_day", hotel.birthYear);
    // formData.append('birthMonth', hotel.birthMonth);
    // formData.append('birthDay', hotel.birthDay);
    formData.append("shaba", hotel.shaba);

    api
      .put(`/api/hotel/owner/${authData["child-id"]}/`, formData, {
        headers: {
          Authorization: "Bearer " + authData?.access,
        },
        // headers:
        // {
        //     'Content-Type': 'multipart/form-data',
        //     Authorization: `Bearer ${authData.access}`
        // }
      })
      .then((res) =>
        toast.success("اطلاعات با موفقیت ثبت شد", {
          position: "top-right",
          autoClose: 2000,
        })
      )
      .catch((err) =>
        toast.error("مشکلی پیش آمده", {
          position: "top-right",
          autoClose: 2000,
        })
      );
  }

  return (
    <Container>
      <Box
        onSubmit={formik.handleSubmit}
        component="form"
        autoComplete="off"
        mt={5}
        sx={{
          bgcolor: "rgb(245, 246, 248)",
          height: "80%",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          "& .MuiTextField-root": { m: 0.5 },
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            margin: "10px",
          }}
          variant="h5"
        >
          پروفایل کاربری
        </Typography>

        <hr width="100%" style={{ margin: 10 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              ml={1}
              sx={{
                borderBottom: 1,
                boredrColor: "error.main",
                width: "20%",
                display: "flex",
              }}
            >
              <p>مشخصات فردی&nbsp;&nbsp;&nbsp;</p>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <STextField
              fullWidth
              error={formik.errors["firstName"] && formik.touched["firstName"]}
              variant="filled"
              label="نام"
              name="firstName"
              type="text"
              helperText={
                formik.touched["firstName"] && formik.errors["firstName"]
              }
              {...formik.getFieldProps("firstName")}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <STextField
              fullWidth
            //   value={ownerInfos.lastName}
              error={formik.errors["lastName"] && formik.touched["lastName"]}
              variant="filled"
              label="نام خانوادگی"
              name="lastName"
              type="text"
              helperText={
                formik.touched["lastName"] && formik.errors["lastName"]
              }
              {...formik.getFieldProps("lastName")}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <STextField
              fullWidth
              error={
                formik.errors["fatherName"] && formik.touched["fatherName"]
              }
              variant="filled"
              label="نام پدر"
              name="fatherName"
              type="text"
              helperText={
                formik.touched["fatherName"] && formik.errors["fatherName"]
              }
              {...formik.getFieldProps("fatherName")}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <SFormControl fullWidth>
              <InputLabel>جنسیت</InputLabel>
              <SSelect
                required
                // defaultValue={0}
                value={gender}
                label="جنسیت"
                onChange={reHandleGender}
                error={formik.errors["sex"] && formik.touched["sex"]}
                {...formik.getFieldProps("gender")}
              >
                {gender.map((feat, ind) => (
                  <MenuItem key={ind} value={feat}>
                    {/* <Checkbox checked={genders.indexOf(feat) > -1} /> */}
                    <ListItemText primary={feat} />
                  </MenuItem>
                ))}
              </SSelect>
            </SFormControl>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <STextField
              fullWidth
              error={
                formik.errors["identityNumber"] &&
                formik.touched["identityNumber"]
              }
              variant="filled"
              label="شماره شناسنامه"
              name="identityNumber"
              type="text"
              helperText={
                formik.touched["identityNumber"] &&
                formik.errors["identityNumber"]
              }
              {...formik.getFieldProps("identityNumber")}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <STextField
              fullWidth
              error={
                formik.errors["socialNumber"] && formik.touched["socialNumber"]
              }
              variant="filled"
              label="کد ملی"
              name="socialNumber"
              type="text"
              helperText={
                formik.touched["socialNumber"] && formik.errors["socialNumber"]
              }
              {...formik.getFieldProps("socialNumber")}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <STextField
              fullWidth
              error={
                formik.errors["firstPhoneNumber"] &&
                formik.touched["firstPhoneNumber"]
              }
              variant="filled"
              label="تلفن همراه اول"
              name="firstPhoneNumber"
              type="text"
              helperText={
                formik.touched["firstPhoneNumber"] &&
                formik.errors["firstPhoneNumber"]
              }
              {...formik.getFieldProps("firstPhoneNumber")}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <STextField
              fullWidth
              error={
                formik.errors["secondPhoneNumber"] &&
                formik.touched["secondPhoneNumber"]
              }
              variant="filled"
              label="تلفن همراه دوم"
              name="secondPhoneNumber"
              type="text"
              helperText={
                formik.touched["secondPhoneNumber"] &&
                formik.errors["secondPhoneNumber"]
              }
              {...formik.getFieldProps("secondPhoneNumber")}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>روز تولد</InputLabel>
              <SSelect
                required
                defaultValue={0}
                value={day}
                label="روز تولد"
                onChange={reHandleDay}
                error={formik.errors["birthDay"] && formik.touched["birthDay"]}
                {...formik.getFieldProps("day")}
              >
                {days.map((feat, ind) => (
                  <MenuItem key={ind} value={feat}>
                    {/* <Checkbox checked={days.indexOf(feat) > -1} /> */}
                    <ListItemText primary={feat} />
                  </MenuItem>
                ))}
              </SSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>ماه تولد</InputLabel>
              <SSelect
                required
                defaultValue={0}
                value={month}
                label="ماه تولد"
                onChange={reHandleMonth}
                error={
                  formik.errors["birthMonth"] && formik.touched["birthMonth"]
                }
                {...formik.getFieldProps("month")}
              >
                {months.map((feat, ind) => (
                  <MenuItem key={ind} value={feat}>
                    {/* <Checkbox checked={months.indexOf(feat) > -1} /> */}
                    <ListItemText primary={feat} />
                  </MenuItem>
                ))}
              </SSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>سال تولد</InputLabel>
              <SSelect
                required
                defaultValue={0}
                value={year}
                label="سال تولد"
                onChange={reHandleYear}
                error={
                  formik.errors["birthYear"] && formik.touched["birthYear"]
                }
                {...formik.getFieldProps("birthYear")}
              >
                {years.map((feat, ind) => (
                  <MenuItem key={ind} value={feat}>
                    {/* <Checkbox checked={years.indexOf(feat) > -1} /> */}
                    <ListItemText primary={feat} />
                  </MenuItem>
                ))}
              </SSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Box
              ml={1}
              sx={{
                borderBottom: 1,
                boredrColor: `${theme.palette.hotel.main}`,
                width: "20%",
                display: "flex",
              }}
            >
              <p>اطلاعات محل اسکان &nbsp;&nbsp;&nbsp;</p>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <STextField
              fullWidth
              error={formik.errors["areaCode"] && formik.touched["areaCode"]}
              variant="filled"
              label="کد شهرستان"
              name="areaCode"
              type="text"
              helperText={
                formik.errors["areaCode"] && formik.touched["areaCode"]
              }
              {...formik.getFieldProps("areaCode")}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <STextField
              fullWidth
              error={
                formik.errors["telephoneNumber"] &&
                formik.touched["telephoneNumber"]
              }
              variant="filled"
              label="تلفن ثابت"
              name="telephoneNumber"
              type="text"
              helperText={
                formik.errors["telephoneNumber"] &&
                formik.touched["telephoneNumber"]
              }
              {...formik.getFieldProps("telephoneNumber")}
            />
          </Grid>

          <Grid item xs={12}>
            <STextField
              fullWidth
              error={formik.errors["adress"] && formik.touched["adress"]}
              variant="filled"
              label="آدرس"
              name="adress"
              type="text"
              helperText={formik.errors["adress"] && formik.touched["adress"]}
              {...formik.getFieldProps("adress")}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              ml={1}
              sx={{
                borderBottom: 1,
                boredrColor: "error.main",
                width: "20%",
                display: "flex",
              }}
            >
              <p>تکمیل حساب بانکی&nbsp;&nbsp;&nbsp;</p>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <STextField
              fullWidth
              error={formik.errors["shaba"] && formik.touched["shaba"]}
              variant="filled"
              label="شماره شبا"
              name="shaba"
              type="text"
              helperText={formik.errors["shaba"] && formik.touched["shaba"]}
              {...formik.getFieldProps("shaba")}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "20px" }}>
            <Button
              type="submit"
              // disabled={(formik.isValid)}
              variant="contained"
              color="hotel"
              style={{ fontSize: "15px" }}
            >
              ثبت اطلاعات
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

// *new:
// disable button
// year,...
// map in year,...

// failiures:
// 1. sselect ha ke chackbox nadarand entekhab nemishavand
