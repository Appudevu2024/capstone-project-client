import axiosInstance from "../axios/axiosinstance"



export const listDoctors = async () => {
  try {
    const res = await axiosInstance.get('/doctor/listdoctors');
    console.log('Doctors :', res.data); 
    return res.data.doctors; 
  } catch (error) {
    console.error('Error in listDoctors:', error);
    throw error;
  }
};

export const doctorSignUp=async ()=>{
  try {
    const res= await axiosInstance.post('/doctor/register');
    return res.data;
  } catch (error) {
    console.error('Error in Doctorsignup:', error);
    throw error;
  }
}
export const doctorLogin=async ()=>{
  try {
    const res= await axiosInstance.post('/doctor/login');
    return res.data;
  } catch (error) {
    console.error('Error in Doctor login:', error);
    throw error;
  }
}