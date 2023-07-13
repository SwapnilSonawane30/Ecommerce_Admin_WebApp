import primsadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request,{
    params
}:{
    params:{storeId:string}
}) {
    try {
        const { userId }=auth();
        const body=await req.json();
        const { name,value }=body;
        if(!userId){
            return new NextResponse("Unauthenticated",{status:401})
        }
        if(!name){
            return new NextResponse("Name is Required",{status:400})
        }
        if(!value){
            return new NextResponse("Value is Required",{status:400})
        }
        if(!params.storeId){
            return new NextResponse("StoreId is Required",{status:400})
        }
        const storeByUserId=await primsadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        });
        if(!storeByUserId){
            return new NextResponse("Unauthorized",{status:403})
        }
        const size=await primsadb.size.create({
            data:{
                name,
                value,
                storeId:params.storeId
            }
        })
        return NextResponse.json(size);
        
    } catch (error) {
        console.log('SIZES_POST',error);
        return new NextResponse("Internal Error",{status:500})
    }
}
export async function GET(req:Request,{
    params
}:{
    params:{storeId:string}
}) {
    try {
        if(!params.storeId){
            return new NextResponse("StoreId is Required",{status:400})
        }
        const sizes=await primsadb.size.findMany({
            where:{
                storeId:params.storeId
            }
        })
        return NextResponse.json(sizes);
        
    } catch (error) {
        console.log('SIZES_GET',error);
        return new NextResponse("Internal Error",{status:500})
    }
}