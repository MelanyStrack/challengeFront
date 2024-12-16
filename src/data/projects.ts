import { FormData } from "../views/components/create-project";


export interface Project{
    id: string;
    title: string;
    description: string;
    projectManager: string;
    assigned: string;
    status: boolean;
    createdAt: string;
}

export const saveProjects = (data: FormData) => {
    const existingProjects = getAllProjects();

    existingProjects.push(data);

    localStorage.setItem('projects', JSON.stringify(existingProjects));

};

export const getAllProjects = ()=>{
    const oldData = localStorage.getItem("projects");
    if (oldData && oldData.length > 0) {
        const arrayData = JSON.parse(oldData);
        return arrayData;
    }else{
        return [];
    }
}

export const findById = (id:string)=>{
    const oldData = getAllProjects();
    const foundProject = oldData.filter((p : Project)=> p.id == id);
    return foundProject[0]
}

export const editProject = (newProject : Project)=>{
    const oldData = getAllProjects();
    const newArray : Project[]=[];
    oldData.forEach((element : Project)=> {
        if (element.id === newProject.id) {
            element = newProject
        }
        newArray.push(element)
    });
    localStorage.setItem('projects', JSON.stringify(newArray));

}

export function validateFields(obj: Project): boolean {
    return Object.values(obj).some(valor => {
      return valor === "" || valor === null || valor === undefined;
    });
  }

export const deleteProject = (id:string)=>{
    const projects= getAllProjects();
    const newArray = projects.filter((e : Project )=>{
        return e.id != id
    })
    localStorage.setItem('projects', JSON.stringify(newArray));
}