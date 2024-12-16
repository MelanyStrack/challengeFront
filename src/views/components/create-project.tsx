import { saveProjects, validateFields } from "../../data/projects";
import "../../App.css";
import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";


export interface FormData {
    title: string;
    description: string;
    projectManager: string;
    assigned: string;
    status: boolean;
  }


export default function CreateForm() {
  const navigate= useNavigate();
  const [formData, setFormData] = useState({
    id:uuidv4(),
    title:"",
    description:"",
    projectManager:"",
    assigned:"",
    status:true,
    createdAt:new Date().toLocaleString(),
});


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};


const handleChangeSelect=(e:React.ChangeEvent<HTMLSelectElement>)=>{
  
  const {name,value}= e.target;
  if (name === "status") {
    let newValue=true
    if (value==="false") {
      newValue=false;
    }
    setFormData({
      ...formData,
      status: newValue,
  });
  }
    setFormData({
      ...formData,
      [name]: value,
  });
}

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      if (validateFields(formData)) {
        Swal.fire("All fields are required");
      }else{
        saveProjects(formData);
        Swal.fire("¡Project created!");
        navigate("/")
      }
    };
    
  return (
    <>
      <div className="flex p-2 gap-4 items-center bg-white lg:gap-6 lg:px-4 lg:py-3 shadow-md">
        <Link to="/"className="flex align-center text-center gap-1"> <IoMdArrowBack /> <p className=" text-[12px] text-gray-600 ">Back</p></Link>
        <p className="font-semibold">Add project</p>
      </div>
      <section className='bg-slate-200 h-full pt-3  lg:flex lg:justify-center '>
      <form className="bg-white px-3 py-4 lg:w-[50%] lg:p-6 shadow-md"
        onSubmit={handleSubmit}>
        <div className="flex flex-col my-2">
        <label htmlFor="title">
            Project name
        </label>
        <input type="text" id="title" name="title" onChange={handleChange} className="border rounded-sm p-1 text-gray-500"
        />
        </div>
        <div className="flex flex-col my-2">
        <label htmlFor="description">
            Description
        </label>
        <input type="text" id="description" name="description" onChange={handleChange}  className="border rounded-sm p-1 text-gray-500"/>
        </div>
        <div className="flex flex-col my-2">
        <label htmlFor="projectManager"> Project manager </label>
                    <select name="projectManager" id="projectManager" onChange={handleChangeSelect}  className="border rounded-sm py-1 text-gray-500" >
                        <option value="" disabled selected> Select a person </option>
                        <option value="Project Manager 1"> Project Manager 1 </option>
                        <option value="Project Manager 2"> Project Manager 2  </option>
                    </select>
                </div>
        <div className="flex flex-col my-2">
        <label htmlFor="assigned"> Assigned to </label>
                    <select name="assigned" id="assigned" onChange={handleChangeSelect}  className="border rounded-sm py-1 text-gray-500" >
                        <option value="" disabled selected> Select a person </option>
                        <option value="Ignacio Truffa"> Ignacio Truffa </option>
                        <option value="Melany Strack"> Melany Strack </option>
                    </select>
                </div>
        <div className="flex flex-col my-2">
        <label htmlFor="status"> Status </label>
                    <select name="status" id="status" onChange={handleChangeSelect}  className="border rounded-sm py-1 text-gray-500">
                        <option value="" disabled selected> Select a status </option>
                        <option value="true"> Enabled </option>
                        <option value="false"> Disabled </option>
                    </select>
                </div>

        <button type="submit" className=" bg-pink-600 rounded-sm text-sm py-1 px-2 items-center justify-items-center text-center text-white justify-around w-28 font-sem mt-3">Create project</button>
      </form>
      </section>
    </>
  );
}
