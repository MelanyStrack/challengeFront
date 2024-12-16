import { useEffect, useState } from 'react'
import '../App.css'
import { getAllProjects, Project } from '../data/projects';
import { Link } from 'react-router-dom';
import { GrAdd } from "react-icons/gr";
import userImage from "/images/userImage.png"
import Menu from './components/menu';

export default function ListProjects() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
 
  useEffect(() => {
    const projects = getAllProjects();
    setData(projects);
    if (projects.length > 0) {
      setLoading(false);
    }
    
  }, []);
  

  return (
    <>
      <div className='h-full w-full'>
        <div className='flex py-1 px-2 justify-between shadow-sm bg-white lg:px-4 lg:py-3'>
          <h1 className='font-semibold'>My projects</h1>

          <Link to="/add">
            <button className='flex bg-pink-600 rounded-sm text-sm py-1 px-2 items-center justify-items-center text-center text-white justify-around w-28'>
              <GrAdd /> Add Project
            </button>
          </Link>
        </div>
        {loading ? (
          <h4 className='p-2 font-semibold text-center text-gray-700'>Ups... looks like you don't have any projects yet!</h4>
        ) : (
          <section className='h-full pt-3  lg:py-0 lg:my-2 shadow-md w-full'>
            <div className='bg-white'>
              <ul className='hidden lg:flex lg:p-2 lg:justify-between lg:px-4 lg:bg-gray-100 lg:border-b-2'>
                <li className='lg:flex-1 lg:font-semibold '>Project info</li>
                <li  className=' lg:flex-1 lg:font-semibold'>Project Manager</li>
                <li className=' lg:flex-1 lg:font-semibold '>Assigned to</li>
                <li className='lg:flex-1 lg:font-semibold'>Status</li>
                <li className='lg:flex-1 lg:max-w-[4rem]  lg:font-semibold'>Actions</li>
              </ul>
              {data.map((item, i) => (
                <>
                <article key={i} className='flex justify-between lg:justify-around p-2  border-b-2 lg:p-4 w-full bg-gray-50 shadow-xs'>
                  <div className='lg:flex lg:justify-between lg:w-[96%] '>
                    <div className='lg:flex-1'>
                  <p className='px-1 text-gray-600'>{item.title}</p>
                  <p className='px-1 text-gray-400 text-[12px]'>Creation date: {item.createdAt}</p>
                  </div>
                 
                  <p className='flex text-center align-center py-1 lg:flex-1 text-gray-600'>
                    <img src={userImage} alt="" className='w-8 h-5 mt-1' /> {item.projectManager}
                  </p>
                  <p className='hidden lg:flex text-center align-center py-1 flex-1 text-gray-600'> <img src={userImage} alt="" className='w-8 h-5 mt-1' />{item.assigned}</p>
                  <p className='hidden px-1  lg:flex lg:flex-1 lg:text-center lg:items-center text-gray-600 text-[12px] '>
                    <p className=' p-1  bg-gray-200 w-14 border-gray-600  rounded-md'>{item.status ? "Enabled" : "Disabled"}</p>
                     </p>
                  </div>
                  <div className='mx-2 lg:flex-1'>
                  <Menu id={item.id}/>
                </div>
                </article>
                </>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
