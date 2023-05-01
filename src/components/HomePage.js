import React, { useState } from 'react'
import { useFormik } from "formik";
import weather from '../weather.jpg'
import * as Yup from "yup";
import axios from 'axios';




const formSchema = Yup.object({
    cityName: Yup.string().required("City Name is required"),
    
  });


function HomePage() {
    const [detail , setDetail] = useState(false);
    const [current , setCurrent] = useState({});
    const [location , setLoc] = useState({});

    //formik
  const formik = useFormik({
     
     initialValues: {
      cityName: "",
      },
    onSubmit: async (values , {resetForm}) => {
       
        const city = values?.cityName;

        try {
             	const response = await axios({
            		url:   `http://localhost:2400/detail/${city}`,
            		method: "get",
            	});
                setDetail(true);
            	console.log(response.data);
                setCurrent(response.data.current);
                setLoc(response.data.location)
            } catch (err) {
            	console.log(err)
            }

      console.log(values);
      resetForm()
     
    },

    validationSchema: formSchema,
  });
    
   
  return (
        <>
        <div className='container-fluid main p-5 row w-100 m-auto'>
              

              <div className='col-lg-6 col-md-6 col-sm-12 text-center'>
              <h3 className='mb-5 text-success mt-2'>Know Weather Of Your City</h3>
                <form onSubmit={formik.handleSubmit}>
                <input
                value={formik.values.cityName}
                onChange={formik.handleChange("cityName")}
                onBlur={formik.handleBlur("cityName")}
                type='cityName' placeholder='City' 
                 required></input>
                  {/* Err msg*/}
                  <div className="text-warning">
                    {formik.touched.cityName && formik.errors.cityName}
                  </div>
                 
                <button className='ms-3 mt-4' type='submit'>Search</button>
                </form>
                {detail ? (
                    <div className='mt-5'>
                             <div className='mt-3' ><h4>{location?.name}</h4> <span className='loc'>{location?.region}, {location?.country}</span> </div>
                             <p className='mt-3'><img src={current?.weather_icons?.[0]} alt='icon'></img> {current?.weather_descriptions?.[0]}</p>
                              <p>Feels Like: <span className='temp'>{current?.temperature}°C</span> </p>
                              <p>Humidity: <span className='temp'>{current?.humidity}%</span></p>
                    </div>         
                         ): null}
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 m-auto'>
               <img src={weather} alt="weather" className='w-100'></img>
              
              </div>

        </div>
        
        
        
        
        
        
        </>
  )
}

export default HomePage