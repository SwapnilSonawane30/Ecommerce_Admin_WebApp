import primsadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-forms";

const CategoryPage=async({
    params
}:{
    params:{categoryId:string,storeId:string}
})=>{
    const category=await primsadb.category.findUnique({
        where:{
            id:params.categoryId
        }
    });


    const billboards=await primsadb.billboard.findMany({
        where:{
            storeId:params.storeId
        }
    })

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm
                billboards={billboards}
                initialData={category}/>
            </div>
        </div>
    )

}

export default CategoryPage;