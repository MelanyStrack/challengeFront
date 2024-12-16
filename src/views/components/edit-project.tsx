import { Link, useNavigate, useParams } from "react-router-dom";
import { editProject, findById, Project, validateFields } from "../../data/projects";
import "../../App.css";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import Swal from "sweetalert2";


export default function EditForm() {
    const { id } = useParams();
    const projectData = findById(id as string);
    const navigate = useNavigate();
    console.log("projectData:", projectData);
    
    const [data, setData] = useState<Project>(projectData)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({
            ...data,
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
          setData({
            ...data,
            status: newValue,
        });
        }
          setData({
            ...data,
            [name]: value,
        });
      }

    
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateFields(data)) {
            Swal.fire("All fields are required");
        }else{
            editProject(data)
            Swal.fire("¡Project edited!");
            navigate("/")    
        }
        
    };
   return (
      <>
       <div className="flex p-2 gap-4 items-center bg-white lg:gap-6 lg:px-4 lg:py-3 shadow-md">
        <Link to="/"className="flex align-center text-center gap-1"> 
        <IoMdArrowBack /> 
        <p className=" text-[12px] text-gray-600 ">Back</p>
        </Link>
        <p className="font-semibold">Edit project</p>
      </div>
        <section className='bg-slate-200 h-full pt-3 pb-32 lg:flex lg:justify-center '>
        <form className="bg-white px-3 py-4 lg:w-[50%] lg:p-6 shadow-md"
          onSubmit={handleSubmit}>
          <div className="flex flex-col my-2">
          <label htmlFor="title">
              Project name
          </label>
          <input type="text" id="title" name="title" onChange={handleChange} className="border rounded-sm p-1 text-gray-500" value={data.title}
          />
          </div>
          <div className="flex flex-col my-2">
          <label htmlFor="description">
              Description
          </label>
          <input type="text" id="description" name="description" onChange={handleChange}  className="border rounded-sm p-1 text-gray-500" value={data.description}/>
          </div>
          <div className="flex flex-col my-2">
          <label htmlFor="projectManager"> Project manager </label>
                      <select name="projectManager" id="projectManager" onChange={handleChangeSelect}  className="border rounded-sm py-1 text-gray-500" value={data.projectManager}>
                          <option value="" disabled selected> Select a person </option>
                          <option value="Ignacio Truffa"> Ignacio Truffa </option>
                          <option value="Melany Strack"> Melany Strack </option>
                      </select>
                  </div>
          <div className="flex flex-col my-2">
          <label htmlFor="assigned"> Assigned to </label>
                      <select name="assigned" id="assigned" onChange={handleChangeSelect}  className="border rounded-sm py-1 text-gray-500" value={data.assigned}>
                          <option value="" disabled selected> Select a person </option>
                          <option value="Ignacio Truffa"> Ignacio Truffa </option>
                          <option value="Melany Strack"> Melany Strack </option>
                      </select>
                  </div>
          <div className="flex flex-col my-2">
          <label htmlFor="status"> Status </label>
                      <select name="status" id="status" onChange={handleChangeSelect}  className="border rounded-sm py-1 text-gray-500" value={data.status as unknown as string}>
                          <option value="" disabled selected> Select a status </option>
                          <option value="true"> Enabled </option>
                          <option value="false"> Disabled </option>
                      </select>
                  </div>
  
          <button type="submit" className=" bg-pink-600 rounded-sm text-sm py-1 px-2 items-center justify-items-center text-center text-white justify-around w-28 font-sem mt-3">Save changes</button>
        </form>
        </section>
      </>
    );
}
