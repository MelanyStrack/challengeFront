import { useState } from 'react'
import '../../App.css'
import { SlOptionsVertical } from "react-icons/sl";
import { FaRegEdit } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash } from "react-icons/fi";
import { deleteProject } from '../../data/projects';
import Swal from 'sweetalert2';


interface MenuProps {
    id: string;
  }
export default function Menu(id:MenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  const navigate=useNavigate();
  const handleEditClick = () => {
    navigate(`/edit/${id}`);
  };

  const deleteSelected=(id:string)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          deleteProject(id);   
          setTimeout(() => {
            navigate("/")
            window.location.reload()
          }, 2000);    
          
        }

      });
    
  }

  return (
    <>
    
                  <div>
                    <button
                      onClick={toggleMenu}
                      className="inline-flex justify-center px-4 py-2 bg-white "
                    >
                     <SlOptionsVertical />
                    </button>
                    
                    {isOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <ul className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <li
                            className=" px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 border-b"
                            role="menuitem"
                            onClick={() => {
                              setIsOpen(false);
                            }}
                          >
                            <Link to={`/edit/${id.id}`} onClick={()=>handleEditClick()} className='flex items-center gap-1'><FaRegEdit /> Edit</Link>
                           
                          </li>
                          <li
                            className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => {
                              setIsOpen(false); 
                            }}
                          >
                            <button onClick={() => deleteSelected(id.id)} className='flex items-center gap-1'><FiTrash /> Delete</button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                
</>
)}
