import AdminJs, { PageHandler } from "adminjs"
import {Course, Episode, Category, User} from "../models"


export const dashboardOptions:{
    handler?: PageHandler
    component? : string
} = {
    component: AdminJs.bundle("./components/Dashboard"),
    handler: async (req, res, context) =>{
        const courses = await Course.count()
        const episodes = await Episode.count()
        const categories = await Category.count()
        const standardUser = await User.count({where:{ role: 'user'}})

        res.json({
        'Cursos': courses,
        'Episódios': episodes,
        'Categoria': categories,
        'Usuários': standardUser,
        })
    }
    
} 